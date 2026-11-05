// node render.js v W H out.mp4 t0 t1 | node render.js v W H prev t1,t2
const {chromium}=require('/usr/local/lib/node_modules/playwright');const {spawn}=require('child_process');const path=require('path');
const [v,W,H,out]=[process.argv[2],+process.argv[3],+process.argv[4],process.argv[5]];const FPS=30;
(async()=>{const b=await chromium.launch({args:['--allow-file-access-from-files']});const pg=await b.newPage({viewport:{width:W,height:H}});
 pg.on('pageerror',e=>console.log('ERR',e.message));pg.on('console',m=>{if(m.type()==='error')console.log('CON',m.text())});
 await pg.goto('file://'+path.resolve('index.html')+`?v=${v}&w=${W}&h=${H}`);await pg.waitForFunction('window.ready===true',null,{timeout:120000});
 if(out==='prev'){for(const t of process.argv[6].split(',')){await pg.evaluate(`render(${t})`);await pg.screenshot({path:`prev/v${v}_${W}x${H}_${(+t).toFixed(1).padStart(5,'0')}.jpg`,type:'jpeg',quality:75})}}
 else{const t0=+process.argv[6],t1=+process.argv[7];const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate',''+FPS,'-i','-','-c:v','libx264','-preset','veryfast','-crf','17','-pix_fmt','yuv420p',out]);
  for(let f=Math.round(t0*FPS);f<Math.round(t1*FPS);f++){await pg.evaluate(`render(${f/FPS})`);const buf=await pg.screenshot({type:'jpeg',quality:92});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r))}
  ff.stdin.end();await new Promise(r=>ff.on('close',r))}
 await b.close()})();
