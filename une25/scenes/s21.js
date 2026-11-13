// escena 21 · SEÑAL QUE LLEGA (reel 9:16, 30 s) · tipografía Big Shoulders 900
(()=>{
const s21_F={f:'BigSh',w:900,st:'normal'};
const s21_SB=[[-88.68,15.28],[-88.50,15.40],[-88.33,15.37],[-88.20,15.45],[-88.08,15.33],[-87.98,15.18],[-87.97,15.02],[-87.90,14.93],[-88.00,14.82],[-88.10,14.86],[-88.18,14.72],[-88.30,14.66],[-88.38,14.76],[-88.47,14.80],[-88.52,14.95],[-88.62,15.02],[-88.60,15.15],[-88.72,15.20]];
const s21_COL=[-88.31,15.03];
let s21_G=null;
function s21_geo(){if(s21_G)return s21_G;const feats=topojson.feature(MUNDO,MUNDO.objects.countries).features;const hn=feats.find(f=>String(f.id)==='340');
  const nb=feats.filter(f=>['320','222','558','084'].includes(String(f.id)));
  const proj=d3.geoMercator().fitExtent([[50,0],[W-50,H]],hn);const path=d3.geoPath(proj);
  const g={proj,hn:new Path2D(path(hn)),nb:nb.map(f=>new Path2D(path(f)))};
  const sb=new Path2D();s21_SB.forEach((p,i)=>{const q=proj(p);i?sb.lineTo(q[0],q[1]):sb.moveTo(q[0],q[1])});sb.closePath();g.sb=sb;
  g.sbc=proj([-88.25,15.04]);g.col=proj(s21_COL);g.hc=proj([-86.4,14.8]);
  // pueblos/luces alrededor de Colinas (deterministas)
  g.luces=[];for(let i=0;i<70;i++){const a=hs(i+40)*6.283,r=(.03+.33*Math.sqrt(hs(i+90)));g.luces.push([s21_COL[0]+Math.cos(a)*r,s21_COL[1]+Math.sin(a)*r*.8])}
  g.luces=g.luces.map(p=>{const q=proj(p);return[q[0],q[1],Math.hypot(q[0]-g.col[0],q[1]-g.col[1])]});
  s21_G=g;return g}
// cámara del mapa: zoom z enfocando (fx,fy) y colocándolo en (sx,sy)
function s21_cam(z,fx,fy,sx,sy){X.translate(sx,sy);X.scale(z,z*.82);X.translate(-fx,-fy)}
function s21_map(t,z,fx,fy,sx,sy,o={}){const g=s21_geo();
  // relieve: extrusión del país
  for(let i=14;i>=1;i--){X.save();X.translate(0,i*2.2*U);s21_cam(z,fx,fy,sx,sy);X.fillStyle=i>2?'#020a14':'#0d3352';X.fill(g.hn);X.restore()}
  X.save();s21_cam(z,fx,fy,sx,sy);
  X.globalAlpha=.35;X.fillStyle='#0a1c30';g.nb.forEach(p=>X.fill(p));X.strokeStyle='rgba(76,143,226,.35)';X.lineWidth=1.5*U/z;g.nb.forEach(p=>X.stroke(p));X.globalAlpha=1;
  const gr=X.createLinearGradient(0,g.hc[1]-300,0,g.hc[1]+300);gr.addColorStop(0,'#123c63');gr.addColorStop(1,'#0a2440');X.fillStyle=gr;X.globalAlpha=o.fill??1;X.fill(g.hn);X.globalAlpha=1;
  // retícula de relieve low-poly dentro del país
  X.save();X.clip(g.hn);X.strokeStyle='rgba(8,225,255,.10)';X.lineWidth=1.2*U/z;for(let i=-40;i<60;i++){X.beginPath();X.moveTo(i*28,0);X.lineTo(i*28+600,H);X.stroke();X.beginPath();X.moveTo(i*28+600,0);X.lineTo(i*28,H);X.stroke()}X.restore();
  X.setLineDash([5000,5000]);X.lineDashOffset=5000*(1-(o.draw??1));X.strokeStyle=K.cian;X.lineWidth=4*U/z;X.shadowColor=K.cian;X.shadowBlur=18*U;X.stroke(g.hn);X.setLineDash([]);X.shadowBlur=0;
  const sbk=o.sb||0;if(sbk>0){X.globalAlpha=sbk*(o.sbf??.85);const gg=X.createLinearGradient(g.sbc[0]-40,g.sbc[1]-50,g.sbc[0]+40,g.sbc[1]+50);gg.addColorStop(0,'#FFD25A');gg.addColorStop(1,K.brasa);X.fillStyle=gg;X.shadowColor=K.ambar;X.shadowBlur=60*U*sbk;X.fill(g.sb);X.shadowBlur=0;
    
    X.globalAlpha=sbk;X.strokeStyle='#ffe6a0';X.shadowColor=K.ambar;X.shadowBlur=24*U;X.lineWidth=4*U/z;X.stroke(g.sb);X.shadowBlur=0;X.globalAlpha=1}
  X.restore();return g}
function s21_pt(g,p,z,fx,fy,sx,sy){return[sx+(p[0]-fx)*z,sy+(p[1]-fy)*z*.82]}
// torre de transmisión (base en bx,by; altura h; progreso k)
function s21_torre(bx,by,h,k,t){if(k<=0)return;const hh=h*ex(k);X.save();X.strokeStyle='#dff6ff';X.lineWidth=5*U;X.lineCap='round';X.shadowColor=K.cian;X.shadowBlur=14*U;
  const w0=h*.16;X.beginPath();X.moveTo(bx-w0,by);X.lineTo(bx,by-hh);X.lineTo(bx+w0,by);X.stroke();X.lineWidth=2.6*U;
  const n=9;for(let i=0;i<n;i++){const y1=by-hh*i/n,y2=by-hh*(i+1)/n,w1=w0*(1-i/n),w2=w0*(1-(i+1)/n);X.beginPath();X.moveTo(bx-w1,y1);X.lineTo(bx+w2,y2);X.moveTo(bx+w1,y1);X.lineTo(bx-w2,y2);X.moveTo(bx-w2,y2);X.lineTo(bx+w2,y2);X.stroke()}
  X.restore();if(k>=1){const top=by-h;const bl=.6+.4*Math.sin(t*9);X.save();X.globalCompositeOperation='lighter';const g=X.createRadialGradient(bx,top,0,bx,top,60*U);g.addColorStop(0,`rgba(255,80,90,${bl})`);g.addColorStop(1,'rgba(255,0,0,0)');X.fillStyle=g;X.beginPath();X.arc(bx,top,60*U,0,7);X.fill();X.fillStyle='#fff';X.beginPath();X.arc(bx,top,7*U,0,7);X.fill();X.restore()}}
// ondas de radio desde (x,y)
function s21_ondas(t,x,y,t0,per,maxR,col,sq=1,lw=6){X.save();X.globalCompositeOperation='lighter';for(let i=0;i<12;i++){const ti=t0+i*per;const p=(t-ti)/(per*4);if(p<0||p>1)continue;const r=maxR*ex(p*1.2);X.strokeStyle=`rgba(${col},${(1-p)*.85})`;X.lineWidth=lw*U*(1-p*.6);X.beginPath();X.ellipse(x,y,r,r*sq,0,0,7);X.stroke()}X.restore()}
function s21_casa(x,y,s,lit,c){X.save();X.translate(x,y);X.scale(s,s);X.fillStyle=c;X.beginPath();X.moveTo(-40,0);X.lineTo(-40,-46);X.lineTo(0,-80);X.lineTo(40,-46);X.lineTo(40,0);X.closePath();X.fill();
  if(lit>0){X.shadowColor=K.ambar;X.shadowBlur=30*lit;X.fillStyle=`rgba(253,190,60,${lit})`;X.fillRect(-26,-38,18,16);X.fillRect(8,-38,18,16);X.fillRect(-8,-20,16,20)}X.restore()}
function s21_cerro(y,amp,f,ph,col){X.fillStyle=col;X.beginPath();X.moveTo(0,H);for(let x=0;x<=W;x+=20*U)X.lineTo(x,y-amp*Math.sin(x/W*f+ph)-amp*.4*Math.sin(x/W*f*2.3+ph*2));X.lineTo(W,H);X.fill()}
function s21_yc(y,amp,f,ph,x){return y-amp*Math.sin(x/W*f+ph)-amp*.4*Math.sin(x/W*f*2.3+ph*2)}
function s21_titulo(s,y,sz,t0,t,c,o={}){const k=win(t,t0,o.out||t0+2,.25,.3);if(k<=0)return;X.save();X.globalAlpha=cl(1-ss(P(t,(o.out||t0+2)-.3,.3)));slam(s,CX,y,sz,t0,t,{...s21_F,c:c||'#fff',stag:.035,from:2.2,glow:o.glow,gb:30*U,ls:4});X.restore()}

SCENE(21,{dur:30,
draw(t){
  const g=s21_geo();
  // ---------- 0–3 · GANCHO ----------
  if(t<3.1){bg('#03101d','#0b2238');const[sx,sy]=shake(t,.25,22);X.save();X.translate(sx,sy);
    s21_ondas(t,CX,CY+80*U,0,.28,900*U,'8,225,255',1,5);
    const b=X.createRadialGradient(CX,CY+80*U,0,CX,CY+80*U,240*U);b.addColorStop(0,'rgba(8,225,255,.45)');b.addColorStop(1,'rgba(8,225,255,0)');X.fillStyle=b;X.fillRect(0,0,W,H);
    const out=ss(P(t,2.55,.5));X.save();X.translate(CX,CY);X.scale(1+out*1.8,1+out*1.8);X.translate(-CX,-CY);X.globalAlpha=1-out;
    slam('LA SEÑAL',CX,CY-250*U,300*U,.2,t,{...s21_F,c:'#fff',stag:.05,from:3,glow:'rgba(8,225,255,.8)',gb:40*U});
    slam('QUE LLEGA',CX,CY+90*U,250*U,1.0,t,{...s21_F,grad:['#FFE08A',K.ambar,K.naranja],stag:.05,from:3,glow:'rgba(253,174,3,.6)'});
    X.restore();X.restore();vineta(.5);flash(t,.2,.8,.35)}
  // ---------- 3–11 · MAPA: Honduras → Santa Bárbara → San José de Colinas ----------
  else if(t<11){bg('#020b16','#0a2036');grid(t,.6);
    const z1=1+2.6*eio(P(t,5,1.4)),z2=z1*(1+1.7*eio(P(t,8,1.3)));const z=z2;
    const fA=g.hc,fB=g.sbc,fC=g.col;const k1=eio(P(t,5,1.4)),k2=eio(P(t,8,1.3));
    const fx=lerp(lerp(fA[0],fB[0],k1),fC[0],k2),fy=lerp(lerp(fA[1],fB[1],k1),fC[1],k2);
    const sy=CY+120*U,sx=CX;const ent=bk(P(t,3,.8),1.2);
    X.save();X.translate(CX,sy);X.scale(.6+.4*ent,.6+.4*ent);X.translate(-CX,-sy);X.globalAlpha=cl(P(t,3,.3));
    s21_map(t,z,fx,fy,sx,sy,{draw:ss(P(t,3,1.3)),fill:ss(P(t,3.6,.8)),sb:ss(P(t,6.2,.5)),sbf:.85-.6*k2});
    // Colinas: pin + ondas
    const pc=s21_pt(g,g.col,z,fx,fy,sx,sy);
    if(t>9.3){s21_ondas(t,pc[0],pc[1],9.4,.35,420*U,'253,174,3',.82,5);const d=bk(P(t,9.3,.5),2);X.save();X.translate(pc[0],pc[1]-(1-d)*200*U);X.scale(1.5,1.5);
      X.fillStyle=K.rojo;X.shadowColor=K.rojo;X.shadowBlur=30*U;X.beginPath();X.arc(0,-70*U,34*U,Math.PI*.82,Math.PI*.18);X.lineTo(0,0);X.closePath();X.fill();X.shadowBlur=0;X.fillStyle='#fff';X.beginPath();X.arc(0,-70*U,13*U,0,7);X.fill();X.restore()}
    X.restore();
    // rótulos
    if(t<5.6){const k=win(t,3.5,5.6,.3,.3);X.save();X.globalAlpha=k;rise('HONDURAS',CX,560*U,210*U,3.5,t,{...s21_F,c:'#fff',ls:14});X.restore()}
    s21_titulo('SANTA',470*U,230*U,6.2,t,'#fff',{out:8.6,glow:'rgba(253,174,3,.7)'});
    s21_titulo('BÁRBARA',690*U,230*U,6.4,t,K.ambar,{out:8.6});
    if(t>9.4){const k=win(t,9.4,11.2,.3,.2);X.save();X.globalAlpha=k;rise('SAN JOSÉ',CX,500*U,190*U,9.4,t,{...s21_F,c:'#fff',ls:6});rise('DE COLINAS',CX,690*U,170*U,9.6,t,{...s21_F,c:K.cian,ls:6});X.restore()}
    vineta(.55);flash(t,6.2,.45,.3,'253,174,3');flash(t,9.3,.35,.25)}
  // ---------- 11–18.8 · LA TORRE Y LAS CASAS ----------
  else if(t<18.8){const sky=X.createLinearGradient(0,0,0,H);sky.addColorStop(0,'#030c1a');sky.addColorStop(.55,'#0b2a4a');sky.addColorStop(1,'#123a5c');X.fillStyle=sky;X.fillRect(0,0,W,H);
    particulas(t,.6,60,['255,255,255','8,225,255']);
    const push=1+.1*ss(P(t,11,7.8));const[sx,sy]=shake(t,12.2,10);X.save();X.translate(CX+sx,1150*U+sy);X.scale(push,push);X.translate(-CX,-1150*U);
    const tx=CX,ty=1180*U,th=560*U,top=ty-th;
    s21_ondas(t,tx,top,11.9,.556,1500*U,'8,225,255',1,7);
    s21_cerro(1200*U,40*U,5,1,'#0e3150');
    const cs=[[1240,'#0b2742',.8,1.3],[1380,'#081e35',1,2.6],[1530,'#05152a',1.25,4.1]];
    s21_torre(tx,ty,th,P(t,11.1,.8),t);
    cs.forEach(([y,c,s,ph],j)=>{s21_cerro(y*U,50*U,4+j,ph,c);for(let i=0;i<7;i++){const x=(i+.5+(hs(i+j*9)-.5)*.5)*W/7;if(j===0&&Math.abs(x-tx)<120*U)continue;const yy=s21_yc(y*U,50*U,4+j,ph,x)+8*U;
      const d=Math.hypot(x-tx,yy-top);let lit=0;for(let r=0;r<12;r++){const ti=11.9+r*.556;const pr=(t-ti)/(2.224);if(pr>0){const R=1500*U*ex(pr*1.2);if(R>d)lit=1}}
      s21_casa(x,yy,s*U*(1+.06*bk(lit)),lit*(.75+.25*Math.sin(t*3+i)),c==='#05152a'?'#020912':'#06182b')}});
    X.restore();
    s21_titulo('A TU CASA',430*U,260*U,12.2,t,'#fff',{out:14.3,glow:'rgba(8,225,255,.8)'});
    s21_titulo('NUESTRA',370*U,230*U,14.4,t,K.ambar,{out:18.7});
    s21_titulo('GENTE',580*U,250*U,14.6,t,'#fff',{out:16.5});
    s21_titulo('TIERRA',580*U,250*U,16.6,t,K.cian,{out:18.7,glow:'rgba(8,225,255,.6)'});
    vineta(.5);flash(t,11,.9,.4);flash(t,14.4,.25,.2);flash(t,16.6,.25,.2)}
  // ---------- 18.8–24.6 · MAPA NOCTURNO: la señal ilumina el departamento ----------
  else if(t<24.6){bg('#010710','#071a2e');const z=3.6+.9*ss(P(t,18.8,5.8)),fx=g.col[0],fy=g.col[1],sx=CX,sy=CY+150*U;
    X.save();const rr=ss(P(t,18.8,.6));X.globalAlpha=rr;s21_map(t,z,fx,fy,sx,sy,{sb:.5,sbf:.25,fill:.8});X.restore();
    const pc=s21_pt(g,g.col,z,fx,fy,sx,sy);const R=(t-19.2)*240*U;
    s21_ondas(t,pc[0],pc[1],19.2,.483,1400*U,'8,225,255',.82,5);
    X.save();X.globalCompositeOperation='lighter';g.luces.forEach((l,i)=>{const p=s21_pt(g,[l[0],l[1]],z,fx,fy,sx,sy);const d=Math.hypot(p[0]-pc[0],(p[1]-pc[1])/.82);if(d>R)return;const k=ex((R-d)/(140*U));
      // haz de señal (arco) hacia cada luz al llegar
      const a=1-cl((R-d)/(300*U));if(a>0){X.strokeStyle=`rgba(8,225,255,${a*.7})`;X.lineWidth=2*U;X.beginPath();X.moveTo(pc[0],pc[1]);X.quadraticCurveTo((pc[0]+p[0])/2,(pc[1]+p[1])/2-120*U,p[0],p[1]);X.stroke()}
      const r=(4+6*hs(i))*U*k;const gg=X.createRadialGradient(p[0],p[1],0,p[0],p[1],r*3);gg.addColorStop(0,'rgba(255,230,160,1)');gg.addColorStop(.3,'rgba(253,174,3,.6)');gg.addColorStop(1,'rgba(253,174,3,0)');X.fillStyle=gg;X.beginPath();X.arc(p[0],p[1],r*3,0,7);X.fill()});X.restore();
    s21_torre(pc[0],pc[1],150*U,1,t);
    s21_titulo('TU CANAL',440*U,270*U,19.2,t,'#fff',{out:21.3,glow:'rgba(8,225,255,.8)'});
    s21_titulo('CADA DÍA',440*U,270*U,21.4,t,K.ambar,{out:23.6,glow:'rgba(253,174,3,.6)'});
    rise('SANTA BÁRBARA · HONDURAS',CX,640*U,58*U,21.8,t,{...s21_F,w:700,c:'rgba(207,233,255,.85)',ls:8,a:win(t,21.8,23.6)});
    // implosión hacia el logo
    const ip=P(t,23.6,1);if(ip>0){X.fillStyle=`rgba(255,255,255,${ip*ip})`;X.fillRect(0,0,W,H)}
    vineta(.6);flash(t,19.2,.3,.25)}
  // ---------- 24.6–30 · LOGO ----------
  else{bg('#03101d','#0b2238');rays(CX,CY-120*U,24,'rgba(0,0,0,0)','rgba(8,225,255,.05)',t*.08);
    s21_ondas(t,CX,CY-130*U,24.6,.556,1100*U,'8,225,255',1,4);s21_ondas(t,CX,CY-130*U,24.88,.556,1100*U,'253,174,3',1,3);
    const e=P(t,24.6,1.3);const ang=(1-ex(e))*Math.PI*2.2;const sc=.6+.4*bk(P(t,24.6,.8),1.3);
    logo3D(CX,CY-170*U,640*U*sc,ang,{depth:26,glow:'rgba(8,225,255,.55)',shine:P(t,26.1,1.1)});
    s21_titulo('EL CANAL QUE CRECE',CY+330*U,124*U,26.0,t,'#fff',{out:40});
    s21_titulo('CADA DÍA',CY+480*U,175*U,26.5,t,K.ambar,{out:40,glow:'rgba(253,174,3,.6)'});
    const pk=bk(P(t,27.4,.5));if(pk>0){X.save();X.translate(CX,CY+640*U);X.scale(pk,pk);X.fillStyle=K.cian;X.beginPath();X.roundRect(-230*U,-48*U,460*U,96*U,48*U);X.fill();txt('/UNEVISION',0,4*U,66*U,{...s21_F,c:K.noche,ls:4});X.restore()}
    flare(CX+300*U,CY-380*U,.6*win(t,26.1,27.4,.4,.8));
    vineta(.5);flash(t,24.6,1,.6)}
},
events:[['golpe',.2],['whoosh',.95],['golpe',1.05],['whoosh_largo',2.55],['golpe',3.0],['swipe',3.5],['riser',5.2],['golpe',6.2],['whoosh',8.0],['pop',9.35],['golpe',9.45],['obturador',11.0],['golpe',12.2],['whoosh',14.35],['golpe',14.6],['golpe',16.6],['swipe',18.8],['golpe',19.2],['golpe',21.4],['riser',23.6],['golpe',24.6],['whoosh_largo',24.7],['campana',26.1],['pop',27.4]],
musica:{estilo:'epic',bpm:108,tono:'Ebm',hits:[.2,3.0,6.2,9.45,12.2,14.6,16.6,19.2,21.4,24.6],final:24.6}
});
})();
