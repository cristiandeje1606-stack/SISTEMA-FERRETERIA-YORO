// 01 · IMPACTO 3D — cubos de colores que vuelan desde la profundidad y se ensamblan; Anton gigante extruido
const s01_N=60;
const s01_RGB=[K.cian,K.azul,K.ambar,K.naranja,K.brasa,K.rojo].map(c=>[parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)]);
// inicio de cada formación
const s01_SEC=[0,3,6,9.9,12,15,17,20.4,21];
const s01_BAR=(()=>{const s=[];for(let c=0;c<10;c++)for(let r=0;r<=c;r++)s.push([c,r]);return s})(); // 55 lugares
function s01_F(k,i,t){const r1=hs(i*3+1),r2=hs(i*5+2),r3=hs(i*7+3);
  switch(k){
  case 0:return[(r1-.5)*7000,(r2-.5)*4200,7000+r3*6000,r1*9,r2*9];
  case 1:{const c=i%15,r=Math.floor(i/15);return[(c-7)*190,(r-1.5)*190,760+Math.sin(t*2.2+c*.55+r)*60+r3*40,Math.sin(t+i)*.08,Math.cos(t*.8+i)*.08]}
  case 2:{const a=i/s01_N*Math.PI*2+t*.55;return[Math.cos(a)*1250,Math.sin(a)*640,700+Math.sin(a*3+t*2)*140,t*1.1+i,t*.7+i*.3]}
  case 3:{const sd=i%2?1:-1,j=Math.floor(i/2),c=j%3,r=Math.floor(j/3);return[sd*(1180+c*170),520-r*165,560+c*80,0,sd*.25]}
  case 4:{const a=i*2.39996,zz=((i/s01_N*4600-t*1100)%4600+4600)%4600;return[Math.cos(a)*1400,Math.sin(a)*820,zz-50,t*1.6+i,t*1.2+i]}
  case 5:{const c=i%10,r=Math.floor(i/10);return[(c-4.5)*290,430+Math.sin(t*3.2-c*.7-r*.9)*90,260+r*330,Math.sin(t*2-c)*.3,0]}
  case 6:{const yy=1-2*(i+.5)/s01_N,rr=Math.sqrt(1-yy*yy),a=i*2.39996+t*.9;return[Math.cos(a)*rr*1250,yy*700,1100+Math.sin(a)*rr*700,t*1.3+i,t+i]}
  case 7:{if(i<55){const[c,r]=s01_BAR[i];return[(c-4.5)*215,520-r*128,620,0,0]}return[(r1-.5)*2600,-900-r2*400,1600,t+i,t]}
  case 8:{return[(r1-.5)*300,(r2-.5)*300,320+(r3-.5)*300,t*4+i,t*3+i]}
  default:{const a=r1*Math.PI*2,b=(r2-.5)*Math.PI;return[Math.cos(a)*Math.cos(b)*4200,Math.sin(b)*3000,-600-r3*900,t*5+i,t*4]}}}
function s01_pos(i,t){let k=0;for(let j=0;j<s01_SEC.length;j++)if(t>=s01_SEC[j])k=j+1;
  if(k===0)return s01_F(0,i,t);
  const b=s01_SEC[k-1];let q;
  if(k===1)q=ex(P(t,b+.15+hs(i+50)*.9,1.3));
  else if(k===9)q=ex(P(t,b,1.3));
  else q=eio(P(t,b+hs(i+50)*.3,.75));
  const a=s01_F(k-1,i,t),c=s01_F(k,i,t);const lift=Math.sin(q*Math.PI);const sp=(hs(i+9)-.5)*7;
  return[lerp(a[0],c[0],q),lerp(a[1],c[1],q)-lift*80,lerp(a[2],c[2],q)-lift*(k===1?0:420),lerp(a[3],c[3],q)+lift*sp,lerp(a[4],c[4],q)+lift*sp*.7]}
const s01_V=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
const s01_FC=[[0,1,2,3,[0,0,-1]],[5,4,7,6,[0,0,1]],[4,0,3,7,[-1,0,0]],[1,5,6,2,[1,0,0]],[4,5,1,0,[0,-1,0]],[3,2,6,7,[0,1,0]]];
function s01_cubes(t,list,cam){const f=900*U;
  for(const c of list){const[i,pp]=c;const sz=70;const[col]=[s01_RGB[i%6]];
    const tr=v=>{let q=rotX(v,pp[3]);q=rotY(q,pp[4]);q=[q[0]+pp[0],q[1]+pp[1],q[2]+pp[2]];q=rotY(q,cam.ay);q=rotX(q,cam.ax);return q};
    const vs=s01_V.map(v=>tr([v[0]*sz,v[1]*sz,v[2]*sz]));if(vs.some(v=>v[2]*U<-f*.85))continue;
    const ps=vs.map(v=>p3(v[0]*U,v[1]*U,v[2]*U,f,CX+cam.sx,CY+cam.sy));
    const fl=[];for(const fc of s01_FC){const a=ps[fc[0]],b=ps[fc[1]],d=ps[fc[2]];const cr=(b[0]-a[0])*(d[1]-a[1])-(b[1]-a[1])*(d[0]-a[0]);if(cr>=0)continue;
      let n=rotX(fc[4],pp[3]);n=rotY(n,pp[4]);n=rotY(n,cam.ay);n=rotX(n,cam.ax);const li=cl(.38+.62*(-n[0]*.45-n[1]*.7-n[2]*.55));fl.push([fc,li])}
    const fog=cl(1-(c[2]-600)/9000,.15,1);
    for(const[fc,li]of fl){X.beginPath();for(let k=0;k<4;k++){const p=ps[fc[k]];k?X.lineTo(p[0],p[1]):X.moveTo(p[0],p[1])}X.closePath();
      const m=.25+li*.95;const r=Math.min(255,col[0]*m+li*li*60),g=Math.min(255,col[1]*m+li*li*60),b=Math.min(255,col[2]*m+li*li*60);
      X.fillStyle=`rgba(${r|0},${g|0},${b|0},${fog})`;X.fill();X.strokeStyle=`rgba(255,255,255,${.22*li*fog})`;X.lineWidth=1.5*U;X.stroke()}}}
// texto Anton extruido con golpe por letra y brillo que recorre
let s01_oc=null;
function s01_word(s,y,sz,t0,t1,t,o={}){if(t<t0||t>t1)return;const st=o.stag??.05,dep=o.dep||16;const fo={f:'Anton',w:400,ls:o.ls??4*U};
  const out=P(t,t1-.28,.28);const gs=1+ex(out)*.6,ga=1-out;
  const chars=[...s];const tot=mw(s,sz,fo);let x0=CX-tot/2;
  X.save();X.globalAlpha*=ga;X.translate(CX,y);X.scale(gs,gs);X.translate(-CX,-y);
  const ed=o.ed||[11,34,56];
  chars.forEach((ch,i)=>{const w=mw(ch,sz,fo);const p=P(t,t0+i*st,.42);if(p>0&&ch!==' '){const k=2.4-1.4*bk(p,1.8);X.save();X.translate(x0+w/2,y);X.scale(k,k);X.globalAlpha*=cl(p*4);
      for(let d=dep;d>=1;d--){const m=1-d/dep*.8;txt(ch,d*.9*U,d*1.1*U,sz,{...fo,c:`rgb(${ed[0]*m|0},${ed[1]*m|0},${ed[2]*m|0})`})}
      txt(ch,0,0,sz,{...fo,grad:o.g||['#fff','#cfe9ff']});X.restore()}x0+=w});
  // brillo
  const sp=P(t,t0+chars.length*st+.35,.7);if(sp>0&&sp<1){if(!s01_oc){s01_oc=document.createElement('canvas')}const oc=s01_oc;oc.width=W;oc.height=Math.ceil(sz*1.6);const ox=oc.getContext('2d');
    ox.font=font(sz,fo);ox.letterSpacing=fo.ls+'px';ox.textAlign='center';ox.textBaseline='middle';ox.fillStyle='#fff';ox.fillText(s,CX,oc.height/2);ox.globalCompositeOperation='source-in';
    const gx=CX-tot/2-200*U+(tot+400*U)*ss(sp);const g=ox.createLinearGradient(gx-120*U,0,gx+120*U,oc.height*.3);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.5,'rgba(255,255,255,.75)');g.addColorStop(1,'rgba(255,255,255,0)');ox.fillStyle=g;ox.fillRect(0,0,W,oc.height);
    X.save();X.globalCompositeOperation='lighter';X.drawImage(oc,0,y-oc.height/2);X.restore()}
  X.restore()}
function s01_sub(s,y,sz,t0,t1,t,c=K.cian){const a=win(t,t0,t1,.4,.25);if(a<=0)return;const m=mw(s,sz,{w:700,ls:8*U});const p=ex(P(t,t0,.6));
  X.save();X.globalAlpha*=a;X.fillStyle=c;X.fillRect(CX-m/2-90*U*p,y-2*U,60*U*p,4*U);X.fillRect(CX+m/2+30*U,y-2*U,60*U*p,4*U);X.restore();rise(s,CX,y,sz,t0,t,{w:700,ls:8*U,a,c:'#fff'})}
const s01_G=[1.25,3.95,6.35,8.25,10.25,12.35,15.25,17.65,18.45,21];
SCENE(1,{dur:25,
  draw(t){
    // fondo
    bg('#030a14',K.marino);const pulse=s01_G.reduce((a,g)=>a+Math.max(0,1-Math.abs(t-g)*3)*(t>=g?1:0),0);
    const gl=X.createRadialGradient(CX,CY,0,CX,CY,W*.6);gl.addColorStop(0,`rgba(76,143,226,${.22+.15*pulse})`);gl.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=gl;X.fillRect(0,0,W,H);
    piso(t,CY+120*U,'8,225,255',1.2,.35*win(t,.5,20.6,1,.6));
    // cámara
    let sx=0,sy=0;for(const g of s01_G){const s=shake(t,g,g===21?26:16);sx+=s[0];sy+=s[1]}
    const cam={ay:Math.sin(t*.35)*.2+(t>17&&t<20.4?.12:0)*ss(P(t,17,1)),ax:Math.sin(t*.27)*.07,sx,sy};
    const punch=s01_G.reduce((a,g)=>a+(t>=g?Math.exp(-(t-g)*8)*.05:0),0);
    X.save();X.translate(CX,CY);X.scale(1+punch,1+punch);X.translate(-CX,-CY);
    // cubos ordenados por profundidad
    const L0=[];for(let i=0;i<s01_N;i++){const pp=s01_pos(i,t);let q=rotY([pp[0],pp[1],pp[2]],cam.ay);q=rotX(q,cam.ax);L0.push([i,pp,q[2]])}
    L0.sort((a,b)=>b[2]-a[2]);const far=L0.filter(c=>c[2]>=120),near=L0.filter(c=>c[2]<120);
    s01_cubes(t,far,cam);
    // velo para legibilidad
    const tv=win(t,1,20.6,.5,.4);if(tv>0){const vg=X.createRadialGradient(CX,CY,0,CX,CY,W*.45);vg.addColorStop(0,`rgba(3,10,20,${.62*tv})`);vg.addColorStop(1,'rgba(3,10,20,0)');X.fillStyle=vg;X.fillRect(0,0,W,H)}
    // textos
    s01_word('TU CANAL',CY+10*U,fit('TU CANAL',W*.78,330*U,{f:'Anton',w:400}),1.1,3.05,t,{g:['#ffffff','#bfe6ff'],ed:[8,180,210]});
    if(t>=3.3&&t<6.05){const a=1-P(t,5.77,.28);rise('NUESTRA',CX,CY-250*U,92*U,3.4,t,{f:'Anton',w:400,ls:30*U,c:K.cian,a})}
    s01_word('GENTE',CY+70*U,300*U,3.75,6.05,t,{g:[K.ambar,K.naranja],ed:[150,60,10]});
    s01_word('NOTICIAS',CY+10*U,fit('NOTICIAS',W*.8,330*U,{f:'Anton',w:400}),6.2,8.05,t,{g:['#ffffff','#d9ecff'],ed:[30,70,140],stag:.04});
    s01_word('INFORMACIÓN',CY+30*U,fit('INFORMACIÓN',W*.86,330*U,{f:'Anton',w:400}),8.1,9.95,t,{g:[K.cian,K.azul],ed:[10,40,90],stag:.035});
    s01_word('NUESTRA VOZ',CY+10*U,fit('NUESTRA VOZ',W*.84,320*U,{f:'Anton',w:400}),10.1,12.05,t,{g:['#ff7a5c',K.rojo],ed:[90,10,25],stag:.04});
    s01_word('NUESTRA TIERRA',CY-40*U,fit('NUESTRA TIERRA',W*.86,300*U,{f:'Anton',w:400}),12.2,15.05,t,{g:[K.ambar,'#ffd36a'],ed:[140,70,0],stag:.035});
    s01_sub('SANTA BÁRBARA · HONDURAS',CY+175*U,46*U,13.0,15.0,t,K.ambar);
    s01_word('AQUÍ ESTAMOS',CY+10*U,fit('AQUÍ ESTAMOS',W*.84,320*U,{f:'Anton',w:400}),15.1,17.05,t,{g:['#ffffff',K.cian],ed:[6,90,120],stag:.04});
    if(t>=17.2&&t<20.45){const a=1-P(t,20.15,.3);rise('EL CANAL QUE',CX,CY-260*U,84*U,17.25,t,{f:'Anton',w:400,ls:24*U,c:'#fff',a})}
    s01_word('CRECE',CY-20*U,300*U,17.5,20.45,t,{g:[K.ambar,K.brasa],ed:[120,30,10]});
    if(t>=18.3&&t<20.45){const a=1-P(t,20.15,.3);rise('CADA DÍA',CX,CY+215*U,110*U,18.4,t,{f:'Anton',w:400,ls:28*U,c:K.cian,a})}
    s01_cubes(t,near,cam);
    X.restore();
    // cierre: logo protagonista
    if(t>=20.9){const p=P(t,21,.7);particulas(t,ex(P(t,21,1)),70);const ang=(1-ex(P(t,21,1.1)))*-1.7+Math.sin(Math.max(0,t-22.2)*1.2)*.12*P(t,22.2,1);
      const sc=.25+.75*bk(p,1.5);const ly=CY-90*U;
      const rg=X.createRadialGradient(CX,ly,0,CX,ly,640*U);rg.addColorStop(0,`rgba(8,225,255,${.28*ex(p)})`);rg.addColorStop(.5,`rgba(253,174,3,${.08*ex(p)})`);rg.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=rg;X.fillRect(0,0,W,H);
      logo3D(CX,ly,500*U*sc,ang,{depth:26,glow:'rgba(8,225,255,.35)',shine:P(t,22.4,.9),a:cl(p*3)});
      const sz=fit(DATOS.eslogan,W*.7,54*U,{w:900});rise(DATOS.eslogan,CX,CY+260*U,sz,22.2,t,{w:900,c:'#fff',ls:2*U});
      const lp=ex(P(t,22.5,.6));X.save();X.fillStyle=K.ambar;X.fillRect(CX-260*U*lp,CY+312*U,520*U*lp,5*U);X.restore();
      slam(DATOS.redes,CX,CY+372*U,50*U,23.0,t,{w:800,c:K.cian,ls:6*U,stag:.035});}
    flash(t,1.25,.35,.25);flash(t,6.35,.3,.25);flash(t,12.35,.3,.25);flash(t,17.65,.3,.25);flash(t,21,.9,.5);
    if(t>20.4&&t<21.1){const f=ex(P(t,20.4,.6));flare(CX,CY,f*.8*(1-P(t,21,.15)))}
    vineta(.6);
  },
  events:[['whoosh_largo',.2],['riser',.25],['golpe',1.25],['whoosh',3.05],['golpe',3.95],['whoosh',6.0],['golpe',6.35],['swipe',8.05],['golpe',8.25],['whoosh',9.95],['golpe',10.25],['whoosh',12.0],['golpe',12.35],['pop',13.0],['whoosh',15.0],['golpe',15.25],['whoosh',17.0],['golpe',17.65],['golpe',18.45],['whoosh_largo',20.4],['riser',20.0],['golpe',21.0],['swipe',22.2],['pop',23.0],['campana',23.4]],
  musica:{estilo:'epic',bpm:120,tono:'Dm',hits:[1.25,3.95,6.35,8.25,10.25,12.35,15.25,17.65,18.45,21],final:21}
});
