// 05 · MAPA Y TIERRA — Honduras en relieve low-poly 3D, acercamiento a Santa Bárbara y San José de Colinas, ondas de señal desde el pin
const s05_SB=[-88.2361,14.9194],s05_SJ=[-88.3036,15.0307]; // Santa Bárbara (cabecera) y San José de Colinas (aprox.)
let s05_M=null;
function s05_init(){if(s05_M)return s05_M;const fc=topojson.feature(MUNDO,MUNDO.objects.countries);const hn=fc.features.find(f=>+f.id===340);
  const prj=d3.geoMercator().fitSize([1500,860],hn);const[[x0,y0],[x1,y1]]=d3.geoPath(prj).bounds(hn);const ox=(x0+x1)/2,oy=(y0+y1)/2;const pj=ll=>{const p=prj(ll);return[p[0]-ox,p[1]-oy]};
  // anillos de Honduras proyectados
  const polys=(hn.geometry.type==='Polygon'?[hn.geometry.coordinates]:hn.geometry.coordinates);const rings=polys.map(pl=>pl[0].map(pj));
  const inside=(x,y)=>rings.some(r=>d3.polygonContains(r,[x,y]));
  // borde muestreado
  const edge=[];rings.forEach(r=>{if(Math.abs(d3.polygonArea(r))<200)return;for(let i=0;i<r.length-1;i++){const a=r[i],b=r[i+1];const n=Math.max(1,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/26));for(let k=0;k<n;k++)edge.push([lerp(a[0],b[0],k/n),lerp(a[1],b[1],k/n)])}});
  const pts=[...edge];const st=34;let n=0;for(let y=-480;y<480;y+=st)for(let x=-800;x<800;x+=st){n++;const px=x+(hs(n)-.5)*st*.8,py=y+(hs(n+.5)-.5)*st*.8;if(inside(px,py)){let md=1e9;for(const e of edge){const d=Math.hypot(e[0]-px,e[1]-py);if(d<md)md=d}if(md>12)pts.push([px,py])}}
  const sb=pj(s05_SB),sj=pj(s05_SJ);
  const elev=(x,y)=>{let md=1e9;for(let i=0;i<edge.length;i+=2){const d=Math.hypot(edge[i][0]-x,edge[i][1]-y);if(d<md)md=d}const coast=ss(md/120);
    const n1=Math.sin(x*.011+1.3)*Math.cos(y*.013-.7)+.6*Math.sin(x*.027+y*.019+2)+.35*Math.sin(x*.061-y*.047)+.2*Math.cos(x*.09+y*.08);
    const ridge=Math.exp(-((y+.25*x-60)**2)/(2*170*170));return Math.max(0,(18+38*(n1*.5+.6)+55*ridge)*coast)};
  const H0=pts.map(p=>elev(p[0],p[1]));const del=d3.Delaunay.from(pts);const tris=[];const T=del.triangles;
  for(let i=0;i<T.length;i+=3){const a=T[i],b=T[i+1],c=T[i+2];const cx=(pts[a][0]+pts[b][0]+pts[c][0])/3,cy=(pts[a][1]+pts[b][1]+pts[c][1])/3;if(!inside(cx,cy))continue;
    const ds=Math.hypot(cx-sb[0],cy-sb[1]);tris.push([a,b,c,cx,cy,ds])}
  const maxd=Math.max(...tris.map(r=>r[5]));tris.forEach(r=>r[5]/=maxd);
  const nb=fc.features.filter(f=>[320,222,558,84,188,591].includes(+f.id)).map(f=>{const g=f.geometry;const pl=g.type==='Polygon'?[g.coordinates]:g.coordinates;return pl.map(p=>p[0].map(pj))});
  const hS=(x,y)=>{let best=0,bd=1e9;pts.forEach((p,i)=>{const d=(p[0]-x)**2+(p[1]-y)**2;if(d<bd){bd=d;best=i}});return H0[best]};
  s05_M={pts,H0,tris,rings,nb,sb,sj,hsb:hS(sb[0],sb[1]),hsj:hS(sj[0],sj[1]),pj};return s05_M}
// cámara por fotogramas clave: [t, fx, fy (0 centro / 1 SB / 2 SJ), zoom, inclinación, giro]
const s05_KF=[[0,0,.62,0,0],[2.6,0,.78,0,0],[5.8,0,.95,.9,-.18],[8.6,1,1.4,.82,.12],[11.6,2,2.2,.86,.26],[14.6,2,1.5,.8,-.05],[17.6,0,.98,.62,-.14],[20.4,2,1.15,.32,0],[25,2,1.25,.2,0]];
function s05_cam(t,M){let i=0;while(i<s05_KF.length-2&&t>=s05_KF[i+1][0])i++;const a=s05_KF[i],b=s05_KF[i+1];const q=eio(P(t,a[0],b[0]-a[0]));
  const fp=k=>k===0?[0,0]:k===1?M.sb:M.sj;const fa=fp(a[1]),fb=fp(b[1]);
  return{fx:lerp(fa[0],fb[0],q),fy:lerp(fa[1],fb[1],q),z:lerp(a[2],b[2],q)*(1+.02*Math.sin(t*.6)),tilt:lerp(a[3],b[3],q),yaw:lerp(a[4],b[4],q)+Math.sin(t*.25)*.03}}
function s05_P(x,y,h,c){let X0=(x-c.fx)*c.z*U,Y0=(y-c.fy)*c.z*U,Z0=-h*c.z*U*1.2;const cs=Math.cos(c.yaw),sn=Math.sin(c.yaw);const xr=X0*cs-Y0*sn,yr=X0*sn+Y0*cs;
  const p=rotX([xr,yr,Z0],-c.tilt);return[...p3(p[0],p[1]+40*U,p[2],1100*U,CX,CY+60*U*Math.sin(c.tilt)),p[2]]}
const s05_RAMP=[[11,34,56],[20,70,110],[76,143,226],[120,190,200],[253,174,3],[246,144,28]];
function s05_rc(h){const k=cl(h/125)*(s05_RAMP.length-1);const i=Math.min(s05_RAMP.length-2,Math.floor(k)),f=k-i;return s05_RAMP[i].map((v,j)=>lerp(v,s05_RAMP[i+1][j],f))}
function s05_cap(big,small,t0,t1,t,col=K.ambar){if(t<t0||t>t1)return;const a=1-ss(P(t,t1-.4,.4));const x=110*U,y=H-250*U;const sz=fit(big,W*.62,190*U,{f:'BigSh',w:900,ls:4*U});
  X.save();X.globalAlpha=a;const lp=ex(P(t,t0,.6));X.fillStyle=col;X.fillRect(x,y-sz*.55,8*U,sz*1.1*lp);
  rise(big,x+40*U,y,sz,t0+.08,t,{f:'BigSh',w:900,al:'left',ls:4*U,c:'#fff',d:.6});
  if(small)rise(small,x+44*U,y+sz*.62+18*U,40*U,t0+.3,t,{f:'BigSh',w:700,al:'left',ls:10*U,c:col});X.restore()}
function s05_pin(sx,sy,s,label,t0,t,col,sz,side=1){const p=P(t,t0,.5);if(p<=0)return;const drop=(1-bk(p,2))*-220*U;const hh=150*U*Math.max(.6,Math.min(1.2,s));
  X.save();X.globalAlpha*=cl(p*3);const g=X.createLinearGradient(0,sy-hh,0,sy);g.addColorStop(0,col);g.addColorStop(1,'rgba(255,255,255,0)');X.fillStyle=g;X.fillRect(sx-2.5*U,sy-hh+drop,5*U,hh);
  X.fillStyle=col;X.shadowColor=col;X.shadowBlur=30*U;X.beginPath();X.arc(sx,sy-hh+drop,16*U,0,7);X.fill();X.shadowBlur=0;X.fillStyle='#fff';X.beginPath();X.arc(sx,sy-hh+drop,6*U,0,7);X.fill();
  const lp=ex(P(t,t0+.35,.5));if(lp>0){const w=mw(label,sz,{f:'BigSh',w:800,ls:4*U})+56*U;const bx=side>0?sx+30*U:sx-30*U-w,by=sy-hh+drop-sz*.7;X.globalAlpha*=lp;
    X.fillStyle='rgba(6,18,31,.82)';X.beginPath();X.roundRect(bx,by,w*lp,sz*1.4,10*U);X.fill();X.fillStyle=col;X.fillRect(bx,by,6*U,sz*1.4);
    X.save();X.beginPath();X.rect(bx,by,w*lp,sz*1.4);X.clip();txt(label,bx+30*U,by+sz*.72,sz,{f:'BigSh',w:800,al:'left',ls:4*U});X.restore()}
  X.restore()}
SCENE(5,{dur:25,
  draw(t){const M=s05_init();const c=s05_cam(t,M);
    // cielo / océano
    const g=X.createLinearGradient(0,0,0,H);g.addColorStop(0,'#030a14');g.addColorStop(1,'#0a1f35');X.fillStyle=g;X.fillRect(0,0,W,H);
    // retícula del océano en el mismo plano
    X.save();X.strokeStyle='rgba(8,225,255,.07)';X.lineWidth=1.2*U;const seg=(x0,y0,x1,y1)=>{X.beginPath();let st=false;for(let k=0;k<=24;k++){const q=s05_P(lerp(x0,x1,k/24),lerp(y0,y1,k/24),0,c);if(q[3]<-700*U){st=false;continue}st?X.lineTo(q[0],q[1]):X.moveTo(q[0],q[1]);st=true}X.stroke()};for(let i=-12;i<=12;i++){seg(i*120,-1400,i*120,1400);seg(-1700,i*120,1700,i*120)}X.restore();
    // países vecinos (planos)
    const na=win(t,.1,24,.8,.5);X.save();X.strokeStyle=`rgba(76,143,226,${.45*na})`;X.fillStyle=`rgba(11,34,56,${.55*na})`;X.lineWidth=1.5*U;
    M.nb.forEach(f=>f.forEach(r=>{const qs=r.map(p=>s05_P(p[0],p[1],0,c));if(qs.some(q=>q[3]<-700*U))return;X.beginPath();qs.forEach((q,i)=>{i?X.lineTo(q[0],q[1]):X.moveTo(q[0],q[1])});X.closePath();X.fill();X.stroke()}));X.restore();
    // contorno de Honduras que se dibuja
    const dp=ss(P(t,.3,1.8));X.save();X.strokeStyle=K.cian;X.lineWidth=3*U;X.shadowColor=K.cian;X.shadowBlur=14*U;
    M.rings.forEach(r=>{const n=Math.floor(r.length*dp);if(n<2)return;X.beginPath();for(let i=0;i<n;i++){const q=s05_P(r[i][0],r[i][1],0,c);i?X.lineTo(q[0],q[1]):X.moveTo(q[0],q[1])}X.stroke()});X.restore();
    // relieve low-poly que crece
    const PP=M.pts.map((p,i)=>p);const list=[];
    for(const tr of M.tris){const rp=ex(P(t,2.4+tr[5]*1.6,.9));if(rp<=0)continue;const hk=rp*(1+.04*Math.sin(t*2+tr[3]*.02));
      const v=[tr[0],tr[1],tr[2]].map(k=>[M.pts[k][0],M.pts[k][1],M.H0[k]*hk]);const pr=v.map(q=>s05_P(q[0],q[1],q[2],c));if(pr.some(q=>q[3]<-700*U))continue;
      list.push([pr,v,(pr[0][3]+pr[1][3]+pr[2][3])/3,rp])}
    list.sort((a,b)=>b[2]-a[2]);
    const L=[-.45,-.6,.66];
    for(const[pr,v,,rp]of list){const ux=v[1][0]-v[0][0],uy=v[1][1]-v[0][1],uz=(v[1][2]-v[0][2])*1.2,wx=v[2][0]-v[0][0],wy=v[2][1]-v[0][1],wz=(v[2][2]-v[0][2])*1.2;
      let nx=uy*wz-uz*wy,ny=uz*wx-ux*wz,nz=ux*wy-uy*wx;if(nz<0){nx=-nx;ny=-ny;nz=-nz}const nl=Math.hypot(nx,ny,nz)||1;const lam=cl((nx*L[0]+ny*L[1]+nz*L[2])/nl);
      const hm=(v[0][2]+v[1][2]+v[2][2])/3;const col=s05_rc(hm);const k=.42+.85*lam;const r=Math.min(255,col[0]*k)|0,gg=Math.min(255,col[1]*k)|0,b=Math.min(255,col[2]*k)|0;
      X.globalAlpha=cl(rp*2);X.fillStyle=`rgb(${r},${gg},${b})`;X.strokeStyle=`rgb(${r},${gg},${b})`;X.lineWidth=1.8*U;X.lineJoin="round";X.beginPath();X.moveTo(pr[0][0],pr[0][1]);X.lineTo(pr[1][0],pr[1][1]);X.lineTo(pr[2][0],pr[2][1]);X.closePath();X.fill();X.stroke()}
    X.globalAlpha=1;
    // ondas de señal desde San José de Colinas
    const wa=win(t,12.2,24.6,.6,.5);if(wa>0){X.save();X.globalCompositeOperation='lighter';
      for(let k=0;k<6;k++){const ph=((t-12.2)/2.4+k/6)%1;const R=ph*(t<15?260:900);X.strokeStyle=`rgba(${k%2?'253,174,3':'8,225,255'},${wa*(1-ph)*.9})`;X.lineWidth=(5-3*ph)*U;X.beginPath();
        for(let i=0;i<=72;i++){const a=i/72*Math.PI*2;const q=s05_P(M.sj[0]+Math.cos(a)*R,M.sj[1]+Math.sin(a)*R,M.hsj+8,c);if(q[3]<-700*U)continue;i?X.lineTo(q[0],q[1]):X.moveTo(q[0],q[1])}X.stroke()}X.restore()}
    // pines
    const ps=s05_P(M.sb[0],M.sb[1],M.hsb,c),pj=s05_P(M.sj[0],M.sj[1],M.hsj,c);
    if(t<20.6){const fa=1-ss(P(t,20.1,.5));X.save();X.globalAlpha=fa;
      s05_pin(ps[0],ps[1],c.z/1.7,'SANTA BÁRBARA',8.9,t,K.ambar,50*U,-1);
      s05_pin(pj[0],pj[1],c.z/1.7,'SAN JOSÉ DE COLINAS',11.9,t,K.cian,44*U);X.restore()}
    vineta(.6);
    // rótulos cinematográficos
    const ca=Math.max(win(t,2.9,8.7,.4,.4),win(t,14.6,20.3,.4,.4));if(ca>0){const lg=X.createLinearGradient(0,H,0,H*.5);lg.addColorStop(0,`rgba(3,10,20,${.85*ca})`);lg.addColorStop(1,'rgba(3,10,20,0)');X.fillStyle=lg;X.fillRect(0,H*.5,W*.75,H*.5)}
    if(t>=.6&&t<2.6){const a=win(t,.6,2.6,.5,.4);const sz=fit('NUESTRA TIERRA',W*.8,210*U,{f:'BigSh',w:900,ls:14*U});X.save();X.globalAlpha=a;
      const ls=lerp(60,14,ex(P(t,.6,1.6)))*U;txt('NUESTRA TIERRA',CX,CY,sz,{f:'BigSh',w:900,ls,c:'#fff',glow:'rgba(8,225,255,.5)'});X.restore()}
    s05_cap('HONDURAS','CENTROAMÉRICA',3.0,5.8,t,K.cian);
    s05_cap('NUESTRA GENTE','CADA DÍA',6.0,8.6,t,K.ambar);
    s05_cap('LO QUE PASA AQUÍ',null,14.7,17.4,t,K.cian);
    s05_cap('CRECEMOS CONTIGO','SANTA BÁRBARA · HONDURAS',17.6,20.2,t,K.ambar);
    flash(t,8.9,.25,.25,'253,174,3');flash(t,11.9,.25,.25,'8,225,255');
    // cierre: el logo nace del pin
    if(t>=20.2){const p=P(t,20.6,.9),e=ex(p);X.fillStyle=`rgba(3,10,20,${.78*ss(P(t,20.2,.8))})`;X.fillRect(0,0,W,H);const ly=CY-80*U;
      X.save();X.globalCompositeOperation='lighter';for(let k=0;k<3;k++){const ph=((t-20.6)/1.8+k/3)%1;if(t<20.6)break;X.strokeStyle=`rgba(8,225,255,${(1-ph)*.5})`;X.lineWidth=3*U;X.beginPath();X.ellipse(CX,ly,(200+ph*700)*U,(200+ph*700)*U*.9,0,0,7);X.stroke()}X.restore();
      logo3D(CX,ly,480*U*(.6+.4*bk(p,1.4)),(1-e)*.9,{depth:20,a:cl(p*3),shine:P(t,21.6,1),glow:'rgba(8,225,255,.3)'});
      rise(DATOS.eslogan,CX,CY+262*U,fit(DATOS.eslogan,W*.7,62*U,{f:'BigSh',w:900,ls:8*U}),21.8,t,{f:'BigSh',w:900,ls:8*U,c:'#fff',d:.7});
      rise(DATOS.lugar,CX,CY+332*U,36*U,22.3,t,{f:'BigSh',w:700,ls:12*U,c:K.ambar,d:.7});
      rise(DATOS.redes,CX,CY+392*U,40*U,22.8,t,{f:'BigSh',w:800,ls:10*U,c:K.cian,d:.7});}
  },
  events:[['whoosh_largo',.3],['golpe',.65],['whoosh',2.4],['golpe',3.0],['whoosh_largo',5.8],['golpe',6.0],['whoosh',8.6],['riser',7.9],['golpe',8.9],['pop',9.3],['whoosh',11.6],['golpe',11.9],['pop',12.3],['campana',12.4],['whoosh_largo',14.6],['golpe',14.7],['whoosh',17.4],['golpe',17.6],['riser',19.6],['golpe',20.6],['whoosh',21.6],['swipe',21.8],['pop',22.8]],
  musica:{estilo:'cinematic',bpm:100,tono:'Cm',hits:[.65,3.0,6.0,8.9,11.9,14.7,17.6,20.6],final:20.6}
});
