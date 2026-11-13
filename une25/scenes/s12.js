// escena 12 · LLUVIA DE ÍCONOS (redes + TV, 20 s) — latin 100 Am
(()=>{
const D=20;
const s12_rr=(x,y,w,h,r)=>{X.beginPath();X.roundRect(x,y,w,h,r)};
const LK={f:'Luck',w:400,st:'normal'};
// caída con rebotes (física cerrada, determinista): devuelve [altura sobre el piso, tiempo desde el último impacto]
function s12_fall(dt,h,g,e){if(dt<0)return null;const T=Math.sqrt(2*h/g);if(dt<T)return[h-.5*g*dt*dt,-1];dt-=T;let v=g*T*e;
  for(let k=0;k<7;k++){const Tb=2*v/g;if(dt<Tb)return[v*dt-.5*g*dt*dt,dt];dt-=Tb;v*=e}return[0,dt+9]}
const s12_fold=(x,a,b)=>{const w=b-a;let u=((x-a)%(2*w)+2*w)%(2*w);return a+(u>w?2*w-u:u)};
// ---------- formas de íconos (centradas, tamaño s) ----------
const s12_SH={
  heart(s){const k=s/2;X.beginPath();X.moveTo(0,k*.85);X.bezierCurveTo(-k*1.55,-k*.15,-k*.85,-k*1.25,0,-k*.45);X.bezierCurveTo(k*.85,-k*1.25,k*1.55,-k*.15,0,k*.85);X.closePath()},
  bell(s){const k=s/2;X.beginPath();X.moveTo(-k*.82,k*.45);X.quadraticCurveTo(-k*.6,k*.28,-k*.6,-k*.12);X.bezierCurveTo(-k*.6,-k*.82,k*.6,-k*.82,k*.6,-k*.12);X.quadraticCurveTo(k*.6,k*.28,k*.82,k*.45);X.closePath();
    X.moveTo(k*.18,k*.62);X.arc(0,k*.62,k*.18,0,7);X.moveTo(k*.1,-k*.8);X.arc(0,-k*.8,k*.1,0,7)},
  share(s){const k=s/2;X.beginPath();X.moveTo(-k*.85,k*.75);X.bezierCurveTo(-k*.85,-k*.05,-k*.4,-k*.32,k*.05,-k*.32);X.lineTo(k*.05,-k*.75);X.lineTo(k*.9,-k*.05);X.lineTo(k*.05,k*.65);X.lineTo(k*.05,k*.22);
    X.bezierCurveTo(-k*.35,k*.2,-k*.65,k*.35,-k*.85,k*.75);X.closePath()},
  comment(s){const k=s/2;X.beginPath();X.roundRect(-k*.9,-k*.75,k*1.8,k*1.2,k*.42);X.moveTo(-k*.42,k*.4);X.lineTo(-k*.6,k*.9);X.lineTo(k*.08,k*.4);X.closePath()},
  play(s){const k=s/2;X.beginPath();X.roundRect(-k*.9,-k*.68,k*1.8,k*1.36,k*.4)}
};
// ícono "3D" con extrusión, degradado y brillo
function s12_icon(type,s,col,dark){const dep=Math.max(4,s*.09);X.save();X.fillStyle=dark;for(let i=dep;i>0;i-=2){X.save();X.translate(i*.5,i);s12_SH[type](s);X.fill();X.restore()}
  const g=X.createLinearGradient(0,-s/2,0,s/2);g.addColorStop(0,'#ffffff');g.addColorStop(.18,col);g.addColorStop(1,col);X.fillStyle=g;s12_SH[type](s);X.fill('evenodd');
  X.lineWidth=Math.max(2,s*.035);X.strokeStyle='rgba(255,255,255,.55)';X.stroke();
  if(type==='play'){X.fillStyle='#fff';X.beginPath();X.moveTo(-s*.12,-s*.2);X.lineTo(s*.22,0);X.lineTo(-s*.12,s*.2);X.closePath();X.fill()}
  if(type==='comment'){X.fillStyle='rgba(255,255,255,.95)';[-.28,0,.28].forEach(d=>{X.beginPath();X.arc(d*s,-s*.15,s*.06,0,7);X.fill()})}
  X.globalAlpha*=.55;X.fillStyle='#fff';X.beginPath();X.ellipse(-s*.18,-s*.2,s*.13,s*.07,-.6,0,7);X.fill();X.restore()}
// palabra con letra de fiesta: borde grueso y extrusión
function s12_word(s,x,y,sz,col,ext,o={}){const d=Math.max(6,sz*.07);X.save();X.translate(x,y);if(o.sx)X.scale(o.sx,o.sy);if(o.rot)X.rotate(o.rot);
  for(let i=d;i>0;i-=1.5)txt(s,i*.6,i,sz,{...LK,c:ext,stroke:ext,sw:sz*.12});txt(s,0,0,sz,{...LK,c:col,stroke:'#2a0612',sw:sz*.12});txt(s,0,0,sz,{...LK,c:col});X.restore()}
// ---------- secciones ----------
const s12_SEC=[
  {t0:0,t1:5.6,types:['heart','heart','heart','comment'],cols:[[K.rojo,'#7a0a22'],[K.brasa,'#7d2016'],['#ff5f8f','#8a1d45'],['#fff','#8b97a8']],bg:['#FFD15C',K.ambar,K.naranja],ray:'rgba(255,255,255,.16)'},
  {t0:5.6,t1:10.8,types:['share','comment','share','play'],cols:[[K.cian,'#04607a'],['#fff','#5a7090'],[K.ambar,'#8a5a00'],[K.brasa,'#7d2016']],bg:['#3FE6FF',K.azul,'#1d4f9a'],ray:'rgba(255,255,255,.12)'},
  {t0:10.8,t1:16.7,types:['bell','bell','bell','heart'],cols:[[K.ambar,'#8a5a00'],['#fff','#7a6a5a'],[K.cian,'#04607a'],[K.rojo,'#5a0010']],bg:[K.naranja,K.brasa,K.rojo],ray:'rgba(255,220,150,.13)'}];
const s12_N=34;const s12_IC=s12_SEC.map((sec,si)=>{const a=[];for(let i=0;i<s12_N;i++){const r=hs(si*100+i);a.push({k:i%4,ts:sec.t0+(si===0?2.0:-.5)+i*.085+hs(i+si*7)*.1,x0:hs(si*31+i*3),vx:(hs(i*5+si)-.5)*.5,sz:.55+hs(i*9+si)*.6,
  depth:hs(i*13+si*3),spin:(hs(i*17+si)-.5)*6,h0:.3+hs(i*19+si)*.5})}a.sort((p,q)=>p.depth-q.depth);return a});
function s12_bg(t,sec){const g=X.createRadialGradient(CX,CY*.75,40,CX,CY,Math.max(W,H)*.85);g.addColorStop(0,sec.bg[0]);g.addColorStop(.5,sec.bg[1]);g.addColorStop(1,sec.bg[2]);X.fillStyle=g;X.fillRect(0,0,W,H);
  X.save();X.fillStyle=sec.ray;X.beginPath();const n=18,rot=t*.18;for(let i=0;i<n;i++){const a=rot+i*2*Math.PI/n;X.moveTo(CX,CY*.75);X.arc(CX,CY*.75,DG,a,a+Math.PI/n*.8)}X.fill();X.restore();
  // confeti de fondo (papel picado de colores)
  for(let i=0;i<28;i++){const x=(hs(i+40)*W+t*30*(hs(i)-.5)*2+W)%W,y=(hs(i+60)*H+t*(40+hs(i+2)*60))%H;X.save();X.translate(x,y);X.rotate(t*2*(hs(i+3)-.5)+i);X.globalAlpha=.35;X.fillStyle=['#fff',K.cian,K.rojo,K.ambar][i%4];X.fillRect(-9,-5,18,10);X.restore()}}
// posición de un ícono (con remolino final opcional)
function s12_drawIcons(t,si,vort=0){const sec=s12_SEC[si];const floorB=H-L(40,250);const gr=L(5200,7200);
  for(const ic of s12_IC[si]){const dt=t-ic.ts;if(dt<0)continue;const s=L(150,185)*ic.sz*(.75+ic.depth*.45);const yf=floorB-s/2-(1-ic.depth)*L(170,330);const top=-s;
    const f=s12_fall(dt,yf-top,gr,.48);if(!f)continue;let y=yf-f[0],x=s12_fold(ic.x0*W+ic.vx*W*dt*.6*Math.exp(-dt*.4),s*.6,W-s*.6);
    let sq=f[1]>=0?.32*Math.exp(-f[1]*11)*Math.cos(f[1]*30):0;const rot=ic.spin*(1-Math.exp(-dt*1.2))*.5+(sec.types[ic.k]==='bell'&&f[1]>=0?Math.sin(f[1]*18)*.4*Math.exp(-f[1]*2):0);
    let sc=1;if(vort>0){const ax=CX,ay=CY,dx=x-ax,dy=y-ay,r=Math.hypot(dx,dy)*(1-vort),an=Math.atan2(dy,dx)+vort*5;x=ax+Math.cos(an)*r;y=ay+Math.sin(an)*r;sc=1-vort*.85}
    const[c1,c2]=sec.cols[ic.k];X.save();X.translate(x,y+s*.45);X.scale((1+sq)*sc,(1-sq)*sc);X.translate(0,-s*.45);X.rotate(rot);X.globalAlpha=.65+.35*ic.depth;s12_icon(sec.types[ic.k],s,c1,c2);X.restore()}}
// palabra que cae y rebota hasta su lugar
function s12_drop(s,x,y,sz,t0,t,col,ext,t1){if(t<t0)return;const a=1-ss(P(t,t1-.25,.25));if(a<=0)return;const f=s12_fall(t-t0,y+sz,L(6500,8000),.35);
  const yy=y-f[0];const sq=f[1]>=0?.22*Math.exp(-f[1]*10)*Math.cos(f[1]*28):0;const rot=(hs(sz)-.5)*.08;X.save();X.globalAlpha*=a;s12_word(s,x,yy,sz,col,ext,{sx:1+sq,sy:1-sq,rot});X.restore()}
function s12_secContent(t,si){const sec=s12_SEC[si];const mx=L(1600,980);
  if(si===0){// corazón gigante + DALE ME GUSTA
    const hb=s12_fall(t,L(380,700),L(5200,7000),.45);const hs_=L(330,420);if(t<2.6){const yb=L(470,860);const yy=yb-hb[0];const sq=hb[1]>=0?.3*Math.exp(-hb[1]*9)*Math.cos(hb[1]*26):0;
      const out=ex(P(t,2.0,.6));X.save();X.translate(CX,yy+hs_*.4);X.scale((1+sq)*(1+out*3),(1-sq)*(1+out*3));X.globalAlpha=1-out;X.translate(0,-hs_*.4);s12_icon('heart',hs_,K.rojo,'#6a0018');X.restore()}
    s12_drop('DALE',CX,L(300,690),fit('DALE',mx,L(260,300),LK),1.0,t,'#fff',K.rojo,5.6);
    s12_drop('ME GUSTA',CX,L(580,980),fit('ME GUSTA',mx,L(260,250),LK),1.45,t,'#FFF3C4',K.rojo,5.6)}
  if(si>0){const t0=s12_SEC[si].t0-.75,ty=si===1?'share':'bell',cc=si===1?[K.ambar,'#8a5a00']:['#FFE07A','#8a5a00'];const hb=s12_fall(t-t0,L(380,700),L(5200,7000),.45);
    if(hb&&t<t0+2.0){const hs_=L(330,420),yb=L(470,860),yy=yb-hb[0];const sq=hb[1]>=0?.3*Math.exp(-hb[1]*9)*Math.cos(hb[1]*26):0;const out=ex(P(t,t0+1.4,.6));
      X.save();X.translate(CX,yy+hs_*.4);X.scale((1+sq)*(1+out*3),(1-sq)*(1+out*3));X.globalAlpha=1-out;X.translate(0,-hs_*.4);X.rotate(si===2&&hb[1]>=0?Math.sin(hb[1]*16)*.3*Math.exp(-hb[1]*2):0);s12_icon(ty,hs_,cc[0],cc[1]);X.restore()}}
  if(si===1){s12_drop('COMPARTE',CX,L(350,760),fit('COMPARTE',mx,L(300,240),LK),5.0,t,'#fff','#0b3a7a',10.8);
    const p=bk(P(t,6.2,.5),1.8);if(p>0&&t<10.8){const s='LO QUE PASA AQUÍ',sz=fit(s,L(1100,900),L(110,96),LK);X.save();X.translate(CX,L(570,960));X.rotate(-.04);X.scale(p,p);X.fillStyle=K.noche;const w=mw(s,sz,LK)+80;s12_rr(-w/2,-sz*.75,w,sz*1.5,sz*.4);X.fill();txt(s,0,sz*.05,sz,{...LK,c:K.cian});X.restore()}}
  if(si===2){s12_drop('ACTIVA LAS',CX,L(270,660),fit('ACTIVA LAS',mx,L(220,200),LK),10.2,t,'#fff','#5a0010',16.0);
    s12_drop('NOTIFICACIONES',CX,L(520,900),fit('NOTIFICACIONES',mx,L(220,200),LK),10.6,t,K.ambar,'#5a0010',16.0)}}
function s12_drawSec(t,si,vort=0){s12_bg(t,s12_SEC[si]);s12_drawIcons(t,si,vort);s12_secContent(t,si)}
// ---------- escena ----------
SCENE(12,{dur:D,draw(t){
  let[sx,sy]=[0,0];[[.62,18],[1.2,16],[1.65,18],[5.4,20],[10.6,18],[11.0,20],[16.7,30]].forEach(([a,k])=>{const[x,y]=shake(t,a,k);sx+=x;sy+=y});
  X.save();X.translate(sx,sy);
  const cur=t<5.6?0:t<10.8?1:2;
  if(t<16.7){s12_drawSec(t,cur,cur===2?eio(P(t,15.7,1.0)):0);
    // transición: iris que se abre desde un ícono con anillo de color
    [[5.6,1],[10.8,2]].forEach(([tt,nx])=>{const p=P(t,tt-.55,.55);if(p>0&&p<1){const r=ex(p)*DG*.62;X.save();X.beginPath();X.arc(CX,CY*.75,r,0,7);X.clip();s12_drawSec(t,nx);X.restore();
      X.strokeStyle='#fff';X.lineWidth=26*(1-p)+4;X.beginPath();X.arc(CX,CY*.75,r,0,7);X.stroke()}});
  }
  X.restore();
  flash(t,.62,.25,.2);flash(t,16.65,1,.5);
  // ---- cierre ----
  if(t>=16.6){const g=X.createRadialGradient(CX,CY,20,CX,CY,Math.max(W,H)*.8);g.addColorStop(0,'#173a66');g.addColorStop(1,K.noche);X.fillStyle=g;X.fillRect(0,0,W,H);
    X.save();X.fillStyle='rgba(253,174,3,.06)';X.beginPath();const lx=L(640,CX),ly=L(540,700);for(let i=0;i<20;i++){const a=t*.2+i*Math.PI/10;X.moveTo(lx,ly);X.arc(lx,ly,DG,a,a+Math.PI/20)}X.fill();X.restore();
    const[a1,a2]=shake(t,16.7,26);X.save();X.translate(a1,a2);
    const ty=['heart','bell','share','comment','play','heart'],cs=[[K.rojo,'#6a0018'],[K.ambar,'#8a5a00'],[K.cian,'#04607a'],['#fff','#5a7090'],[K.brasa,'#7d2016'],['#ff5f8f','#8a1d45']];
    const orb=ex(P(t,16.8,.9));const rx=L(480,470)*orb,ry=L(110,120)*orb;
    const items=ty.map((k,i)=>{const a=i/6*Math.PI*2+t*1.3;return{k,i,z:Math.sin(a),x:lx+Math.cos(a)*rx,y:ly-40+Math.sin(a)*ry}});
    const drawIt=it=>{X.save();X.translate(it.x,it.y);const s=L(90,100)*(.75+.35*(it.z+1)/2)*orb;X.globalAlpha=.55+.45*(it.z+1)/2;s12_icon(it.k,s,cs[it.i][0],cs[it.i][1]);X.restore()};
    items.filter(i=>i.z<0).forEach(drawIt);
    const lp=el(P(t,16.7,1.1));logo(lx,ly,L(560,620)*lp,{glow:'rgba(253,174,3,.5)'});
    items.filter(i=>i.z>=0).forEach(drawIt);
    const tx=L(1400,CX),mx=L(820,940);
    {const p=P(t,17.3,.45);if(p>0){const k=lerp(2.6,1,bk(p,2));X.save();X.translate(tx,L(400,1220));X.scale(k,k);X.globalAlpha*=cl(p*3);s12_word('SÍGUENOS',0,0,fit('SÍGUENOS',mx,L(190,190),LK),'#fff',K.brasa);X.restore()}}
    const pp=bk(P(t,18.0,.5),1.7);if(pp>0){const py=L(600,1395);X.save();X.translate(tx,py);X.rotate(-.03);X.scale(pp,pp);const s='/UNEVISION',sz=L(84,80);const w=mw(s,sz,LK)+90;X.fillStyle=K.ambar;s12_rr(-w/2,-sz*.75,w,sz*1.5,sz*.5);X.fill();txt(s,0,sz*.06,sz,{...LK,c:K.noche});X.restore()}
    const sp=P(t,18.5,.5);if(sp>0)rise('EL CANAL QUE CRECE CADA DÍA',tx,L(730,1495),L(52,44),18.5,t,{f:'Fig',w:800,st:'normal',c:'#fff',ls:2});
    X.restore()}
},events:[['golpe',.62],['pop',1.2],['golpe',1.65],['pop',2.4],['pop',3.2],['pop',4.1],['whoosh',5.05],['swipe',5.3],['golpe',5.4],['pop',7.0],['pop',8.0],['pop',9.2],['whoosh',10.25],['swipe',10.5],['golpe',10.6],['golpe',11.0],['campana',12.6],['campana',13.8],['pop',14.6],['whoosh_largo',15.7],['riser',15.7],['golpe',16.7],['pop',17.45],['pop',18.0],['obturador',18.5]],
musica:{estilo:'latin',bpm:100,tono:'Am',hits:[.62,1.65,5.4,10.6,11.0,16.7],final:16.7}});
})();
