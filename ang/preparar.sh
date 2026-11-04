set -e
mkdir -p frames prev
[ -f frames/f_00001.jpg ] || ffmpeg -v error -y -i voz.mp4 -vf "scale=1080:1920:flags=lanczos,hqdn3d=1.5:1.5:6:6,eq=contrast=1.07:saturation=1.12:brightness=0.01,colorbalance=rs=.03:bs=-.03:rh=.02:bh=-.02,unsharp=5:5:0.7" -q:v 3 frames/f_%05d.jpg
N=$(ls frames | wc -l)
python3 -c "
import json;W=json.load(open('palabras.json'))
open('palabras.js','w').write('window.PALABRAS='+json.dumps(W,ensure_ascii=False)+';window.NFRAMES=$N;')"
echo frames $N
