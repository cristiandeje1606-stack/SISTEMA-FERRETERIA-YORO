// escena 14 · CRECIMIENTO (redes + TV, 20 s) — funk 112 E
(()=>{
const D=20,BT=60/112;
const s14_rr=(x,y,w,h,r)=>{X.beginPath();X.roundRect(x,y,w,h,r)};
const FG={f:'BigSh',w:900,st:'normal'};
const CREMA='#F4EEE3',TINTA='#0B2238';
// ---------- piezas ----------
function s14_bgLight(t){X.fillStyle=CREMA;X.fillRect(0,0,W,H);
  X.save();X.strokeStyle='rgba(11,34,56,.06)';X.lineWidth=2;const st=90;const oy=(t*40)%st;for(let x=st/2;x<W;x+=st){X.beginPath();X.moveTo(x,0);X.lineTo(x,H);X.stroke()}for(let y=-st+oy;y<H;y+=st){X.beginPath();X.moveTo(0,y);X.lineTo(W,y);X.stroke()}X.restore();
  const g=X.createRadialGradient(W*.8,H*.15,10,W*.8,H*.15,Math.max(W,H)*.7);g.addColorStop(0,'rgba(253,174,3,.18)');g.addColorStop(1,'rgba(253,174,3,0)');X.fillStyle=g;X.fillRect(0,0,W,H)}
function s14_leaf(x,y,len,ang,col){X.save();X.translate(x,y);X.rotate(ang);X.fillStyle=col;X.beginPath();X.moveTo(0,0);X.quadraticCurveTo(len*.5,-len*.42,len,0);X.quadraticCurveTo(len*.5,len*.42,0,0);X.fill();
  X.strokeStyle='rgba(255,255,255,.45)';X.lineWidth=Math.max(1.5,len*.04);X.beginPath();X.moveTo(len*.1,0);X.lineTo(len*.85,0);X.stroke();X.restore()}
// brote geométrico: crece con p (0..1)
function s14_sprout(x,yb,h,p,seed,o={}){if(p<=0)return;const sw=(hs(seed)-.5)*h*.35,g=ex(p);const tx=x+sw*g,ty=yb-h*g,cx=x-sw*.4,cy=yb-h*g*.5;
  const lw=o.w||Math.max(6,h*.035);X.save();X.strokeStyle=o.stem||'#1f7a4c';X.lineWidth=lw;X.lineCap='round';X.beginPath();X.moveTo(x,yb);X.quadraticCurveTo(cx,cy,tx,ty);X.stroke();
  const cols=o.cols||[K.cian,K.azul,K.ambar];const nl=o.nl||4;
  for(let i=0;i<nl;i++){const k=.25+i*.6/nl;const lp=bk(cl((p-k*.6)/.35),2);if(lp<=0)continue;const u=k*g;const px=(1-u)*(1-u)*x+2*(1-u)*u*cx+u*u*tx,py=(1-u)*(1-u)*yb+2*(1-u)*u*cy+u*u*ty;
    const sd=i%2?1:-1;s14_leaf(px,py,h*.28*lp,sd>0?-.55:Math.PI+.55,cols[(i+seed)%cols.length])}
  const fp=el(cl((p-.75)/.3));if(fp>0){const r=h*.09*fp;X.fillStyle=o.flor||K.brasa;for(let i=0;i<6;i++){const a=i*Math.PI/3+seed;X.beginPath();X.arc(tx+Math.cos(a)*r,ty+Math.sin(a)*r,r*.75,0,7);X.fill()}X.fillStyle=K.ambar;X.beginPath();X.arc(tx,ty,r*.7,0,7);X.fill()}
  X.restore()}
function s14_arrow(x,y,len,w,col,col2){// flecha hacia arriba, base en (x,y)
  const g=X.createLinearGradient(0,y,0,y-len);g.addColorStop(0,col2||col);g.addColorStop(1,col);X.fillStyle=g;const hw=w*1.15,hh=w*1.1;
  X.beginPath();X.moveTo(x-w/2,y);X.lineTo(x-w/2,y-len+hh);X.lineTo(x-hw,y-len+hh);X.lineTo(x,y-len);X.lineTo(x+hw,y-len+hh);X.lineTo(x+w/2,y-len+hh);X.lineTo(x+w/2,y);X.closePath();X.fill()}
function s14_word(s,x,y,sz,t0,t,col,o={}){slam(s,x,y,sz,t0,t,{...FG,c:col,from:o.from||2.4,stag:o.stag||.04,d:.36,back:2.2,al:o.al})}
// golpe de groove (funk): pulso en cada tiempo
const s14_beat=t=>Math.pow(Math.max(0,Math.cos((t%BT)/BT*Math.PI*.5)),6);
SCENE(14,{dur:D,draw(t){
  let[sx,sy]=[0,0];[[.35,16],[.62,12],[1.15,14],[1.68,20],[2.55,14],[6.05,18],[9.3,22],[12.55,16],[16.7,26]].forEach(([a,k])=>{const[x,y]=shake(t,a,k);sx+=x;sy+=y});
  const dark=t>=16.4;
  if(!dark)s14_bgLight(t);else{const g=X.createLinearGradient(0,0,0,H);g.addColorStop(0,'#123058');g.addColorStop(1,K.noche);X.fillStyle=g;X.fillRect(0,0,W,H)}
  X.save();X.translate(sx,sy);
  const GY=L(960,1500);   // línea del suelo
  // ===== 1 · semilla + CADA DÍA MÁS (0–2.5) =====
  if(t<2.7){const o=ss(P(t,2.35,.35));X.save();X.globalAlpha=1-o;X.translate(0,-o*120);
    const spx=L(1430,CX),spy=GY;
    X.fillStyle=TINTA;X.fillRect(spx-L(260,300)*ex(P(t,.3,.4)),spy,L(520,600)*ex(P(t,.3,.4)),8);
    const sd=P(t,0,.35);if(t<.5){X.fillStyle=K.ambar;X.beginPath();X.arc(spx,lerp(-60,spy-18,sd*sd),18,0,7);X.fill()}
    s14_sprout(spx,spy,L(560,300),P(t,.4,1.5),3,{nl:6,w:12});
    const wx=L(600,CX),sz=L(280,300);
    s14_word('CADA',wx,L(240,470),sz,.5,t,TINTA);s14_word('DÍA',wx,L(510,760),sz,1.03,t,TINTA);
    s14_word('MÁS',wx,L(780,1050),sz*1.08,1.56,t,K.brasa);
    const ap=bk(P(t,1.75,.4),1.8);if(ap>0){const mx=wx+mw('MÁS',sz*1.08,FG)/2+L(70,60);s14_arrow(mx,L(870,1140)-s14_beat(t)*10,L(220,230)*ap,L(56,60),K.brasa,K.ambar)}
    X.restore()}
  // ===== 2 · barras (2.4–6.2) =====
  if(t>=2.4&&t<6.3){const out=eio(P(t,5.9,.4));X.save();
    const x0=L(880,110),x1=L(1830,970),base=L(950,1460),hmax=L(720,700);const n=7,bw=(x1-x0)/n*.7;
    X.fillStyle=TINTA;X.fillRect(x0-20,base,(x1-x0+40)*ex(P(t,2.4,.4)),8);
    for(let i=0;i<n;i++){const bt=2.55+i*BT*.5;const p=bk(P(t,bt,.45),2.2)*(1-out);if(p<=0)continue;const hh=hmax*(.22+.78*Math.pow((i+1)/n,1.5))*p*(1+.035*s14_beat(t+i*.07));
      const bx=x0+(i+.5)*(x1-x0)/n-bw/2;const g=X.createLinearGradient(0,base-hh,0,base);const cs=[[K.cian,K.azul],[K.ambar,K.naranja],[K.brasa,K.rojo]][i%3];g.addColorStop(0,cs[0]);g.addColorStop(1,cs[1]);
      X.fillStyle='rgba(11,34,56,.15)';s14_rr(bx+14,base-hh+14,bw,hh-14,[bw*.3,bw*.3,0,0]);X.fill();X.fillStyle=g;s14_rr(bx,base-hh,bw,hh,[bw*.3,bw*.3,0,0]);X.fill();
      X.fillStyle='rgba(255,255,255,.3)';X.fillRect(bx+bw*.15,base-hh+bw*.3,bw*.12,Math.max(0,hh-bw*.4));
      if(i===n-1){const ap=bk(P(t,bt+.3,.4),2);if(ap>0)s14_arrow(bx+bw/2,base-hh-20,L(170,110)*ap*(1-out),L(46,50),K.brasa,K.ambar)}}
    // tendencia
    const tp=ex(P(t,4.1,.8))*(1-out);if(tp>0){X.strokeStyle=TINTA;X.lineWidth=8;X.setLineDash([22,16]);X.lineCap='round';X.beginPath();X.moveTo(x0,base-hmax*.15);X.lineTo(lerp(x0,x1,tp),base-hmax*(.15+.95*tp));X.stroke();X.setLineDash([])}
    const tx=L(440,CX);s14_word('CRECEMOS',tx,L(CY-60,430),fit('CRECEMOS',L(760,960),L(250,250),FG),2.6,t,TINTA);
    const sp=ex(P(t,3.1,.4));if(sp>0){const s='NUESTRA GENTE',sz=fit(s,L(680,820),L(96,100),FG);X.save();X.translate(tx,L(CY+120,600));X.rotate(-.03);X.scale(sp,sp);const w=mw(s,sz,FG)+60;X.fillStyle=K.ambar;s14_rr(-w/2,-sz*.62,w,sz*1.24,14);X.fill();txt(s,0,sz*.04,sz,{...FG,c:TINTA});X.restore()}
    X.restore()}
  // transición: flecha gigante diagonal
  {const p=P(t,5.7,.7);if(p>0&&p<1){X.save();X.translate(lerp(-W*.4,W*1.4,eio(p)),lerp(H*1.4,-H*.4,eio(p)));X.rotate(Math.PI/4);s14_arrow(0,DG*.5,DG,DG*.32,K.ambar,K.naranja);X.restore()}}
  // ===== 3 · curva de crecimiento (6.1–9.4) =====
  if(t>=6.05&&t<9.6){const o=eio(P(t,9.2,.4));X.save();X.globalAlpha=1-o;
    const ax=L(120,90),ay=L(980,1560),bx=L(1820,1000),by=L(130,330);const p=ex(P(t,6.15,2.4));
    const fx=u=>lerp(ax,bx,u),fy=u=>ay-(ay-by)*Math.pow(u,2.3);
    // área
    X.beginPath();X.moveTo(ax,ay);for(let i=0;i<=60;i++){const u=i/60*p;X.lineTo(fx(u),fy(u))}X.lineTo(fx(p),ay);X.closePath();const ag=X.createLinearGradient(0,by,0,ay);ag.addColorStop(0,'rgba(8,225,255,.45)');ag.addColorStop(1,'rgba(8,225,255,.02)');X.fillStyle=ag;X.fill();
    X.beginPath();for(let i=0;i<=60;i++){const u=i/60*p;i?X.lineTo(fx(u),fy(u)):X.moveTo(fx(u),fy(u))}X.strokeStyle=K.azul;X.lineWidth=16;X.lineCap='round';X.lineJoin='round';X.stroke();
    X.save();X.shadowColor=K.cian;X.shadowBlur=30;X.fillStyle='#fff';X.beginPath();X.arc(fx(p),fy(p),22,0,7);X.fill();X.restore();X.strokeStyle=K.cian;X.lineWidth=8;X.beginPath();X.arc(fx(p),fy(p),22+12*s14_beat(t),0,7);X.stroke();
    // hitos
    const ms=[[.38,'NOTICIAS',K.brasa,6.6],[.62,'NUESTRA GENTE',K.azul,7.2],[.84,'NUESTRA TIERRA',K.ambar,7.8]];
    ms.forEach(([u,s,c,tt],i)=>{const q=bk(P(t,tt,.4),2);if(q<=0)return;const x=fx(u),y=fy(u);X.fillStyle=c;X.beginPath();X.arc(x,y,20*q,0,7);X.fill();X.strokeStyle='#fff';X.lineWidth=6;X.stroke();
      const sz=L(84,74),w=mw(s,sz,FG)+50;let lx=x-L(30,20)-w/2,ly=y-L(110,110);if(TV){lx=x-w/2-30;ly=y+90}else{lx=cl(x-w*.8,30+w/2,W-30-w/2);ly=y+L(90,110)}
      X.save();X.translate(lx,ly);X.rotate((i%2?.03:-.03));X.scale(q,q);X.fillStyle=TINTA;s14_rr(-w/2,-sz*.62,w,sz*1.24,14);X.fill();txt(s,0,sz*.04,sz,{...FG,c:c===K.azul?K.cian:c});X.restore()});
    X.restore()}
  // ===== 4 · flecha que despega + CONTIGO (9.3–12.6) =====
  if(t>=9.2&&t<12.8){const o=ss(P(t,12.4,.4));X.save();X.globalAlpha=1-o;
    // franjas de velocidad
    for(let i=0;i<14;i++){const x=hs(i*3)*W,len=200+hs(i)*400,y=((t-9.2)*2600+hs(i+5)*H)%(H+len)-len;X.fillStyle=`rgba(11,34,56,${.08+hs(i+1)*.1})`;X.fillRect(x,y,6+hs(i+2)*8,len)}
    const ap=ex(P(t,9.25,.6));const ax=L(1450,CX),len=L(900,1300)*ap,ab=H+40-ap*L(120,250)+Math.sin((t-9.2)*8)*6;
    s14_arrow(ax,ab,len,L(210,260),K.brasa,K.ambar);
    X.save();X.globalCompositeOperation='source-atop';X.restore();
    const tx=L(640,CX);s14_word('CON',tx,L(370,620),L(300,300),9.55,t,TINTA);s14_word('TIGO',tx,L(650,900),L(330,330),9.85,t,TINTA);
    const rp=ex(P(t,10.6,.5));if(rp>0){X.fillStyle=K.ambar;const w=L(620,700)*rp;X.fillRect(tx-w/2,L(850,1100),w,22)}
    const sp=P(t,10.9,.4);if(sp>0)rise('CRECEMOS JUNTOS',tx,L(940,1200),L(90,96),10.9,t,{...FG,c:K.brasa,ls:4});
    X.restore()}
  // ===== 5 · jardín geométrico (12.4–16.4) =====
  if(t>=12.4&&t<16.6){const gy=H+10;
    const n=L(14,10);for(let i=0;i<n;i++){const x=(i+.5)/n*W+(hs(i)-.5)*60;const h=L(380,620)*(.55+hs(i+7)*.6);s14_sprout(x,gy,h,P(t,12.5+hs(i+3)*.9,1.6),i,{nl:5,w:L(10,12)})}
    const tx=CX;s14_word('HECHO EN',tx,L(230,520),L(170,200),12.75,t,TINTA);
    if(TV)s14_word('SANTA BÁRBARA',tx,420,fit('SANTA BÁRBARA',1700,260,FG),13.15,t,K.brasa,{stag:.03});
    else{const z=fit('BÁRBARA',960,270,FG);s14_word('SANTA',tx,715,z,13.15,t,K.brasa);s14_word('BÁRBARA',tx,1010,z,13.4,t,K.brasa)}}
  X.restore();
  // ===== 6 · sube el azul (15.8–16.5) y cierre =====
  {const p=eio(P(t,15.75,.75));if(p>0&&!dark){const y=H-H*1.05*p;X.fillStyle=K.ambar;X.fillRect(0,y-24,W,H);X.fillStyle=TINTA;X.fillRect(0,y,W,H)}}
  flash(t,.35,.25,.2,'253,174,3');flash(t,16.55,.6,.4);
  if(dark){const p=P(t,16.5,1);const lx=L(620,CX),ly=L(520,560);
    for(let i=0;i<9;i++){const x=(i+.5)/9*W;s14_sprout(x,H+10,L(260,420)*(.5+hs(i+40)*.6),P(t,16.6+hs(i)*.6,1.4),i+20,{nl:4,stem:'#2a8a5a',cols:[K.cian,K.azul,K.ambar]})}
    const[a1,a2]=shake(t,16.7,24);X.save();X.translate(a1,a2);
    const rg=X.createRadialGradient(lx,ly,10,lx,ly,640);rg.addColorStop(0,'rgba(253,174,3,.3)');rg.addColorStop(1,'rgba(253,174,3,0)');X.fillStyle=rg;X.fillRect(0,0,W,H);
    const gp=el(P(t,16.6,1.3));X.save();X.translate(lx,ly+L(246,263));X.scale(gp,gp);X.translate(0,-L(246,263));logo(0,0,L(560,600),{glow:'rgba(8,225,255,.35)'});X.restore();
    const tx=L(1370,CX),mx=L(860,960);
    s14_word('EL CANAL QUE',tx,L(330,1060),fit('EL CANAL QUE',mx,L(130,120),FG),17.1,t,'#fff',{from:1.8});
    s14_word('CRECE',tx,L(500,1220),fit('CRECE',mx,L(230,210),FG),17.45,t,K.ambar,{from:2.6});
    const cw=mw('CRECE',fit('CRECE',mx,L(230,210),FG),FG);const ap=bk(P(t,17.9,.4),2);if(ap>0)s14_arrow(tx+cw/2+L(55,55),L(600,1320),L(200,190)*ap,L(44,44),K.ambar,K.naranja);
    s14_word('CADA DÍA',tx,L(670,1390),fit('CADA DÍA',mx,L(130,110),FG),17.75,t,'#fff',{from:1.8});
    const pp=bk(P(t,18.4,.45),1.7);if(pp>0&&TV){const pw=420*pp;X.fillStyle=K.cian;s14_rr(tx-pw/2,800,pw,84,42);X.fill();if(pp>.7)txt('/UNEVISION',tx,844,52,{...FG,c:K.noche,ls:3})}
    if(pp>0&&!TV){const pw=380*pp;X.fillStyle=K.cian;s14_rr(CX-pw/2,865,pw,80,40);X.fill();if(pp>.7)txt('/UNEVISION',CX,905,50,{...FG,c:K.noche,ls:3})}
    X.restore()}
},events:[['golpe',.35],['pop',.6],['golpe',.62],['golpe',1.15],['golpe',1.68],['pop',1.9],['whoosh',2.4],['golpe',2.6],['pop',2.82],['pop',3.1],['pop',3.36],['pop',3.63],['swipe',4.1],['whoosh_largo',5.7],['golpe',6.15],['pop',6.6],['pop',7.2],['pop',7.8],['riser',8.3],['golpe',9.3],['golpe',9.85],['whoosh',10.9],['swipe',12.4],['golpe',12.75],['golpe',13.45],['whoosh_largo',15.75],['golpe',16.6],['golpe',17.45],['pop',18.4]],
musica:{estilo:'funk',bpm:112,tono:'E',hits:[.35,1.68,2.6,6.15,9.3,12.75,16.6,17.45],final:16.6}});
})();
