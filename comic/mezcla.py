import subprocess,json
EV={1:[('golpe_grave',0.12,-8),('pop_icono',.6,-12),('pop_icono',1.15,-10),('swipe',2.45,-14),('pop_icono',2.8,-12),('swipe',3.4,-14),('pop_icono',3.6,-13),('pop_icono',4.0,-13),('pop_icono',4.4,-11),('obturador',5.6,-8),
     ('golpe_grave',7.0,-11),('pop_icono',7.3,-12),('pop_icono',7.7,-13),('golpe_grave',8.45,-12),('pop_icono',9.2,-9),('whoosh_corto',10.35,-15),('pop_icono',12.9,-11),('pop_icono',13.25,-12),
     ('pop_icono',16.0,-12),('campanita_exito',16.8,-12)],
    2:[('whoosh_corto',.15,-15),('pop_icono',.5,-12),('pop_icono',1.4,-10),('swipe',2.4,-14),('pop_icono',2.65,-13),('swipe',3.6,-14),('pop_icono',3.85,-12),('swipe',4.8,-13),('pop_icono',5.05,-10),
     ('golpe_grave',6.0,-6),('pop_icono',6.15,-11),('pop_icono',9.65,-11),('pop_icono',10.85,-11),('pop_icono',12.05,-10),('pop_icono',13.3,-12),('pop_icono',13.8,-12),('pop_icono',14.4,-11),('pop_icono',15.0,-12),('campanita_exito',15.6,-13)]}
POW={1:[2.4,6.8,12.8,15.2],2:[2.4,6.0,9.6,13.2]}
for k in (1,2):
    ev=EV[k]+[(e,T+d,g) for T in POW[k] for e,d,g in (('whoosh_largo',-.42,-14),('golpe_grave',0,-9))]
    ins=['-i',f'raw{k}.wav'];fl=['[0:a]atrim=0:20,afade=t=out:st=19.4:d=0.6[m]'];lab=['[m]']
    for i,(f,t,g) in enumerate(ev):
        ins+=['-i',f'sfx/{f}.wav'];ms=int(max(0,t)*1000);fl.append(f'[{i+1}:a]aresample=48000,aformat=channel_layouts=stereo,volume={g}dB,adelay={ms}|{ms}[s{i}]');lab.append(f'[s{i}]')
    fl.append(''.join(lab)+f'amix=inputs={len(lab)}:normalize=0,atrim=0:20[a]')
    subprocess.run(['ffmpeg','-v','error','-y',*ins,'-filter_complex',';'.join(fl),'-map','[a]','-ar','48000',f'mez{k}.wav'],check=True)
    for n,L,T in (('tv',-24,-2),('rs',-14,-1.5)):
        r=subprocess.run(['ffmpeg','-i',f'mez{k}.wav','-af',f'loudnorm=I={L}:TP={T}:LRA=11:print_format=json','-f','null','-'],capture_output=True,text=True).stderr
        d=json.loads(r[r.rindex('{'):r.rindex('}')+1])
        subprocess.run(['ffmpeg','-v','error','-y','-i',f'mez{k}.wav','-af',f"loudnorm=I={L}:TP={T}:LRA=11:measured_I={d['input_i']}:measured_TP={d['input_tp']}:measured_LRA={d['input_lra']}:measured_thresh={d['input_thresh']}:offset={d['target_offset']}:linear=true,alimiter=limit=0.75:level=false",'-ar','48000',f'aud{k}_{n}.wav'],check=True)
