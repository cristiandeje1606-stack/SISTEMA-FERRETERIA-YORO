// escena 23 · ORIGAMI (reel 9:16, 30 s) · papel plegado, tipografía Figtree 800 en cintas de papel
(()=>{
const s23_F={f:'Fig',w:800,st:'normal'};
const s23_PAPEL='#F3EDE3';
function s23_rgb(h){const n=parseInt(h.slice(1),16);return[(n>>16)&255,(n>>8)&255,n&255]}
function s23_tono(h,k){const[r,g,b]=s23_rgb(h);const f=v=>Math.round(k>=0?v+(255-v)*k:v*(1+k));return`rgb(${f(r)},${f(g)},${f(b)})`}
// triángulo que se pliega: eje A-B fijo; C gira alrededor del eje (th=0 plano, th=PI plegado encima)
function s23_tri(A,B,C,th,col,o={}){const ax=B[0]-A[0],ay=B[1]-A[1],L2=ax*ax+ay*ay;const u=((C[0]-A[0])*ax+(C[1]-A[1])*ay)/L2;const F=[A[0]+ax*u,A[1]+ay*u];const c=Math.cos(th);
  const C2=[F[0]+(C[0]-F[0])*c,F[1]+(C[1]-F[1])*c];const front=c>=0;const luz=(o.luz||0)+(front?.08*(1-c):-.18-.12*(1+c));
  X.save();if(o.sombra){X.shadowColor='rgba(60,40,20,.28)';X.shadowBlur=26*U;X.shadowOffsetY=14*U}X.fillStyle=s23_tono(front?col:(o.back||col),luz);X.beginPath();X.moveTo(A[0],A[1]);X.lineTo(B[0],B[1]);X.lineTo(C2[0],C2[1]);X.closePath();X.fill();X.restore();
  // filo de luz en el pliegue
  X.save();X.strokeStyle=`rgba(255,255,255,${.35*Math.abs(Math.sin(th))+.12})`;X.lineWidth=2*U;X.beginPath();X.moveTo(A[0],A[1]);X.lineTo(B[0],B[1]);X.stroke();X.restore()}
// figura: lista de [A,B,C,color,retraso,luz]; se dibuja trasladada/escalada; th por pieza = fn(retraso)
function s23_fig(tris,cx,cy,sc,rot,thf,o={}){X.save();X.translate(cx,cy);X.rotate(rot||0);const m=p=>[p[0]*sc,p[1]*sc];tris.forEach((q,i)=>{const th=thf(q[4]??i,i);if(th===null)return;s23_tri(m(q[0]),m(q[1]),m(q[2]),th,q[3],{luz:q[5]||0,sombra:o.sombra&&i===0,back:o.back})});X.restore()}
// cinta de papel con texto que se despliega desde su bisagra superior
function s23_banda(s,y,sz,t0,t1,t,bc,tc,o={}){const pin=P(t,t0,.65),pout=P(t,t1-.4,.4);if(pin<=0||pout>=1)return;const th=(Math.PI/2)*(1-bk(pin,1.4))-(Math.PI/2)*ex(pout)*0;const k=Math.cos(th)*(1-ss(pout));
  const w=mw(s,sz,{...s23_F,ls:o.ls||0})+90*U,h=sz*1.32;X.save();X.translate(CX+(o.dx||0),y-h/2);X.rotate(o.rot||0);X.scale(1,Math.max(.001,k));
  X.shadowColor='rgba(60,40,20,.3)';X.shadowBlur=24*U;X.shadowOffsetY=12*U;X.fillStyle=bc;X.beginPath();X.moveTo(-w/2,0);X.lineTo(w/2,0);X.lineTo(w/2+(o.cut||0)*U,h);X.lineTo(-w/2-(o.cut||0)*U,h);X.closePath();X.fill();X.shadowColor='transparent';
  // pliegue central sutil
  const g=X.createLinearGradient(-w/2,0,w/2,0);g.addColorStop(0,'rgba(255,255,255,.10)');g.addColorStop(.5,'rgba(0,0,0,.10)');g.addColorStop(.51,'rgba(255,255,255,.10)');g.addColorStop(1,'rgba(0,0,0,.08)');X.fillStyle=g;X.fill();
  txt(s,0,h/2+sz*.04,sz,{...s23_F,c:tc,ls:o.ls||0});X.fillStyle=`rgba(0,0,0,${.45*Math.sin(Math.abs(th))})`;X.fillRect(-w/2-60*U,0,w+120*U,h);X.restore()}
// fondo de papel con facetas grandes
function s23_fondo(t,tint){const g=X.createLinearGradient(0,0,W,H);g.addColorStop(0,'#F7F2EA');g.addColorStop(1,'#E4D9C8');X.fillStyle=g;X.fillRect(0,0,W,H);
  X.save();for(let i=0;i<9;i++){const x=hs(i)*W,y=hs(i+20)*H,r=(380+300*hs(i+5))*U,a=hs(i+9)*6+t*.03*(i%2?1:-1);X.fillStyle=`rgba(${i%3?'120,90,60':'255,255,255'},${i%3?.035:.25})`;X.beginPath();
    for(let k=0;k<3;k++){const aa=a+k*2.094;k?X.lineTo(x+Math.cos(aa)*r,y+Math.sin(aa)*r):X.moveTo(x+Math.cos(aa)*r,y+Math.sin(aa)*r)}X.fill()}X.restore();
  if(tint){X.fillStyle=tint;X.fillRect(0,0,W,H)}}
// ---------- geometrías ----------
function s23_rosa(R){const out=[];const pts=[];for(let k=0;k<16;k++){const a=-Math.PI/2+k*Math.PI/8;const r=k%2?R*.36:(k%4?R*.72:R);pts.push([Math.cos(a)*r,Math.sin(a)*r])}
  for(let k=0;k<16;k+=2){const P0=pts[k],Pl=pts[(k+15)%16],Pr=pts[(k+1)%16];const col=k%4?K.azul:K.cian;out.push([[0,0],P0,Pl,col,k/2,.12]);out.push([[0,0],P0,Pr,col,k/2+.5,-.22])}return out}
function s23_estrella(R){const out=[];const pts=[];for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5;const r=k%2?R*.42:R;pts.push([Math.cos(a)*r,Math.sin(a)*r])}
  for(let k=0;k<10;k+=2){out.push([[0,0],pts[k],pts[(k+9)%10],K.ambar,k/2,.15]);out.push([[0,0],pts[k],pts[(k+1)%10],K.naranja,k/2+.5,-.1])}return out}
// grulla (de perfil, mira a la derecha). ala: [eje A,B, punta]
const s23_GR=[[[-150,40],[150,40],[-10,105],K.brasa,0,-.1],[[-150,40],[150,40],[10,-20],K.naranja,1,.05],
  [[60,40],[150,40],[340,-270],K.rojo,2,.05],[[340,-270],[310,-238],[420,-215],K.rojo,3,-.15],[[-70,40],[-150,40],[-380,-210],K.brasa,2.5,-.05]];
function s23_grulla(cx,cy,sc0,t,ph,ap,aleteo){X.save();X.translate(cx,cy);const s23_m=p=>[p[0]*sc0,p[1]*sc0];const fl=aleteo?Math.sin(t*7+ph):.0;
  // ala trasera
  if(ap(4)!==null)s23_tri(s23_m([-110,30]),s23_m([110,30]),s23_m([60,-330]),cl(.5+.9*fl,-1.2,2.9)+ (ap(4)||0),K.ambar,{luz:-.2,back:K.naranja});
  s23_GR.forEach((q,i)=>{const th=ap(q[4]);if(th===null)return;s23_tri(s23_m(q[0]),s23_m(q[1]),s23_m(q[2]),th,q[3],{luz:q[5],sombra:i===0})});
  if(ap(4.5)!==null)s23_tri(s23_m([-110,30]),s23_m([110,30]),s23_m([-50,-350]),cl(.25-.9*fl,-1.2,2.9)+(ap(4.5)||0),K.ambar,{luz:.12,back:K.naranja});X.restore()}
// sobre de 4 solapas (para revelar el logo)
function s23_sobre(cx,cy,S,t,t0,base){X.save();X.translate(cx,cy);const h=S/2;
  X.shadowColor='rgba(40,30,20,.35)';X.shadowBlur=40*U;X.shadowOffsetY=20*U;X.fillStyle=K.marino;X.beginPath();X.roundRect(-h,-h,S,S,10*U);X.fill();X.shadowColor='transparent';
  const g=X.createRadialGradient(0,-h*.3,0,0,0,S*.8);g.addColorStop(0,'#14375a');g.addColorStop(1,'#061426');X.fillStyle=g;X.beginPath();X.roundRect(-h,-h,S,S,10*U);X.fill();
  const ol=P(t,t0+.4,1.2);if(ol>0){X.save();X.globalAlpha=ss(ol);base(S)}
  if(ol>0)X.restore();
  const fl=[[[-h,-h],[h,-h],[0,0],K.cian,0],[[h,-h],[h,h],[0,0],K.ambar,1],[[h,h],[-h,h],[0,0],K.brasa,2],[[-h,h],[-h,-h],[0,0],K.azul,3]];
  fl.forEach(([A,B,C,c,d])=>{const p=P(t,t0+d*.18,.7);const th=Math.PI*.985*eio(p);if(p>=1)return;s23_tri(A,B,C,th,c,{luz:-.05,back:s23_tono(c,-.35)})});X.restore()}

SCENE(23,{dur:30,
draw(t){
  s23_fondo(t);
  const cy=CY+190*U;
  // ---------- 0–3.3 · hoja que cae y se pliega ----------
  if(t<3.4){const e=bk(P(t,0,.9),1.3);const S=620*U;const rot=(1-e)*1.4-.785;const y=lerp(-500*U,cy,ex(P(t,0,.8)));const out=eio(P(t,2.9,.5));
    X.save();X.translate(CX,y);X.rotate(rot+out*.9);X.scale(1-out,1-out);const h=S/2;
    const f1=eio(P(t,1.2,.6)),f2=eio(P(t,2.1,.55));
    // mitad fija
    if(f2<1)s23_tri([-h,-h],[h,h],[-h,h],0,K.naranja,{luz:-.05,sombra:true});
    s23_tri([-h,-h],[h,h],[h,-h],Math.PI*.995*f1,K.ambar,{luz:.06,back:K.naranja,sombra:f1<.02});
    if(f2>0){X.save();X.globalAlpha=1;s23_tri([-h,-h],[0,0],[-h,h],Math.PI*.99*f2,K.naranja,{luz:-.05,back:K.brasa});X.restore()}
    X.restore();
    s23_banda('CADA DÍA',470*U,150*U,.35,3.2,t,K.marino,'#fff');
    s23_banda('TOMA FORMA',680*U,120*U,1.25,3.2,t,K.brasa,'#fff',{rot:-.03})}
  // ---------- 3.3–7.3 · rosa de los vientos que se despliega ----------
  else if(t<7.3){const R=440*U;const ros=s23_rosa(1);const sp=t-3.3;const close=eio(P(t,6.8,.5));
    s23_fig(ros,CX,cy,R*(1-close*.85)*(1+.04*ss(P(t,3.3,3))),sp*.12+close*1.5,(d)=>{const p=P(t,3.35+d*.11,.55);if(p<=0)return null;return Math.PI*.98*(1-eio(p))+Math.PI*.98*close},{});
    // centro
    X.save();X.fillStyle='#fff';X.beginPath();X.arc(CX,cy,14*U*(1-close),0,7);X.fill();X.restore();
    s23_banda('TU CANAL',470*U,150*U,3.5,5.5,t,K.marino,'#fff');
    s23_banda('NUESTRA VOZ',470*U,130*U,5.5,7.3,t,K.cian,K.noche,{rot:.02})}
  // ---------- 7.3–13.3 · la grulla ----------
  else if(t<13.3){const t0=7.35;const fly=ss(P(t,11.4,1.9));const x=CX+40*U+fly*900*U,y=cy+40*U-fly*700*U,sc=U*(1.05-fly*.4);
    const ap=d=>{const p=P(t,t0+d*.32,.6);if(p<=0)return null;return Math.PI*.97*(1-eio(p))};
    s23_grulla(x,y+Math.sin(t*1.6)*14*U,sc,t,0,ap,t>9.3);
    // bandada pequeña que cruza
    for(let i=0;i<3;i++){const p=P(t,11.2+i*.25,2.2);if(p<=0||p>=1)continue;const bx=-200*U+p*(W+400*U),by=(1350+i*110)*U-p*500*U;s23_grulla(bx,by,U*(.22+.05*i),t+i,i,()=>0,true)}
    s23_banda('NUESTRA',430*U,140*U,7.5,10.3,t,K.marino,'#fff');
    s23_banda('TIERRA',620*U,160*U,7.75,10.3,t,K.brasa,'#fff',{rot:-.025});
    s23_banda('NUESTRA',430*U,140*U,10.35,13.3,t,K.marino,'#fff');
    s23_banda('GENTE',620*U,160*U,10.6,13.3,t,K.ambar,K.noche,{rot:.025})}
  // ---------- 13.3–19.4 · estrella facetada ----------
  else if(t<19.4){const R=400*U;const sp=t-13.3;const close=eio(P(t,18.9,.5));
    // destellos de papel alrededor
    for(let i=0;i<14;i++){const a=i*.4488+sp*.2,r=(520+60*Math.sin(t*2+i))*U*ex(P(t,13.9+i*.03,.8));const s=(22+20*hs(i))*U;X.save();X.translate(CX+Math.cos(a)*r,cy+Math.sin(a)*r);X.rotate(a*2+t);X.fillStyle=[K.cian,K.ambar,K.brasa,K.azul][i%4];X.globalAlpha=(1-close)*.9;X.beginPath();X.moveTo(0,-s);X.lineTo(s*.8,s*.6);X.lineTo(-s*.8,s*.6);X.closePath();X.fill();X.restore()}
    const pul=1+.03*Math.sin(t*4.6);s23_fig(s23_estrella(1),CX,cy,R*pul*(1-close*.6),Math.sin(sp*.8)*.12,(d)=>{const p=P(t,13.4+d*.13,.6);if(p<=0)return null;return Math.PI*.98*(1-eio(p))+Math.PI*.98*close},{});
    s23_banda('CADA DÍA',470*U,150*U,13.5,15.6,t,K.marino,'#fff');
    s23_banda('CRECEMOS',430*U,140*U,15.7,19.4,t,K.marino,'#fff');
    s23_banda('CONTIGO',620*U,165*U,16.0,19.4,t,K.ambar,K.noche,{rot:-.025})}
  // ---------- 19.4–30 · el sobre se abre: logo ----------
  else{const t0=19.45;const S=700*U;const e=bk(P(t,t0,.7),1.5);const ly=lerp(cy,CY-160*U,eio(P(t,22.8,.9)));
    const tilt=Math.sin((t-t0)*.9)*.08*ss(P(t,23,1));X.save();X.translate(CX,ly);X.scale(e*(1-Math.abs(tilt)),e);X.rotate(tilt*.3);X.translate(-CX,-ly);
    s23_sobre(CX,ly,S,t,20.6,(S)=>{const sc=.6+.4*bk(P(t,21,.7),1.6);logo3D(0,0,S*.74*sc,(1-ex(P(t,21,1.1)))*Math.PI*1.2,{depth:16,shine:P(t,22.2,1.2),glow:'rgba(8,225,255,.35)'})});X.restore();
    s23_banda('AQUÍ ESTAMOS',470*U,130*U,19.6,22.6,t,K.brasa,'#fff');
    s23_banda('EL CANAL QUE CRECE',CY+330*U,90*U,23.6,40,t,K.marino,'#fff');
    s23_banda('CADA DÍA',CY+480*U,140*U,23.95,40,t,K.ambar,K.noche,{rot:-.02});
    s23_banda('/UNEVISION',CY+630*U,68*U,24.6,40,t,K.cian,K.noche,{rot:.02})}
  // pliegue de transición: una hoja diagonal barre la pantalla en cada cambio
  [3.3,7.3,13.3,19.4].forEach((tc,i)=>{const p=P(t,tc-.28,.56);if(p<=0||p>=1)return;const c=[K.cian,K.ambar,K.brasa,K.marino][i];X.save();X.translate(CX,CY);X.rotate(-.6+i*.35);const x=lerp(-DG,DG,eio(p));
    X.shadowColor='rgba(40,30,20,.35)';X.shadowBlur=40*U;X.fillStyle=c;X.beginPath();X.moveTo(x-DG*.25,-DG);X.lineTo(x+DG*.25,-DG);X.lineTo(x+DG*.05,DG);X.lineTo(x-DG*.45,DG);X.closePath();X.fill();
    X.fillStyle='rgba(255,255,255,.18)';X.beginPath();X.moveTo(x-DG*.25,-DG);X.lineTo(x-DG*.05,-DG);X.lineTo(x-DG*.25,DG);X.lineTo(x-DG*.45,DG);X.closePath();X.fill();X.restore()});
},
events:[['whoosh',0.05],['golpe',0.85],['pop',0.4],['swipe',1.2],['pop',1.3],['swipe',2.1],['whoosh',3.05],['pop',3.5],['pop',4.2],['pop',5.5],['whoosh',7.05],['pop',7.5],['pop',8.6],['swipe',9.3],['pop',10.35],['whoosh_largo',11.4],['whoosh',13.05],['golpe',13.5],['pop',15.7],['golpe',16.0],['whoosh',19.15],['pop',19.6],['riser',19.6],['swipe',20.6],['golpe',21.0],['campana',22.2],['pop',23.6],['pop',24.6]],
musica:{estilo:'ambient',bpm:88,tono:'Bb',hits:[0.85,3.3,7.3,13.5,16.0,21.0],final:21.0}
});
})();
