// 16 · UN DÍA CONTIGO (reel 9:16, 30 s) — el cielo pasa de amanecer a noche; palabras por momento del día; cierre nocturno con el logo brillando.
(()=>{
const s16_hx=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
const s16_ma=(A,B,k)=>A.map((v,i)=>Math.round(v+(B[i]-v)*k));
const s16_rgb=(c,a=1)=>`rgba(${c[0]},${c[1]},${c[2]},${a})`;
// cielo: [t, arriba, medio, horizonte]
const KEYS=[[0,'#030a14','#0a1a33','#241634'],[2.6,'#0c2149','#5b3b70','#F6901C'],[6,'#1b5bb0','#3f86d8','#FFC98A'],[10.5,'#0d4aa0','#2f7fd6','#86c8f5'],
  [15,'#173a80','#5a6aac','#F2B04A'],[18.6,'#24164a','#8e3460','#EA4F3D'],[22.2,'#050f1d','#0B2238','#173a66'],[30,'#030a14','#07162a','#0e2847']].map(k=>[k[0],s16_hx(k[1]),s16_hx(k[2]),s16_hx(k[3])]);
function s16_sky(t){let i=0;while(i<KEYS.length-2&&t>KEYS[i+1][0])i++;const a=KEYS[i],b=KEYS[i+1];const k=ss(P(t,a[0],b[0]-a[0]));return[1,2,3].map(j=>s16_ma(a[j],b[j],k))}
const HZ=1470*U;
const NOCHE=t=>cl(1-ss(P(t,1.2,3))+ss(P(t,19.5,3.2)));
function s16_ridge(x,l,t){const b=[1330,1430,1560][l]*U,o=t*[6,12,22][l]*U;return b+Math.sin((x+o)*.0042/U+l*2.1)*[46,40,52][l]*U+Math.sin((x+o)*.011/U+l)*[16,14,20][l]*U+Math.sin((x+o)*.023/U+l*5)*6*U}
// tarjetas de texto: [inicio, fin, frase pequeña, PALABRA, degradado]
const C16=[[0.45,3.1,'en Santa Bárbara','AMANECE',['#FFFFFF','#FFD9A0']],
  [3.1,5.75,'despierta','NUESTRA|TIERRA',['#FFFFFF','#FFE2B0']],
  [5.75,8.35,'cada mañana','CONTIGO',['#FFFFFF','#CFE9FF']],
  [8.35,10.95,'te contamos','LO QUE|PASA AQUÍ',['#FFFFFF','#CFE9FF']],
  [10.95,13.55,'al mediodía','NOTICIAS',['#FFFFFF','#BDE6FF']],
  [13.55,16.15,'por la tarde','NUESTRA|GENTE',['#FFFFFF','#FFE7A8']],
  [16.15,18.8,'al atardecer','NUESTRA|VOZ',['#FFFFFF','#FFC07A']],
  [18.8,21.55,'y cuando cae la noche','AQUÍ|ESTAMOS',['#FFFFFF','#FFD3B0']],
  [21.55,25.55,'cada día','CRECEMOS|CONTIGO',['#FFFFFF','#9FF0FF']]];
const SZ16=C16.map(c=>null);
function s16_card(t,i){const[a,b,kick,big,col]=C16[i];if(t<a||t>b)return;const out=ss(P(t,b-.38,.38));const lines=big.split('|');
  if(!SZ16[i])SZ16[i]=Math.min(...lines.map(l=>fit(l,930*U,250*U,{f:'Fig',w:800})));const sz=SZ16[i];const lh=sz*.95,n=lines.length;const y0=CY-30*U-(n-1)*lh/2;
  X.save();X.globalAlpha=1-out;X.translate(CX,CY);X.scale(1+out*.08,1+out*.08);X.translate(-CX,-CY-out*70*U);
  const kp=ex(P(t,a,.7)),ky=y0-sz*.5-78*U,ko={f:'Playfair',w:700,it:true};
  txt(kick,CX,ky+(1-kp)*34*U,64*U,{...ko,c:'#fff',a:kp,glow:'rgba(3,10,20,.7)',gb:30*U,ls:(1-kp)*18});
  const kw=mw(kick,64*U,ko),lw=110*U*ex(P(t,a+.2,.6));X.fillStyle=`rgba(255,255,255,${.85*kp})`;X.fillRect(CX-kw/2-34*U-lw,ky+2*U,lw,3*U);X.fillRect(CX+kw/2+34*U,ky+2*U,lw,3*U);
  lines.forEach((l,j)=>slam(l,CX,y0+j*lh,sz,a+.18+j*.2,t,{f:'Fig',w:800,from:2.3,stag:.038,d:.42,grad:col,glow:'rgba(3,10,20,.6)',gb:44*U}));
  // brillo que recorre la palabra
  const sp=P(t,a+.9,.7);if(sp>0&&sp<1){X.save();X.globalCompositeOperation='lighter';const gx=CX-520*U+1040*U*sp;const g=X.createLinearGradient(gx-90*U,0,gx+90*U,0);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.5,'rgba(255,255,255,.22)');g.addColorStop(1,'rgba(255,255,255,0)');X.fillStyle=g;X.fillRect(gx-90*U,y0-sz*.6,180*U,lh*n);X.restore()}
  X.restore()}
function s16_cloud(x,y,s,col,a){if(a<=0)return;X.save();X.globalAlpha=a;X.fillStyle=col;X.beginPath();[[0,0,1],[-.9,.15,.7],[.95,.12,.75],[-.4,-.35,.75],[.45,-.3,.8],[1.7,.25,.5],[-1.65,.28,.48]].forEach(([dx,dy,r])=>{X.moveTo(x+dx*s+r*s,y+dy*s);X.arc(x+dx*s,y+dy*s,r*s,0,7)});X.fill();X.restore()}
const HITS16=C16.map(c=>c[0]+.38);
SCENE(16,{dur:30,draw(t){
  const[top,mid,hor]=s16_sky(t),nn=NOCHE(t);
  let sh=[0,0];HITS16.concat([25.85]).forEach(h=>{const s=shake(t,h,h>25?16:7);sh[0]+=s[0];sh[1]+=s[1]});
  const z=1.03+.05*P(t,0,30);
  X.save();X.translate(CX+sh[0],CY+sh[1]);X.scale(z,z);X.translate(-CX,-CY);
  // cielo
  const g=X.createLinearGradient(0,-120*U,0,HZ);g.addColorStop(0,s16_rgb(top));g.addColorStop(.55,s16_rgb(mid));g.addColorStop(1,s16_rgb(hor));X.fillStyle=g;X.fillRect(-100*U,-150*U,W+200*U,H+300*U);
  // estrellas
  if(nn>.01){X.save();for(let i=0;i<190;i++){const x=hs(i)*W,y=hs(i+300)*HZ*.85,tw=.55+.45*Math.sin(t*(1.5+hs(i+9)*3)+i);const a=nn*tw*(.35+.65*hs(i+50))*cl(1.3-y/HZ);X.fillStyle=`rgba(255,255,255,${a})`;X.beginPath();X.arc(x,y,(.8+hs(i+70)*2.2)*U,0,7);X.fill()}X.restore()}
  // sol
  const th=Math.PI*cl((t-.5)/20.8);const sx=CX-Math.cos(th)*560*U,sy=HZ+40*U-Math.sin(th)*1020*U;
  if(t<22.5){const low=1-Math.sin(th);const sc=s16_ma([255,248,225],[255,150,60],cl(low*1.3));X.save();X.globalCompositeOperation='lighter';
    const gr=X.createRadialGradient(sx,sy,0,sx,sy,720*U);gr.addColorStop(0,s16_rgb(sc,.75));gr.addColorStop(.12,s16_rgb(sc,.35));gr.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=gr;X.fillRect(sx-720*U,sy-720*U,1440*U,1440*U);
    // rayos del amanecer y del atardecer
    const rk=cl(low*1.4)*.12;if(rk>.01){for(let i=0;i<14;i++){const an=-Math.PI/2+(i-6.5)*.16+Math.sin(t*.4+i)*.03;X.fillStyle=s16_rgb(sc,rk*(.5+.5*hs(i)));X.beginPath();X.moveTo(sx,sy);X.lineTo(sx+Math.cos(an-.03)*1900*U,sy+Math.sin(an-.03)*1900*U);X.lineTo(sx+Math.cos(an+.03)*1900*U,sy+Math.sin(an+.03)*1900*U);X.fill()}}
    X.restore();X.fillStyle=s16_rgb(s16_ma([255,253,240],[255,190,110],cl(low*1.2)));X.beginPath();X.arc(sx,sy,92*U,0,7);X.fill()}
  // luna
  const tm=Math.PI*.5*ss(P(t,20.6,6));if(t>20.6){const mx=W*(.9-.18*ss(P(t,24,4))),my=HZ+60*U-Math.sin(tm)*1140*U;X.save();X.globalCompositeOperation='lighter';const gm=X.createRadialGradient(mx,my,0,mx,my,380*U);gm.addColorStop(0,'rgba(200,235,255,.32)');gm.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=gm;X.fillRect(mx-380*U,my-380*U,760*U,760*U);X.restore();
    X.fillStyle='#EAF5FF';X.beginPath();X.arc(mx,my,70*U,0,7);X.fill();X.fillStyle='rgba(150,180,210,.35)';[[-22,-14,16],[18,10,12],[-6,26,9],[26,-22,7]].forEach(([a,b,r])=>{X.beginPath();X.arc(mx+a*U,my+b*U,r*U,0,7);X.fill()})}
  // nubes
  const dayk=1-nn;const cc=s16_ma([255,255,255],hor,.45);
  for(let i=0;i<6;i++){const sp=12+hs(i+40)*22;const x=((hs(i+20)*1.4*W+t*sp*U)%(W*1.5))-W*.25;const y=(330+hs(i+31)*720)*U;s16_cloud(x,y,(60+hs(i+12)*50)*U,s16_rgb(cc),(.18+.3*dayk)*(.6+.4*hs(i+3)))}
  // cerros (3 capas con paralaje)
  for(let l=0;l<3;l++){const c=s16_ma(hor,[3,9,18],[.55,.75,.9][l]);X.fillStyle=s16_rgb(c);X.beginPath();X.moveTo(-120*U,H+200*U);for(let x=-120*U;x<=W+120*U;x+=12*U)X.lineTo(x,s16_ridge(x,l,t));X.lineTo(W+120*U,H+200*U);X.fill();
    if(l===0){X.save();X.globalCompositeOperation='lighter';const rim=X.createLinearGradient(0,1280*U,0,1420*U);rim.addColorStop(0,s16_rgb(hor,.18*(1-nn*.6)));rim.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=rim;X.fillRect(-120*U,1260*U,W+240*U,200*U);X.restore()}
    if(l===1&&nn>.05){X.save();X.globalCompositeOperation='lighter';for(let i=0;i<46;i++){const x=hs(i+500)*W*1.1-W*.05,y=s16_ridge(x,1,t)+(14+hs(i+600)*110)*U;const on=cl((nn-.25-hs(i+700)*.5)*4);if(on<=0)continue;const a=on*(.6+.4*Math.sin(t*3+i));
      const gl=X.createRadialGradient(x,y,0,x,y,14*U);gl.addColorStop(0,`rgba(255,200,110,${a})`);gl.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=gl;X.fillRect(x-14*U,y-14*U,28*U,28*U);X.fillStyle=`rgba(255,235,190,${a})`;X.fillRect(x-2*U,y-2*U,4*U,4*U)}X.restore()}
    if(l===2){// torre de transmisión
      const tx=W*.82,ty=s16_ridge(tx,2,t)+10*U,th2=300*U;X.strokeStyle=s16_rgb(c);X.lineWidth=5*U;X.beginPath();X.moveTo(tx-46*U,ty);X.lineTo(tx,ty-th2);X.lineTo(tx+46*U,ty);
      for(let k=1;k<6;k++){const yy=ty-th2*k/6,ww=46*U*(1-k/6);X.moveTo(tx-ww,yy);X.lineTo(tx+ww*.8,yy-th2/12)}X.stroke();
      const bl=.5+.5*Math.sin(t*5);X.save();X.globalCompositeOperation='lighter';const gb=X.createRadialGradient(tx,ty-th2,0,tx,ty-th2,40*U);gb.addColorStop(0,`rgba(227,23,62,${.9*bl})`);gb.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=gb;X.fillRect(tx-40*U,ty-th2-40*U,80*U,80*U);
      for(let k=0;k<3;k++){const ph=((t*.7+k/3)%1);X.strokeStyle=`rgba(8,225,255,${nn*.45*(1-ph)})`;X.lineWidth=3*U;X.beginPath();X.arc(tx,ty-th2,(30+ph*260)*U,Math.PI*1.05,Math.PI*1.95);X.stroke()}X.restore()}}
  X.restore();
  // destellos de luz cálidos en cada cambio
  C16.forEach(c=>flash(t,c[0],.16,.5,'255,236,205'));
  vineta(.45);
  for(let i=0;i<C16.length;i++)s16_card(t,i);
  // ===== cierre: logo brillando en la noche =====
  if(t>=25.55){const p=P(t,25.75,1.1),ly=760*U;X.save();X.globalCompositeOperation='lighter';const hk=ex(p)*(.75+.25*Math.sin(t*2.2));const gh=X.createRadialGradient(CX,ly,0,CX,ly,620*U);gh.addColorStop(0,`rgba(8,225,255,${.32*hk})`);gh.addColorStop(.45,`rgba(253,174,3,${.12*hk})`);gh.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=gh;X.fillRect(0,ly-620*U,W,1240*U);X.restore();
    if(p>0){const sc=.55+.45*bk(p,1.4);logo3D(CX,ly,650*U*sc,(1-ex(p))*1.3,{glow:'rgba(8,225,255,.65)',shine:P(t,27.0,1.1),a:cl(p*3)});}
    flare(CX+250*U,ly-200*U,ss(P(t,26.9,.4))*(1-ss(P(t,27.5,.9)))*.8,'180,230,255');
    const eo={f:'Fig',w:800},es=Math.min(fit('CRECE CADA DÍA',900*U,98*U,eo),fit('EL CANAL QUE',900*U,98*U,eo));
    rise('EL CANAL QUE',CX,1175*U,es,26.55,t,{...eo,glow:'rgba(3,10,20,.7)'});rise('CRECE CADA DÍA',CX,1278*U,es,26.75,t,{...eo,grad:['#FFF1C8','#FDAE03'],glow:'rgba(3,10,20,.7)'});
    const up=ex(P(t,27.3,.7));txt('/UNEVISION',CX,1405*U,60*U,{f:'Fig',w:700,c:K.cian,a:up,ls:4+(1-up)*30,glow:'rgba(8,225,255,.5)',gb:22*U})}
  flash(t,25.75,.55,.4,'200,240,255');
},
events:[['whoosh',0.35],['golpe',0.83],['whoosh',3.0],['golpe',3.48],['swipe',5.65],['golpe',6.13],['whoosh',8.25],['golpe',8.73],['swipe',10.85],['golpe',11.33],['whoosh',13.45],['golpe',13.93],['swipe',16.05],['golpe',16.53],['whoosh_largo',18.6],['golpe',19.18],['whoosh',21.45],['golpe',21.93],['riser',24.75],['golpe',25.75],['campana',27.0],['pop',26.6],['pop',27.3]],
musica:{estilo:'cinematic',bpm:92,tono:'D',hits:[0.83,6.13,11.33,16.53,21.93,25.75],final:25.75}});
})();
