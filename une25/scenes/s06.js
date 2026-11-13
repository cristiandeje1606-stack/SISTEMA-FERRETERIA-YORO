// escena 06 · SALA DE REDACCIÓN HUD (news, 120, Gm) — radar, anillos de datos, globo D3, rótulos de noticiero (Bebas/Oswald)
(()=>{
const HITS=[0.5,2.5,5,9.5,13,14.75,16.5,18.5,21];
let geo=null;
function g06(){if(!geo){const f=topojson.feature(MUNDO,MUNDO.objects.countries);geo={all:f,hn:f.features.find(x=>+x.id===340),near:{type:'FeatureCollection',features:f.features.filter(x=>[340,320,222,558,484,84,188,591].includes(+x.id))}}}return geo}
const SB=[-88.24,14.92],SJ=[-88.31,15.03];
function bebas(s,x,y,sz,o={}){txt(s,x,y,sz,{f:'Bebas',w:400,...o})}
function osw(s,x,y,sz,o={}){txt(s,x,y,sz,{f:'Oswald',w:o.w||700,...o})}
// anillo de datos: segmentos + marcas
function ring(cx,cy,r,rot,o={}){X.save();X.translate(cx,cy);X.rotate(rot);const col=o.col||'8,225,255',a=o.a??1;
  X.strokeStyle=`rgba(${col},${.55*a})`;X.lineWidth=(o.lw||3)*U;const n=o.seg||6;
  for(let i=0;i<n;i++){const a0=i*2*Math.PI/n,len=(.35+.5*hs(i+(o.seed||0)))*2*Math.PI/n;X.beginPath();X.arc(0,0,r,a0,a0+len);X.stroke()}
  if(o.ticks){X.strokeStyle=`rgba(${col},${.35*a})`;X.lineWidth=1.5*U;for(let i=0;i<o.ticks;i++){const an=i*2*Math.PI/o.ticks,l=(i%5?6:14)*U;X.beginPath();X.moveTo(Math.cos(an)*(r+6*U),Math.sin(an)*(r+6*U));X.lineTo(Math.cos(an)*(r+6*U+l),Math.sin(an)*(r+6*U+l));X.stroke()}}
  X.restore()}
function radar(cx,cy,r,t,k=1){if(k<=0)return;X.save();X.globalAlpha*=k;
  const g=X.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,'rgba(8,225,255,.10)');g.addColorStop(1,'rgba(8,225,255,.02)');X.fillStyle=g;X.beginPath();X.arc(cx,cy,r,0,7);X.fill();
  X.strokeStyle='rgba(8,225,255,.28)';X.lineWidth=1.5*U;for(let i=1;i<=4;i++){X.beginPath();X.arc(cx,cy,r*i/4,0,7);X.stroke()}
  X.beginPath();X.moveTo(cx-r,cy);X.lineTo(cx+r,cy);X.moveTo(cx,cy-r);X.lineTo(cx,cy+r);X.stroke();
  const sw=t*2.4;const cg=X.createConicGradient(sw-1.2,cx,cy);cg.addColorStop(0,'rgba(8,225,255,0)');cg.addColorStop(.19,'rgba(8,225,255,.55)');cg.addColorStop(.191,'rgba(8,225,255,0)');cg.addColorStop(1,'rgba(8,225,255,0)');
  X.fillStyle=cg;X.beginPath();X.arc(cx,cy,r,0,7);X.fill();
  X.strokeStyle='rgba(180,250,255,.9)';X.lineWidth=2.5*U;X.beginPath();X.moveTo(cx,cy);X.lineTo(cx+Math.cos(sw)*r,cy+Math.sin(sw)*r);X.stroke();
  for(let i=0;i<9;i++){const an=hs(i+40)*Math.PI*2,rr=r*(.2+.75*hs(i+50));let d=((sw-an)%(2*Math.PI)+2*Math.PI)%(2*Math.PI);const b=Math.exp(-d*1.4);
    X.fillStyle=i%3===0?`rgba(253,174,3,${.25+.75*b})`:`rgba(8,225,255,${.2+.8*b})`;X.beginPath();X.arc(cx+Math.cos(an)*rr,cy+Math.sin(an)*rr,(4+6*b)*U,0,7);X.fill()}
  ring(cx,cy,r*1.08,t*.3,{seg:5,ticks:72,seed:3});ring(cx,cy,r*1.2,-t*.5,{seg:3,col:'253,174,3',lw:4,seed:9});X.restore()}
function corners(x,y,w,h,k,col=K.cian){if(k<=0)return;const l=40*U*k;X.save();X.strokeStyle=col;X.lineWidth=4*U;X.globalAlpha*=k;
  [[x,y,1,1],[x+w,y,-1,1],[x,y+h,1,-1],[x+w,y+h,-1,-1]].forEach(([a,b,sx,sy])=>{X.beginPath();X.moveTo(a,b+sy*l);X.lineTo(a,b);X.lineTo(a+sx*l,b);X.stroke()});X.restore()}
// rótulo de dato que entra con barra
function tag(s,x,y,t0,t,o={}){const p=ex(P(t,t0,.45));if(p<=0)return;const sz=o.sz||38*U;const w=mw(s,sz,{f:'Oswald',w:700,ls:4*U})+40*U;X.save();X.globalAlpha*=o.a??1;
  X.fillStyle=o.bg||'rgba(8,225,255,.16)';X.fillRect(x,y-sz*.8,w*p,sz*1.6);X.fillStyle=o.acc||K.cian;X.fillRect(x,y-sz*.8,6*U,sz*1.6);
  X.beginPath();X.rect(x,y-sz,w*p,sz*2);X.clip();osw(s,x+22*U,y,sz,{al:'left',ls:4*U,c:o.c||'#fff'});X.restore()}
function ticker(t,k){if(k<=0)return;const h=74*U,y=H-h-34*U;X.save();X.globalAlpha*=k;
  X.fillStyle='rgba(6,18,31,.88)';X.fillRect(0,y,W,h);X.fillStyle=K.cian;X.fillRect(0,y,W,3*U);
  const msg='NOTICIAS  ·  INFORMACIÓN  ·  NUESTRA GENTE  ·  SANTA BÁRBARA · HONDURAS  ·  /UNEVISION  ·  ';const mwid=mw(msg,46*U,{f:'Oswald',w:700,ls:3*U});
  X.save();X.beginPath();X.rect(330*U,y,W,h);X.clip();const off=(t*160*U)%mwid;for(let i=0;i<4;i++)osw(msg,330*U+20*U-off+i*mwid,y+h/2+2*U,46*U,{al:'left',ls:3*U,c:'#E8F6FF'});X.restore();
  const lg=X.createLinearGradient(0,y,330*U,y);lg.addColorStop(0,K.rojo);lg.addColorStop(1,K.brasa);X.fillStyle=lg;X.beginPath();X.moveTo(0,y);X.lineTo(330*U,y);X.lineTo(300*U,y+h);X.lineTo(0,y+h);X.fill();
  bebas('UNE VISIÓN',150*U,y+h/2+3*U,58*U,{ls:3*U});X.restore()}
function globe(cx,cy,r,lon,lat,t,k){if(k<=0)return;const gg=g06();const pr=d3.geoOrthographic().scale(r).translate([cx,cy]).rotate([-lon,-lat]).clipAngle(90);const pa=d3.geoPath(pr,X);X.save();X.globalAlpha*=k;
  const sg=X.createRadialGradient(cx-r*.3,cy-r*.3,r*.1,cx,cy,r);sg.addColorStop(0,'#123a5e');sg.addColorStop(1,'#071a2c');X.fillStyle=sg;X.beginPath();X.arc(cx,cy,r,0,7);X.fill();
  X.strokeStyle='rgba(8,225,255,.12)';X.lineWidth=1*U;X.beginPath();pa(d3.geoGraticule10());X.stroke();
  X.fillStyle='rgba(76,143,226,.55)';X.strokeStyle='rgba(8,225,255,.6)';X.lineWidth=1*U;X.beginPath();pa(gg.all);X.fill();X.stroke();
  X.fillStyle=K.ambar;X.shadowColor=K.ambar;X.shadowBlur=30*U;X.beginPath();pa(gg.hn);X.fill();X.shadowBlur=0;
  const c=pr(SB);const vis=d3.geoDistance(SB,[lon,lat])<1.4;if(c&&vis){for(let i=0;i<3;i++){const q=((t*.8+i/3)%1);X.strokeStyle=`rgba(253,174,3,${1-q})`;X.lineWidth=3*U;X.beginPath();X.arc(c[0],c[1],q*90*U,0,7);X.stroke()}}
  const rim=X.createRadialGradient(cx,cy,r*.85,cx,cy,r*1.12);rim.addColorStop(0,'rgba(8,225,255,0)');rim.addColorStop(.6,'rgba(8,225,255,.35)');rim.addColorStop(1,'rgba(8,225,255,0)');X.fillStyle=rim;X.beginPath();X.arc(cx,cy,r*1.12,0,7);X.fill();
  X.restore()}
function hnMap(t,k,zoom){if(k<=0)return;const gg=g06();const pr=d3.geoMercator().fitExtent([[W*.44,H*.14],[W*.96,H*.8]],gg.hn);const s0=pr.scale(),tr=pr.translate();
  const c0=pr(SB);const z=zoom;pr.scale(s0*z).translate([c0[0]+(tr[0]-c0[0])*z,c0[1]+(tr[1]-c0[1])*z]);
  const pa=d3.geoPath(pr,X);X.save();X.globalAlpha*=k;X.fillStyle='rgba(76,143,226,.18)';X.strokeStyle='rgba(8,225,255,.35)';X.lineWidth=1.5*U;X.beginPath();pa(gg.near);X.fill();X.stroke();
  X.fillStyle='rgba(253,174,3,.18)';X.strokeStyle=K.ambar;X.lineWidth=4*U;X.shadowColor=K.ambar;X.shadowBlur=24*U;X.beginPath();pa(gg.hn);X.fill();X.stroke();X.shadowBlur=0;
  const a=pr(SB),b=pr(SJ);X.strokeStyle='rgba(8,225,255,.5)';X.setLineDash([8*U,8*U]);X.lineWidth=2*U;X.beginPath();X.moveTo(a[0],0);X.lineTo(a[0],H);X.moveTo(0,a[1]);X.lineTo(W,a[1]);X.stroke();X.setLineDash([]);
  for(let i=0;i<3;i++){const q=((t*.9+i/3)%1);X.strokeStyle=`rgba(8,225,255,${1-q})`;X.lineWidth=3*U;X.beginPath();X.arc(a[0],a[1],q*140*U,0,7);X.stroke()}
  X.fillStyle='#fff';X.beginPath();X.arc(a[0],a[1],10*U,0,7);X.fill();X.fillStyle=K.cian;X.beginPath();X.arc(b[0],b[1],7*U,0,7);X.fill();
  X.restore();return[a,b]}
SCENE(6,{dur:25,events:[['riser',-.5+1],['golpe',.5],['whoosh',2.3],['golpe',2.5],['pop',3.4],['pop',3.9],['whoosh_largo',4.7],['golpe',5],['pop',6.5],['campana',8.3],['riser',8.5],['golpe',9.5],['pop',10.6],['obturador',11.4],['whoosh',12.8],['golpe',13],['swipe',14.7],['golpe',14.75],['whoosh',16.3],['golpe',16.5],['swipe',18.4],['golpe',18.5],['riser',20],['golpe',21],['campana',21.6],['whoosh',22.8]],
  musica:{estilo:'news',bpm:120,tono:'Gm',hits:HITS,final:21},
  draw(t){
    bg('#030B14',K.noche);grid(t,.8,'8,225,255',80);
    // cámara: sacudida en golpes
    let sx=0,sy=0;HITS.forEach(h=>{const[a,b]=shake(t,h,12);sx+=a;sy+=b});X.save();X.translate(sx,sy);
    // brillo base
    const gl=X.createRadialGradient(CX,CY,0,CX,CY,W*.6);gl.addColorStop(0,'rgba(76,143,226,.16)');gl.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=gl;X.fillRect(0,0,W,H);
    // ---- A: apertura (0–2.5) radar + NOTICIAS
    if(t<5.2){const kA=ex(P(t,0,.6))*(1-ss(P(t,4.7,.5)));
      const push=t<2.5?0:ex(P(t,2.5,.8));const rx=lerp(W*.29,W*.24,push),rr=lerp(330,380,push)*U;
      // línea de escaneo que se abre
      const op=ex(P(t,0,.5));X.save();X.beginPath();X.rect(0,CY-H*op/2,W,H*op);X.clip();
      radar(rx,CY-20*U,rr,t,kA);corners(rx-rr*1.35,CY-20*U-rr*1.35,rr*2.7,rr*2.7,ex(P(t,.4,.5))*kA);
      if(t<2.6){const k=1-ss(P(t,2.3,.25));X.save();X.globalAlpha*=k;
        slam('NOTICIAS',W*.69,CY-30*U,300*U,.5,t,{f:'Bebas',w:400,ls:8*U,stag:.04,from:2.2,glow:'rgba(8,225,255,.6)'});
        tag('INFORMACIÓN · CADA DÍA',W*.69-300*U,CY+150*U,1.1,t,{});X.restore()}
      else{const k=1-ss(P(t,4.7,.3));X.save();X.globalAlpha*=k;
        // barra roja que barre + INFORMACIÓN
        const bp=ex(P(t,2.5,.45));const bx=W*.47;X.fillStyle=K.rojo;X.fillRect(bx,CY-120*U,(W*.5)*bp,170*U);
        X.save();X.beginPath();X.rect(bx,CY-140*U,W*.5,210*U);X.clip();bebas('INFORMACIÓN',bx+30*U+(1-bp)*-200*U,CY-30*U,190*U,{al:'left',ls:4*U});X.restore();
        rise('PARA NUESTRA GENTE',bx+6*U,CY+120*U,72*U,3.3,t,{f:'Oswald',w:700,al:'left',ls:10*U,c:K.cian});
        tag('SANTA BÁRBARA · HONDURAS',bx,CY+230*U,3.8,t,{acc:K.ambar,bg:'rgba(253,174,3,.14)'});X.restore()}
      X.restore();
      if(op<1){X.fillStyle='#fff';X.fillRect(0,CY-H*op/2-2*U,W,4*U);X.fillRect(0,CY+H*op/2-2*U,W,4*U)}}
    // ---- B: globo (5–9.6)
    if(t>4.7&&t<10){const k=ex(P(t,4.8,.6))*(1-ss(P(t,9.4,.25)));const z=1+ex(P(t,9.1,.5))*1.6;
      const lon=lerp(10,-86.5,eio(P(t,5,3.2))),lat=lerp(5,15,eio(P(t,5,3.2)));const r=360*U*z;
      ring(W*.66,CY-30*U,r*1.12,t*.4,{seg:8,ticks:90,a:k});ring(W*.66,CY-30*U,r*1.24,-t*.25,{seg:4,col:'253,174,3',lw:5,a:k,seed:7});
      globe(W*.66,CY-30*U,r,lon,lat,t,k);
      X.save();X.globalAlpha*=k;
      rise('LO QUE PASA',W*.07,CY-175*U,170*U,5.2,t,{f:'Bebas',w:400,al:'left',ls:4*U});
      rise('AQUÍ',W*.07,CY+40*U,250*U,5.6,t,{f:'Bebas',w:400,al:'left',ls:6*U,grad:['#FFE08A',K.ambar,K.naranja],glow:'rgba(253,174,3,.5)'});
      tag('NOTICIAS DE NUESTRA TIERRA',W*.07,CY+215*U,6.4,t,{});X.restore();
      // destello de barrido
      if(t>6&&t<7.2)streak(t,6.2,CY+200*U,'8,225,255',1)}
    // ---- C: mapa de Honduras (9.5–13)
    if(t>9.4&&t<13.3){const k=ex(P(t,9.5,.4))*(1-ss(P(t,12.9,.3)));const z=lerp(2.2,1,ex(P(t,9.5,1.6)));
      const pts=hnMap(t,k,z);X.save();X.globalAlpha*=k;
      rise('SANTA',W*.06,CY-170*U,210*U,9.8,t,{f:'Bebas',w:400,al:'left',ls:6*U});
      rise('BÁRBARA',W*.06,CY+10*U,210*U,10.0,t,{f:'Bebas',w:400,al:'left',ls:6*U,c:K.cian,glow:'rgba(8,225,255,.45)'});
      tag('HONDURAS',W*.06,CY+170*U,10.6,t,{acc:K.ambar,bg:'rgba(253,174,3,.14)'});
      const lp=ex(P(t,11.2,.5));if(lp>0){const[a,b]=pts;X.strokeStyle=K.cian;X.lineWidth=2.5*U;X.beginPath();X.moveTo(b[0],b[1]);const ex2=b[0]+120*U*lp,ey=b[1]-120*U*lp;X.lineTo(ex2,ey);X.lineTo(ex2+40*U*lp,ey);X.stroke();
        tag('SAN JOSÉ DE COLINAS',ex2+40*U,ey,11.4,t,{sz:36*U})}
      X.restore()}
    // ---- D: NUESTRA GENTE / TIERRA (13–16.5)
    if(t>12.9&&t<16.8){const k=ex(P(t,13,.3))*(1-ss(P(t,16.3,.3)));X.save();X.globalAlpha*=k;
      for(let i=0;i<5;i++)ring(CX,CY,(180+i*90)*U*(1+.05*Math.sin(t*2+i)),t*(i%2?.4:-.3)*(1+i*.2),{seg:4+i,ticks:i===2?120:0,a:.8,seed:i*5,col:i===3?'253,174,3':'8,225,255'});
      const sw=ex(P(t,14.75,.4));
      bebas('NUESTRA',CX,CY-160*U+(1-ex(P(t,13,.5)))*-80*U,150*U,{ls:30*U,a:ex(P(t,13,.4))});
      X.save();X.beginPath();X.rect(0,CY-60*U,W,320*U);X.clip();
      bebas('GENTE',CX,CY+100*U-sw*320*U+(1-ex(P(t,13.1,.5)))*320*U,330*U,{ls:12*U,grad:['#FFFFFF',K.cian],glow:'rgba(8,225,255,.5)'});
      bebas('TIERRA',CX,CY+100*U+(1-sw)*320*U,330*U,{ls:12*U,grad:['#FFE08A',K.ambar,K.naranja],glow:'rgba(253,174,3,.5)'});X.restore();
      corners(CX-560*U,CY-260*U,1120*U,560*U,ex(P(t,13.2,.5)));X.restore()}
    // ---- E: CADA DÍA / CONTIGO (16.5–20.7)
    if(t>16.3&&t<20.9){const k=ex(P(t,16.5,.3))*(1-ss(P(t,20.5,.35)));X.save();X.globalAlpha*=k;
      // túnel de anillos
      for(let i=0;i<10;i++){const q=((t*.35+i/10)%1);const r=40*U+q*q*W*.75;X.strokeStyle=`rgba(${i%3?'8,225,255':'253,174,3'},${.5*q*(1-q)*2})`;X.lineWidth=(2+6*q)*U;X.beginPath();X.arc(CX,CY,r,0,7);X.stroke()}
      const two=t>=18.5;const t0=two?18.5:16.5;const bp=ex(P(t,t0,.45));
      const c1=two?K.cian:K.rojo,c2=two?K.azul:K.brasa;const lg=X.createLinearGradient(0,0,W,0);lg.addColorStop(0,c1);lg.addColorStop(1,c2);
      X.save();X.translate(CX,CY);X.transform(1,0,-.18,1,0,0);X.fillStyle=lg;const bw=1300*U*bp;X.fillRect(-650*U,-150*U,bw,300*U);X.fillStyle='#fff';X.fillRect(-650*U+bw-12*U,-150*U,12*U,300*U);
      X.beginPath();X.rect(-650*U,-170*U,bw,340*U);X.clip();X.transform(1,0,.18,1,0,0);
      slam(two?'CONTIGO':'CADA DÍA',0,8*U,250*U,t0+.15,t,{f:'Bebas',w:400,ls:14*U,stag:.035,from:1.8,c:two?K.noche:'#fff'});X.restore();
      tag(two?'AQUÍ ESTAMOS':'NUESTRA VOZ',CX-650*U,CY+230*U,t0+.5,t,{acc:two?K.cian:K.ambar});
      X.restore()}
    // ---- F: cierre logo (20.7–25)
    if(t>20.5){const k=ex(P(t,20.6,.4));X.save();X.globalAlpha*=k;
      const cy=CY-110*U;for(let i=0;i<4;i++)ring(CX,cy,(260+i*55)*U*(1+(1-ex(P(t,20.6,1.2)))*1.5),t*(i%2?.35:-.25),{seg:5+i,ticks:i===1?96:0,seed:i*3,col:i===2?'253,174,3':'8,225,255'});
      radar(CX,cy,230*U,t,.35);
      const ang=(1-ex(P(t,21,1.2)))*Math.PI*1.5;logo3D(CX,cy,470*U,ang,{depth:22,glow:'rgba(8,225,255,.6)',shine:P(t,22.4,1.1)});
      flare(CX,cy,(1-P(t,21,.8))*1.2);
      const ep=ex(P(t,22,.5));X.fillStyle=K.cian;X.fillRect(CX-560*U*ep,cy+255*U,1120*U*ep,3*U);
      rise('EL CANAL QUE CRECE CADA DÍA',CX,cy+320*U,78*U,22.1,t,{f:'Oswald',w:700,ls:12*U});X.restore()}
    X.restore();
    // ticker fijo (después de la apertura)
    ticker(t,t<20.6?ex(P(t,5,.5))*(1-ss(P(t,20.2,.35))):ex(P(t,22.6,.5)));
    flash(t,.5,.6);flash(t,2.5,.35);flash(t,5,.45);flash(t,9.5,.7);flash(t,13,.4);flash(t,16.5,.4);flash(t,18.5,.35);flash(t,21,.8,.4);
    vineta(.6)}
});
})();
