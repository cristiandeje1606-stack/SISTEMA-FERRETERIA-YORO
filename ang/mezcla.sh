set -e
# voz: avance + mensaje completo, limpieza y compresión
ffmpeg -v error -y -i voz.mp4 -filter_complex "[0:a]atrim=21.12:24.42,asetpts=PTS-STARTPTS,afade=t=in:d=.02,afade=t=out:st=3.2:d=.1[a];[0:a]atrim=0:41.33,asetpts=PTS-STARTPTS,apad=pad_dur=0[b];[a]apad=whole_dur=3.2[a2];[a2][b]concat=n=2:v=0:a=1,aresample=48000,highpass=f=85,afftdn=nf=-28,equalizer=f=250:t=q:w=1:g=-2,equalizer=f=3200:t=q:w=1.2:g=3,equalizer=f=9000:t=h:w=1:g=2,acompressor=threshold=-24dB:ratio=3.5:attack=5:release=90:makeup=6,deesser=i=0.35,loudnorm=I=-16:TP=-2:LRA=7,aformat=channel_layouts=stereo,apad=whole_dur=49.5[v]" -map "[v]" -t 49.5 voz_lista.wav
# efectos
F="aformat=channel_layouts=stereo:sample_rates=48000"
python3 - <<'P'
import json
W=lambda s:s+3.2
ev=[('whoosh_corto',0.0,-14),('golpe_grave',1.05,-8),('whoosh_largo',3.05,-12),('golpe_grave',3.2,-9)]
cuts=[W(2.8),W(5.3),W(7.9),W(10.1),W(11.4),W(12.4),W(13.5),W(14.4),W(15.8),W(17.4),W(19.5),W(21.1),W(24.6),W(27.2),W(29.5),W(31.7),W(35.0),W(38.0)]
for i,c in enumerate(cuts): ev.append(('whoosh_corto' if i%2 else 'swipe',c-.12,-15))
for t in [W(18.46),W(22.26),W(29.92),W(33.58),W(38.04),W(39.24),W(40.34)]: ev.append(('golpe_grave',t,-11))
for t in [W(5.9),W(10.1),W(12.46),W(13.58),W(24.6),W(27.9)]: ev.append(('pop_icono',t,-18))
for t in [W(10.1),W(24.6),W(27.2),W(38.0)]: ev.append(('obturador',t,-20))
ev+= [('riser_1s',43.4,-12),('golpe_grave',44.35,-6),('whoosh_largo',44.4,-12),('campanita_exito',46.3,-15)]
json.dump(ev,open('eventos.json','w'))
ins=[];fl=[];mx=[]
for i,(n,t,db) in enumerate(ev):
    ins+=['-i',f'sfx/{n}.wav'];ms=int(t*1000)
    fl.append(f'[{i}:a]aformat=channel_layouts=stereo:sample_rates=48000,adelay={ms}|{ms},volume={db}dB[s{i}]');mx.append(f'[s{i}]')
fc=';'.join(fl)+';'+''.join(mx)+f'amix=inputs={len(ev)}:normalize=0,apad=whole_dur=49.5[x]'
open('sfx_cmd.txt','w').write(' '.join(["'"+a+"'" if ' ' in a else a for a in ins])+'\n'+fc)
P
INS=$(head -1 sfx_cmd.txt); FC=$(tail -1 sfx_cmd.txt)
eval ffmpeg -v error -y $INS -filter_complex "\"$FC\"" -map "[x]" -t 49.5 sfx.wav
# música con ducking bajo la voz y mezcla final
ffmpeg -v error -y -i musica.mp3 -i voz_lista.wav -i sfx.wav -filter_complex "[0:a]$F,volume=-2dB[m];[1:a]$F,asplit=2[v1][v2];[m][v1]sidechaincompress=threshold=0.03:ratio=6:attack=30:release=350:makeup=1[md];[md][v2][2:a]amix=inputs=3:normalize=0,alimiter=limit=0.9[o]" -map "[o]" -t 49.5 mix.wav
two(){ J=$(ffmpeg -i mix.wav -af "loudnorm=I=$1:TP=$2:LRA=11:print_format=json" -f null - 2>&1 | sed -n '/^{/,/^}/p'); g(){ echo "$J" | python3 -c "import json,sys;print(json.load(sys.stdin)['$1'])"; }
ffmpeg -v error -y -i mix.wav -af "loudnorm=I=$1:TP=$2:LRA=11:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):offset=$(g target_offset):linear=true,aformat=channel_layouts=stereo" -ar 48000 $3; }
two -14 -1.5 mix_redes.wav
echo mezcla_ok
