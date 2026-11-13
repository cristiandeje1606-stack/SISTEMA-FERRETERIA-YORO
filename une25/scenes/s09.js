// escena 09 · PRISMA DE CRISTAL (pop, 104, A) — prismas y vidrios que refractan la luz en colores de marca, reflejos, lujo
(()=>{
const B=60/104,C=[0,1,2,3,4,5,6,7,8,9,10].map(i=>i*B*4); // 0 2.31 4.62 6.92 9.23 11.54 13.85 16.15 18.46 20.77 23.08
const SPEC=['8,225,255','76,143,226','253,174,3','246,144,28','234,79,61','227,23,62'];
const TH={f:'Archivo',w:200,st:'expanded'},HV={f:'Archivo',w:900,st:'expanded'};
// texto con degradado y reflejo que lo recorre (sh 0..1)
function gtxt(s,x,y,sz,o={},sh=-1){X.save();X.font=font(sz,o);X.fontStretch=o.st||'expanded';X.letterSpacing=(o.ls||0)+'px';X.textAlign='center';X.textBaseline='middle';if(o.a!==undefined)X.globalAlpha*=o.a;
  const w=mw(s,sz,o);const g=X.createLinearGradient(x-w/2,y-sz/2,x+w/2,y+sz/2);(o.cols||['#FFFFFF','#D7E9FF','#9FC3F0']).forEach((c,i,a)=>g.addColorStop(i/(a.length-1),c));
  if(o.glow){X.shadowColor=o.glow;X.shadowBlur=o.gb||30*U}X.fillStyle=g;X.fillText(s,x,y);X.shadowBlur=0;
  if(sh>0&&sh<1){const bx=x-w/2-w*.2+w*1.4*sh;const b=X.createLinearGradient(bx-120*U,y-sz,bx+120*U,y+sz);b.addColorStop(0,'rgba(255,255,255,0)');b.addColorStop(.5,'rgba(255,255,255,.95)');b.addColorStop(1,'rgba(255,255,255,0)');X.fillStyle=b;X.fillText(s,x,y)}
  X.restore()}
// texto refractado (separación cromática) para el interior de los vidrios
function rtxt(s,x,y,sz,o,d){X.save();X.globalCompositeOperation='lighter';txt(s,x-d,y,sz,{...o,c:'rgba(227,23,62,.9)'});txt(s,x+d,y,sz,{...o,c:'rgba(8,225,255,.9)'});txt(s,x,y+d*.4,sz,{...o,c:'rgba(253,174,3,.7)'});X.restore()}
function path(pts){X.beginPath();pts.forEach((p,i)=>i?X.lineTo(p[0],p[1]):X.moveTo(p[0],p[1]));X.closePath()}
// vidrio: contenido refractado dentro + reflejo + aristas brillantes
function glassP(pts,inner,o={}){X.save();path(pts);X.clip();X.fillStyle=o.tint||'rgba(10,30,60,.35)';X.fill();if(inner)inner();
  const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);const x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);
  const g=X.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,'rgba(255,255,255,.28)');g.addColorStop(.45,'rgba(255,255,255,.04)');g.addColorStop(1,'rgba(160,220,255,.16)');X.fillStyle=g;X.fillRect(x0,y0,x1-x0,y1-y0);
  if(o.sh!==undefined){const bx=x0+(x1-x0)*(-.3+1.6*o.sh);X.save();X.globalCompositeOperation='lighter';const b=X.createLinearGradient(bx-90*U,y0,bx+90*U,y1);b.addColorStop(0,'rgba(255,255,255,0)');b.addColorStop(.5,'rgba(255,255,255,.35)');b.addColorStop(1,'rgba(255,255,255,0)');X.fillStyle=b;X.fillRect(x0,y0,x1-x0,y1-y0);X.restore()}
  X.restore();X.save();X.globalCompositeOperation='lighter';path(pts);X.strokeStyle='rgba(200,240,255,.85)';X.lineWidth=(o.lw||3)*U;X.shadowColor='rgba(8,225,255,.9)';X.shadowBlur=18*U;X.stroke();X.restore()}
function bokeh(t,k=1){X.save();X.globalCompositeOperation='lighter';for(let i=0;i<16;i++){const x=(hs(i)*W*1.2+t*(8+hs(i+2)*20)*U)%(W*1.2)-W*.1,y=hs(i+5)*H+Math.sin(t*.6+i)*30*U,r=(60+hs(i+9)*170)*U;
  const c=SPEC[i%6];const g=X.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(${c},${.16*k})`);g.addColorStop(.7,`rgba(${c},${.06*k})`);g.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=g;X.beginPath();X.arc(x,y,r,0,7);X.fill()}X.restore()}
function fan(x,y,a0,spr,len,k,wid=1){if(k<=0)return;X.save();X.globalCompositeOperation='lighter';SPEC.forEach((c,i)=>{const a=a0+(i-2.5)*spr;const w=(.045+.02*wid)*k;
  const g=X.createLinearGradient(x,y,x+Math.cos(a)*len,y+Math.sin(a)*len);g.addColorStop(0,`rgba(${c},${.9*k})`);g.addColorStop(1,`rgba(${c},0)`);X.fillStyle=g;X.beginPath();X.moveTo(x,y);X.lineTo(x+Math.cos(a-w)*len,y+Math.sin(a-w)*len);X.lineTo(x+Math.cos(a+w)*len,y+Math.sin(a+w)*len);X.fill()});X.restore()}
function beam(x0,y0,x1,y1,k){if(k<=0)return;X.save();X.globalCompositeOperation='lighter';X.strokeStyle=`rgba(255,255,255,${k})`;X.lineWidth=6*U;X.shadowColor='#fff';X.shadowBlur=30*U;X.beginPath();X.moveTo(x0,y0);X.lineTo(x1,y1);X.stroke();X.restore()}
function tri(cx,cy,r,rot){return[0,1,2].map(i=>{const a=rot-Math.PI/2+i*2*Math.PI/3;return[cx+Math.cos(a)*r,cy+Math.sin(a)*r]})}
// gema hexagonal 3D
function gem(cx,cy,r,h,ay,ax,k){if(k<=0)return;const V=[];for(let j=0;j<2;j++)for(let i=0;i<6;i++){const a=i*Math.PI/3;V.push(rotX(rotY([Math.cos(a)*r,(j?.5:-.5)*h,Math.sin(a)*r],ay),ax))}
  const F=[];for(let i=0;i<6;i++){const n=(i+1)%6;F.push([i,n,n+6,i+6])}F.push([0,1,2,3,4,5]);F.push([11,10,9,8,7,6]);
  const pr=V.map(v=>p3(v[0],v[1],v[2]+300*U,900*U,cx,cy));const vis=[];
  F.forEach((f,fi)=>{const a=V[f[0]],b=V[f[1]],c=V[f[2]];const u=[b[0]-a[0],b[1]-a[1],b[2]-a[2]],v=[c[0]-a[0],c[1]-a[1],c[2]-a[2]];const nz=u[0]*v[1]-u[1]*v[0];const nx=u[1]*v[2]-u[2]*v[1],ny=u[2]*v[0]-u[0]*v[2];const L=Math.hypot(nx,ny,nz)||1;
    const z=f.reduce((s,i)=>s+V[i][2],0)/f.length;vis.push({f,fi,z,lit:cl(.35+.65*(-nx*.5-ny*.6-nz*.6)/L)})});
  vis.sort((a,b)=>b.z-a.z);X.save();X.globalAlpha*=k;vis.forEach(({f,fi,lit})=>{const pts=f.map(i=>pr[i]);path(pts);const c=fi<6?SPEC[fi]:'200,235,255';
    const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);const g=X.createLinearGradient(Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys));g.addColorStop(0,`rgba(${c},${.28+.45*lit})`);g.addColorStop(1,`rgba(255,255,255,${.04+.3*lit*lit})`);X.fillStyle=g;X.fill();
    X.save();X.globalCompositeOperation='lighter';X.strokeStyle=`rgba(220,245,255,${.25+.5*lit})`;X.lineWidth=2.5*U;X.stroke();X.restore()});
  X.restore()}
SCENE(9,{dur:25,events:[['whoosh',.1],['golpe',.58],['riser',1.3],['golpe',C[1]],['pop',C[1]+.5],['whoosh',C[2]-.15],['golpe',C[2]],['swipe',C[2]+1],['golpe',C[3]],['swipe',C[3]+1],['whoosh_largo',C[4]-.3],['golpe',C[4]],['golpe',C[5]],['obturador',C[5]+1.2],['whoosh',C[6]-.2],['golpe',C[6]],['pop',C[6]+.9],['golpe',C[7]],['riser',C[8]-1],['golpe',C[8]],['whoosh_largo',C[9]-.4],['golpe',C[9]],['campana',C[9]+1.2],['whoosh',C[10]]],
  musica:{estilo:'pop',bpm:104,tono:'A',hits:[.58,...C.slice(1,10)],final:C[9]},
  draw(t){bg('#03060C','#081626');
    let sx=0,sy=0;[.58,...C.slice(1)].forEach(h=>{const[a,b]=shake(t,h,8);sx+=a;sy+=b});X.save();X.translate(sx,sy);
    // ---- 1: rayo + prisma + espectro (0–4.62)
    if(t<C[2]){const two=t>=C[1];const mv=two?eio(P(t,C[1],.7)):0;const px=lerp(CX,W*.25,mv),py=CY+lerp(0,40,mv)*U,pr=lerp(230,190,mv)*U;
      bokeh(t,.6*ex(P(t,.4,1)));
      const hit=ex(P(t,.1,.48));const ex0=px-pr*.55,ey0=py+pr*.1;beam(-20*U,py+pr*.9-hit*0,lerp(-20*U,ex0,hit),lerp(py+pr*.9,ey0,hit),hit);
      fan(px+pr*.45,py+pr*.05,-.05+mv*.02,lerp(.02,.075,ex(P(t,.58,1.2))),W*1.2,ex(P(t,.58,.4)));
      const pts=tri(px,py,pr,Math.sin(t*.7)*.08);glassP(pts,null,{sh:P(t,.5,1.2),lw:4});
      flare(px+pr*.45,py+pr*.05,(1-P(t,.58,.9))*1.1,'200,240,255');
      if(two){X.save();const k=1-ss(P(t,C[2]-.25,.25));X.globalAlpha=k;
        gtxt('TU',W*.66,CY-170*U,130*U,{...TH,ls:40*U,a:ex(P(t,C[1]+.1,.5))});
        X.save();X.translate(W*.66,CY+30*U);const s=lerp(1.6,1,ex(P(t,C[1]+.2,.5)));X.scale(s,s);gtxt('CANAL',0,0,fit('CANAL',W*.55,250*U,HV),{...HV,a:ex(P(t,C[1]+.2,.3)),glow:'rgba(8,225,255,.35)'},P(t,C[1]+.9,.9));X.restore();
        X.restore()}}
    // ---- 2: láminas de vidrio sobre palabras (4.62–9.23)
    else if(t<C[4]){const two=t>=C[3];const wd=two?'INFORMACIÓN':'NOTICIAS';const t0=two?C[3]:C[2];bokeh(t,.8);
      const sz=fit(wd,W*.86,260*U,HV);const k=1-ss(P(t,C[4]-.2,.2))*(two?1:0)-(two?0:ss(P(t,C[3]-.2,.2)));X.save();X.globalAlpha=cl(k);
      gtxt(wd,CX,CY,sz,{...HV,a:ex(P(t,t0,.4)),cols:two?['#FFFFFF','#FFE7A6','#FDAE03']:['#FFFFFF','#CFF7FF','#4C8FE2']},P(t,t0+.8,1));
      gtxt(two?'QUE TE ACOMPAÑA':'DE NUESTRA TIERRA',CX,CY+210*U,50*U,{...TH,w:300,ls:22*U,a:ex(P(t,t0+.5,.5))});X.restore();
      for(let i=0;i<5;i++){const dir=two?-1:1;const q=(t-t0)/(BAR4())+i*.0;const x=CX+dir*lerp(W*.7,-W*.7,cl((t-t0)/2.3))+(i-2)*200*U;const w=150*U,h=620*U,sk=Math.sin(t*1.5+i)*.12;
        const pts=[[x-w/2,CY-h/2],[x+w/2,CY-h/2+40*U*sk],[x+w/2,CY+h/2],[x-w/2,CY+h/2-40*U*sk]];
        glassP(pts,()=>{X.save();X.translate(CX,CY);X.scale(1.04,1.04);X.translate(-CX,-CY);rtxt(wd,CX+dir*12*U,CY,sz,HV,4*U);X.restore()},{sh:((t*.6+i*.2)%1),tint:'rgba(3,10,20,.82)'})}}
    // ---- 3: losa de cristal diagonal (9.23–13.85)
    else if(t<C[6]){const two=t>=C[5];const t0=two?C[5]:C[4];bokeh(t,1);const wd=two?'TIERRA':'GENTE';
      const k=1-ss(P(t,(two?C[6]:C[5])-.2,.2));X.save();X.globalAlpha=k;
      gtxt('NUESTRA',CX,CY-150*U,120*U,{...TH,w:300,ls:36*U,a:ex(P(t,t0,.4))});
      const sz=fit(wd,W*.7,300*U,HV);gtxt(wd,CX,CY+60*U,sz,{...HV,a:ex(P(t,t0+.1,.4)),cols:two?['#FFF6DA','#FDAE03','#EA4F3D']:['#FFFFFF','#9FF3FF','#08E1FF']},P(t,t0+1,1));X.restore();
      const q=eio(cl((t-t0)/2.2));const x=lerp(-W*.35,W*1.35,q);const sw=520*U;const pts=[[x-sw/2+220*U,-50*U],[x+sw/2+220*U,-50*U],[x+sw/2-220*U,H+50*U],[x-sw/2-220*U,H+50*U]];
      glassP(pts,()=>{X.save();X.translate(x,CY);X.scale(1.08,1.08);X.translate(-x,-CY);txt('NUESTRA',CX,CY-150*U,120*U,{...TH,w:300,ls:36*U,c:two?K.ambar:K.cian});txt(wd,CX,CY+60*U,sz,{...HV,c:two?K.ambar:K.cian});X.restore()},{sh:q,tint:'rgba(3,8,16,.88)',lw:4})}
    // ---- 4: gema 3D (13.85–18.46)
    else if(t<C[8]){const two=t>=C[7];bokeh(t,.7);const gx=two?lerp(CX,W*.22,eio(P(t,C[7],.6))):CX,gy=two?CY:lerp(CY-60*U,CY-170*U,eio(P(t,C[6],.8)));
      const gk=bk(P(t,C[6],.7));if(two)fan(gx+40*U,gy,-.5,.06,W*1.2,ex(P(t,C[7],.5))*.7,2);
      gem(gx,gy,250*U*gk,300*U*gk,t*.9,.38+Math.sin(t)*.08,cl(gk));flare(gx,gy,(1-P(t,C[6],.8))*.9+(two?(1-P(t,C[7],.8))*.9:0),'200,240,255');
      if(!two){const k=1-ss(P(t,C[7]-.2,.2));X.save();X.globalAlpha=k;gtxt('SANTA BÁRBARA',CX,CY+210*U,fit('SANTA BÁRBARA',W*.8,150*U,HV),{...HV,a:ex(P(t,C[6]+.3,.4))},P(t,C[6]+1,1));
        gtxt('HONDURAS',CX,CY+340*U,54*U,{...TH,w:300,ls:40*U,a:ex(P(t,C[6]+.6,.5))});X.restore()}
      else{X.save();X.globalAlpha=1-ss(P(t,C[8]-.2,.2));gtxt('CADA',W*.64,CY-130*U,120*U,{...TH,w:300,ls:44*U,a:ex(P(t,C[7]+.1,.4))});
        X.save();X.translate(W*.64,CY+60*U);X.scale(lerp(1.5,1,ex(P(t,C[7]+.2,.5))),lerp(1.5,1,ex(P(t,C[7]+.2,.5))));gtxt('DÍA',0,0,300*U,{...HV,a:ex(P(t,C[7]+.2,.3)),cols:['#FFFFFF','#FFE7A6','#F6901C'],glow:'rgba(253,174,3,.35)'},P(t,C[7]+.9,.9));X.restore();X.restore()}}
    // ---- 5: abanico de luz a pantalla completa (18.46–20.77)
    else if(t<C[9]){const r=t-C[8];fan(CX,H*1.15,-Math.PI/2+Math.sin(r*.8)*.1,.16,H*1.6,ex(P(t,C[8],.4)),3);bokeh(t,.6);
      const pts=tri(CX,H*1.02,300*U,0);glassP(pts,null,{sh:P(t,C[8],1.5),lw:4});
      gtxt('CRECEMOS',CX,CY-200*U,110*U,{...TH,w:500,ls:40*U,glow:'rgba(0,0,0,.95)',gb:24*U,a:ex(P(t,C[8]+.1,.4))});
      X.save();X.translate(CX,CY-10*U);const s=lerp(1.7,1,ex(P(t,C[8]+.25,.5)));X.scale(s,s);gtxt('CONTIGO',0,0,fit('CONTIGO',W*.7,250*U,HV),{...HV,a:ex(P(t,C[8]+.25,.3)),glow:'rgba(255,255,255,.35)'},P(t,C[8]+1,1));X.restore()}
    // ---- 6: logo tras el prisma (20.77–25)
    else{bokeh(t,.8);const r=t-C[9];const lw=560*U,ly=CY-90*U;
      fan(CX,ly,Math.PI*.5,.5,W,.18*ex(P(t,C[9],1)),3);fan(CX,ly,-Math.PI*.5,.5,W,.18*ex(P(t,C[9],1)),3);
      const la=ex(P(t,C[9],.5));if(r<1.3)logo(CX,ly,lw*lerp(.92,1,la),{a:la,glow:'rgba(8,225,255,.5)'});else logo3D(CX,ly,lw,0,{depth:12,glow:'rgba(8,225,255,.5)',shine:P(t,C[9]+1.4,1.1)});
      const q=eio(P(t,C[9],1.6));const px=lerp(CX,W*1.4,q);const pts=tri(px,ly+40*U,560*U,q*.6);
      glassP(pts,()=>{X.save();X.translate(px,ly);X.scale(1.15,1.15);X.translate(-px,-ly);logo(CX+20*U,ly,lw,{tint:'cian',a:.5});logo(CX-20*U,ly,lw,{tint:'ambar',a:.5});X.restore()},{sh:q,lw:4});
      flare(CX,ly,(1-P(t,C[9]+.6,.8))*1.0*(t>C[9]+.6?1:0),'200,240,255');
      gtxt('EL CANAL QUE CRECE CADA DÍA',CX,CY+280*U,60*U,{f:'Archivo',w:500,ls:12*U,a:ex(P(t,C[9]+1.2,.6))},P(t,C[9]+2.2,1.2));
      gtxt('/UNEVISION',CX,CY+370*U,54*U,{f:'Archivo',w:800,ls:14*U,cols:['#FFE7A6','#FDAE03'],a:ex(P(t,C[9]+1.6,.6))})}
    X.restore();
    [.58,...C.slice(1)].forEach((h,i)=>flash(t,h,i===0||h===C[9]?.75:.35,.3,'220,245,255'));vineta(.6)}
});
function BAR4(){return 60/104*4}
})();
