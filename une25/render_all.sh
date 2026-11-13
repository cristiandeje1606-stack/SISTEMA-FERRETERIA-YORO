# uso en el sandbox: bash render_all.sh "1:1920:1080 2:1920:1080 ..."   (cada pieza en 2 trozos, todos en paralelo)
cd ~/une25; mkdir -p out
JOBS=""
for spec in $1; do IFS=: read n w h <<<"$spec"; D=$(python3 -c "import json;print(json.load(open('meta/%02d.json'%$n))['dur'])"); M=$(python3 -c "print(round($D/2,2))")
  node render.js $n $w $h out/p${n}_a.mp4 0 $M & node render.js $n $w $h out/p${n}_b.mp4 $M $D & done; wait
for spec in $1; do IFS=: read n w h <<<"$spec"; printf "file p${n}_a.mp4\nfile p${n}_b.mp4\n" > out/l$n.txt; (cd out && ffmpeg -nostdin -v error -y -f concat -safe 0 -i l$n.txt -c copy mudo$n.mp4); done
ls -la out/mudo*.mp4; echo FIN
