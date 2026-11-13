// ===== Motor común UNE Visión · 25 piezas =====
// Cada escena: SCENE(n,{dur, draw:(t)=>{}, events:[[tipo,t],...]})  — todo depende de t (determinista).
const Q=new URLSearchParams(location.search);const NUM=+Q.get('n')||1;const W=+Q.get('w')||1920,H=+Q.get('h')||1080;
const cv=document.getElementById('c');cv.width=W;cv.height=H;const X=cv.getContext('2d');
const TV=W>H,U=Math.min(W,H)/1080,CX=W/2,CY=H/2,DG=Math.hypot(W,H),L=(a,b)=>TV?a:b;
const K={noche:'#06121F',marino:'#0B2238',cian:'#08E1FF',azul:'#4C8FE2',ambar:'#FDAE03',naranja:'#F6901C',brasa:'#EA4F3D',rojo:'#E3173E',blanco:'#FFFFFF',hielo:'#CFE9FF'};
// zonas seguras 9:16 (Reels): no poner texto importante arriba de 250 px ni abajo de H-380
const SAFE_T=L(60,260)*U,SAFE_B=L(H-60*U,H-400*U);
// ---------- curvas ----------
const cl=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),P=(t,a,d)=>cl((t-a)/d),lerp=(a,b,k)=>a+(b-a)*k;
const ex=x=>{x=cl(x);return x>=1?1:1-Math.pow(2,-10*x)},ss=x=>{x=cl(x);return x*x*(3-2*x)},eio=x=>{x=cl(x);return x<.5?16*x**5:1-Math.pow(-2*x+2,5)/2};
const bk=(x,s=1.7)=>{x=cl(x);const c3=s+1;return 1+c3*Math.pow(x-1,3)+s*Math.pow(x-1,2)};
const el=x=>{x=cl(x);if(x===0||x===1)return x;return Math.pow(2,-10*x)*Math.sin((x*10-.75)*2*Math.PI/3)+1};
const hs=i=>{const s=Math.sin(i*127.1+311.7)*43758.5453;return s-Math.floor(s)};
const win=(t,a,b,fi=.35,fo=.35)=>ex(P(t,a,fi))*(1-ss(P(t,b-fo,fo)));   // visible entre a y b
// ---------- texto ----------
// fuentes: 'Archivo' (stretch expanded/condensed, 100-900), 'Fig' (500/700/800), 'Anton','Bebas','Unbounded'(400-900),'Syne'(400-800),'Space'(400,700),'Playfair'(400-900),'BigSh'(400-900),'Oswald'(400,700),'Bang','Luck','Neue'
function font(sz,o={}){return `${o.it?'italic ':''}${o.w||900} ${sz}px ${o.f||'Archivo'}`}
function txt(s,x,y,sz,o={}){X.save();X.font=font(sz,o);X.fontStretch=o.st||((o.f||'Archivo')==='Archivo'?'expanded':'normal');X.letterSpacing=(o.ls||0)+'px';X.textAlign=o.al||'center';X.textBaseline='middle';
  if(o.a!==undefined)X.globalAlpha*=o.a;
  if(o.grad){const g=X.createLinearGradient(0,y-sz/2,0,y+sz/2);o.grad.forEach((c,i)=>g.addColorStop(i/(o.grad.length-1),c));X.fillStyle=g}else X.fillStyle=o.c||'#fff';
  if(o.glow){X.shadowColor=o.glow;X.shadowBlur=o.gb||26*U}
  if(o.stroke){X.lineJoin='round';X.lineWidth=o.sw||6*U;X.strokeStyle=o.stroke;X.strokeText(s,x,y)}
  X.fillText(s,x,y);X.restore()}
function mw(s,sz,o={}){X.save();X.font=font(sz,o);X.fontStretch=o.st||((o.f||'Archivo')==='Archivo'?'expanded':'normal');X.letterSpacing=(o.ls||0)+'px';const m=X.measureText(s).width;X.restore();return m}
const fit=(s,maxW,max,o={})=>Math.min(max,maxW/Math.max(1,mw(s,100,o))*100);
function wrap(s,maxW,sz,o={}){const ws=s.split(' ');const out=[];let cur='';for(const w of ws){const tt=cur?cur+' '+w:w;if(mw(tt,sz,o)>maxW&&cur){out.push(cur);cur=w}else cur=tt}if(cur)out.push(cur);return out}
// palabra que sube desde máscara
function rise(s,x,y,sz,t0,t,o={}){const p=ex(P(t,t0,o.d||.55));if(p<=0)return;X.save();const m=mw(s,sz,o);const al=o.al||'center';const x0=al==='left'?x:al==='right'?x-m:x-m/2;
  X.beginPath();X.rect(x0-30*U,y-sz*.75,m+60*U,sz*1.5);X.clip();txt(s,x,y+(1-p)*sz*1.15,sz,o);X.restore()}
// letras que caen y retumban (estilo AE): cada letra entra con escala y rebote
function slam(s,x,y,sz,t0,t,o={}){const st=o.stag||.045;const chars=[...s];const tot=mw(s,sz,o);let cx=o.al==='left'?x:x-tot/2;
  chars.forEach((ch,i)=>{const w=mw(ch,sz,o);const p=P(t,t0+i*st,o.d||.4);if(p>0){const sc=o.from||2.6;const k=sc-(sc-1)*bk(p,o.back||1.6);X.save();X.translate(cx+w/2,y);X.scale(k,k);X.globalAlpha*=cl(p*3);txt(ch,0,0,sz,{...o,al:'center'});X.restore()}cx+=w});}
// texto que se escribe
function typeOn(s,x,y,sz,t0,t,cps,o={}){const n=Math.floor(cl((t-t0)*cps,0,s.length));if(t<t0)return;const sub=s.slice(0,n);txt(sub,x,y,sz,{...o,al:o.al||'left'});
  if(n<s.length&&Math.floor(t*4)%2===0){const m=mw(sub,sz,o);X.fillStyle=o.c||'#fff';X.fillRect((o.al==='center'?x-mw(s,sz,o)/2:x)+m+4*U,y-sz*.45,sz*.08,sz*.9)}}
// ---------- fondos y efectos ----------
function bg(c1=K.noche,c2=K.marino,ang=0){const g=X.createLinearGradient(0,0,W*Math.cos(ang)+W*.0,H);g.addColorStop(0,c1);g.addColorStop(1,c2);X.fillStyle=g;X.fillRect(0,0,W,H)}
function vineta(a=.55){const g=X.createRadialGradient(CX,CY,Math.min(W,H)*.32,CX,CY,Math.max(W,H)*.78);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${a})`);X.fillStyle=g;X.fillRect(0,0,W,H)}
function particulas(t,k=1,n=50,cols=['8,225,255','253,174,3']){X.save();X.globalCompositeOperation='lighter';for(let i=0;i<n;i++){const x=(hs(i)*W+t*(10+hs(i+3)*30)*U)%W,y=((hs(i+7)*H-t*(8+hs(i+9)*18)*U)%H+H)%H;const a=(.15+.4*hs(i+5))*k*(.6+.4*Math.sin(t*2+i));
  X.fillStyle=`rgba(${cols[i%cols.length]},${a})`;X.beginPath();X.arc(x,y,(1+hs(i+11)*2.6)*U,0,7);X.fill()}X.restore()}
function rays(cx,cy,n,c1,c2,rot){X.fillStyle=c1;X.fillRect(0,0,W,H);X.fillStyle=c2;X.beginPath();for(let i=0;i<n;i++){const a=rot+i*2*Math.PI/n;X.moveTo(cx,cy);X.arc(cx,cy,DG,a,a+Math.PI/n)}X.fill()}
function grid(t,k=1,col='8,225,255',st=64){if(k<=0)return;X.save();X.strokeStyle=`rgba(${col},${.08*k})`;X.lineWidth=1.2*U;for(let x=(t*20*U)%(st*U);x<W;x+=st*U){X.beginPath();X.moveTo(x,0);X.lineTo(x,H);X.stroke()}for(let y=0;y<H;y+=st*U){X.beginPath();X.moveTo(0,y);X.lineTo(W,y);X.stroke()}X.restore()}
// rejilla en perspectiva (piso 3D que avanza)
function piso(t,horiz,col='8,225,255',vel=1,k=1){X.save();X.globalAlpha=k;X.strokeStyle=`rgba(${col},.35)`;X.lineWidth=2*U;for(let i=-20;i<=20;i++){X.beginPath();X.moveTo(CX+i*20*U,horiz);X.lineTo(CX+i*W*.18,H);X.stroke()}
  for(let j=0;j<16;j++){const z=((j+t*vel*1.5)%16)/16;const y=horiz+(H-horiz)*z*z;X.globalAlpha=k*z;X.beginPath();X.moveTo(0,y);X.lineTo(W,y);X.stroke()}X.restore()}
function flash(t,t0,k=.7,d=.3,col='255,255,255'){const f=1-P(t,t0,d);if(t>=t0&&f>0){X.fillStyle=`rgba(${col},${f*f*k})`;X.fillRect(0,0,W,H)}}
function shake(t,t0,a=14){const d=t-t0;if(d<0||d>.6)return[0,0];const e=Math.exp(-d*9)*a*U;return[Math.sin(d*80)*e,Math.cos(d*63)*e]}
function streak(t,t0,y,col='8,225,255',dir=1){const p=P(t,t0,.5);if(p<=0||p>=1)return;X.save();X.globalCompositeOperation='lighter';const x=dir>0?-W*.3+W*1.6*ex(p):W*1.3-W*1.6*ex(p);const g=X.createLinearGradient(x-dir*W*.35,0,x,0);
  g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(${col},${.9*(1-p)})`);X.fillStyle=g;X.fillRect(Math.min(x,x-dir*W*.35),y-3*U,W*.35,6*U);X.fillStyle=`rgba(255,255,255,${1-p})`;X.beginPath();X.arc(x,y,9*U,0,7);X.fill();X.restore()}
function flare(x,y,k,col='255,220,170'){if(k<=0)return;X.save();X.globalCompositeOperation='lighter';const r=420*U*k;const g=X.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(255,255,255,${.9*k})`);g.addColorStop(.08,`rgba(${col},${.5*k})`);g.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=g;X.beginPath();X.arc(x,y,r,0,7);X.fill();
  const lg=X.createLinearGradient(x-W*.6,y,x+W*.6,y);lg.addColorStop(0,'rgba(0,0,0,0)');lg.addColorStop(.5,`rgba(140,220,255,${.7*k})`);lg.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=lg;X.fillRect(x-W*.6,y-3*U,W*1.2,6*U);X.restore()}
// cintas cian y fuego que barren (transición de marca)
function cintas(t,t0,dur=.8){const p=P(t,t0-dur*.45,dur);if(p<=0||p>=1)return;X.save();X.translate(CX,CY);X.rotate(-.42);
  [[K.cian,K.azul,0],[K.ambar,K.brasa,.08]].forEach(([a,b,dl],i)=>{const q=ss(cl((p-dl)/.85));const x=-DG*1.1+DG*2.2*q;const g=X.createLinearGradient(x-DG*.3,0,x+DG*.3,0);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.3,a);g.addColorStop(.7,b);g.addColorStop(1,'rgba(0,0,0,0)');
    X.fillStyle=g;X.fillRect(x-DG*.35,(i?.18:-.22)*DG*.5-DG*.09,DG*.7,DG*.18)});X.restore()}
// trama de puntos
function dots(x,y,w,h,col,step,rmax,mode=0){X.save();X.beginPath();X.rect(x,y,w,h);X.clip();X.fillStyle=col;X.beginPath();for(let j=0,yy=y;yy<y+h+step;yy+=step*.866,j++)for(let xx=x+(j%2?step/2:0);xx<x+w+step;xx+=step){
  const f=mode===0?(xx-x)/w:mode===1?(yy-y)/h:Math.hypot(xx-CX,yy-CY)/(DG/2);const r=rmax*cl(f);if(r>.6){X.moveTo(xx+r,yy);X.arc(xx,yy,r,0,7)}}X.fill();X.restore()}
// vidrio
function glass(x,y,w,h,o={}){X.save();X.fillStyle=o.bg||'rgba(11,34,56,.62)';X.strokeStyle=o.st||'rgba(8,225,255,.45)';X.lineWidth=2*U;X.beginPath();X.roundRect(x,y,w,h,o.r||22*U);X.fill();X.stroke();if(o.acc){X.fillStyle=o.acc;X.fillRect(x,y+18*U,6*U,h-36*U)}X.restore()}
// ---------- 3D mínimo ----------
// proyecta (x,y,z) con cámara en z=-f ; devuelve [sx,sy,escala]
function p3(x,y,z,f=900*U,cx=CX,cy=CY){const s=f/(f+z);return[cx+x*s,cy+y*s,s]}
function rotY(p,a){const[x,y,z]=p;return[x*Math.cos(a)+z*Math.sin(a),y,-x*Math.sin(a)+z*Math.cos(a)]}
function rotX(p,a){const[x,y,z]=p;return[x,y*Math.cos(a)-z*Math.sin(a),y*Math.sin(a)+z*Math.cos(a)]}
// tarjeta 3D girando en Y (perspectiva simulada con escala horizontal + sombreado)
function card3D(cx,cy,w,h,ang,drawFront,o={}){const c=Math.cos(ang);X.save();X.translate(cx,cy);X.scale(Math.max(.02,Math.abs(c)),1);X.transform(1,Math.sin(ang)*.12,0,1,0,0);
  if(c>=0){X.save();X.beginPath();X.roundRect(-w/2,-h/2,w,h,o.r||24*U);X.clip();drawFront(w,h);X.restore()}else{X.fillStyle=o.back||K.marino;X.beginPath();X.roundRect(-w/2,-h/2,w,h,o.r||24*U);X.fill()}
  X.strokeStyle=o.edge||'rgba(8,225,255,.6)';X.lineWidth=3*U;X.beginPath();X.roundRect(-w/2,-h/2,w,h,o.r||24*U);X.stroke();X.fillStyle=`rgba(0,0,0,${(1-Math.abs(c))*.5})`;X.fillRect(-w/2,-h/2,w,h);X.restore()}
// ---------- logo ----------
const LOGO=new Image();LOGO.src='logo.png';const LG={};
function prepLogo(){const mk=f=>{const c=document.createElement('canvas');c.width=LOGO.width;c.height=LOGO.height;const x=c.getContext('2d');x.drawImage(LOGO,0,0);x.globalCompositeOperation='source-in';x.fillStyle=f;x.fillRect(0,0,c.width,c.height);return c};
  LG.dark=mk('#061426');LG.mid=mk('#163a66');LG.white=mk('#ffffff');LG.cian=mk(K.cian);LG.ambar=mk(K.ambar);LG.k=mk('#000')}
const LR=()=>LOGO.height/LOGO.width;  // alto/ancho = 0.878
function logo(cx,cy,w,o={}){const h=w*LR();X.save();X.globalAlpha*=o.a??1;X.translate(cx,cy);if(o.rot)X.rotate(o.rot);if(o.glow){X.shadowColor=o.glow;X.shadowBlur=o.gb||40*U}X.drawImage(o.tint?LG[o.tint]:LOGO,-w/2,-h/2,w,h);X.restore()}
// logo 3D extruido que gira en Y (ang en radianes) con brillo que lo recorre (shine 0..1)
function logo3D(cx,cy,w,ang=0,o={}){const h=w*LR(),depth=o.depth||24;const c=Math.cos(ang),s=Math.sin(ang),sx=Math.max(.03,Math.abs(c));X.save();X.globalAlpha*=o.a??1;
  for(let i=depth;i>=1;i--){X.save();X.translate(cx+s*i*1.5*U,cy+i*.55*U);X.scale(sx,1);X.drawImage(i<3?LG.mid:LG.dark,-w/2,-h/2,w,h);X.restore()}
  X.save();X.translate(cx,cy);X.scale(sx,1);if(o.glow){X.shadowColor=o.glow;X.shadowBlur=40*U}X.drawImage(c>=0?LOGO:LG.mid,-w/2,-h/2,w,h);X.restore();
  if(o.shine!==undefined&&o.shine>0&&o.shine<1){const tc=document.createElement('canvas');tc.width=LOGO.width;tc.height=LOGO.height;const tx=tc.getContext('2d');tx.drawImage(LOGO,0,0);tx.globalCompositeOperation='source-atop';
    const gx=-LOGO.width*.3+LOGO.width*1.6*o.shine;const g=tx.createLinearGradient(gx-160,0,gx+160,LOGO.height*.4);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.5,'rgba(255,255,255,.85)');g.addColorStop(1,'rgba(255,255,255,0)');tx.fillStyle=g;tx.fillRect(0,0,tc.width,tc.height);
    X.save();X.translate(cx,cy);X.scale(sx,1);X.drawImage(tc,-w/2,-h/2,w,h);X.restore()}X.restore()}
// revela el logo con barrido (p 0..1)
function logoWipe(cx,cy,w,p,o={}){const h=w*LR();X.save();X.beginPath();X.rect(cx-w/2-10,cy-h/2-10,(w+20)*ss(p),h+20);X.clip();logo(cx,cy,w,o);X.restore();
  if(p>0&&p<1){const sx=cx-w/2+(w+20)*ss(p);X.save();X.globalCompositeOperation='lighter';const g=X.createLinearGradient(sx-60*U,0,sx+8*U,0);g.addColorStop(0,'rgba(8,225,255,0)');g.addColorStop(1,'rgba(255,255,255,.95)');X.fillStyle=g;X.fillRect(sx-60*U,cy-h/2,68*U,h);X.restore()}}
// ---------- textos oficiales (usar solo estos datos) ----------
const DATOS={nombre:'UNE VISIÓN',eslogan:'EL CANAL QUE CRECE CADA DÍA',redes:'/UNEVISION',lugar:'SANTA BÁRBARA · HONDURAS',sede:'SAN JOSÉ DE COLINAS'};
// ---------- registro y bucle ----------
const SC={};function SCENE(n,def){SC[n]=def}
window.render=async function(t){X.setTransform(1,0,0,1,0,0);X.globalAlpha=1;X.globalCompositeOperation='source-over';X.filter='none';X.letterSpacing='0px';X.shadowBlur=0;
  const s=SC[NUM];if(!s){bg();txt('ESCENA '+NUM+' NO EXISTE',CX,CY,60*U);return true}
  await s.draw(t);const fo=P(t,s.dur-.35,.35);if(fo>0&&!s.noFadeOut){X.fillStyle=`rgba(0,0,0,${fo})`;X.fillRect(0,0,W,H)}return true};
window.META=()=>{const s=SC[NUM];return s?{dur:s.dur,events:s.events||[],musica:s.musica||{}}:null};
