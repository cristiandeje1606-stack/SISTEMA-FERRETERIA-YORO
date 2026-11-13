// escena 25 · CONSTELACIÓN (reel 9:16, 30 s) · estrellas que se unen en palabras y en el logo · Playfair Display
(()=>{
const s25_N=540;
const s25_SH=[[2.2,['AQUÍ','ESTAMOS']],[5.4,['NUESTRA','GENTE']],[8.6,['NUESTRA','TIERRA']],[11.8,['TU','CANAL']],[15.0,['CADA','DÍA']],[18.2,['CONTIGO']],[21.4,'LOGO']];
const s25_C={};
function s25_sprite(){if(s25_C.sp)return s25_C.sp;const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');const g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.12,'rgba(220,240,255,.9)');g.addColorStop(.35,'rgba(120,200,255,.25)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,64,64);s25_C.sp=c;return c}
// cielo precalculado (vía láctea + estrellas de fondo)
function s25_cielo(){if(s25_C.cielo)return s25_C.cielo;const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
  const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#020611');g.addColorStop(.6,'#071a33');g.addColorStop(1,'#0e2f52');x.fillStyle=g;x.fillRect(0,0,W,H);
  x.save();x.translate(W/2,H/2);x.rotate(-.9);for(let i=0;i<1600;i++){const u=(hs(i)-.5)*H*1.6,v=((hs(i+3)+hs(i+5)+hs(i+7))/3-.5)*380*U;const a=.05+.25*hs(i+9);x.fillStyle=i%7?`rgba(190,215,255,${a})`:`rgba(253,190,90,${a})`;x.fillRect(u,v,(1+hs(i+11)*1.6)*U,(1+hs(i+11)*1.6)*U)}
  const mg=x.createLinearGradient(0,-260*U,0,260*U);mg.addColorStop(0,'rgba(76,143,226,0)');mg.addColorStop(.5,'rgba(76,143,226,.13)');mg.addColorStop(1,'rgba(76,143,226,0)');x.fillStyle=mg;x.fillRect(-H,-260*U,H*2,520*U);x.restore();
  s25_C.cielo=c;return c}
// muestreo de bordes de una forma (texto o logo)
function s25_forma(k){if(s25_C['f'+k])return s25_C['f'+k];const sh=s25_SH[k][1];const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.fillStyle='#fff';x.textAlign='center';x.textBaseline='middle';
  const cy=CY-140*U;
  if(sh==='LOGO'){const w=780*U,h=w*LR();x.drawImage(LOGO,CX-w/2,cy-h/2,w,h)}
  else{const n=sh.length;sh.forEach((s,i)=>{let sz=300*U;x.font=`900 ${sz}px Playfair`;const m=x.measureText(s).width;sz=Math.min(sz,sz*940*U/m);x.font=`900 ${sz}px Playfair`;x.fillText(s,CX,cy+(i-(n-1)/2)*310*U)})}
  const d=x.getImageData(0,0,W,H).data;const st=Math.round(9*U);const A=(px,py)=>px<0||py<0||px>=W||py>=H?0:d[(py*W+px)*4+3];const pts=[];
  for(let py=0;py<H;py+=st)for(let px=0;px<W;px+=st){if(A(px,py)<128)continue;if(A(px+st,py)<128||A(px-st,py)<128||A(px,py+st)<128||A(px,py-st)<128)pts.push([px+(hs(px*3.1+py)-.5)*4*U,py+(hs(px+py*7.7)-.5)*4*U])}
  const sel=[];const M=Math.min(s25_N,pts.length);for(let i=0;i<M;i++)sel.push(pts[Math.floor(i*pts.length/M)]);
  // líneas: vecino más cercano (+ segundo si está cerca)
  const ed=[],seen=new Set();sel.forEach((p,i)=>{const ds=[];sel.forEach((q,j)=>{if(i!==j)ds.push([Math.hypot(p[0]-q[0],p[1]-q[1]),j])});ds.sort((a,b)=>a[0]-b[0]);
    for(let r=0;r<2;r++){const[dd,j]=ds[r]||[1e9,0];if(dd>(r?44:70)*U)continue;const key=i<j?i+'_'+j:j+'_'+i;if(!seen.has(key)){seen.add(key);ed.push([i,j])}}});
  const f={p:sel,e:ed};s25_C['f'+k]=f;return f}
function s25_casa(i){return[hs(i*1.3+2)*W,(.05+.8*hs(i*2.7+5))*H]}
// posición de la estrella i en el segundo t
function s25_pos(i,t){let k=-1;for(let j=0;j<s25_SH.length;j++)if(t>=s25_SH[j][0]-.0)k=j;const tgt=j=>{if(j<0)return s25_casa(i);const f=s25_forma(j);return i<f.p.length?f.p[i]:s25_casa(i)};
  if(k<0)return s25_casa(i);const d=hs(i+.5)*.4;const p=eio(P(t,s25_SH[k][0]+d,1.15));const a=tgt(k-1),b=tgt(k);
  // arco suave en el viaje
  const mx=(a[0]+b[0])/2+(hs(i+9)-.5)*300*U,my=(a[1]+b[1])/2+(hs(i+19)-.5)*300*U;const q=1-p;return[q*q*a[0]+2*q*p*mx+p*p*b[0],q*q*a[1]+2*q*p*my+p*p*b[1]]}

SCENE(25,{dur:30,
draw(t){
  // pre-cálculo (una vez)
  s25_SH.forEach((s,k)=>s25_forma(k));
  const z=1.06-.06*ss(P(t,0,30)),rot=Math.sin(t*.12)*.015,tilt=(1-eio(P(t,0,2.2)))*700*U;
  X.save();X.translate(CX,CY-tilt*.2);X.scale(z,z);X.rotate(rot);X.translate(-CX,-CY);X.drawImage(s25_cielo(),0,tilt*.35);X.restore();
  // estrellas de fondo que titilan
  const sp=s25_sprite();X.save();X.globalCompositeOperation='lighter';for(let i=0;i<160;i++){const x=hs(i+900)*W,y=(hs(i+700)*H*.9+tilt*.5);const a=.25+.35*Math.sin(t*(1+hs(i)*2)+i);const r=(6+10*hs(i+3))*U;X.globalAlpha=cl(a);X.drawImage(sp,x-r,y-r,r*2,r*2)}X.restore();
  // estrellas fugaces
  [[.7,.15,.12],[5.0,.75,.08],[11.5,.2,.2],[17.8,.8,.1],[24.4,.3,.16]].forEach(([t0,xx,yy],j)=>{const p=P(t,t0,.8);if(p<=0||p>=1)return;const x0=xx*W,y0=yy*H,dx=(j%2?-1:1)*700*U,dy=420*U;const x=x0+dx*ex(p),y=y0+dy*ex(p);
    X.save();X.globalCompositeOperation='lighter';const g=X.createLinearGradient(x,y,x-dx*.35,y-dy*.35);g.addColorStop(0,`rgba(255,255,255,${1-p})`);g.addColorStop(1,'rgba(255,255,255,0)');X.strokeStyle=g;X.lineWidth=4*U;X.beginPath();X.moveTo(x,y);X.lineTo(x-dx*.35,y-dy*.35);X.stroke();X.restore()});
  // ---- constelación ----
  let k=-1;for(let j=0;j<s25_SH.length;j++)if(t>=s25_SH[j][0])k=j;
  const fin=ss(P(t,24.6,1.2));const P0=[];for(let i=0;i<s25_N;i++)P0.push(s25_pos(i,t));
  X.save();X.translate(0,tilt*.5);
  if(k>=0){const f=s25_forma(k),t0=s25_SH[k][0];const nxt=k+1<s25_SH.length?s25_SH[k+1][0]:99;const fade=(1-ss(P(t,nxt-.35,.35)))*(1-fin*.75);
    X.save();X.globalCompositeOperation='lighter';X.lineCap='round';X.shadowColor=K.cian;X.shadowBlur=10*U;
    f.e.forEach(([a,b],n)=>{const pr=P(t,t0+1.1+(n/f.e.length)*1.0,.25);if(pr<=0)return;const A=P0[a],B=P0[b];X.strokeStyle=`rgba(${n%9?'120,210,255':'253,190,90'},${.75*fade})`;X.lineWidth=2.2*U;X.beginPath();X.moveTo(A[0],A[1]);X.lineTo(lerp(A[0],B[0],pr),lerp(A[1],B[1],pr));X.stroke()});X.restore()}
  if(k>=0&&s25_SH[k][1]!=='LOGO'){const t0=s25_SH[k][0];const nxt=k+1<s25_SH.length?s25_SH[k+1][0]:99;const a=ss(P(t,t0+1.6,.8))*(1-ss(P(t,nxt-.45,.35)))*.22;if(a>0){const sh=s25_SH[k][1],n=sh.length;
    sh.forEach((w,i)=>{const sz=Math.min(300*U,300*U*940*U/mw(w,300*U,{f:'Playfair',w:900}));txt(w,CX,CY-140*U+(i-(n-1)/2)*310*U,sz,{f:'Playfair',w:900,st:'normal',c:`rgba(150,215,255,${a})`,glow:`rgba(8,225,255,${a*2})`,gb:40*U})})}}
  X.save();X.globalCompositeOperation='lighter';P0.forEach(([x,y],i)=>{const tw=.75+.25*Math.sin(t*3+i*1.7);const big=hs(i+40)>.9;const r=(big?18:11)*U*tw*(1-fin*.5);X.globalAlpha=1;
    if(big||i%11===0){X.drawImage(sp,x-r*1.8,y-r*1.8,r*3.6,r*3.6)}X.drawImage(sp,x-r,y-r,r*2,r*2)});X.restore();
  // pulso de brillo al completar cada figura
  if(k>=0){const t0=s25_SH[k][0]+2.15;const p=P(t,t0,.6);if(p>0&&p<1){X.save();X.globalCompositeOperation='lighter';const g=X.createRadialGradient(CX,CY-140*U,0,CX,CY-140*U,700*U);g.addColorStop(0,`rgba(8,225,255,${.18*(1-p)})`);g.addColorStop(1,'rgba(8,225,255,0)');X.fillStyle=g;X.fillRect(0,0,W,H);X.restore()}}
  X.restore();
  // ---- intro: texto pequeño elegante ----
  if(t<2.4){const a=win(t,.3,2.3,.5,.4);txt('MIRA AL CIELO',CX,CY+520*U,56*U,{f:'Archivo',w:300,ls:22,c:'#CFE9FF',a})}
  // ---- cierre: logo real sobre su constelación ----
  if(t>=24.4){const ly=CY-140*U,lw=720*U;const a=ss(P(t,24.6,1));X.save();X.globalAlpha=a;const g=X.createRadialGradient(CX,ly,0,CX,ly,620*U);g.addColorStop(0,'rgba(8,225,255,.25)');g.addColorStop(1,'rgba(8,225,255,0)');X.fillStyle=g;X.fillRect(0,0,W,H);X.restore();
    logo3D(CX,ly,lw*(1+.02*Math.sin(t*1.5)),0,{a,depth:14,glow:'rgba(150,220,255,.6)',shine:P(t,25.6,1.4)});
    const r1=P(t,25.4,1);if(r1>0){X.save();X.globalAlpha=ss(r1);const sz=fit('CRECEMOS CONTIGO',960*U,130*U,{f:'Playfair',w:900});txt('CRECEMOS CONTIGO',CX,CY+380*U+(1-ex(r1))*40*U,sz,{f:'Playfair',w:900,st:'normal',c:'#fff',glow:'rgba(8,225,255,.6)',gb:30*U});X.restore()}
    txt('EL CANAL QUE CRECE CADA DÍA',CX,CY+525*U,fit('EL CANAL QUE CRECE CADA DÍA',960*U,72*U,{f:'Archivo',w:700,st:'condensed',ls:3}),{f:'Archivo',w:700,st:'condensed',ls:3,c:K.ambar,a:ss(P(t,26.4,.8))});
    txt('/UNEVISION',CX,CY+635*U,66*U,{f:'Archivo',w:500,ls:14,c:'#CFE9FF',a:ss(P(t,27.1,.8))})}
  // horizonte: cerros de Santa Bárbara en silueta
  X.save();X.translate(0,tilt*.9);X.fillStyle='#030a14';X.beginPath();X.moveTo(0,H);for(let x=0;x<=W;x+=12*U)X.lineTo(x,H-170*U-60*U*Math.sin(x/W*3.2+.7)-30*U*Math.sin(x/W*9+2));X.lineTo(W,H);X.fill();
  X.fillStyle='rgba(253,174,3,.8)';for(let i=0;i<14;i++){const x=hs(i+300)*W,y=H-(60+90*hs(i+310))*U;X.globalAlpha=.4+.4*Math.sin(t*2+i);X.fillRect(x,y,4*U,4*U)}X.restore();
  vineta(.45);
},
events:[['whoosh_largo',0.05],['swipe',0.7],['whoosh',2.2],['campana',3.3],['whoosh',5.4],['pop',6.5],['whoosh',8.6],['pop',9.7],['whoosh',11.5],['whoosh',11.8],['pop',12.9],['whoosh',15.0],['pop',16.1],['whoosh',17.8],['whoosh',18.2],['campana',19.3],['whoosh',21.4],['riser',23.6],['golpe',24.6],['campana',25.6],['pop',26.4],['pop',27.1]],
musica:{estilo:'orquesta',bpm:80,tono:'Ab',hits:[2.2,5.4,8.6,11.8,15.0,18.2,21.4,24.6],final:24.6}
});
})();
