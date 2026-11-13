# uso: python3 build_audio.py 1 2 3 ...  -> audio/aNN_tv.wav (-24 LUFS) y audio/aNN_rs.wav (-14 LUFS)
import sys,json,os,subprocess,asyncio
from playwright.async_api import async_playwright
SFX={'golpe':('golpe_grave',-9),'whoosh':('whoosh_corto',-14),'whoosh_largo':('whoosh_largo',-14),'swipe':('swipe',-15),'pop':('pop_icono',-15),'riser':('riser_1s',-14),'campana':('campanita_exito',-13),'obturador':('obturador',-14)}
os.makedirs('audio',exist_ok=True);os.makedirs('meta',exist_ok=True)
async def metas(ns):
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--allow-file-access-from-files'])
        for n in ns:
            pg=await b.new_page();await pg.goto('file://'+os.path.abspath('index.html')+f'?n={n}&w=640&h=360');await pg.wait_for_function('window.ready===true',timeout=30000)
            json.dump(await pg.evaluate('META()'),open(f'meta/{n:02d}.json','w'));await pg.close()
        await b.close()
ns=[int(x) for x in sys.argv[1:]];asyncio.run(metas(ns))
for n in ns:
    M=json.load(open(f'meta/{n:02d}.json'));D=M['dur'];mu=M.get('musica',{})
    hits=','.join(str(h) for h in mu.get('hits',[]));fin=str(mu.get('final',D-4))
    subprocess.run(['python3','gen_music.py',str(n),str(D),mu.get('estilo','epic'),str(mu.get('bpm',120)),mu.get('tono','Dm'),hits,fin],check=True)
    ins=['-i',f'musica/m{n:02d}.wav'];fl=['[0:a]aformat=channel_layouts=stereo,volume=-3dB[m]'];lab=['[m]']
    for i,(tp,t) in enumerate(M.get('events',[])):
        if tp not in SFX or t>=D: continue
        f,g=SFX[tp];ms=int(max(0,t)*1000);ins+=['-i',f'sfx/{f}.wav'];k=len(lab)
        fl.append(f'[{k}:a]aresample=48000,aformat=channel_layouts=stereo,volume={g}dB,adelay={ms}|{ms}[s{k}]');lab.append(f'[s{k}]')
    fl.append(''.join(lab)+f'amix=inputs={len(lab)}:normalize=0,atrim=0:{D}[a]')
    subprocess.run(['ffmpeg','-v','error','-y',*ins,'-filter_complex',';'.join(fl),'-map','[a]','-ar','48000',f'/tmp/mz{n}.wav'],check=True)
    for nm,L,T,lim in (('tv',-24,-2,.75),('rs',-14,-1.5,.84)):
        r=subprocess.run(['ffmpeg','-i',f'/tmp/mz{n}.wav','-af',f'loudnorm=I={L}:TP={T}:LRA=11:print_format=json','-f','null','-'],capture_output=True,text=True).stderr
        j=json.loads(r[r.rindex('{'):r.rindex('}')+1])
        subprocess.run(['ffmpeg','-v','error','-y','-i',f'/tmp/mz{n}.wav','-af',f"loudnorm=I={L}:TP={T}:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true,alimiter=limit={lim}:level=false",'-ar','48000',f'audio/a{n:02d}_{nm}.wav'],check=True)
    print('audio ok',n,D,len(M.get('events',[])),'eventos')
