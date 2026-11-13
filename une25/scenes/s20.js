// 20 · CUBO 3D (reel 9:16, 30 s) — cubo que rota mostrando una palabra en cada cara, luces y reflejos; al final se abre y deja el logo.
(()=>{
const BEAT=60/126,S=312*U,F=1500*U,D=1500*U,CY0=840*U;
const WORDS=['NOTICIAS','NUESTRA|GENTE','SANTA|BÁRBARA','TU|CANAL','INFORMACIÓN','CONTIGO','CADA|DÍA','NUESTRA|VOZ','NUESTRA|TIERRA','AQUÍ|ESTAMOS','SAN JOSÉ|DE COLINAS','LO QUE|PASA AQUÍ','CRECEMOS|CONTIGO'];
const STEPS=[3.0,5.0,7.0,9.0,11.0,13.0,15.0,17.0,19.0,21.0,23.0,23.45];   // 12 giros -> cara 0 al frente
const TILT=24.4,BOOM=25.6;
// caras: esquinas TL,TR,BR,BL y normal
const FACES=[
  {c:[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1]],n:[0,0,-1],id:0},
  {c:[[1,-1,-1],[1,-1,1],[1,1,1],[1,1,-1]],n:[1,0,0],id:1},
  {c:[[1,-1,1],[-1,-1,1],[-1,1,1],[1,1,1]],n:[0,0,1],id:2},
  {c:[[-1,-1,1],[-1,-1,-1],[-1,1,-1],[-1,1,1]],n:[-1,0,0],id:3},
  {c:[[-1,-1,1],[1,-1,1],[1,-1,-1],[-1,-1,-1]],n:[0,-1,0],id:'top'},
  {c:[[-1,1,-1],[1,1,-1],[1,1,1],[-1,1,1]],n:[0,1,0],id:'bot'}];
const TEX={},TS=512;
function s20_tex(key){if(TEX[key])return TEX[key];const c=document.createElement('canvas');c.width=c.height=TS;const g=c.getContext('2d');
  const gr=g.createLinearGradient(0,0,TS,TS);gr.addColorStop(0,'#123a63');gr.addColorStop(1,K.noche);g.fillStyle=gr;g.fillRect(0,0,TS,TS);
  // reflejo diagonal
  const rg=g.createLinearGradient(0,0,TS,TS*.7);rg.addColorStop(0,'rgba(255,255,255,.14)');rg.addColorStop(.45,'rgba(255,255,255,0)');g.fillStyle=rg;g.fillRect(0,0,TS,TS);
  const wi=typeof key==='number'?key:-1,warm=wi>=0&&wi%2===1;
  const eg=g.createLinearGradient(0,0,TS,TS);eg.addColorStop(0,warm?K.ambar:K.cian);eg.addColorStop(1,warm?K.brasa:K.azul);g.strokeStyle=eg;g.lineWidth=14;g.strokeRect(22,22,TS-44,TS-44);
  g.fillStyle=warm?K.ambar:K.cian;[[22,22],[TS-22,22],[22,TS-22],[TS-22,TS-22]].forEach(([x,y])=>{g.beginPath();g.arc(x,y,14,0,7);g.fill()});
  if(key==='top'){g.shadowColor='rgba(8,225,255,.6)';g.shadowBlur=30;const lw=380,lh=lw*LR();g.drawImage(LOGO,TS/2-lw/2,TS/2-lh/2,lw,lh)}
  else if(wi>=0){const L=WORDS[wi].split('|');g.textAlign='center';g.textBaseline='middle';const fz=s=>{g.font='900 100px BigSh';return Math.min(235,440/g.measureText(s).width*100)};const sz=Math.min(...L.map(fz));const lh=sz*.95,y0=TS/2+14-(L.length-1)*lh/2;
    g.font=`700 26px Space`;g.fillStyle=warm?K.ambar:K.cian;g.letterSpacing='8px';g.fillText('UNE VISIÓN',TS/2+4,70);g.letterSpacing='0px';
    g.font=`900 ${sz}px BigSh`;L.forEach((s,j)=>{const y=y0+j*lh;g.fillStyle='rgba(0,0,0,.45)';g.fillText(s,TS/2+5,y+7);const tg=g.createLinearGradient(0,y-sz/2,0,y+sz/2);tg.addColorStop(0,'#ffffff');tg.addColorStop(1,warm?'#FFD27A':'#BFF6FF');g.fillStyle=tg;g.fillText(s,TS/2,y)})}
  TEX[key]=c;return c}
function s20_tri(img,s0,s1,s2,d0,d1,d2){const cx=(d0[0]+d1[0]+d2[0])/3,cy=(d0[1]+d1[1]+d2[1])/3;const e=p=>{const dx=p[0]-cx,dy=p[1]-cy,l=Math.hypot(dx,dy)||1;return[p[0]+dx/l*1.2,p[1]+dy/l*1.2]};const a0=e(d0),a1=e(d1),a2=e(d2);
  X.save();X.beginPath();X.moveTo(a0[0],a0[1]);X.lineTo(a1[0],a1[1]);X.lineTo(a2[0],a2[1]);X.closePath();X.clip();
  const[x0,y0]=s0,[x1,y1]=s1,[x2,y2]=s2,[u0,v0]=d0,[u1,v1]=d1,[u2,v2]=d2;const den=(x1-x0)*(y2-y0)-(x2-x0)*(y1-y0);
  const a=((u1-u0)*(y2-y0)-(u2-u0)*(y1-y0))/den,c=((u2-u0)*(x1-x0)-(u1-u0)*(x2-x0))/den,b=((v1-v0)*(y2-y0)-(v2-v0)*(y1-y0))/den,d=((v2-v0)*(x1-x0)-(v1-v0)*(x2-x0))/den;
  X.transform(a,b,c,d,u0-a*x0-c*y0,v0-b*x0-d*y0);X.drawImage(img,0,0);X.restore()}
const rot=(p,ay,ax)=>rotX(rotY(p,ay),ax);
function s20_proj(p,sc,cy){const z=p[2]*sc+D;return[CX+p[0]*sc*F/z,cy+p[1]*sc*F/z,z]}
function s20_orient(t){let k=0,fr=0;for(let i=0;i<STEPS.length;i++){const d=i===STEPS.length-1?.35:.6;if(t>=STEPS[i]+d)k=i+1;else if(t>=STEPS[i]){k=i;fr=bk(P(t,STEPS[i],d),1.3);break}}
  const tilt=eio(P(t,TILT,1.0));const sway=(-.32+.07*Math.sin(t*1.3))*(1-tilt);
  const ay=(k+fr)*Math.PI/2+sway;const ax=lerp(.2+.04*Math.sin(t*.9),Math.PI/2,tilt);return{ay,ax,kc:k+fr}}
function s20_word(fid,kc){const base=Math.max(0,Math.floor(kc+.5)-1);for(let k=base;k<base+4;k++)if(k%4===fid)return Math.min(k,WORDS.length-1);return fid}
function s20_cube(t,sc,cy,ay,ax,kc,boom,refl){const fs=[];
  for(const f of FACES){const off=f.n.map(v=>v*boom*1100*U);const nr=rot(f.n,ay,ax);
    const C3=f.c.map(p=>rot([p[0]*S+off[0],p[1]*S+off[1],p[2]*S+off[2]],ay,ax));const C=C3.map(p=>s20_proj(p,sc,cy));if(C.some(p=>p[2]<200*U))continue;
    const cr=(C[1][0]-C[0][0])*(C[3][1]-C[0][1])-(C[1][1]-C[0][1])*(C[3][0]-C[0][0]);if(cr<=0)continue;
    fs.push({f,C3,C,nr,z:(C3[0][2]+C3[2][2])/2})}
  fs.sort((a,b)=>b.z-a.z);
  const LD=[-.45,-.6,-.66];
  for(const o of fs){const{f,C3,nr}=o;const img=f.id==='top'?s20_tex('top'):f.id==='bot'?s20_tex('bot'):s20_tex(s20_word(f.id,kc));const n=refl?3:5;
    const G=[];for(let j=0;j<=n;j++){G.push([]);for(let i=0;i<=n;i++){const u=i/n,v=j/n;const top=C3[0].map((q,m)=>lerp(q,C3[1][m],u)),bot=C3[3].map((q,m)=>lerp(q,C3[2][m],u));G[j].push(s20_proj(top.map((q,m)=>lerp(q,bot[m],v)),sc,cy))}}
    const st=TS/n;for(let j=0;j<n;j++)for(let i=0;i<n;i++){const p00=G[j][i],p10=G[j][i+1],p01=G[j+1][i],p11=G[j+1][i+1];
      s20_tri(img,[i*st,j*st],[(i+1)*st,j*st],[i*st,(j+1)*st],p00,p10,p01);s20_tri(img,[(i+1)*st,j*st],[(i+1)*st,(j+1)*st],[i*st,(j+1)*st],p10,p11,p01)}
    const C=o.C;const lit=.35+.65*cl(nr[0]*LD[0]+nr[1]*LD[1]+nr[2]*LD[2]);
    X.beginPath();X.moveTo(C[0][0],C[0][1]);for(let m=1;m<4;m++)X.lineTo(C[m][0],C[m][1]);X.closePath();
    X.fillStyle=`rgba(2,8,16,${cl(.75-lit)*.9})`;X.fill();
    if(!refl){X.save();X.shadowColor=K.cian;X.shadowBlur=22*U;X.strokeStyle=`rgba(120,240,255,${.55+.35*lit})`;X.lineWidth=3*U;X.stroke();X.restore()}}
  return fs}
SCENE(20,{dur:30,draw(t){
  // fondo: luz de escenario, rayos y piso
  const g=X.createLinearGradient(0,0,0,H);g.addColorStop(0,'#030913');g.addColorStop(.6,'#0a1d33');g.addColorStop(1,'#02060c');X.fillStyle=g;X.fillRect(0,0,W,H);
  const beat=(t%BEAT)/BEAT,pul=Math.exp(-beat*5)*(t>1.3&&t<BOOM);
  X.save();X.globalAlpha=.13+.08*pul;X.globalCompositeOperation='lighter';X.translate(CX,CY0);X.rotate(t*.12);for(let i=0;i<12;i++){X.rotate(Math.PI/6);const rg=X.createLinearGradient(0,0,0,-DG*.7);rg.addColorStop(0,i%2?'rgba(8,225,255,.6)':'rgba(253,174,3,.5)');rg.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=rg;X.beginPath();X.moveTo(0,0);X.lineTo(-70*U,-DG*.7);X.lineTo(70*U,-DG*.7);X.fill()}X.restore();
  piso(t,1210*U,'8,225,255',1.2,.55);
  particulas(t,.7,40);
  // entrada: llega desde el fondo girando
  const ip=P(t,0,1.3),ie=ex(ip);let sc=lerp(.05,1,ie)*(1+.04*pul);const{ay,ax,kc}=s20_orient(t);let ay2=ay+(1-ie)*5.5,ax2=ax+(1-ie)*2.2;
  // golpes de cámara
  const hits=[1.3,...STEPS.map(s=>s+.32),TILT+.9];let sh=[0,0];hits.forEach(h=>{const s=shake(t,h,h===1.3?22:7);sh[0]+=s[0];sh[1]+=s[1]});
  const zoom=1+.12*Math.sin(Math.PI*P(t,11,1.8))+.08*Math.sin(Math.PI*P(t,19,1.8));sc*=zoom;
  const boom=t>=BOOM?ex(P(t,BOOM,1.1)):0;const cy=CY0+sh[1];
  X.save();X.translate(sh[0],0);
  // reflejo en el piso
  if(boom<.05){X.save();X.translate(0,1210*U*2+40*U);X.scale(1,-1);X.globalAlpha=.16;s20_cube(t,sc,cy,ay2,ax2,kc,0,true);X.restore();
    const fg=X.createLinearGradient(0,1210*U,0,H);fg.addColorStop(0,'rgba(2,6,12,0)');fg.addColorStop(.55,'rgba(2,6,12,.75)');fg.addColorStop(1,'rgba(2,6,12,.85)');X.fillStyle=fg;X.fillRect(0,1210*U,W,H-1210*U)}
  // sombra
  X.save();X.translate(CX,1225*U);X.scale(1,.16);const sg=X.createRadialGradient(0,0,0,0,0,420*U);sg.addColorStop(0,`rgba(0,0,0,${.6*ie*(1-boom)})`);sg.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=sg;X.fillRect(-420*U,-420*U,840*U,840*U);X.restore();
  if(boom<1)s20_cube(t,sc,cy,ay2,ax2,kc,boom,false);
  X.restore();
  // estela de luz en cada giro
  STEPS.forEach((s,i)=>streak(t,s,(i%2?1360:330)*U,i%2?'253,174,3':'8,225,255',i%2?-1:1));
  flash(t,1.3,.6,.3);
  // ===== cierre: el cubo se abre y queda el logo =====
  if(t>=BOOM-.05){const p=P(t,BOOM,1.0),ly=780*U;flash(t,BOOM,.85,.45,'210,245,255');
    X.save();X.globalCompositeOperation='lighter';const gl=X.createRadialGradient(CX,ly,0,CX,ly,650*U);gl.addColorStop(0,`rgba(8,225,255,${.3*ex(p)})`);gl.addColorStop(.5,`rgba(253,174,3,${.08*ex(p)})`);gl.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=gl;X.fillRect(0,0,W,H);X.restore();
    logo3D(CX,ly,680*U*(.3+.7*bk(p,1.6)),(1-ex(p))*2.2,{glow:'rgba(8,225,255,.6)',shine:P(t,26.9,1.0),a:cl(p*4)});
    const o={f:'BigSh',w:900},es=fit('EL CANAL QUE CRECE',940*U,120*U,o);
    slam('EL CANAL QUE CRECE',CX,1175*U,es,26.3,t,{...o,from:2.4,stag:.03,c:'#fff',glow:'rgba(0,0,0,.6)'});
    slam('CADA DÍA',CX,1290*U,es*1.05,26.75,t,{...o,from:2.4,stag:.05,grad:['#FFE7A8',K.ambar],glow:'rgba(0,0,0,.6)'});
    const up=ex(P(t,27.4,.5));txt('/UNEVISION',CX,1415*U,58*U,{f:'Space',w:700,c:K.cian,a:up,ls:8+(1-up)*26})}
  vineta(.5);
},
events:[['riser',0.3],['golpe',1.3],['whoosh',3.0],['golpe',3.32],['whoosh',5.0],['golpe',5.32],['whoosh',7.0],['golpe',7.32],['whoosh',9.0],['golpe',9.32],['whoosh_largo',11.0],['golpe',11.32],
  ['whoosh',13.0],['golpe',13.32],['whoosh',15.0],['golpe',15.32],['whoosh',17.0],['golpe',17.32],['whoosh_largo',19.0],['golpe',19.32],['whoosh',21.0],['golpe',21.32],['swipe',23.0],['swipe',23.45],
  ['whoosh_largo',24.4],['riser',24.6],['golpe',25.6],['campana',26.9],['pop',26.3],['pop',26.75],['pop',27.4]],
musica:{estilo:'edm',bpm:126,tono:'Am',hits:[1.3,9.32,17.32,25.6],final:25.6}});
})();
