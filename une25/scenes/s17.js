// 17 · MOSAICO (reel 9:16, 30 s) — fichas de colores que se voltean en 3D en cascada revelando palabras; al final, el logo.
(()=>{
const COLS=6,TS=W/COLS,ROWS=Math.ceil(H/TS)+1,OY=(H-ROWS*TS)/2,BEAT=60/122,FD=.5,SPAN=.95;
const FL=[1.6,4.4,7.2,10.0,12.8,15.6,18.4,21.2,24.2];   // inicio de cada volteo
const PAT=[0,1,2,3,4,5,6,7,1];                          // patrón de cascada
const AX=['y','x','y','x','y','x','y','x','y'];
// páginas: fondo, texto, color de letra, color de relieve
const PG=[null,
  {bg:[K.cian,'#5ff0ff'],l:['TU','CANAL'],c:K.noche,e:'#0a7f99'},
  {bg:[K.ambar,'#ffd25a'],l:['NUESTRA','GENTE'],c:K.noche,e:'#b86b00'},
  {bg:[K.rojo,'#ff4a6a'],l:['NOTICIAS'],c:'#ffffff',e:'#7d0a22'},
  {bg:[K.azul,'#7fb2f0'],l:['SANTA','BÁRBARA'],c:'#ffffff',e:'#1f4f8f'},
  {bg:[K.noche,K.marino],l:['CADA','DÍA'],c:K.ambar,e:'#7a4a00',dots:1},
  {bg:[K.naranja,K.brasa],l:['CONTIGO'],c:'#ffffff',e:'#8a2412'},
  {bg:[K.marino,'#1d4f86'],l:['NUESTRA','VOZ'],c:'#ffffff',e:'#08a8c4'},
  {bg:['#ffffff','#e8f4ff'],l:['¿YA NOS','SIGUES?'],c:K.rojo,e:'#f3b3c0'},
  {bg:[K.noche,'#0d2a48'],logo:1}];
const CV={};
function s17_page(i){if(CV[i])return CV[i];const c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');
  if(i===0){for(let r=0;r<ROWS;r++)for(let q=0;q<COLS;q++){const cs=[K.cian,K.azul,K.ambar,K.naranja,K.brasa,K.rojo,K.marino,K.cian];g.fillStyle=cs[Math.floor(hs(r*13+q*7)*cs.length)];g.fillRect(q*TS,OY+r*TS,TS,TS)}CV[i]=c;return c}
  const d=PG[i];const gr=g.createLinearGradient(0,0,W,H);gr.addColorStop(0,d.bg[0]);gr.addColorStop(1,d.bg[1]);g.fillStyle=gr;g.fillRect(0,0,W,H);
  // patrón sutil de círculos concéntricos
  g.save();g.globalAlpha=d.c==='#ffffff'||d.logo?.07:.1;g.strokeStyle=d.logo?K.cian:(d.c==='#ffffff'?'#fff':K.noche);g.lineWidth=10*U;for(let k=1;k<14;k++){g.beginPath();g.arc(W*.85,H*.12,k*120*U,0,7);g.stroke()}g.restore();
  if(d.dots){g.save();g.fillStyle='rgba(253,174,3,.16)';for(let y=0;y<H;y+=36*U)for(let x=(y/36/U%2)*18*U;x<W;x+=36*U){g.beginPath();g.arc(x,y,4*U,0,7);g.fill()}g.restore()}
  if(d.l){const fz=s=>{g.font=`400 100px Luck`;return Math.min(330*U,950*U/g.measureText(s).width*100)};const sz=Math.min(...d.l.map(fz));const lh=sz*.98,y0=CY-40*U-(d.l.length-1)*lh/2;
    g.textAlign='center';g.textBaseline='middle';g.font=`400 ${sz}px Luck`;
    d.l.forEach((s,j)=>{const y=y0+j*lh+sz*.06;for(let k=22;k>0;k--){g.fillStyle=d.e;g.fillText(s,CX+k*.9*U,y+k*1.1*U)}
      g.save();g.shadowColor='rgba(0,0,0,.25)';g.shadowBlur=30*U;g.fillStyle=d.c;g.fillText(s,CX,y);g.restore()})}
  if(d.logo){g.save();g.shadowColor='rgba(8,225,255,.55)';g.shadowBlur=60*U;const lw=700*U,lh=lw*LR();g.drawImage(LOGO,CX-lw/2,780*U-lh/2,lw,lh);g.restore()}
  CV[i]=c;return c}
function s17_delay(k,q,r){const p=PAT[k],n=hs(q*31+r*17+k*5);const cq=(COLS-1)/2,cr=(ROWS-1)/2;
  const v=[(q+r)/(COLS+ROWS-2),Math.hypot((q-cq)/COLS,(r-cr)/ROWS)/.62,r/(ROWS-1),n,1-(q+r)/(COLS+ROWS-2),q/(COLS-1),Math.hypot((q-cq)/COLS,(r-ROWS)/ROWS)/1.1,((q+r)%2)*.5+n*.45][p];return cl(v)*SPAN}
function s17_state(t,q,r){let pg=0,fp=null,fr=0,to=0,ax='y';
  for(let k=0;k<FL.length;k++){const st=FL[k]+s17_delay(k,q,r);if(t>=st+FD)pg=k+1;else if(t>=st){fp=(t-st)/FD;fr=k;to=k+1;ax=AX[k];break}}
  if(fp===null){fr=pg;to=pg;// volteos sueltos al ritmo
    const b=Math.floor(t/BEAT),lt=t-b*BEAT;if(t>2.6&&t<23.6&&(r<=3||r>=8)&&hs(b*7.3+q*3.1+r*11.7)<.09&&lt<.42){fp=lt/.42;ax=b%2?'x':'y'}}
  return{pg,fp,fr,to,ax}}
const gap0=9*U;
SCENE(17,{dur:30,draw(t){
  X.fillStyle='#03080f';X.fillRect(0,0,W,H);
  const lastEnd=FL[8]+SPAN+FD,closeK=ss(P(t,lastEnd,.5));const gap=gap0*(1-closeK);
  // cámara: bombeo al ritmo + golpes
  const b=(t%BEAT)/BEAT,pump=1+.008*Math.exp(-b*6)*(t>1.6&&t<24);let sh=[0,0];FL.forEach(f=>{const s=shake(t,f+SPAN+FD*.6,8);sh[0]+=s[0];sh[1]+=s[1]});
  const intro=t<1.6;const zz=pump*(1+.035*ss(P(t,0,24)))*(1-.02*closeK);
  X.save();X.translate(CX+sh[0],CY+sh[1]);X.scale(zz,zz);X.translate(-CX,-CY);
  for(let r=0;r<ROWS;r++)for(let q=0;q<COLS;q++){const x=q*TS,y=OY+r*TS,cx=x+TS/2,cy=y+TS/2;
    let ap=1;if(intro){const d=hs(q*5+r*9)*.85+(r/ROWS)*.25;ap=P(t,.05+d,.45);if(ap<=0)continue}
    const s=s17_state(t,q,r);let ang=0,src=s.pg;if(s.fp!==null){ang=eio(s.fp)*Math.PI;src=ang<Math.PI/2?s.fr:s.to}
    const cs=Math.cos(ang),lift=1+.16*Math.sin(ang),sk=Math.sin(ang*2)*.1;const img=s17_page(src);
    X.save();X.translate(cx,cy);const k0=intro?bk(ap,2.2):1;X.scale(k0,k0);if(intro)X.rotate((1-ap)*.6*(hs(q+r*3)-.5));
    if(s.ax==='y'){X.scale(Math.max(.02,Math.abs(cs))*lift,lift);X.transform(1,sk,0,1,0,0)}else{X.scale(lift,Math.max(.02,Math.abs(cs))*lift);X.transform(1,0,sk,1,0,0)}
    const hw=TS/2-gap/2,rr=(14*U)*(1-closeK);
    if(ang>0){X.save();X.translate(10*U*Math.sin(ang),14*U*Math.sin(ang));X.fillStyle=`rgba(0,0,0,${.35*Math.sin(ang)})`;X.beginPath();X.roundRect(-hw,-hw,hw*2,hw*2,rr);X.fill();X.restore()}
    X.beginPath();X.roundRect(-hw,-hw,hw*2,hw*2,rr);X.save();X.clip();
    X.drawImage(img,x+TS/2-hw,y+TS/2-hw,hw*2,hw*2,-hw,-hw,hw*2,hw*2);
    // bisel y sombreado del giro
    const bv=X.createLinearGradient(0,-hw,0,hw);bv.addColorStop(0,`rgba(255,255,255,${.16*(1-closeK)})`);bv.addColorStop(.25,'rgba(255,255,255,0)');bv.addColorStop(1,`rgba(0,0,0,${.14*(1-closeK)})`);X.fillStyle=bv;X.fillRect(-hw,-hw,hw*2,hw*2);
    if(ang>0){X.fillStyle=`rgba(0,0,0,${.55*(1-Math.abs(cs))})`;X.fillRect(-hw,-hw,hw*2,hw*2);X.fillStyle=`rgba(255,255,255,${.25*Math.pow(Math.sin(ang),6)})`;X.fillRect(-hw,-hw,hw*2,hw*2)}
    X.restore();X.restore()}
  X.restore();
  // brillo diagonal que recorre el mosaico al terminar cada cascada
  FL.forEach((f,k)=>{const p=P(t,f+SPAN*.7,.8);if(p<=0||p>=1)return;X.save();X.globalCompositeOperation='lighter';X.translate(CX,CY);X.rotate(-.5);const x=-DG*.7+DG*1.4*ss(p);const g=X.createLinearGradient(x-150*U,0,x+150*U,0);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.5,'rgba(255,255,255,.28)');g.addColorStop(1,'rgba(255,255,255,0)');X.fillStyle=g;X.fillRect(x-150*U,-DG,300*U,DG*2);X.restore()});
  // cierre: logo vivo con brillo, eslogan y redes
  if(t>lastEnd){const lp=P(t,lastEnd,.6),ly=780*U,lw=700*U;X.save();X.globalCompositeOperation='lighter';const gl=X.createRadialGradient(CX,ly,0,CX,ly,600*U);gl.addColorStop(0,`rgba(8,225,255,${.18*lp*(.8+.2*Math.sin(t*3))})`);gl.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=gl;X.fillRect(0,ly-600*U,W,1200*U);X.restore();
    logo3D(CX,ly,lw*(1+.015*Math.sin(t*2.5)),0,{shine:P(t,lastEnd+.3,1.1),a:lp});
    const eo={f:'Luck',w:400},es=Math.min(fit('CRECE CADA DÍA',920*U,104*U,eo),fit('EL CANAL QUE',920*U,104*U,eo));
    slam('EL CANAL QUE',CX,1195*U,es,lastEnd+.45,t,{...eo,stag:.035,from:2,glow:'rgba(0,0,0,.6)'});
    slam('CRECE CADA DÍA',CX,1305*U,es,lastEnd+.8,t,{...eo,stag:.035,from:2,c:K.ambar,glow:'rgba(0,0,0,.6)'});
    const up=bk(P(t,lastEnd+1.5,.5));if(up>0){X.save();X.translate(CX,1430*U);X.scale(up,up);X.fillStyle=K.cian;X.beginPath();X.roundRect(-230*U,-42*U,460*U,84*U,42*U);X.fill();txt('/UNEVISION',0,4*U,54*U,{f:'Luck',w:400,c:K.noche});X.restore()}}
  vineta(.35);
  FL.forEach(f=>flash(t,f+SPAN+FD*.55,.12,.3));
},
events:[['pop',0.1],['pop',0.35],['pop',0.6],['pop',0.85],['golpe',1.15],
  ['whoosh_largo',1.6],['golpe',2.85],['whoosh_largo',4.4],['golpe',5.65],['whoosh_largo',7.2],['golpe',8.45],['whoosh_largo',10.0],['golpe',11.25],
  ['whoosh_largo',12.8],['golpe',14.05],['whoosh_largo',15.6],['golpe',16.85],['whoosh_largo',18.4],['golpe',19.65],['whoosh_largo',21.2],['golpe',22.45],
  ['riser',24.45],['whoosh_largo',24.2],['golpe',25.45],['campana',25.95],['pop',26.1],['pop',26.45],['swipe',27.15]],
musica:{estilo:'house',bpm:122,tono:'Cm',hits:[2.85,8.45,14.05,19.65,25.45],final:25.45}});
})();
