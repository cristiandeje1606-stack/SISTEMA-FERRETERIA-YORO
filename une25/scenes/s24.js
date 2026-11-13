// escena 24 · CUENTA REGRESIVA (reel 9:16, 30 s, 145 bpm) · Archivo extra-condensada 900 inclinada, estilo deportivo
(()=>{
const s24_B=60/145,s24_T=b=>b*s24_B;
const s24_F={f:'Archivo',w:900,st:'extra-condensed'};
const s24_NUM=[[5,8,'NOTICIAS',K.noche,K.rojo,'#fff'],[4,14,'INFORMACIÓN',K.rojo,K.noche,'#fff'],[3,20,'NUESTRA GENTE',K.marino,K.ambar,K.noche],[2,26,'TU CANAL',K.ambar,K.noche,'#fff'],[1,32,'CADA DÍA',K.noche,K.cian,'#fff']];
function s24_sk(){X.transform(1,0,-.2,1,0,0)}
// fondo partido en diagonal + líneas de velocidad
function s24_fondo(t,c1,c2,ang=-.35,off=0){X.fillStyle=c1;X.fillRect(0,0,W,H);X.save();X.translate(CX,CY+off);X.rotate(ang);X.fillStyle=c2;X.fillRect(-DG,0,DG*2,DG);X.restore();
  X.save();X.translate(CX,CY);X.rotate(ang);X.globalCompositeOperation='lighter';for(let i=0;i<26;i++){const y=(hs(i)-.5)*DG,sp=(1600+1400*hs(i+4))*U,len=(200+500*hs(i+8))*U;const x=((t*sp+hs(i+2)*DG*2)%(DG*2))-DG;
    X.fillStyle=`rgba(255,255,255,${.05+.08*hs(i+6)})`;X.fillRect(x,y,len,(2+4*hs(i+1))*U)}X.restore()}
// estallido de destellos radiales
function s24_destellos(t,t0,cx,cy,col='255,255,255',n=14){const p=P(t,t0,.45);if(p<=0||p>=1)return;X.save();X.globalCompositeOperation='lighter';X.strokeStyle=`rgba(${col},${1-p})`;X.lineCap='round';
  for(let i=0;i<n;i++){const a=i/n*6.283+hs(i+t0)*.3;const r1=(160+600*ex(p))*U,r2=r1+(80+160*hs(i))*U*(1-p);X.lineWidth=(10*(1-p)+2)*U;X.beginPath();X.moveTo(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1);X.lineTo(cx+Math.cos(a)*r2,cy+Math.sin(a)*r2);X.stroke()}X.restore()}
// número gigante con volumen, eco y golpe
function s24_num(n,cx,cy,t0,t,face,ext){const p=P(t,t0,.3);if(p<=0)return;const k=2.4-1.4*bk(p,1.9),drift=1+.06*P(t,t0+.3,2.2);const sz=1250*U;const s=String(n);
  X.save();X.translate(cx,cy);X.scale(k*drift,k*drift);s24_sk();X.globalAlpha=cl(p*5);
  // ecos de contorno
  for(let j=3;j>=1;j--){const e=1+j*.09+.25*ex(P(t,t0,.8));X.save();X.scale(e,e);X.globalAlpha*=.16*(4-j)/3*(1-P(t,t0,1.4));txt(s,0,0,sz,{...s24_F,c:'rgba(0,0,0,0)',stroke:face,sw:5*U});X.restore()}
  for(let i=18;i>=1;i--)txt(s,i*2.6*U,i*2.6*U,sz,{...s24_F,c:i>15?'rgba(0,0,0,.45)':ext});
  txt(s,0,0,sz,{...s24_F,c:face});
  // brillo que cruza el número
  const sh=P(t,t0+.25,.5);if(sh>0&&sh<1){X.save();X.globalCompositeOperation='source-atop';const g=X.createLinearGradient(-500*U+1000*U*sh,-400*U,-300*U+1000*U*sh,400*U);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.5,'rgba(255,255,255,.75)');g.addColorStop(1,'rgba(255,255,255,0)');X.fillStyle=g;X.fillRect(-600*U,-700*U,1200*U,1400*U);X.restore()}
  X.restore()}
// banda diagonal con palabra que entra con estela
function s24_banda(s,y,t0,t1,t,bc,tc,dir=1,ang=-.12){const p=P(t,t0,.32),q=P(t,t1-.2,.2);if(p<=0||q>=1)return;const sz=fit(s,880*U,260*U,s24_F);
  X.save();X.translate(CX,y);X.rotate(ang);const bw=DG*1.2,bh=sz*1.15;const bx=(1-ex(p))*dir*-DG+q*dir*DG;X.fillStyle=bc;X.fillRect(bx-bw/2,-bh/2,bw,bh);X.fillStyle='rgba(255,255,255,.25)';X.fillRect(bx-bw/2,-bh/2,bw,6*U);
  const tx=(1-ex(P(t,t0+.06,.35)))*dir*-W*1.2+q*dir*W*1.2;for(let g=3;g>=0;g--){X.save();X.globalAlpha=g?(.18*(1-p)):1;X.translate(tx-g*dir*60*U*(1-p),0);s24_sk();txt(s,0,sz*.04,sz,{...s24_F,c:tc});X.restore()}X.restore()}
function s24_corte(t,t0,c){const p=P(t,t0-.18,.36);if(p<=0||p>=1)return;X.save();X.translate(CX,CY);X.rotate(-.35);const x=lerp(-DG*1.2,DG*1.2,eio(p));X.fillStyle=c;X.fillRect(x-DG*.28,-DG,DG*.56,DG*2);X.fillStyle='#fff';X.fillRect(x+DG*.28,-DG,26*U,DG*2);X.restore()}
function s24_campana(x,y,s,t){X.save();X.translate(x,y);X.rotate(Math.sin(t*14)*.25*Math.exp(-((t*2)%2.5)));X.scale(s,s);X.fillStyle='#fff';X.beginPath();X.moveTo(-60,40);X.quadraticCurveTo(-50,30,-48,-10);X.bezierCurveTo(-46,-70,46,-70,48,-10);X.quadraticCurveTo(50,30,60,40);X.closePath();X.fill();X.beginPath();X.arc(0,52,15,0,7);X.fill();X.fillRect(-6,-78,12,14);X.restore()}

SCENE(24,{dur:30,
draw(t){
  const bt=t/s24_B;
  // ---------- 0–3.3 · ¿ESTÁS LISTO? ----------
  if(bt<8){const inv=Math.floor(bt/2)%2;s24_fondo(t,inv?K.rojo:K.noche,inv?K.noche:'#0f0f14',-.35);const[sx,sy]=shake(t,s24_T(Math.floor(bt/2)*2),20);X.save();X.translate(sx,sy);
    const k=1+.04*Math.exp(-(bt%2)*3);X.translate(CX,CY);X.scale(k,k);X.translate(-CX,-CY);
    X.save();X.translate(CX,CY-170*U);s24_sk();slam('¿ESTÁS',0,0,330*U,.05,t,{...s24_F,c:'#fff',stag:.05,from:3});X.restore();
    X.save();X.translate(CX,CY+170*U);s24_sk();slam('LISTO?',0,0,380*U,s24_T(2),t,{...s24_F,c:inv?K.ambar:K.rojo,stag:.05,from:3,glow:'rgba(0,0,0,.4)'});X.restore();
    txt('LA CUENTA EMPIEZA',CX,CY+470*U,84*U,{...s24_F,w:700,c:'#fff',ls:10,a:ss(P(t,s24_T(4),.3))});X.restore();
    s24_destellos(t,.05,CX,CY,'255,255,255');s24_destellos(t,s24_T(2),CX,CY+170*U,'253,174,3');flash(t,0,.9,.3);flash(t,s24_T(4),.4,.2)}
  // ---------- 3.3–16.55 · 5 · 4 · 3 · 2 · 1 ----------
  else if(bt<40){const i=Math.min(4,Math.floor((bt-8)/6)),[n,b0,w,c1,c2,face]=s24_NUM[i];const t0=s24_T(b0);
    const sl=ss(P(t,t0,.5));s24_fondo(t,c1,c2,-.35+.1*Math.sin(i),lerp(-400*U,250*U,sl));
    // anillo giratorio de marcas tipo cronómetro
    X.save();X.translate(CX,CY-60*U);X.rotate(-t*1.2);for(let j=0;j<60;j++){const a=j/60*6.283;const on=j/60<=1-((bt-b0)/6);X.strokeStyle=on?(c2===K.noche?'rgba(255,255,255,.7)':'rgba(255,255,255,.55)'):'rgba(255,255,255,.12)';X.lineWidth=(j%5?4:9)*U;X.beginPath();X.moveTo(Math.cos(a)*470*U,Math.sin(a)*470*U);X.lineTo(Math.cos(a)*(j%5?430:400)*U,Math.sin(a)*(j%5?430:400)*U);X.stroke()}X.restore();
    const[sx,sy]=shake(t,t0,30);X.save();X.translate(sx,sy);s24_num(n,CX,CY-40*U,t0,t,face,i===2?'#B87F02':i===3?'#9a2a10':'#7a0b20');X.restore();
    s24_banda(w,CY+560*U,t0+s24_T(3),t0+s24_T(6),t,i===3?K.noche:i===2?K.noche:K.ambar,i===3||i===2?'#fff':K.noche,i%2?1:-1,-.1);
    s24_destellos(t,t0,CX,CY-40*U,i===2?'11,34,56':'255,255,255',16);flash(t,t0,.75,.25);
    if(n===1&&bt>=36){const s=(bt*2)%1<.5;if(s){X.fillStyle='rgba(255,255,255,.14)';X.fillRect(0,0,W,H)}}}
  // ---------- 16.55–19.86 · UNE VISIÓN en cortes ----------
  else if(bt<48){const b=bt-40;s24_fondo(t,b<2?'#0f0f14':b<4?K.rojo:K.marino,b<2?K.rojo:b<4?K.noche:'#000',-.35);
    const[sx,sy]=shake(t,s24_T(40+Math.floor(b/2)*2),24);X.save();X.translate(sx,sy);
    X.save();X.translate(CX,CY-180*U);s24_sk();slam('UNE',0,0,520*U,s24_T(40),t,{...s24_F,c:'#fff',stag:.06,from:3.2,glow:'rgba(8,225,255,.6)'});X.restore();
    X.save();X.translate(CX,CY+220*U);s24_sk();slam('VISIÓN',0,0,fit('VISIÓN',920*U,400*U,s24_F),s24_T(42),t,{...s24_F,grad:['#FFE08A',K.ambar,K.naranja],stag:.05,from:3});X.restore();X.restore();
    s24_banda('TU CANAL',CY+600*U,s24_T(44),s24_T(48),t,K.cian,K.noche,1,-.08);
    s24_destellos(t,s24_T(40),CX,CY-180*U);s24_destellos(t,s24_T(42),CX,CY+220*U,'253,174,3');flash(t,s24_T(40),.9,.3);
    if(bt>=46){const s=(bt*4)%1<.5;if(s){X.fillStyle='rgba(255,255,255,.12)';X.fillRect(0,0,W,H)}}}
  // ---------- 19.86–23.17 · SÍGUENOS / ACTIVA LAS NOTIFICACIONES ----------
  else if(bt<56){const b=bt-48;s24_fondo(t,K.noche,K.rojo,-.35+.2*ss(P(b,0,1)),300*U);
    X.save();X.translate(CX,CY-330*U);s24_sk();slam('SÍGUENOS',0,0,fit('SÍGUENOS',900*U,300*U,s24_F),s24_T(48),t,{...s24_F,c:'#fff',stag:.04,from:2.6});X.restore();
    const pk=bk(P(t,s24_T(50),.4),2);if(pk>0){X.save();X.translate(CX,CY-20*U);X.scale(pk,pk);s24_sk();X.fillStyle=K.ambar;X.fillRect(-420*U,-95*U,840*U,190*U);txt('/UNEVISION',0,8*U,fit('/UNEVISION',780*U,170*U,s24_F),{...s24_F,c:K.noche});X.restore()}
    s24_campana(CX,CY+330*U,1.5*U*bk(P(t,s24_T(52),.4),2),t);
    s24_banda('ACTIVA LAS NOTIFICACIONES',CY+580*U,s24_T(52.5),s24_T(56),t,'#fff',K.rojo,-1,-.08);
    s24_destellos(t,s24_T(48),CX,CY-330*U);flash(t,s24_T(48),.8,.3)}
  // ---------- 23.17–30 · LOGO ----------
  else{const t0=s24_T(56);X.fillStyle='#07070b';X.fillRect(0,0,W,H);
    X.save();X.translate(CX,CY-200*U);X.rotate(-.35);X.globalCompositeOperation='lighter';[[K.rojo,-1],[K.ambar,1],[K.cian,0]].forEach(([c,d],j)=>{const p=ex(P(t,t0+j*.08,.6));X.fillStyle=c;X.globalAlpha=.55;X.fillRect(-DG,d*170*U-30*U+(1-p)*d*600*U,DG*2*p,(j===2?24:60)*U)});X.restore();
    rays(CX,CY-200*U,18,'rgba(0,0,0,0)','rgba(255,255,255,.03)',t*.3);
    const sc=.3+.7*bk(P(t,t0,.5),2.2);const[sx,sy]=shake(t,t0,26);logo3D(CX+sx,CY-200*U+sy,620*U*sc,(1-ex(P(t,t0,.7)))*-Math.PI*3,{depth:26,glow:'rgba(227,23,62,.5)',shine:P(t,t0+1,1)});
    X.save();X.translate(CX,CY+330*U);s24_sk();slam('EL CANAL QUE CRECE',0,0,fit('EL CANAL QUE CRECE',900*U,150*U,s24_F),t0+1.1,t,{...s24_F,c:'#fff',stag:.025,from:1.5});X.restore();
    X.save();X.translate(CX,CY+500*U);s24_sk();slam('CADA DÍA',0,0,190*U,t0+1.6,t,{...s24_F,grad:['#FFE08A',K.ambar,K.naranja],stag:.05,from:2.6});X.restore();
    txt('/UNEVISION',CX,CY+650*U,62*U,{...s24_F,w:800,c:K.cian,ls:10,a:ss(P(t,t0+2.4,.4))});
    s24_destellos(t,t0,CX,CY-200*U,'253,174,3',20);flare(CX+260*U,CY-420*U,.7*win(t,t0+1,t0+2.4,.3,.8));flash(t,t0,1,.5)}
  // cortes diagonales entre bloques
  [8,14,20,26,32,40,48].forEach((b,j)=>s24_corte(t,s24_T(b),[K.ambar,K.cian,K.rojo,K.cian,K.ambar,'#fff',K.cian][j]));
  vineta(.45);
},
events:(()=>{const B=60/145,e=[['golpe',.05],['golpe',+(2*B).toFixed(3)],['pop',+(4*B).toFixed(3)],['whoosh',+(6*B).toFixed(3)]];
  [8,14,20,26,32].forEach(b=>{e.push(['whoosh',+(b*B-.18).toFixed(3)],['golpe',+(b*B).toFixed(3)],['swipe',+((b+3)*B).toFixed(3)])});
  e.push(['riser',+(40*B-1).toFixed(3)],['golpe',+(40*B).toFixed(3)],['golpe',+(42*B).toFixed(3)],['swipe',+(44*B).toFixed(3)],['golpe',+(48*B).toFixed(3)],['pop',+(50*B).toFixed(3)],['campana',+(52*B).toFixed(3)],['swipe',+(52.5*B).toFixed(3)],['riser',+(56*B-1).toFixed(3)],['golpe',+(56*B).toFixed(3)],['whoosh_largo',+(56*B+.05).toFixed(3)],['obturador',+(56*B+1.1).toFixed(3)],['pop',+(56*B+2.4).toFixed(3)]);return e.sort((a,b)=>a[1]-b[1])})(),
musica:{estilo:'trap',bpm:145,tono:'Cm',hits:[0,8,14,20,26,32,40,42,48,56].map(b=>+(b*60/145).toFixed(3)),final:+(56*60/145).toFixed(3)}
});
})();
