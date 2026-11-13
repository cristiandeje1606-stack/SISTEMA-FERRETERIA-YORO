// 19 · CAMBIO DE CANAL (reel 9:16, 30 s) — televisor moderno, zapping entre señales de colores, se detiene en UNE Visión y entramos a la pantalla.
(()=>{
const SW=960*U,SH=540*U,TX=CX,TY=760*U;
const ZAP=[3.0,4.25,5.45,6.55,7.45,8.2,8.8,9.3,9.7,10.05,10.4];   // la última cae en UNE VISIÓN
const NS=ZAP.length;                                              // índice NS = UNE
const SC=document.createElement('canvas');SC.width=Math.round(SW);SC.height=Math.round(SH);const G=SC.getContext('2d');
const HUE=[290,140,20,200,320,60,170,260,350,100,230];
const hsl=(h,s,l,a=1)=>`hsla(${h},${s}%,${l}%,${a})`;
// señales de otros "canales" (abstractas, sin estática)
function s19_sig(i,lt){const g=G,w=SW,h=SH,hu=HUE[i%HUE.length],ty=i%6;g.save();g.clearRect(0,0,w,h);
  if(ty===0){for(let k=0;k<7;k++){const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,hsl(hu+k*40,85,62));gr.addColorStop(1,hsl(hu+k*40,80,38));g.fillStyle=gr;g.fillRect(k*w/7,0,w/7+1,h)}g.fillStyle='rgba(255,255,255,.18)';g.fillRect(0,h*.72+Math.sin(lt*3)*10,w,h*.06)}
  else if(ty===1){g.fillStyle=hsl(hu,60,12);g.fillRect(0,0,w,h);for(let k=0;k<14;k++){const r=((k*60+lt*160)%840)*U;g.strokeStyle=hsl(hu+k*12,90,60,1-r/(840*U));g.lineWidth=18*U;g.beginPath();g.arc(w/2,h/2,r,0,7);g.stroke()}}
  else if(ty===2){const gr=g.createLinearGradient(0,0,w,h);gr.addColorStop(0,hsl(hu,70,14));gr.addColorStop(1,hsl(hu+60,70,22));g.fillStyle=gr;g.fillRect(0,0,w,h);g.lineWidth=7*U;
    for(let k=0;k<6;k++){g.strokeStyle=hsl(hu+k*25,95,62,.9);g.beginPath();for(let x=0;x<=w;x+=10*U){const y=h/2+Math.sin(x*.012/U+lt*4+k*.8)*(40+k*18)*U*Math.sin(lt*1.3+k);x?g.lineTo(x,y):g.moveTo(x,y)}g.stroke()}}
  else if(ty===3){g.fillStyle=hsl(hu,80,55);g.fillRect(0,0,w,h);g.fillStyle=hsl(hu+40,85,40);g.save();g.translate(w/2,h/2);g.rotate(-.6);for(let x=-w*1.2+(lt*120*U)%(120*U);x<w*1.2;x+=120*U)g.fillRect(x,-w,60*U,w*2);g.restore()}
  else if(ty===4){const gr=g.createLinearGradient(0,0,0,h*.62);gr.addColorStop(0,hsl(hu+200,70,16));gr.addColorStop(1,hsl(hu,90,55));g.fillStyle=gr;g.fillRect(0,0,w,h);
    g.fillStyle=hsl(hu+30,95,62);g.beginPath();g.arc(w/2,h*.6,130*U,Math.PI,0);g.fill();g.fillStyle=hsl(hu+200,60,10);g.fillRect(0,h*.6,w,h*.4);g.strokeStyle=hsl(hu,90,60,.8);g.lineWidth=3*U;
    for(let k=-12;k<=12;k++){g.beginPath();g.moveTo(w/2+k*12*U,h*.6);g.lineTo(w/2+k*90*U,h);g.stroke()}for(let k=0;k<8;k++){const z=((k+lt*2)%8)/8;const y=h*.6+h*.4*z*z;g.beginPath();g.moveTo(0,y);g.lineTo(w,y);g.stroke()}}
  else{g.fillStyle=hsl(hu,50,10);g.fillRect(0,0,w,h);g.globalCompositeOperation='lighter';for(let k=0;k<26;k++){const x=(hs(k+i*40)*w+lt*30*U*(hs(k)-.5)),y=hs(k+i*40+9)*h,r=(30+hs(k+3)*80)*U;const gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,hsl(hu+hs(k)*80,90,60,.55));gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(x-r,y-r,r*2,r*2)}}
  g.restore()}
// pantalla UNE VISIÓN
function s19_une(lt,k=1){const g=G,w=SW,h=SH;g.save();const gr=g.createLinearGradient(0,0,w,h);gr.addColorStop(0,K.noche);gr.addColorStop(1,'#123a63');g.fillStyle=gr;g.fillRect(0,0,w,h);
  g.save();g.translate(w/2,h/2);g.rotate(-.5);[[K.cian,-.25],[K.ambar,.28]].forEach(([c,o],j)=>{const x=((lt*120*(j?1:-1))%(w*2))+o*w;const gb=g.createLinearGradient(x-120*U,0,x+120*U,0);gb.addColorStop(0,'rgba(0,0,0,0)');gb.addColorStop(.5,c);gb.addColorStop(1,'rgba(0,0,0,0)');g.globalAlpha=.22;g.fillStyle=gb;g.fillRect(x-120*U,-w,240*U,w*2)});g.restore();
  const lw=300*U*(.85+.15*bk(cl(lt/.5))),lh=lw*LR();g.shadowColor='rgba(8,225,255,.6)';g.shadowBlur=40*U;g.drawImage(LOGO,w/2-lw/2,h/2-lh/2-10*U,lw,lh);g.shadowBlur=0;
  g.font=`700 ${26*U}px Space`;g.fillStyle=K.cian;g.textBaseline='middle';g.fillText('UNE VISIÓN',58*U,42*U);for(let b=0;b<4;b++){g.fillRect((20+b*8)*U,(52-b*6)*U,5*U,(b*6+6)*U)}
  g.restore()}
function s19_screenTo(x,y,w,h,t){// dibuja la pantalla actual en (x,y,w,h) con transición de cambio
  let idx=0;for(const z of ZAP)if(t>=z)idx++;const z=idx>0?ZAP[idx-1]:0,lt=t-z,tr=idx>0?P(t,z,.2):1;
  idx<NS?s19_sig(idx,t):s19_une(t-ZAP[NS-1]);
  if(tr<1){// rollo vertical + rebanadas + aberración
    const off=(1-ex(tr))*h*.35;X.save();X.beginPath();X.rect(x,y,w,h);X.clip();
    for(let s=0;s<12;s++){const sy=s*SH/12,dx=(hs(s+idx*13)-.5)*90*U*(1-tr);X.drawImage(SC,0,sy,SW,SH/12+1,x+dx,y+(sy+off)%SH*h/SH-0,w,h/12+1);}
    X.globalCompositeOperation='lighter';X.globalAlpha=.35*(1-tr);X.drawImage(SC,x+14*U,y,w,h);X.globalAlpha=.25*(1-tr);X.fillStyle='#fff';X.fillRect(x,y+h*(1-tr),w,8*U);X.restore()}
  else X.drawImage(SC,x,y,w,h);
  return idx}
// textos bajo el TV
const TXT=[[1.6,5.35,'¿QUÉ PASA','EN TU TIERRA?'],[5.5,10.25,'¿NOTICIAS','DE AQUÍ?'],[10.45,13.9,'AQUÍ','ESTAMOS']];
function s19_lines(t,a,b,l1,l2,y){if(t<a||t>b)return;const out=ss(P(t,b-.3,.3)),o={f:'Archivo',w:900};const sz=Math.min(fit(l1,940*U,140*U,o),fit(l2,940*U,140*U,o));
  X.save();X.globalAlpha=1-out;rise(l1,CX,y,sz,a,t,{...o,c:'#fff'});rise(l2,CX,y+sz*1.08,sz,a+.15,t,{...o,grad:['#ffffff',K.cian]});X.restore()}
// interior: gráfica vertical de UNE
const IN=[[15.55,18.3,'UNE VISIÓN','NOTICIAS',[K.cian,K.azul]],[18.3,20.95,'LO QUE PASA AQUÍ','NUESTRA|GENTE',[K.ambar,K.brasa]],[20.95,23.6,'HONDURAS','SANTA|BÁRBARA',[K.cian,K.azul]],[23.6,26.1,'CADA DÍA','TU|CANAL',[K.naranja,K.rojo]]];
function s19_inside(t){const g=X.createLinearGradient(0,0,W,H);g.addColorStop(0,K.noche);g.addColorStop(1,'#0f3358');X.fillStyle=g;X.fillRect(0,0,W,H);
  X.save();X.translate(CX,CY);X.rotate(-.5);[[K.cian,-.3,1],[K.ambar,.3,-1],[K.azul,.05,1]].forEach(([c,o,d])=>{const x=((t*160*d*U)%(DG*1.6))-DG*.8+o*W;const gb=X.createLinearGradient(x-200*U,0,x+200*U,0);gb.addColorStop(0,'rgba(0,0,0,0)');gb.addColorStop(.5,c);gb.addColorStop(1,'rgba(0,0,0,0)');X.globalAlpha=.16;X.fillStyle=gb;X.fillRect(x-200*U,-DG,400*U,DG*2)});X.restore();
  grid(t,.6);
  // carrusel de señales (la del centro es UNE)
  const cy=1330*U,cw=230*U,chh=130*U,sp=270*U,off=(t*90*U)%sp;for(let k=-3;k<=4;k++){const x=CX+k*sp-off,d=Math.abs(x-CX)/(W*.6),hu=HUE[(k+Math.floor(t*90*U/sp)+20)%11];
    X.save();X.globalAlpha=cl(1-d)*.9;const gg=X.createLinearGradient(x-cw/2,0,x+cw/2,0);gg.addColorStop(0,hsl(hu,70,45));gg.addColorStop(1,hsl(hu+50,70,30));X.fillStyle=gg;X.beginPath();X.roundRect(x-cw/2,cy-chh/2,cw,chh,14*U);X.fill();X.strokeStyle='rgba(255,255,255,.25)';X.lineWidth=2*U;X.stroke();X.restore()}
  X.save();X.shadowColor=K.cian;X.shadowBlur=30*U;X.strokeStyle=K.cian;X.lineWidth=5*U;X.beginPath();X.roundRect(CX-cw/2-10*U,cy-chh/2-10*U,cw+20*U,chh+20*U,18*U);X.stroke();X.restore();
  X.fillStyle=K.noche;X.beginPath();X.roundRect(CX-cw/2,cy-chh/2,cw,chh,14*U);X.fill();logo(CX,cy,100*U);
  // indicador de señal arriba
  txt('UNE VISIÓN',90*U,SAFE_T+20*U,38*U,{f:'Space',w:700,c:K.cian,al:'left',ls:3});X.fillStyle=K.cian;for(let b=0;b<4;b++)X.fillRect((44+b*10)*U,SAFE_T+(30-b*8)*U,6*U,(b*8+8)*U);
  IN.forEach(([a,b,lab,big,cols],i)=>{if(t<a||t>b)return;const out=P(t,b-.22,.22);X.save();if(out>0){X.translate(0,-out*H*.3);X.globalAlpha=1-out}
    const lines=big.split('|'),o={f:'Archivo',w:900};const sz=Math.min(...lines.map(l=>fit(l,920*U,230*U,o)));const lh=sz*1.02,y0=CY-60*U-(lines.length-1)*lh/2;
    // barra de color detrás
    const bp=ex(P(t,a+.05,.45));const bh=lh*lines.length+60*U;const bgg=X.createLinearGradient(0,0,W,0);bgg.addColorStop(0,cols[0]);bgg.addColorStop(1,cols[1]);X.fillStyle=bgg;X.save();X.transform(1,0,-.18,1,0,0);X.fillRect(-40*U+ (1-bp)*-W*1.2 + y0*.18,y0-sz*.5-30*U,W+80*U,bh);X.restore();
    X.fillStyle='rgba(6,18,31,.25)';X.fillRect(0,y0-sz*.5-30*U+bh,W*bp,12*U);
    lines.forEach((l,j)=>slam(l,CX,y0+j*lh,sz,a+.2+j*.15,t,{...o,from:2,stag:.035,c:'#fff',glow:'rgba(6,18,31,.45)',gb:30*U}));
    // etiqueta
    const lp=ex(P(t,a+.45,.4));const lw=mw(lab,46*U,{f:'Space',w:700,ls:6})+60*U;X.fillStyle='#fff';X.globalAlpha*=lp;X.beginPath();X.roundRect(CX-lw/2,y0-sz*.5-130*U,lw,70*U,35*U);X.fill();txt(lab,CX,y0-sz*.5-94*U,46*U,{f:'Space',w:700,c:K.noche,ls:6});X.restore();
    // cambio entre placas tipo zapping
    if(i>0){const tr=P(t,a,.18);if(tr<1){X.save();X.globalCompositeOperation='lighter';for(let s=0;s<10;s++){X.fillStyle=`rgba(${s%2?'8,225,255':'253,174,3'},${.25*(1-tr)})`;X.fillRect((hs(s+i*7)-.5)*200*U,s*H/10,W,H/22)}X.restore()}}})}
SCENE(19,{dur:30,draw(t){
  // ===== sala con TV (0 – 15.6) =====
  if(t<15.6){const push=eio(P(t,14.0,1.55));const zk=1+push*2.75,ty=lerp(TY,CY,push);
    let idx=0;for(const z of ZAP)if(t>=z)idx++;
    const amb=idx>=NS?'8,225,255':`${Math.round(128+127*Math.cos(HUE[idx%11]*Math.PI/180))},${Math.round(128+127*Math.cos((HUE[idx%11]-120)*Math.PI/180))},${Math.round(128+127*Math.cos((HUE[idx%11]+120)*Math.PI/180))}`;
    const on=P(t,.4,.5);
    let sh=shake(t,10.4,18);ZAP.forEach(z=>{const s=shake(t,z,4);sh=[sh[0]+s[0],sh[1]+s[1]]});
    X.save();X.translate(CX+sh[0],ty+sh[1]);X.scale(zk,zk);X.translate(-CX,-TY);
    // pared y luz ambiental
    const wg=X.createLinearGradient(0,0,0,H);wg.addColorStop(0,'#05070c');wg.addColorStop(.62,'#0b1220');wg.addColorStop(.64,'#06080d');wg.addColorStop(1,'#020305');X.fillStyle=wg;X.fillRect(-W,-H,W*3,H*3);
    if(on>0){X.save();X.globalCompositeOperation='lighter';const ag=X.createRadialGradient(TX,TY,100*U,TX,TY,900*U);ag.addColorStop(0,`rgba(${amb},${.35*on})`);ag.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=ag;X.fillRect(TX-900*U,TY-900*U,1800*U,1800*U);
      X.save();X.translate(TX,1250*U);X.scale(1,.2);const fg=X.createRadialGradient(0,0,0,0,0,640*U);fg.addColorStop(0,`rgba(${amb},${.3*on})`);fg.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=fg;X.fillRect(-640*U,-640*U,1280*U,1280*U);X.restore();X.restore()}
    // mueble
    X.fillStyle='#0d1119';X.beginPath();X.roundRect(CX-430*U,1215*U,860*U,70*U,10*U);X.fill();X.fillStyle='rgba(255,255,255,.05)';X.fillRect(CX-430*U,1215*U,860*U,3*U);
    X.fillStyle='#111722';X.fillRect(CX-60*U,TY+SH/2+10*U,120*U,1215*U-(TY+SH/2+10*U));X.fillRect(CX-160*U,1205*U,320*U,12*U);
    // TV
    X.fillStyle='#0a0c10';X.beginPath();X.roundRect(TX-SW/2-14*U,TY-SH/2-14*U,SW+28*U,SH+28*U,16*U);X.fill();X.strokeStyle='rgba(255,255,255,.12)';X.lineWidth=2*U;X.stroke();
    const sx=TX-SW/2,sy=TY-SH/2;X.fillStyle='#000';X.fillRect(sx,sy,SW,SH);
    if(t>=.4){if(t<.95){const p=P(t,.4,.5);const lh=Math.max(4*U,SH*ex(cl((p-.3)/.7)));const lw=SW*ex(cl(p/.35));X.fillStyle='#fff';X.fillRect(TX-lw/2,TY-lh/2,lw,lh)}
      else{s19_screenTo(sx,sy,SW,SH,t);const fl=1-P(t,.95,.35);if(fl>0){X.fillStyle=`rgba(255,255,255,${fl})`;X.fillRect(sx,sy,SW,SH)}}
      // reflejo del vidrio
      X.save();X.beginPath();X.rect(sx,sy,SW,SH);X.clip();const rg=X.createLinearGradient(sx,sy,sx+SW*.6,sy+SH);rg.addColorStop(0,'rgba(255,255,255,.10)');rg.addColorStop(.4,'rgba(255,255,255,0)');X.fillStyle=rg;X.fillRect(sx,sy,SW,SH);X.restore()}
    X.fillStyle=t>.4?`rgba(${amb},.9)`:'#a00';X.beginPath();X.arc(TX,TY+SH/2+7*U,3*U,0,7);X.fill();
    X.restore();
    // control remoto (abajo, decorativo)
    const rp=ex(P(t,.8,.6))*(1-ss(P(t,13.6,.5)));if(rp>0){X.save();X.translate(860*U,1880*U+(1-rp)*300*U);X.rotate(-.42);X.fillStyle='#151a24';X.beginPath();X.roundRect(-70*U,-260*U,140*U,560*U,60*U);X.fill();X.strokeStyle='rgba(255,255,255,.12)';X.lineWidth=2*U;X.stroke();
      const pr=ZAP.some(z=>t>=z-.08&&t<z+.12);X.fillStyle=pr?K.cian:'#2a3242';X.beginPath();X.arc(0,-150*U,34*U,0,7);X.fill();if(pr){X.save();X.shadowColor=K.cian;X.shadowBlur=30*U;X.fill();X.restore()}
      X.fillStyle='#2a3242';for(let r=0;r<3;r++)for(let c=-1;c<=1;c++){X.beginPath();X.arc(c*38*U,(-60+r*44)*U,13*U,0,7);X.fill()}X.restore()}
    // textos bajo el TV
    X.save();X.globalAlpha=1-push;TXT.forEach(([a,b,l1,l2])=>s19_lines(t,a,b,l1,l2,1360*U));X.restore();
    // aviso tipo menú en zapping rápido
    if(t>5.45&&t<10.4){const k=win(t,5.5,10.4,.2,.2);txt('BUSCANDO SEÑAL',CX,380*U,44*U,{f:'Space',w:700,c:'#fff',a:k*(.6+.4*Math.sin(t*12)),ls:8})}
    if(t>=10.4&&t<14){const k=bk(P(t,10.45,.4));X.save();X.translate(CX,380*U);X.scale(k,k);X.fillStyle=K.cian;X.beginPath();X.roundRect(-210*U,-40*U,420*U,80*U,40*U);X.fill();txt('UNE VISIÓN',0,3*U,44*U,{f:'Space',w:700,c:K.noche,ls:4});X.restore()}
    flash(t,10.4,.45,.35,'200,245,255');
  }
  // ===== dentro de la pantalla (15.5 – 30) =====
  if(t>=15.5){const k=P(t,15.5,.25);X.save();X.globalAlpha=k;s19_inside(t);X.restore();flash(t,15.5,.8,.4,'210,245,255');}
  // ===== cierre =====
  if(t>=26.1){const p=P(t,26.1,.9),ly=760*U;X.save();X.globalAlpha=ex(P(t,26.1,.3));const g=X.createLinearGradient(0,0,0,H);g.addColorStop(0,K.noche);g.addColorStop(1,'#0a2846');X.fillStyle=g;X.fillRect(0,0,W,H);
    X.globalCompositeOperation='lighter';const gl=X.createRadialGradient(CX,ly,0,CX,ly,620*U);gl.addColorStop(0,'rgba(8,225,255,.25)');gl.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=gl;X.fillRect(0,0,W,H);X.restore();
    // marco de TV que se abre alrededor del logo
    const fp=ex(P(t,26.1,.7));X.save();X.strokeStyle=`rgba(8,225,255,${.7*(1-P(t,27.6,.6))})`;X.lineWidth=6*U;const fw=lerp(300,960,fp)*U,fh=fw*9/16;X.beginPath();X.roundRect(CX-fw/2,ly-fh/2,fw,fh,18*U);X.stroke();X.restore();
    logo3D(CX,ly,660*U*(.6+.4*bk(p,1.5)),(1-ex(p))*-1.4,{glow:'rgba(8,225,255,.6)',shine:P(t,27.1,1.0),a:cl(p*3)});
    const o={f:'Archivo',w:900},es=fit('CRECE CADA DÍA',900*U,92*U,o);
    rise('EL CANAL QUE',CX,1170*U,es,26.8,t,{...o,c:'#fff'});rise('CRECE CADA DÍA',CX,1275*U,es,26.95,t,{...o,grad:['#FFE7A8',K.ambar]});
    const up=ex(P(t,27.5,.5));txt('/UNEVISION',CX,1400*U,58*U,{f:'Space',w:700,c:K.cian,a:up,ls:6+(1-up)*24});
    flash(t,26.1,.6,.35,'200,245,255')}
  vineta(.4);
},
events:[['pop',0.4],['golpe',0.95],['swipe',3.0],['swipe',4.25],['swipe',5.45],['swipe',6.55],['swipe',7.45],['swipe',8.2],['swipe',8.8],['swipe',9.3],['swipe',9.7],['swipe',10.05],['riser',9.4],['golpe',10.4],['campana',10.5],
  ['whoosh_largo',14.0],['golpe',15.5],['swipe',18.3],['golpe',18.5],['swipe',20.95],['golpe',21.15],['swipe',23.6],['golpe',23.8],['riser',25.1],['golpe',26.1],['campana',27.1],['pop',26.8],['pop',27.5]],
musica:{estilo:'synth',bpm:115,tono:'Gm',hits:[0.95,10.4,15.5,21.15,26.1],final:26.1}});
})();
