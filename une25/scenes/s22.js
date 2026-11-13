// escena 22 · ECUALIZADOR (reel 9:16, 30 s, 124 bpm) · tipografía Archivo expandida 900
(()=>{
const s22_B=60/124;                       // un tiempo
const s22_b=t=>t/s22_B;                   // tiempo musical
const s22_kick=t=>t<0?0:Math.exp(-((s22_b(t))%1)*5);
const s22_hat=t=>Math.exp(-((s22_b(t)+.5)%1)*9);
function s22_nz(t,i){const a=t*9+i*7.3,f=Math.floor(a),k=ss(a-f);return lerp(hs(f*1.7+i*13.1),hs((f+1)*1.7+i*13.1),k)}
// nivel de la banda i/n en el segundo t (0..1), e = energía de la sección
function s22_lv(t,i,n,e=1){const f=i/Math.max(1,n-1);const v=(1-f)*s22_kick(t)*.85+f*s22_hat(t)*.55+.45*s22_nz(t,i)*(.5+.6*f)+.08;return cl(v*e*(.75+.25*Math.sin(f*9+t*3)))}
const s22_F={f:'Archivo',w:900,st:'expanded'};
// frases: [tiempo musical, texto, línea(0/1), color]
const s22_W=[[2,'SIENTE',0,'#fff'],[3,'EL RITMO',1,K.cian],[4,'SUBE',0,K.ambar],[5,'EL VOLUMEN',1,'#fff'],
  [8,'TU',0,'#fff'],[9,'CANAL',1,K.ambar],[12,'NUESTRA',0,'#fff'],[13,'VOZ',1,K.cian],
  [16,'NOTICIAS',0,'#fff'],[20,'INFORMACIÓN',0,K.ambar],
  [24,'NUESTRA',0,'#fff'],[25,'GENTE',1,K.cian],[28,'NUESTRA',0,'#fff'],[29,'TIERRA',1,K.ambar],
  [32,'CADA',0,'#fff'],[33,'DÍA',1,K.cian],[36,'MÁS',0,K.ambar],[37,'FUERTE',1,'#fff'],
  [40,'SANTA',0,'#fff'],[41,'BÁRBARA',1,K.ambar],[44,'SÍGUENOS',0,K.cian]];
function s22_palabras(t,yTop,gap){const bt=s22_b(t);const sec=Math.floor(bt/4);
  s22_W.forEach(([b,s,ln,c],idx)=>{if(Math.floor(b/4)!==sec||bt<b)return;const t0=b*s22_B;const sz=fit(s,940*U,ln?230*U:200*U,s22_F);const y=yTop+ln*gap;
    const p=P(t,t0,.22);const k=1.7-.7*bk(p,2.2);const kk=1+.05*s22_kick(t);const out=ss(P(t,(sec+1)*4*s22_B-.12,.12));
    X.save();X.translate(CX,y);X.scale(k*kk*(1+out*.4),k*kk*(1-out));X.globalAlpha=cl(p*4);
    // eco en dos tonos (estilo EDM)
    const off=(1-p)*40*U+6*U*s22_kick(t);txt(s,-off,off*.4,sz,{...s22_F,c:'rgba(8,225,255,.55)'});txt(s,off,-off*.4,sz,{...s22_F,c:'rgba(227,23,62,.55)'});
    txt(s,0,0,sz,{...s22_F,c,glow:c==='#fff'?'rgba(8,225,255,.6)':c,gb:30*U});X.restore()})}
function s22_fondo(t,c1,c2){const g=X.createRadialGradient(CX,CY,0,CX,CY,DG*.6);g.addColorStop(0,c1);g.addColorStop(1,c2);X.fillStyle=g;X.fillRect(0,0,W,H);
  const k=s22_kick(t);X.save();X.globalCompositeOperation='lighter';X.fillStyle=`rgba(76,143,226,${.10*k})`;X.fillRect(0,0,W,H);X.restore()}
function s22_colBar(f){return f<.33?K.cian:f<.66?K.azul:f<.85?K.ambar:K.brasa}

SCENE(22,{dur:30,
draw(t){
  const bt=s22_b(t),sec=Math.floor(bt/8),k=s22_kick(t);
  const z=1+.025*k;X.save();const[sx,sy]=shake(t,Math.floor(bt/8)*8*s22_B,16);X.translate(CX+sx,CY+sy);X.scale(z,z);X.translate(-CX,-CY);
  if(sec===0){ // INTRO: línea plana que despierta
    s22_fondo(t,'#081a2e','#010509');const amp=ex(P(t,.4,3))*260*U;
    X.save();X.globalCompositeOperation='lighter';[[K.cian,1,0],[K.ambar,.6,1.3],[K.rojo,.4,2.1]].forEach(([c,a,ph],j)=>{X.strokeStyle=c;X.globalAlpha=a;X.lineWidth=(6-j*1.5)*U;X.shadowColor=c;X.shadowBlur=24*U;X.beginPath();
      for(let x=0;x<=W;x+=6*U){const f=x/W;const env=Math.sin(f*Math.PI);const y=CY+250*U+env*amp*(.5+.5*k)*Math.sin(f*22+t*7+ph)*Math.sin(f*5-t*2+ph)*(.6+.4*s22_nz(t,j+x*.003));x?X.lineTo(x,y):X.moveTo(x,y)}X.stroke()});X.restore();
    s22_palabras(t,620*U,250*U)}
  else if(sec===1){ // ESPECTRO CLÁSICO desde abajo, con reflejo
    s22_fondo(t,'#0b2238','#02070d');const n=28,bw=W/n,base=1460*U;
    for(let i=0;i<n;i++){const v=s22_lv(t,i,n,1.1),h=(90+680*v)*U,x=i*bw+bw*.14,w=bw*.72;const g=X.createLinearGradient(0,base,0,base-h);g.addColorStop(0,K.cian);g.addColorStop(.5,K.azul);g.addColorStop(.8,K.ambar);g.addColorStop(1,K.brasa);
      X.fillStyle=g;X.shadowColor=K.cian;X.shadowBlur=16*U;X.beginPath();X.roundRect(x,base-h,w,h,[w/2,w/2,0,0]);X.fill();X.shadowBlur=0;
      let pk=h;for(let q=1;q<6;q++)pk=Math.max(pk,(90+680*s22_lv(t-q*.06,i,n,1.1))*U-q*q*22*U);X.fillStyle='#fff';X.fillRect(x,base-pk-16*U,w,7*U);
      X.globalAlpha=.22;X.fillStyle=g;X.fillRect(x,base+10*U,w,h*.45);X.globalAlpha=1}
    const fg=X.createLinearGradient(0,base,0,H);fg.addColorStop(0,'rgba(2,7,13,0)');fg.addColorStop(1,'rgba(2,7,13,1)');X.fillStyle=fg;X.fillRect(0,base,W,H-base);
    s22_palabras(t,470*U,240*U)}
  else if(sec===2){ // ESPECTRO CIRCULAR
    s22_fondo(t,'#13294a','#03080f');const cx=CX,cy=CY+230*U,r=230*U*(1+.08*k),n=96;rays(cx,cy,32,'rgba(0,0,0,0)','rgba(8,225,255,.035)',t*.2);
    X.save();X.translate(cx,cy);X.rotate(t*.35);for(let i=0;i<n;i++){const a=i/n*6.283;const ii=i<n/2?i:n-i;const v=s22_lv(t,ii,n/2,1.15);const L=(30+300*v)*U;
      X.save();X.rotate(a);X.fillStyle=s22_colBar(v);X.shadowColor=s22_colBar(v);X.shadowBlur=14*U;X.beginPath();X.roundRect(-5*U,r+10*U,10*U,L,5*U);X.fill();X.restore()}X.restore();
    const g=X.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,`rgba(253,174,3,${.25+.5*k})`);g.addColorStop(.7,'rgba(11,34,56,.9)');g.addColorStop(1,K.cian);X.fillStyle=g;X.beginPath();X.arc(cx,cy,r,0,7);X.fill();
    X.strokeStyle='#fff';X.lineWidth=6*U;X.beginPath();X.arc(cx,cy,r,0,7);X.stroke();
    // ícono play al centro
    X.save();X.translate(cx+12*U,cy);X.scale(1+.15*k,1+.15*k);X.fillStyle='#fff';X.beginPath();X.moveTo(-50*U,-62*U);X.lineTo(70*U,0);X.lineTo(-50*U,62*U);X.closePath();X.fill();X.restore();
    s22_palabras(t,470*U,240*U)}
  else if(sec===3){ // OSCILOSCOPIO en capas
    s22_fondo(t,'#1a0d24','#04060c');grid(t,1.2,'8,225,255',90);
    X.save();X.globalCompositeOperation='lighter';for(let j=0;j<5;j++){const c=[K.cian,K.azul,K.ambar,K.brasa,'#ffffff'][j];X.strokeStyle=c;X.lineWidth=(j===4?3:5)*U;X.shadowColor=c;X.shadowBlur=20*U;X.globalAlpha=.85;
      X.beginPath();for(let x=0;x<=W;x+=5*U){const f=x/W;const a=(140+260*k)*U*Math.sin(f*Math.PI)**1.5;const y=CY+330*U+a*Math.sin(f*(8+j*3)+t*(4+j)+j)*(.55+.45*s22_nz(t,j*3+Math.floor(f*6)));x?X.lineTo(x,y):X.moveTo(x,y)}X.stroke()}X.restore();
    s22_palabras(t,560*U,240*U)}
  else if(sec===4){ // MEDIDORES LED
    s22_fondo(t,'#0b2238','#010408');const cols=12,rows=22,cw=W/cols,top=880*U,bot=1600*U,rh=(bot-top)/rows;
    for(let i=0;i<cols;i++){const v=s22_lv(t,i,cols,1.25);const on=Math.round(v*rows);for(let r=0;r<rows;r++){const f=r/rows;const lit=r<on;X.fillStyle=lit?s22_colBar(f):'rgba(255,255,255,.05)';if(lit){X.shadowColor=s22_colBar(f);X.shadowBlur=12*U}
      X.beginPath();X.roundRect(i*cw+cw*.12,bot-(r+1)*rh+rh*.15,cw*.76,rh*.7,4*U);X.fill();X.shadowBlur=0}}
    s22_palabras(t,470*U,240*U)}
  else if(sec===5){ // SUBIDA: barras espejo horizontales que aceleran
    s22_fondo(t,'#0b2238','#000');const acc=P(t,44*s22_B,4*s22_B);const n=34,top=840*U,bot=1640*U,rh=(bot-top)/n;
    for(let i=0;i<n;i++){const ii=Math.abs(i-n/2);const v=s22_lv(t*(1+acc*1.5),Math.floor(ii),n/2,1+acc*.6);const w=(60+480*v)*U;const c=s22_colBar(1-ii/(n/2));X.fillStyle=c;X.shadowColor=c;X.shadowBlur=10*U;
      X.beginPath();X.roundRect(CX-w,top+i*rh+rh*.18,w*2,rh*.64,rh*.32);X.fill()}X.shadowBlur=0;
    // estrobo en los últimos tiempos
    if(bt>=46){const s=(bt*4)%1<.5;if(s){X.fillStyle='rgba(255,255,255,.18)';X.fillRect(0,0,W,H)}}
    s22_palabras(t,470*U,240*U)}
  else{ // DROP: logo con espectro circular
    const t0=48*s22_B;s22_fondo(t,'#0f2d4d','#02070d');rays(CX,CY-120*U,40,'rgba(0,0,0,0)',`rgba(253,174,3,${.04+.05*k})`,t*.15);
    const cx=CX,cy=CY-150*U,r=330*U,n=120,g=ex(P(t,t0,.8));
    X.save();X.translate(cx,cy);X.rotate(-t*.2);for(let i=0;i<n;i++){const a=i/n*6.283;const ii=i<n/2?i:n-i;const v=s22_lv(t,ii,n/2,1);const Lb=(16+200*v)*U*g;X.save();X.rotate(a);X.fillStyle=s22_colBar(v);X.globalAlpha=.9;X.fillRect(-4*U,r,8*U,Lb);X.restore()}X.restore();
    X.strokeStyle='rgba(8,225,255,.6)';X.lineWidth=4*U;X.beginPath();X.arc(cx,cy,r-14*U,0,7);X.stroke();
    const sc=.4+.6*bk(P(t,t0,.6),1.8);logo3D(cx,cy,520*U*sc*(1+.03*k),(1-ex(P(t,t0,.9)))*Math.PI*2,{depth:22,glow:'rgba(8,225,255,.5)',shine:P(t,t0+1.2,1)});
    const t1=t0+1.45;slam('EL CANAL QUE CRECE',CX,CY+360*U,fit('EL CANAL QUE CRECE',960*U,96*U,s22_F),t1,t,{...s22_F,stag:.03,c:'#fff'});
    slam('CADA DÍA',CX,CY+500*U,fit('CADA DÍA',900*U,150*U,s22_F),t1+.5,t,{...s22_F,stag:.05,grad:['#FFE08A',K.ambar,K.naranja],glow:'rgba(253,174,3,.5)'});
    const pk=bk(P(t,t1+1.6,.45));if(pk>0){X.save();X.translate(CX,CY+650*U);X.scale(pk,pk);X.strokeStyle=K.cian;X.lineWidth=4*U;X.fillStyle='rgba(8,225,255,.15)';X.beginPath();X.roundRect(-250*U,-46*U,500*U,92*U,46*U);X.fill();X.stroke();txt('/UNEVISION',0,3*U,54*U,{...s22_F,c:'#fff'});X.restore()}
    // mini ecualizador abajo
    for(let i=0;i<40;i++){const v=s22_lv(t,i,40,.9);const h=(10+110*v)*U;X.fillStyle=`rgba(8,225,255,${.35+.4*v})`;X.fillRect(i*W/40+3*U,H-200*U-h,W/40-6*U,h)}}
  X.restore();
  vineta(.5);
  // destello en cada cambio de sección y en el drop
  for(let s=1;s<=6;s++)flash(t,s*8*s22_B,s===6?1:.55,s===6?.5:.22);flash(t,0,.6,.3);
},
events:(()=>{const e=[['golpe',0]];const B=60/124;[[2,'pop'],[3,'golpe'],[4,'pop'],[5,'golpe'],[8,'golpe'],[9,'pop'],[12,'golpe'],[13,'pop'],[16,'golpe'],[20,'golpe'],[24,'golpe'],[25,'pop'],[28,'golpe'],[29,'pop'],[32,'golpe'],[33,'pop'],[36,'golpe'],[37,'pop'],[40,'golpe'],[41,'pop'],[44,'golpe']].forEach(([b,s])=>e.push([s,+(b*B).toFixed(3)]));
  [7.5,15.5,23.5,31.5,39.5].forEach(b=>e.push(['whoosh',+(b*B).toFixed(3)]));e.push(['riser',+(48*B-1).toFixed(3)],['golpe',+(48*B).toFixed(3)],['whoosh_largo',+(48*B+.05).toFixed(3)],['campana',+(48*B+1.2).toFixed(3)],['pop',+(48*B+3.05).toFixed(3)]);return e.sort((a,b)=>a[1]-b[1])})(),
musica:{estilo:'edm',bpm:124,tono:'C#m',hits:[0,8,16,24,32,40,48].map(b=>+(b*60/124).toFixed(3)),final:+(48*60/124).toFixed(3)}
});
})();
