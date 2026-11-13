// escena 11 · CELULAR 3D (promo de redes 9:16, 20 s) — pop 118 G
(()=>{
const D=20;
const s11_rr=(x,y,w,h,r)=>{X.beginPath();X.roundRect(x,y,w,h,r)};
const F={f:'Fig',w:800,st:'normal'};
// ---------- íconos ----------
function s11_heart(x,y,s){const k=s/2;X.beginPath();X.moveTo(x,y+k*.85);X.bezierCurveTo(x-k*1.55,y-k*.15,x-k*.85,y-k*1.25,x,y-k*.45);X.bezierCurveTo(x+k*.85,y-k*1.25,x+k*1.55,y-k*.15,x,y+k*.85);X.closePath()}
function s11_bell(x,y,s,col){const k=s/2;X.save();X.fillStyle=col;X.beginPath();X.moveTo(x-k*.8,y+k*.42);X.quadraticCurveTo(x-k*.58,y+k*.25,x-k*.58,y-k*.12);X.bezierCurveTo(x-k*.58,y-k*.8,x+k*.58,y-k*.8,x+k*.58,y-k*.12);X.quadraticCurveTo(x+k*.58,y+k*.25,x+k*.8,y+k*.42);X.closePath();X.fill();
  X.beginPath();X.arc(x,y+k*.6,k*.17,0,7);X.fill();X.beginPath();X.arc(x,y-k*.78,k*.1,0,7);X.fill();X.restore()}
function s11_check(x,y,s,col,w){X.save();X.strokeStyle=col;X.lineWidth=w;X.lineCap='round';X.lineJoin='round';X.beginPath();X.moveTo(x-s*.5,y);X.lineTo(x-s*.12,y+s*.38);X.lineTo(x+s*.55,y-s*.4);X.stroke();X.restore()}
function s11_share(x,y,s,col){const k=s/2;X.save();X.strokeStyle=col;X.fillStyle=col;X.lineWidth=k*.28;X.lineCap='round';X.beginPath();X.moveTo(x-k*.75,y+k*.65);X.quadraticCurveTo(x-k*.7,y-k*.15,x+k*.15,y-k*.15);X.stroke();
  X.beginPath();X.moveTo(x+k*.1,y-k*.7);X.lineTo(x+k*.85,y-k*.15);X.lineTo(x+k*.1,y+k*.4);X.closePath();X.fill();X.restore()}
function s11_comment(x,y,s,col){const k=s/2;X.save();X.fillStyle=col;s11_rr(x-k*.85,y-k*.7,k*1.7,k*1.15,k*.4);X.fill();X.beginPath();X.moveTo(x-k*.4,y+k*.4);X.lineTo(x-k*.55,y+k*.85);X.lineTo(x+k*.05,y+k*.4);X.fill();X.restore()}
// ---------- mano estilizada (ícono) con la punta del índice en (fx,fy) ----------
function s11_hand(fx,fy,s,a=1){X.save();X.globalAlpha*=a;X.translate(fx,fy);X.scale(s,s);X.rotate(-.32);
  X.shadowColor='rgba(0,0,0,.45)';X.shadowBlur=40;X.shadowOffsetY=18;
  X.fillStyle='#F7F9FC';X.strokeStyle='#0B2238';X.lineWidth=6;X.lineJoin='round';
  s11_rr(-40,150,200,215,72);X.fill();X.shadowColor='transparent';X.stroke();
  [[24,128],[74,138],[124,152]].forEach(([x,y])=>{s11_rr(x,y,52,104,26);X.fill();X.stroke()});
  X.save();X.translate(-36,250);X.rotate(-.75);s11_rr(-30,-60,60,130,30);X.fill();X.stroke();X.restore();
  s11_rr(-31,0,62,250,31);X.fill();X.stroke();
  X.strokeStyle='rgba(11,34,56,.25)';X.lineWidth=4;X.beginPath();X.moveTo(-14,60);X.lineTo(14,60);X.stroke();
  X.restore()}
// ---------- pantallas del celular ----------
const s11_POSTS=[['NOTICIAS',K.brasa,K.ambar],['NUESTRA GENTE',K.azul,K.cian],['SANTA BÁRBARA',K.naranja,K.rojo],['LO QUE PASA AQUÍ','#163a66',K.azul],['NUESTRA TIERRA',K.ambar,K.naranja],['CADA DÍA',K.rojo,K.brasa]];
function s11_screenFeed(t,sw,sh,scroll,follow){const top=-sh/2;
  X.fillStyle='#08111F';X.fillRect(-sw/2,-sh/2,sw,sh);
  // barra de estado (sin hora)
  X.fillStyle='#fff';for(let i=0;i<4;i++)X.fillRect(sw/2-150+i*14,top+44-i*6,9,10+i*6);s11_rr(sw/2-80,top+30,46,22,6);X.lineWidth=3;X.strokeStyle='#fff';X.stroke();X.fillRect(sw/2-76,top+34,30,14);
  // cabecera de perfil
  const ax=-sw/2+108,ay=top+175;const g=X.createLinearGradient(ax-80,ay-80,ax+80,ay+80);g.addColorStop(0,K.cian);g.addColorStop(.5,K.ambar);g.addColorStop(1,K.brasa);
  X.save();X.translate(ax,ay);X.rotate(t*.8);X.fillStyle=g;X.beginPath();X.arc(0,0,84,0,7);X.fill();X.restore();
  X.fillStyle='#08111F';X.beginPath();X.arc(ax,ay,74,0,7);X.fill();X.fillStyle=K.marino;X.beginPath();X.arc(ax,ay,68,0,7);X.fill();logo(ax,ay-4,92);
  txt('UNE VISIÓN',-sw/2+214,top+148,46,{...F,al:'left'});txt('/UNEVISION',-sw/2+214,top+200,32,{...F,w:700,al:'left',c:K.cian});
  // botón SEGUIR
  const by=top+330,bh=88;
  if(follow<=0){const bg=X.createLinearGradient(-sw/2,0,sw/2,0);bg.addColorStop(0,K.cian);bg.addColorStop(1,K.azul);X.fillStyle=bg;s11_rr(-sw/2+40,by-bh/2,sw-80,bh,44);X.fill();txt('SEGUIR',0,by+2,42,{...F,c:K.noche,ls:3})}
  else{X.fillStyle=`rgba(253,174,3,${.18+.2*(1-follow)})`;s11_rr(-sw/2+40,by-bh/2,sw-80,bh,44);X.fill();X.lineWidth=4;X.strokeStyle=K.ambar;X.stroke();
    const m=mw('SIGUIENDO',40,F);txt('SIGUIENDO',22,by+2,40,{...F,c:K.ambar,ls:2});s11_check(22-m/2-40,by,34,K.ambar,7)}
  X.fillStyle='rgba(255,255,255,.12)';X.fillRect(-sw/2,top+410,sw,2);X.fillStyle=K.cian;X.fillRect(-sw/2+40,top+406,150,6);
  // feed
  X.save();X.beginPath();X.rect(-sw/2,top+418,sw,sh-418);X.clip();
  const ph=470;for(let i=0;i<s11_POSTS.length;i++){const y0=top+440+i*(ph+26)-scroll;if(y0>sh/2||y0+ph<top+418)continue;const[wd,c1,c2]=s11_POSTS[i];
    const pg=X.createLinearGradient(-sw/2,y0,sw/2,y0+ph);pg.addColorStop(0,c1);pg.addColorStop(1,c2);X.fillStyle=pg;s11_rr(-sw/2+24,y0,sw-48,ph-110,26);X.fill();
    X.save();X.clip();X.globalAlpha=.22;X.fillStyle='#fff';for(let j=0;j<3;j++){X.beginPath();X.arc(-sw/2+60+hs(i*7+j)*sw,y0+hs(i*5+j)*(ph-110),70+hs(i+j*3)*120,0,7);X.fill()}X.restore();
    const lines=wd.split(' ');const fs=Math.min(78,fit(lines.reduce((a,b)=>a.length>b.length?a:b),sw-120,78,F));lines.forEach((l,k)=>txt(l,0,y0+(ph-110)/2+(k-(lines.length-1)/2)*fs*1.02,fs,{...F,glow:'rgba(0,0,0,.35)',gb:16}));
    const iy=y0+ph-60;X.fillStyle='#fff';s11_heart(-sw/2+70,iy,44);X.fillStyle=K.brasa;X.fill();s11_comment(-sw/2+150,iy,44,'#fff');s11_share(-sw/2+230,iy,44,'#fff');}
  X.restore()}
function s11_screenNotif(t,sw,sh,on){const top=-sh/2;X.fillStyle='#08111F';X.fillRect(-sw/2,-sh/2,sw,sh);
  const rg=X.createRadialGradient(0,-120,10,0,-120,sw*.8);rg.addColorStop(0,`rgba(253,174,3,${.15+.25*on})`);rg.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=rg;X.fillRect(-sw/2,-sh/2,sw,sh);
  // ondas
  for(let i=0;i<3;i++){const q=((t*1.2+i/3)%1);X.strokeStyle=`rgba(253,174,3,${(1-q)*.6*on})`;X.lineWidth=6;X.beginPath();X.arc(0,-140,130+q*180,0,7);X.stroke()}
  X.save();X.translate(0,-230);X.rotate(Math.sin(t*14)*.22*(.3+on));X.translate(0,90);s11_bell(0,0,260,on>.5?K.ambar:'#fff');X.restore();
  txt('NOTIFICACIONES',0,110,fit('NOTIFICACIONES',sw-70,56,F),F);
  txt('UNE VISIÓN',0,175,34,{...F,w:700,c:'rgba(255,255,255,.7)'});
  const tw=220,th=110,ty=300;X.fillStyle=on>.5?K.cian:'rgba(255,255,255,.2)';s11_rr(-tw/2,ty-th/2,tw,th,55);X.fill();
  X.fillStyle='#fff';X.shadowColor='rgba(0,0,0,.4)';X.shadowBlur=12;X.beginPath();X.arc(-tw/2+55+(tw-110)*ss(on),ty,44,0,7);X.fill();X.shadowBlur=0;
  for(let i=0;i<2;i++){X.fillStyle='rgba(255,255,255,.08)';s11_rr(-sw/2+40,ty+110+i*90,sw-80,64,18);X.fill()}}
// ---------- celular 3D ----------
function s11_phone(t,cx,cy,sc,ang,screen){const w=560,h=1150,r=78,c=Math.cos(ang),s=Math.sin(ang),sx=Math.max(.025,Math.abs(c));
  X.save();X.translate(cx,cy);X.scale(sc,sc);
  // sombra en el piso
  X.save();X.globalAlpha=.45;const sg=X.createRadialGradient(0,h*.56,10,0,h*.56,w*.7);sg.addColorStop(0,'rgba(0,0,0,.8)');sg.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=sg;X.scale(1,.18);X.beginPath();X.arc(0,h*.56/.18,w*.7,0,7);X.fill();X.restore();
  // canto (extrusión)
  const dep=30;for(let i=dep;i>=1;i-=1.5){X.save();X.translate(s*i*1.6,0);X.scale(sx,1);X.transform(1,s*.09,0,1,0,0);X.fillStyle=i<4?'#5d7391':`rgb(${20+i},${32+i},${52+i})`;s11_rr(-w/2,-h/2,w,h,r);X.fill();X.restore()}
  X.save();X.scale(sx,1);X.transform(1,s*.09,0,1,0,0);
  if(c>=0){const fg=X.createLinearGradient(-w/2,-h/2,w/2,h/2);fg.addColorStop(0,'#2b3b52');fg.addColorStop(.5,'#0a0f18');fg.addColorStop(1,'#2b3b52');X.fillStyle=fg;s11_rr(-w/2,-h/2,w,h,r);X.fill();
    const sw=w-36,sh=h-36;X.save();s11_rr(-sw/2,-sh/2,sw,sh,r-16);X.clip();screen(sw,sh);
    // isla de cámara
    X.fillStyle='#000';s11_rr(-70,-sh/2+18,140,38,19);X.fill();
    // reflejo
    const gx=-w+((ang+1.2)/2.4)*w*2;const rg=X.createLinearGradient(gx-160,-h/2,gx+160,h/2);rg.addColorStop(0,'rgba(255,255,255,0)');rg.addColorStop(.5,'rgba(255,255,255,.13)');rg.addColorStop(1,'rgba(255,255,255,0)');X.fillStyle=rg;X.fillRect(-w/2,-h/2,w,h);
    X.restore();X.lineWidth=5;X.strokeStyle='rgba(160,190,230,.55)';s11_rr(-w/2+2,-h/2+2,w-4,h-4,r);X.stroke()}
  else{const bgr=X.createLinearGradient(-w/2,-h/2,w/2,h/2);bgr.addColorStop(0,'#173a66');bgr.addColorStop(.6,K.marino);bgr.addColorStop(1,'#061426');X.fillStyle=bgr;s11_rr(-w/2,-h/2,w,h,r);X.fill();
    X.fillStyle='#0a1626';s11_rr(w/2-230,-h/2+40,190,190,50);X.fill();[[w/2-180,-h/2+90],[w/2-90,-h/2+90],[w/2-180,-h/2+180]].forEach(([x,y])=>{X.fillStyle='#000';X.beginPath();X.arc(x,y,32,0,7);X.fill();X.strokeStyle='#2c4a70';X.lineWidth=5;X.stroke()});
    logo(0,40,300);X.lineWidth=5;X.strokeStyle='rgba(160,190,230,.5)';s11_rr(-w/2+2,-h/2+2,w-4,h-4,r);X.stroke()}
  X.fillStyle=`rgba(0,0,0,${(1-sx)*.45})`;s11_rr(-w/2,-h/2,w,h,r);X.fill();X.restore();X.restore()}
// ---------- fondo pop ----------
function s11_bg(t,warm=0){const g=X.createLinearGradient(0,0,W*.3,H);g.addColorStop(0,'#0E2C5A');g.addColorStop(.55,'#0B2238');g.addColorStop(1,'#06121F');X.fillStyle=g;X.fillRect(0,0,W,H);
  X.save();X.globalCompositeOperation='lighter';const bl=[[.2,.25,K.azul,520],[.85,.4,K.cian,420],[.3,.8,warm>0?K.ambar:K.azul,560],[.8,.85,K.brasa,380]];
  bl.forEach(([x,y,c,r],i)=>{const px=W*x+Math.sin(t*.5+i*2)*120,py=H*y+Math.cos(t*.4+i)*140;const rg=X.createRadialGradient(px,py,0,px,py,r);rg.addColorStop(0,c+'55');rg.addColorStop(1,c+'00');X.fillStyle=rg;X.fillRect(0,0,W,H)});X.restore();
  // anillos pop concéntricos
  X.save();X.globalAlpha=.08;X.strokeStyle='#fff';X.lineWidth=2;for(let i=0;i<9;i++){X.beginPath();X.arc(CX,CY,(i*170+t*60)%1530,0,7);X.stroke()}X.restore()}
// notificación tipo banner
function s11_banner(x,y,w,a,rot,line){X.save();X.translate(x,y);X.rotate(rot);X.globalAlpha*=a;X.shadowColor='rgba(0,0,0,.45)';X.shadowBlur=40;X.shadowOffsetY=16;
  X.fillStyle='rgba(246,249,255,.96)';s11_rr(-w/2,-75,w,150,36);X.fill();X.shadowColor='transparent';
  X.fillStyle=K.marino;s11_rr(-w/2+22,-52,104,104,26);X.fill();logo(-w/2+74,-6,74);
  txt('UNE VISIÓN',-w/2+152,-24,36,{...F,al:'left',c:K.marino});txt(line,-w/2+152,26,34,{...F,w:700,al:'left',c:'#3a4a63'});
  X.fillStyle=K.brasa;X.beginPath();X.arc(w/2-40,-30,12,0,7);X.fill();X.restore()}
function s11_title(s,x,y,t0,t1,t,col='#fff',max=150,mxw=null){const sz=fit(s,mxw||L(980,960),max,F);const a=1-ss(P(t,t1-.3,.3));if(t<t0||a<=0)return;X.save();X.globalAlpha=a;
  slam(s,x,y,sz,t0,t,{...F,c:col,from:2.2,stag:.035,d:.38,glow:'rgba(0,0,0,.45)',gb:30});X.restore()}
// diseño según formato: TV = celular a la izquierda y textos a la derecha; vertical = apilado
const s11_PX=L(560,CX),s11_PY=L(560,1090),s11_SC=L(.74,.8),s11_TX=L(1330,CX);

SCENE(11,{dur:D,draw(t){
  let[sxk,syk]=[0,0];[[.3,16],[.75,22],[2.6,18],[9.95,26],[16.05,30]].forEach(([a,k])=>{const[x,y]=shake(t,a,k);sxk+=x;syk+=y});
  s11_bg(t,t>9.9&&t<16?1:0);
  X.save();X.translate(sxk,syk);
  // ---- 0–2.2 gancho ----
  if(t<2.3){const out=ss(P(t,1.75,.45));X.save();X.translate(CX,CY);X.scale(1+out*.6,1+out*.6);X.translate(-CX,-CY);X.globalAlpha=1-out;
    rays(CX,CY,24,'rgba(0,0,0,0)','rgba(8,225,255,.06)',t*.2);
    s11_title('¿YA NOS',CX,L(400,800),.15,9,t,'#fff',L(230,190),L(1500,960));s11_title('SIGUES?',CX,L(650,1010),.55,9,t,K.ambar,L(300,250),L(1600,960));
    X.restore()}
  // ---- celular ----
  const sc0=s11_SC;let pc=s11_PX,py=s11_PY,sc=sc0,ang=.25*Math.sin((t-2.7)*1.2),mode='feed';
  if(t<2.7){const p=P(t,1.85,.85);sc=lerp(.05,sc0,bk(p,1.3));ang=lerp(-3.4,0,ex(p));py=lerp(s11_PY+L(150,210),s11_PY,ex(p));pc=lerp(CX,s11_PX,ex(p))}
  const s11_BY=-1150/2+18+330,s11_TAPY=L(560,1000),s11_TAPX=s11_PX+30*L(1.3,1.45);
  if(t>=8.4&&t<11.6){const zi=eio(P(t,8.4,.8)),zo=eio(P(t,11.0,.6));const z=zi*(1-zo);sc=lerp(sc0,L(1.3,1.45),z);ang*=1-z;py=lerp(s11_PY,s11_TAPY-s11_BY*L(1.3,1.45),z)}
  const sc2=L(.7,.72),py2=L(570,1110);
  if(t>=11.6&&t<14.6){const sp=eio(P(t,11.6,1.0));ang=sp*Math.PI*2+.15*Math.sin((t-11.6)*1.5)*ss(P(t,12.6,.4));sc=lerp(sc0,sc2,ss(P(t,11.6,.6)));py=lerp(s11_PY,py2,ss(P(t,11.6,.6)));mode=t>12.1?'notif':'feed'}
  if(t>=14.6){const f=eio(P(t,14.6,.7));ang=lerp(.15*Math.sin(3*1.5),Math.PI,f);mode='notif';const z=Math.pow(P(t,15.2,.85),3);sc=lerp(sc2,6,z);const m=ss(P(t,15.2,.8));py=lerp(py2,CY,m);pc=lerp(s11_PX,CX,m)}
  const scroll=ex(P(t,3.2,1.2))*300+ex(P(t,4.8,1.2))*500+ex(P(t,6.4,1.2))*500+ex(P(t,7.4,.8))*-1300;
  const follow=t>=9.95?1-ex(P(t,9.95,.6)):0;const followed=t>=9.95;
  if(t>=1.85&&t<16.05){X.save();X.globalAlpha=1-ss(P(t,15.8,.25));
    s11_phone(t,pc,py,sc,ang,(sw,sh)=>mode==='feed'?s11_screenFeed(t,sw,sh,scroll,followed?Math.max(follow,.0001):0):s11_screenNotif(t,sw,sh,ex(P(t,13.0,.35))));X.restore()}
  // ---- fase A: títulos + notificaciones ----
  if(t>=2.7&&t<8.6){s11_title('TU CANAL',s11_TX,L(250,420),2.8,5.0,t,'#fff',L(190,170));s11_title('EN TU CELULAR',s11_TX,L(250,420),5.05,8.4,t,K.cian,150);
    const bn=[[3.6,'NOTICIAS · CADA DÍA',-1],[5.0,'NUESTRA GENTE, NUESTRA VOZ',1],[6.4,'LO QUE PASA AQUÍ',-1]];
    bn.forEach(([a,line,sd],i)=>{if(t<a)return;const p=bk(P(t,a,.45),1.4),o=ex(P(t,8.2,.4));const y=L(480,760)+i*L(195,230);const x=s11_TX+sd*L(40,50)+sd*o*1300;
      s11_banner(x,lerp(L(250,560),y,p),860*lerp(.6,1,p),cl(P(t,a,.15)),sd*.035*(1-p)+sd*.012,line)})}
  // ---- fase B: dedo toca SEGUIR ----
  if(t>=8.4&&t<11.6){const bx=s11_TAPX,by=s11_TAPY;const a=1-ss(P(t,11.2,.4));
    const tx2=L(1450,CX),mw2=L(760,960);if(t<9.95)s11_title('SÍGUENOS',tx2,L(CY,400),8.65,9.9,t,'#fff',L(200,190),mw2);else s11_title('¡GRACIAS!',tx2,L(CY,400),9.95,11.5,t,K.ambar,L(210,200),mw2);
    if(t>=9.95){for(let i=0;i<3;i++){const q=P(t,9.95+i*.12,.8);if(q>0&&q<1){X.strokeStyle=`rgba(253,174,3,${1-q})`;X.lineWidth=10*(1-q)+2;X.beginPath();X.arc(bx,by,60+q*480,0,7);X.stroke()}}
      for(let i=0;i<16;i++){const q=P(t,9.95,1.3);if(q<=0||q>=1)continue;const an=i/16*Math.PI*2+hs(i)*.4,d=ex(q)*(260+hs(i+4)*320);X.save();X.globalAlpha=1-q;X.translate(bx+Math.cos(an)*d,by+Math.sin(an)*d-q*q*120);X.rotate(an);X.fillStyle=[K.brasa,K.ambar,K.cian,K.rojo][i%4];s11_heart(0,0,46+hs(i+9)*40);X.fill();X.restore()}}
    const hi=ex(P(t,8.85,.75)),ho=ss(P(t,10.5,.7));const pz=1-.08*cl(1-Math.abs(t-9.98)/.16);
    const hx=lerp(bx+L(300,520),bx,hi)+ho*560,hy=lerp(H+200,by+6,hi)+ho*500;s11_hand(hx,hy,L(.85,1.05)*pz,a);
    if(t>9.8&&t<10.3){const q=1-Math.abs(t-9.98)/.2;X.fillStyle=`rgba(255,255,255,${.35*cl(q)})`;X.beginPath();X.arc(bx,by,70,0,7);X.fill()}}
  // ---- fase C: notificaciones ----
  if(t>=11.7&&t<15.2){s11_title('ACTIVA LAS',s11_TX,L(420,360),11.75,15.0,t,'#fff',L(160,140));s11_title('NOTIFICACIONES',s11_TX,L(590,505),12.0,15.0,t,K.ambar,130);
    for(let i=0;i<6;i++){const q=P(t,12.95+i*.06,.6);if(q<=0)continue;const side=i%2?1:-1;
      const x=TV?(side<0?110+hs(i)*60:s11_TX-200+i*90):CX+side*(330+hs(i)*140),y=TV?(side<0?200+i*130:790+hs(i)*90):780+i*120;const s=(70+hs(i+2)*50)*bk(q,2);
      X.save();X.globalAlpha=1-ss(P(t,14.6,.4));X.translate(x,y+Math.sin(t*3+i)*12);X.rotate(Math.sin(t*12+i)*.25);s11_bell(0,0,s,i%3?K.ambar:K.cian);X.restore()}}
  X.restore();
  flash(t,2.55,.35,.3);flash(t,9.95,.55,.35,'253,174,3');flash(t,11.62,.3,.25);flash(t,16.0,1,.5);
  streak(t,8.25,L(300,700),'8,225,255',1);streak(t,11.6,L(900,1500),'253,174,3',-1);
  // ---- cierre: logo ----
  if(t>=16){const p=P(t,16,1.0);const lx=L(620,CX),ly=L(520,820),lw=L(560,600);rays(lx,ly,28,'rgba(0,0,0,0)','rgba(253,174,3,.07)',t*.15);
    const[a1,a2]=shake(t,16.05,24);X.save();X.translate(a1,a2);
    const rg=X.createRadialGradient(lx,ly,10,lx,ly,620);rg.addColorStop(0,'rgba(8,225,255,.30)');rg.addColorStop(1,'rgba(8,225,255,0)');X.fillStyle=rg;X.fillRect(0,0,W,H);
    logo3D(lx,ly,lerp(1.6,1,ex(p))*lw,lerp(1.1,0,ex(P(t,16,1.1)))+.06*Math.sin((t-17)*1.6)*ss(P(t,17,.5)),{depth:28,shine:P(t,16.9,1.0),glow:'rgba(8,225,255,.5)'});
    const tx=L(1370,CX),mx=L(820,960);
    s11_title('EL CANAL QUE',tx,L(400,1240),16.9,30,t,'#fff',L(110,84),mx);s11_title('CRECE CADA DÍA',tx,L(520,1335),17.15,30,t,K.ambar,L(120,96),mx);
    const pp=bk(P(t,17.8,.5),1.6),pyy=L(650,1451);if(pp>0){const pw=460*pp;X.fillStyle=K.cian;s11_rr(tx-pw/2,pyy-46,pw,92,46);X.fill();if(pp>.7)txt('/UNEVISION',tx,pyy+2,52,{...F,c:K.noche,a:cl((pp-.7)/.3)})}
    X.restore()}
},events:[['golpe',.3],['golpe',.75],['whoosh_largo',1.75],['golpe',2.6],['pop',2.85],['pop',3.6],['swipe',4.3],['pop',5.0],['whoosh',5.05],['pop',6.4],['swipe',7.4],['whoosh',8.25],['pop',8.7],['swipe',8.9],['riser',8.95],['golpe',9.95],['pop',10.05],['whoosh_largo',11.6],['golpe',11.8],['campana',13.0],['pop',13.0],['whoosh',14.6],['riser',15.0],['golpe',16.0],['obturador',16.9],['pop',17.8]],
musica:{estilo:'pop',bpm:118,tono:'G',hits:[.3,.75,2.6,9.95,11.8,13.0,16.0],final:16.0}});
})();
