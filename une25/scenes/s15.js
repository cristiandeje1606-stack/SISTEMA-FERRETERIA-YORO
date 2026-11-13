// escena 15 · GESTOS (redes + TV, 20 s) — trap 140 F#m
(()=>{
const D=20,BT=60/140;
const s15_rr=(x,y,w,h,r)=>{X.beginPath();X.roundRect(x,y,w,h,r)};
const FA={f:'Archivo',w:900,st:'expanded'},FAc={f:'Archivo',w:900,st:'condensed'};
const LBY=L(120,330);    // altura de la etiqueta del gesto
function s15_bg(t){X.fillStyle='#030609';X.fillRect(0,0,W,H);
  const b=Math.pow(1-((t%BT)/BT),4)*.5;
  X.save();X.globalCompositeOperation='lighter';
  let g=X.createRadialGradient(0,H,10,0,H,Math.max(W,H)*.9);g.addColorStop(0,`rgba(227,23,62,${.32+b*.15})`);g.addColorStop(1,'rgba(227,23,62,0)');X.fillStyle=g;X.fillRect(0,0,W,H);
  g=X.createRadialGradient(W,0,10,W,0,Math.max(W,H)*.9);g.addColorStop(0,`rgba(8,225,255,${.22+b*.1})`);g.addColorStop(1,'rgba(8,225,255,0)');X.fillStyle=g;X.fillRect(0,0,W,H);X.restore();
  // chevrones de fondo
  X.save();X.strokeStyle='rgba(255,255,255,.035)';X.lineWidth=26;X.lineCap='square';const st=220;const oy=(t*120)%st;
  for(let y=-st+H-oy+st;y>-st;y-=st){X.beginPath();X.moveTo(CX-W*.6,y+W*.3);X.lineTo(CX,y);X.lineTo(CX+W*.6,y+W*.3);X.stroke()}X.restore()}
// dedo de neón (contorno) con la punta en (x,y)
function s15_hand(x,y,s,a=1,press=0){if(a<=0)return;X.save();X.globalAlpha*=a;X.translate(x,y);X.scale(s*(1-press*.06),s*(1-press*.06));X.rotate(-.28);
  X.lineJoin='round';X.strokeStyle='#fff';X.lineWidth=7;X.shadowColor=K.cian;X.shadowBlur=26;X.fillStyle='rgba(3,6,9,.85)';
  const parts=()=>{s15_rr(-40,150,200,215,72);s15_rr(24,128,52,104,26);s15_rr(74,138,52,104,26);s15_rr(124,152,52,104,26)};
  X.beginPath();X.roundRect(-40,150,200,215,72);X.fill();X.stroke();[[24,128],[74,138],[124,152]].forEach(([a,b])=>{s15_rr(a,b,52,104,26);X.fill();X.stroke()});
  X.save();X.translate(-36,250);X.rotate(-.75);s15_rr(-30,-60,60,130,30);X.fill();X.stroke();X.restore();s15_rr(-31,0,62,250,31);X.fill();X.stroke();X.restore()}
// marca de toque
function s15_touch(x,y,k,col='255,255,255'){if(k<=0)return;X.save();X.fillStyle=`rgba(${col},${.22*k})`;X.beginPath();X.arc(x,y,62*k,0,7);X.fill();X.strokeStyle=`rgba(${col},${.9*k})`;X.lineWidth=5;X.beginPath();X.arc(x,y,62*k,0,7);X.stroke();X.restore()}
function s15_ripple(x,y,t,t0,col='8,225,255',r=420){for(let i=0;i<3;i++){const q=P(t,t0+i*.08,.7);if(q>0&&q<1){X.strokeStyle=`rgba(${col},${1-q})`;X.lineWidth=12*(1-q)+2;X.beginPath();X.arc(x,y,40+ex(q)*r,0,7);X.stroke()}}}
// etiqueta del gesto
function s15_label(s,t0,t1,t,col=K.cian){const a=1-ss(P(t,t1-.25,.25));if(t<t0||a<=0)return;const sz=fit(s,L(1200,940),L(70,66),FA);const p=ex(P(t,t0,.4));const w=(mw(s,sz,FA)+80)*p;
  X.save();X.globalAlpha*=a;X.strokeStyle=col;X.lineWidth=4;X.fillStyle='rgba(3,6,9,.6)';s15_rr(CX-w/2,LBY-sz*.85,w,sz*1.7,sz*.85);X.fill();X.stroke();
  X.beginPath();X.rect(CX-w/2,LBY-sz,w,sz*2);X.clip();txt(s,CX,LBY+2,sz,{...FA,c:'#fff',ls:4});X.restore()}
// tarjetas para deslizar
const s15_CARDS=[['NOTICIAS',K.rojo,'#5a0010','play'],['NUESTRA GENTE',K.azul,'#0b2a66','heart'],['TU CANAL',K.ambar,'#7a4500','tv']];
function s15_card(i,x,y,w,h,tilt,t){const[s,c1,c2,ic]=s15_CARDS[i];X.save();X.translate(x,y);X.rotate(tilt*.12);X.transform(1,0,tilt*-.1,1,0,0);
  X.shadowColor='rgba(0,0,0,.6)';X.shadowBlur=60;X.shadowOffsetY=30;const g=X.createLinearGradient(-w/2,-h/2,w/2,h/2);g.addColorStop(0,c1);g.addColorStop(1,c2);X.fillStyle=g;s15_rr(-w/2,-h/2,w,h,48);X.fill();X.shadowColor='transparent';
  X.save();X.clip();X.globalAlpha=.16;X.strokeStyle='#fff';X.lineWidth=40;for(let k=-4;k<6;k++){X.beginPath();X.moveTo(-w/2+k*170+((t*60)%170),-h/2-20);X.lineTo(-w/2+k*170-300+((t*60)%170),h/2+20);X.stroke()}X.restore();
  X.lineWidth=4;X.strokeStyle='rgba(255,255,255,.4)';s15_rr(-w/2,-h/2,w,h,48);X.stroke();
  const iy=TV?-h*.16:-h*.18,is=TV?h*.32:w*.3;X.fillStyle='rgba(255,255,255,.95)';
  if(ic==='play'){X.beginPath();X.moveTo(-is*.35,iy-is*.45);X.lineTo(is*.5,iy);X.lineTo(-is*.35,iy+is*.45);X.closePath();X.fill()}
  else if(ic==='heart'){const k=is/2;X.beginPath();X.moveTo(0,iy+k*.85);X.bezierCurveTo(-k*1.55,iy-k*.15,-k*.85,iy-k*1.25,0,iy-k*.45);X.bezierCurveTo(k*.85,iy-k*1.25,k*1.55,iy-k*.15,0,iy+k*.85);X.fill()}
  else{s15_rr(-is*.6,iy-is*.38,is*1.2,is*.8,is*.12);X.fill();X.strokeStyle='#fff';X.lineWidth=is*.06;X.lineCap='round';X.beginPath();X.moveTo(-is*.15,iy-is*.4);X.lineTo(-is*.35,iy-is*.65);X.moveTo(is*.15,iy-is*.4);X.lineTo(is*.38,iy-is*.68);X.stroke();X.fillStyle=c2;s15_rr(-is*.48,iy-is*.27,is*.96,is*.58,is*.08);X.fill()}
  const lines=s.split(' ');const sz=Math.min(...lines.map(l=>fit(l,w-90,TV?130:150,FA)));lines.forEach((l,k)=>txt(l,0,(TV?h*.26:h*.22)+(k-(lines.length-1)/2)*sz*1.05,sz,FA));
  X.restore()}
function s15_heart(x,y,s){const k=s/2;X.beginPath();X.moveTo(x,y+k*.85);X.bezierCurveTo(x-k*1.55,y-k*.15,x-k*.85,y-k*1.25,x,y-k*.45);X.bezierCurveTo(x+k*.85,y-k*1.25,x+k*1.55,y-k*.15,x,y+k*.85);X.closePath()}
function s15_share(x,y,s,rot){const k=s/2;X.save();X.translate(x,y);X.rotate(rot);X.beginPath();X.moveTo(-k*.85,k*.75);X.bezierCurveTo(-k*.85,-k*.05,-k*.4,-k*.32,k*.05,-k*.32);X.lineTo(k*.05,-k*.75);X.lineTo(k*.9,-k*.05);X.lineTo(k*.05,k*.65);X.lineTo(k*.05,k*.22);X.bezierCurveTo(-k*.35,k*.2,-k*.65,k*.35,-k*.85,k*.75);X.closePath();X.fill();X.restore()}
// texto con estela de movimiento (desplazamiento dx)
function s15_ghost(s,x,y,sz,dx,dy,o){const n=6;for(let i=n;i>=0;i--){const k=i/n;txt(s,x+dx*k*.35,y+dy*k*.35,sz,{...o,a:(i?.12:1)})}}
SCENE(15,{dur:D,draw(t){
  let[sx,sy]=[0,0];[[.35,30],[2.35,14],[6.62,18],[6.88,26],[11.2,34],[14.45,22],[15.6,30]].forEach(([a,k])=>{const[x,y]=shake(t,a,k);sx+=x;sy+=y});
  // vibración de carga al mantener
  if(t>9.75&&t<11.2){const k=P(t,9.75,1.45)*7;sx+=Math.sin(t*90)*k;sy+=Math.cos(t*77)*k}
  s15_bg(t);X.save();X.translate(sx,sy);
  // ===== 0 · gancho /UNEVISION gigante + deslizar =====
  if(t<2.5){const sz=fit('/UNEVISION',W*.92,L(300,240),FA);const sw=eio(P(t,1.55,.6));const dx=-sw*W*1.3;
    X.save();X.translate(CX,CY);const k=lerp(1.8,1,ex(P(t,.15,.35)));X.scale(k,k);X.translate(-CX,-CY);X.globalAlpha=cl(P(t,.15,.15));
    if(!TV){[['/UNE',-1],['VISION',1]].forEach(([s,d],i)=>{const z=fit('VISION',W*.92,330,FA);s15_ghost(s,CX+dx*(1+i*.15),CY+(d)*z*.55,z,sw>0?W*.5:0,0,{...FA,c:i?K.cian:'#fff',glow:i?'rgba(8,225,255,.6)':null,gb:40})})}
    else s15_ghost('/UNEVISION',CX+dx,CY,sz,sw>0?W*.5:0,0,{...FA,c:'#fff',glow:'rgba(8,225,255,.5)',gb:40});
    X.restore();
    const r=ex(P(t,.4,.6));X.fillStyle=K.rojo;X.fillRect(CX-W*.4*r,CY+L(190,400),W*.8*r,14);
    txt('DESLIZA',CX,CY+L(270,500),L(64,64),{...FA,c:'rgba(255,255,255,.75)',ls:14,a:cl(P(t,.6,.3))*(1-sw)});
    // dedo
    const hp=ex(P(t,.9,.5));const hx=lerp(W+200,W*.78,hp)-sw*W*.55,hy=CY+L(60,80);s15_touch(hx,hy,t>1.3&&t<2.15?1:0);s15_hand(hx,hy,L(.8,.95),hp*(1-ss(P(t,2.1,.3))),t>1.3&&t<2.15?1:0)}
  // ===== 1 · deslizar tarjetas (2.3–5.9) =====
  if(t>=2.3&&t<6.0){s15_label('DESLIZA',2.35,5.9,t);const cw=L(1100,860),ch=L(640,1000),cy=L(CY+60,CY+60),gap=cw+L(120,90);
    const sws=[3.05,4.45];let pos=0;sws.forEach((a,i)=>{pos+=ex(P(t,a,.5))+(i<2?0:0)});const shift=pos;
    const vel=sws.reduce((m,a)=>m+Math.max(0,1-Math.abs(t-a-.15)/.3),0);
    const ent=bk(P(t,2.3,.5),1.4),out=eio(P(t,5.65,.35));
    for(let i=0;i<3;i++){const x=CX+(i-shift)*gap+(1-ent)*W;if(Math.abs(x-CX)>W)continue;X.save();X.globalAlpha=1-out;const k=1-out*.3;X.translate(x,cy);X.scale(k,k);X.translate(-x,-cy);s15_card(i,x,cy,cw,ch,-vel*.9,t);X.restore()}
    // dedo que arrastra
    sws.forEach(a=>{if(t>a-.35&&t<a+.65){const q=eio(P(t,a,.45));const hx=lerp(CX+L(330,260),CX-L(330,260),q),hy=cy+L(340,420);const ap=ex(P(t,a-.35,.25))*(1-ss(P(t,a+.45,.2)));
      if(t>a&&t<a+.45){X.save();X.strokeStyle='rgba(8,225,255,.6)';X.lineWidth=18;X.lineCap='round';X.beginPath();X.moveTo(CX+L(330,260),hy);X.lineTo(hx,hy);X.stroke();X.restore()}
      s15_touch(hx,hy,t>a-.05&&t<a+.5?1:0);s15_hand(hx,hy,L(.8,.95),ap,t>a&&t<a+.45?1:0)}})}
  // ===== 2 · toca dos veces (5.8–9.3) =====
  if(t>=5.8&&t<9.4){s15_label('TOCA DOS VECES',5.85,9.3,t,K.rojo);const hx=CX,hy=CY+L(40,40);const o=ss(P(t,9.05,.3));
    X.save();X.globalAlpha=1-o;
    // corazón gigante
    const hp=el(P(t,6.88,.9));if(hp>0){X.save();X.translate(hx,hy-L(20,60));X.scale(hp,hp);X.shadowColor=K.rojo;X.shadowBlur=80;const g=X.createLinearGradient(0,-250,0,250);g.addColorStop(0,'#ff4d6d');g.addColorStop(1,K.rojo);X.fillStyle=g;s15_heart(0,0,L(520,640));X.fill();
      X.shadowColor='transparent';X.fillStyle='rgba(255,255,255,.35)';X.beginPath();X.ellipse(-L(120,150),-L(110,130),L(60,70),L(32,38),-.6,0,7);X.fill();X.restore()}
    for(let i=0;i<22;i++){const q=P(t,6.88,1.4);if(q<=0||q>=1)continue;const an=i/22*Math.PI*2+hs(i)*.3,d=ex(q)*(L(420,380)+hs(i+3)*L(400,300));X.save();X.globalAlpha=(1-q);X.fillStyle=[K.rojo,'#ff4d6d','#fff',K.cian][i%4];s15_heart(hx+Math.cos(an)*d,hy+Math.sin(an)*d-q*q*200,30+hs(i+8)*50);X.fill();X.restore()}
    s15_ripple(hx,hy,t,6.62,'255,255,255',300);s15_ripple(hx,hy,t,6.88,'227,23,62',600);
    if(t>=7.2){const sz=fit('DALE ME GUSTA',L(1500,980),L(150,130),FA);slam('DALE ME GUSTA',CX,L(CY+360,CY+520),sz,7.2,t,{...FA,c:'#fff',from:2.4,stag:.03,glow:'rgba(227,23,62,.8)',gb:30})}
    // dedo: dos toques
    const ap=ex(P(t,6.0,.4))*(1-ss(P(t,6.95,.25)));const tap=[6.62,6.88].some(a=>t>a-.06&&t<a+.08)?1:0;
    s15_touch(hx,hy,[6.62,6.88].reduce((m,a)=>Math.max(m,1-Math.abs(t-a)/.12),0));s15_hand(hx+(1-ap)*400,hy+(1-ap)*500,L(.85,1),ap,tap);
    X.restore()}
  // ===== 3 · mantén presionado (9.2–12.9) =====
  if(t>=9.2&&t<12.9){s15_label('MANTÉN PRESIONADO',9.25,12.8,t,K.ambar);const hx=CX,hy=CY+L(20,0);const ch=P(t,9.75,1.45);const boom=t>=11.2;const o=ss(P(t,12.55,.3));X.save();X.globalAlpha=1-o;
    if(!boom){// carga
      const rg=X.createRadialGradient(hx,hy,10,hx,hy,L(500,520)*ch+80);rg.addColorStop(0,`rgba(253,174,3,${.5*ch})`);rg.addColorStop(1,'rgba(253,174,3,0)');X.fillStyle=rg;X.fillRect(0,0,W,H);
      X.strokeStyle='rgba(255,255,255,.15)';X.lineWidth=18;X.beginPath();X.arc(hx,hy,170,0,7);X.stroke();
      X.strokeStyle=K.ambar;X.lineCap='round';X.shadowColor=K.ambar;X.shadowBlur=30;X.beginPath();X.arc(hx,hy,170,-Math.PI/2,-Math.PI/2+Math.PI*2*ch);X.stroke();X.shadowBlur=0;
      for(let i=0;i<14;i++){const q=((t*1.6+hs(i))%1);const an=hs(i+3)*7;const d=(1-q)*L(520,480)*(.6+hs(i)*.6);X.fillStyle=`rgba(253,174,3,${q*ch})`;X.beginPath();X.arc(hx+Math.cos(an)*d,hy+Math.sin(an)*d,5+hs(i+1)*6,0,7);X.fill()}
      s15_touch(hx,hy,t>9.75?1:0,'253,174,3');const ap=ex(P(t,9.35,.4));s15_hand(hx+(1-ap)*500,hy+(1-ap)*400,L(.85,1),ap,t>9.75?1:0)}
    else{// explosión de compartir
      X.fillStyle=K.ambar;for(let i=0;i<12;i++){const q=P(t,11.2,1.2);const an=i/12*Math.PI*2,d=ex(q)*L(620,460);X.save();X.globalAlpha=1-ss(cl((q-.5)/.5));X.fillStyle=i%2?K.ambar:'#fff';s15_share(hx+Math.cos(an)*d,hy+Math.sin(an)*d,L(110,120),an);X.restore()}
      s15_ripple(hx,hy,t,11.2,'253,174,3',900);
      const sz=fit('COMPARTE',L(1500,980),L(260,220),FA);slam('COMPARTE',CX,hy,sz,11.22,t,{...FA,c:'#fff',from:3,stag:.035,glow:'rgba(253,174,3,.8)',gb:40});
      rise('LO QUE PASA AQUÍ',CX,hy+L(200,220),L(70,64),11.6,t,{...FAc,c:K.ambar,ls:6})}
    X.restore()}
  // ===== 4 · desliza hacia arriba (12.8–15.6) =====
  if(t>=12.8&&t<15.7){s15_label('DESLIZA HACIA ARRIBA',12.85,14.5,t,K.cian);const up=eio(P(t,14.0,.5));X.save();X.translate(0,-up*H);
    // chevrones que suben
    for(let i=0;i<3;i++){const q=((t*1.4+i/3)%1);const y=CY+L(330,520)-q*L(260,360);X.strokeStyle=`rgba(8,225,255,${Math.sin(q*Math.PI)})`;X.lineWidth=16;X.lineCap='round';X.lineJoin='round';X.beginPath();X.moveTo(CX-80,y+50);X.lineTo(CX,y-20);X.lineTo(CX+80,y+50);X.stroke()}
    const sz=fit('SÍGUENOS',L(1400,960),L(240,210),FA);slam('SÍGUENOS',CX,CY-L(60,120),sz,12.95,t,{...FA,c:'#fff',from:2.4,stag:.04,glow:'rgba(8,225,255,.6)',gb:30});
    X.restore();
    // /UNEVISION gigante que sube desde abajo
    if(t>=14.0){X.save();X.translate(0,(1-up)*H);const o=ss(P(t,15.35,.3));X.globalAlpha=1-o;
      if(TV){const z=fit('/UNEVISION',W*.94,330,FA);txt('/UNEVISION',CX,CY,z,{...FA,c:K.cian,glow:'rgba(8,225,255,.7)',gb:50})}
      else{const z=fit('VISION',W*.92,330,FA);txt('/UNE',CX,CY-z*.55,z,{...FA,c:'#fff'});txt('VISION',CX,CY+z*.55,z,{...FA,c:K.cian,glow:'rgba(8,225,255,.7)',gb:50})}X.restore()}
    // dedo que sube
    const a=14.0;if(t>a-.4&&t<a+.7){const q=eio(P(t,a,.5));const hx=CX+L(260,180),hy=lerp(CY+L(350,560),CY-L(250,420),q);s15_touch(hx,hy,t>a-.05&&t<a+.5?1:0);s15_hand(hx,hy,L(.8,.95),ex(P(t,a-.4,.25))*(1-ss(P(t,a+.45,.2))),t>a&&t<a+.5?1:0);
      if(t>a&&t<a+.5){X.save();X.strokeStyle='rgba(8,225,255,.5)';X.lineWidth=18;X.lineCap='round';X.beginPath();X.moveTo(hx,CY+L(350,560));X.lineTo(hx,hy);X.stroke();X.restore()}}}
  X.restore();
  flash(t,.35,.4,.25);flash(t,6.88,.45,.3,'227,23,62');flash(t,11.2,.8,.4,'253,174,3');flash(t,15.6,1,.45);
  streak(t,2.3,L(200,500),'227,23,62',-1);streak(t,5.75,L(900,1500),'8,225,255',1);streak(t,9.15,L(300,700),'253,174,3',-1);
  // ===== 5 · cierre =====
  if(t>=15.55){const p=P(t,15.6,1);const lx=CX,ly=L(400,760);const[a1,a2]=shake(t,15.6,26);X.save();X.translate(a1,a2);
    const rg=X.createRadialGradient(lx,ly,10,lx,ly,700);rg.addColorStop(0,'rgba(8,225,255,.25)');rg.addColorStop(1,'rgba(8,225,255,0)');X.fillStyle=rg;X.fillRect(0,0,W,H);
    // anillo de toque detrás del logo
    s15_ripple(lx,ly,t,15.6,'8,225,255',700);
    logo3D(lx,ly+(1-ex(p))*L(300,500),L(480,600)*lerp(.6,1,bk(p,1.5)),lerp(-.9,0,ex(P(t,15.6,1)))+.05*Math.sin(t*2)*ss(P(t,16.6,.4)),{depth:22,shine:P(t,16.4,1),glow:'rgba(8,225,255,.45)'});
    const z=fit('/UNEVISION',L(1500,980),L(170,150),FA);slam('/UNEVISION',CX,L(790,1180),z,16.3,t,{...FA,c:K.cian,from:2.2,stag:.035,glow:'rgba(8,225,255,.6)',gb:30});
    const r=ex(P(t,16.8,.5));X.fillStyle=K.rojo;X.fillRect(CX-L(500,420)*r,L(890,1290),L(1000,840)*r,12);
    if(TV)rise('SÍGUENOS · EL CANAL QUE CRECE CADA DÍA',CX,965,fit('SÍGUENOS · EL CANAL QUE CRECE CADA DÍA',1500,62,FAc),17.0,t,{...FAc,c:'#fff',ls:4});
    else{rise('SÍGUENOS',CX,1380,96,17.0,t,{...FAc,c:'#fff',ls:10});rise('EL CANAL QUE CRECE CADA DÍA',CX,1475,fit('EL CANAL QUE CRECE CADA DÍA',960,58,FAc),17.2,t,{...FAc,c:K.ambar,ls:3})}
    X.restore()}
},events:[['golpe',.35],['riser',.6],['swipe',1.55],['whoosh',1.6],['golpe',2.35],['swipe',3.05],['swipe',4.45],['whoosh',5.7],['pop',6.62],['golpe',6.88],['golpe',7.2],['whoosh',9.15],['riser',10.2],['golpe',11.2],['pop',11.6],['whoosh',12.8],['golpe',12.95],['whoosh_largo',14.0],['riser',14.6],['golpe',15.6],['golpe',16.3],['obturador',17.0]],
musica:{estilo:'trap',bpm:140,tono:'F#m',hits:[.35,2.35,6.88,11.2,12.95,15.6,16.3],final:15.6}});
})();
