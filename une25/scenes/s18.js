// 18 · MANIFIESTO EDITORIAL (reel 9:16, 30 s) — blanco/negro, tipografía enorme negra y roja, recortes de papel y trazos de marcador, estilo revista.
(()=>{
const BT=60/132,SEG=BT*6,PAPEL='#F3EFE6',TINTA='#0E0E10',RJ=K.rojo;
const CO={f:'Archivo',st:'extra-condensed',w:900};     // titular principal
const PF={f:'Playfair',w:900,it:true};                 // acento editorial
// ---- trazos de marcador ----
function s18_path(pts,p,col,w,a=.92){if(p<=0)return;const n=pts.length-1,m=p*n,k=Math.floor(m);X.save();X.globalAlpha*=a;X.strokeStyle=col;X.lineCap='round';X.lineJoin='round';X.lineWidth=w;X.beginPath();X.moveTo(pts[0][0],pts[0][1]);
  for(let i=1;i<=Math.min(k,n);i++)X.lineTo(pts[i][0],pts[i][1]);if(k<n){const f=m-k;X.lineTo(lerp(pts[k][0],pts[k+1][0],f),lerp(pts[k][1],pts[k+1][1],f))}X.stroke();
  X.globalAlpha*=.35;X.lineWidth=w*.45;X.translate(2*U,-w*.18);X.stroke();X.restore()}
function s18_under(x1,x2,y,p,col,w,seed=1){const pts=[];for(let i=0;i<=24;i++){const f=i/24;pts.push([lerp(x1,x2,f),y+Math.sin(f*6+seed)*5*U+(f-.5)*-14*U])}s18_path(pts,ss(p),col,w)}
function s18_circle(cx,cy,rx,ry,p,col,w,seed=2){const pts=[];for(let i=0;i<=60;i++){const a=-2.4+i/60*Math.PI*2.25;const j=1+.05*Math.sin(i*.4+seed)+i/60*.06;pts.push([cx+Math.cos(a)*rx*j,cy+Math.sin(a)*ry*j])}s18_path(pts,ex(p),col,w)}
function s18_hl(x,y,w,h,p,col){if(p<=0)return;X.save();X.fillStyle=col;X.beginPath();const ww=w*ex(p);X.moveTo(x,y+6*U);for(let i=0;i<=10;i++)X.lineTo(x+ww*i/10,y+Math.sin(i*1.7)*5*U);for(let i=10;i>=0;i--)X.lineTo(x+ww*i/10,y+h+Math.sin(i*2.3+1)*6*U);X.fill();X.restore()}
// papel rasgado
function s18_torn(w,h,col,seed){X.beginPath();X.moveTo(-w/2,-h/2);for(let i=0;i<=30;i++)X.lineTo(-w/2+w*i/30,-h/2+(hs(seed+i)-.5)*16*U);for(let i=0;i<=12;i++)X.lineTo(w/2+(hs(seed+50+i)-.5)*12*U,-h/2+h*i/12);
  for(let i=30;i>=0;i--)X.lineTo(-w/2+w*i/30,h/2+(hs(seed+90+i)-.5)*16*U);X.closePath();X.fillStyle=col;X.fill()}
// golpe de palabra: escala grande -> 1 con rebote
function s18_slamW(s,x,y,sz,t0,t,o){const p=P(t,t0,.22);if(p<=0)return;const k=1+(1.9-1)*(1-bk(p,1.2));X.save();X.translate(x,y);X.scale(k,k);X.globalAlpha*=cl(p*4);txt(s,0,0,sz,o);X.restore()}
const FZ=(s,mx,o)=>fit(s,980*U,mx*U,o);
function s18_label(s,y,col,t,t0){const p=ex(P(t,t0,.4));if(p<=0)return;txt(s,CX,y,40*U,{f:'Archivo',st:'condensed',w:700,c:col,ls:10,a:p});const m=mw(s,40*U,{f:'Archivo',st:'condensed',w:700,ls:10});X.fillStyle=col;X.globalAlpha=p;X.fillRect(CX-m/2-12*U-120*U*p,y-2*U,120*U*p,4*U);X.fillRect(CX+m/2+12*U,y-2*U,120*U*p,4*U);X.globalAlpha=1}
// ---- segmentos (6 tiempos cada uno) ----
const S=[
 (lt,t,a)=>{bgc(PAPEL);s18_label('MANIFIESTO · UNE VISIÓN',330*U,TINTA,t,a);
   s18_slamW('CREEMOS',CX,700*U,FZ('CREEMOS',400,CO),a+BT*.5,t,{...CO,c:TINTA});
   s18_slamW('en nuestra',CX,985*U,130*U,a+BT*2,t,{...PF,c:RJ});
   s18_slamW('GENTE',CX,1235*U,FZ('GENTE',340,CO),a+BT*3,t,{...CO,c:TINTA});
   const gw=mw('GENTE',FZ('GENTE',340,CO),CO);s18_under(CX-gw/2,CX+gw/2,1400*U,P(t,a+BT*4,BT*1.2),RJ,26*U)},
 (lt,t,a)=>{bgc(TINTA);s18_slamW('NUESTRA',CX,620*U,FZ('NUESTRA',230,CO),a,t,{...CO,c:'#fff'});
   const sz=FZ('TIERRA',420,CO);s18_slamW('TIERRA',CX,930*U,sz,a+BT,t,{...CO,c:RJ});
   s18_circle(CX,930*U,Math.min(mw('TIERRA',sz,CO)*.56,505*U),sz*.6,P(t,a+BT*2,BT*2),'#fff',14*U);
   s18_label('SANTA BÁRBARA · HONDURAS',1330*U,'#fff',t,a+BT*3)},
 (lt,t,a)=>{bgc(PAPEL);const sz=FZ('PASA',330,CO);
   s18_slamW('LO QUE',CX,540*U,FZ('LO QUE',300,CO)*.8,a,t,{...CO,c:TINTA});
   s18_slamW('PASA',CX,840*U,sz,a+BT,t,{...CO,c:TINTA});
   const aw=mw('AQUÍ',sz,CO);s18_hl(CX-aw/2-40*U,1000*U,aw+80*U,330*U,P(t,a+BT*2,BT*.9),RJ);
   s18_slamW('AQUÍ',CX,1175*U,sz,a+BT*2.6,t,{...CO,c:'#fff'})},
 (lt,t,a)=>{bgc('#E4DED1');// tiras de papel
   X.save();X.globalAlpha=.5;X.fillStyle='#d3ccbd';for(let i=0;i<12;i++)X.fillRect(70*U,(320+i*100)*U,940*U,3*U);X.restore();
   [['NOTICIAS',620,-.06,TINTA,'#fff',0,-1],['INFORMACIÓN',920,.045,RJ,'#fff',1.4,1],['NUESTRA VOZ',1220,-.035,'#fff',TINTA,2.8,-1]].forEach(([s,y,r,bgk,ck,d,dir],i)=>{
     const p=ex(P(t,a+d*BT,.32));if(p<=0)return;X.save();X.translate(CX+dir*(1-p)*1200*U,y*U);X.rotate(r);
     X.save();X.translate(10*U,14*U);s18_torn(1000*U,250*U,'rgba(0,0,0,.25)',i*200);X.restore();s18_torn(1000*U,250*U,bgk,i*200);
     txt(s,0,6*U,fit(s,860*U,190*U,CO),{...CO,c:ck});X.restore()})},
 (lt,t,a)=>{bgc(TINTA);const sz=FZ('CONTIGO.',380,CO);s18_slamW('CONTIGO',CX-mw('.',sz,CO)/2,840*U,sz,a,t,{...CO,c:'#fff'});
   const cw=mw('CONTIGO',sz,CO);if(t>a+BT){s18_slamW('.',CX+cw/2-mw('.',sz,CO)/2+6*U,840*U,sz,a+BT,t,{...CO,c:RJ})}
   s18_slamW('cada día',CX,1140*U,140*U,a+BT*2,t,{...PF,c:RJ});
   const w2=mw('cada día',140*U,PF);s18_under(CX-w2/2,CX+w2/2,1250*U,P(t,a+BT*3,BT),'#fff',12*U,3);s18_under(CX-w2/2+30*U,CX+w2/2-20*U,1285*U,P(t,a+BT*3.6,BT),'#fff',9*U,5)},
 (lt,t,a)=>{bgc(PAPEL);s18_slamW('hecho en',CX,520*U,140*U,a,t,{...PF,c:RJ});
   s18_slamW('SANTA',CX,800*U,FZ('SANTA',330,CO),a+BT,t,{...CO,c:TINTA});
   s18_slamW('BÁRBARA',CX,1090*U,FZ('BÁRBARA',330,CO),a+BT*2,t,{...CO,c:TINTA});
   // sello
   const p=P(t,a+BT*3.5,.2);if(p>0){const k=1+.7*(1-ex(p));X.save();X.translate(805*U,1335*U);X.rotate(-.21);X.scale(k,k);X.globalAlpha=.92*cl(p*3);X.strokeStyle=RJ;X.lineWidth=9*U;X.beginPath();X.arc(0,0,150*U,0,7);X.stroke();X.lineWidth=4*U;X.beginPath();X.arc(0,0,128*U,0,7);X.stroke();
     txt('AQUÍ',0,-30*U,74*U,{...CO,c:RJ});txt('ESTAMOS',0,42*U,60*U,{...CO,c:RJ});X.restore()}},
 (lt,t,a)=>{bgc(RJ);s18_slamW('TU',CX,560*U,FZ('TU',300,CO),a,t,{...CO,c:'#fff'});
   const sz=FZ('CANAL',400,CO);s18_slamW('CANAL',CX,920*U,sz,a+BT,t,{...CO,c:TINTA});
   s18_circle(CX,935*U,Math.min(mw('CANAL',sz,CO)*.56,505*U),sz*.52,P(t,a+BT*2,BT*1.8),'#fff',14*U,4);
   s18_label('SAN JOSÉ DE COLINAS',1330*U,'#fff',t,a+BT*3)},
 (lt,t,a)=>{bgc(PAPEL);// página de periódico
   const mp=ex(P(t,a,.35));X.fillStyle=TINTA;X.fillRect(70*U,300*U,940*U*mp,8*U);X.fillRect(70*U,470*U,940*U*mp,3*U);
   txt('UNE VISIÓN',CX,388*U,110*U,{...PF,it:false,c:TINTA,a:mp});
   s18_slamW('NUESTRA GENTE,',CX,640*U,FZ('NUESTRA GENTE,',200,CO),a+BT,t,{...CO,c:TINTA});
   const vs=FZ('NUESTRA VOZ',200,CO),vw=mw('NUESTRA VOZ',vs,CO);s18_hl(CX-vw/2-20*U,770*U,vw+40*U,190*U,P(t,a+BT*2.6,BT),'rgba(227,23,62,.9)');
   s18_slamW('NUESTRA VOZ',CX,870*U,vs,a+BT*2,t,{...CO,c:TINTA});
   // columnas de texto abstractas
   for(let c=0;c<2;c++)for(let i=0;i<11;i++){const p=ex(P(t,a+BT*3+i*.04+c*.15,.3));const ww=(c?440:440)*U*(i===10?.55:.92+hs(i+c*20)*.08)*p;X.fillStyle='rgba(14,14,16,.28)';X.fillRect((70+c*500)*U,(1050+i*38)*U,ww,14*U)}},
 (lt,t,a)=>{// ráfaga: una palabra por tiempo
   const L=[['NOTICIAS.',TINTA,'#fff'],['GENTE.',PAPEL,RJ],['TIERRA.',RJ,'#fff'],['VOZ.',TINTA,RJ],['CADA',PAPEL,TINTA],['DÍA.',RJ,TINTA]];const i=Math.min(5,Math.floor(lt/BT));const[s,b,c]=L[i];bgc(b);
   s18_slamW(s,CX,CY-40*U,FZ(s,560,CO),a+i*BT,t,{...CO,c});
   X.fillStyle=c;X.globalAlpha=.9;X.fillRect(CX-40*U,1330*U,80*U,10*U);X.globalAlpha=1},
];
function bgc(c){X.fillStyle=c;X.fillRect(-60*U,-60*U,W+120*U,H+120*U)}
SCENE(18,{dur:30,draw(t){
  const si=Math.floor(t/SEG),a=si*SEG,lt=t-a;
  // golpe de cámara al entrar cada segmento y en cada palabra
  let sh=[0,0];for(let k=0;k<=66;k++){const s=shake(t,k*BT,k%6===0?16:6);sh[0]+=s[0];sh[1]+=s[1]}
  X.save();const pk=1+.05*(1-ex(P(t,a,.25)));X.translate(CX+sh[0],CY+sh[1]);X.scale(pk,pk);X.translate(-CX,-CY);
  if(si<9)S[si](lt,t,a);else{// ===== cierre =====
    const a0=9*SEG;bgc(TINTA);
    X.save();X.globalAlpha=.08;X.fillStyle='#fff';for(let i=0;i<9;i++)X.fillRect(0,(300+i*170)*U,W,2*U);X.restore();
    const p=P(t,a0+.05,.3);if(p>0){const k=1+1.2*(1-bk(p,1.3));logo3D(CX,720*U,660*U*k,0,{a:cl(p*4),shine:P(t,a0+1.0,1.0),depth:18})}
    s18_under(CX-300*U,CX+300*U,1045*U,P(t,a0+BT*2,BT*1.2),RJ,22*U,2);
    s18_slamW('EL CANAL QUE CRECE',CX,1160*U,fit('EL CANAL QUE CRECE',920*U,130*U,CO),a0+BT*3,t,{...CO,c:'#fff'});
    s18_slamW('cada día',CX,1290*U,120*U,a0+BT*4,t,{...PF,c:RJ});
    const up=ex(P(t,a0+BT*6,.3));if(up>0){X.save();X.translate(CX,1420*U);X.rotate(-.03);X.fillStyle=RJ;X.fillRect(-250*U*up,-44*U,500*U*up,88*U);txt('/UNEVISION',0,2*U,64*U,{...CO,st:'condensed',c:'#fff',a:up,ls:6});X.restore()}}
  X.restore();
  // corte con destello en cada segmento
  if(si>0)flash(t,a,si%2?.35:.2,.18);
  // franja roja diagonal entre segmentos impares
  const wp=P(t,a-.12,.3);if(si>0&&si%3===0&&wp>0&&wp<1){X.save();X.translate(CX,CY);X.rotate(-.35);X.fillStyle=RJ;X.fillRect(-DG+DG*2*ss(wp)-200*U,-DG,400*U,DG*2);X.restore()}
},
events:(()=>{const e=[];for(let k=0;k<11;k++)e.push([k===0?'golpe':'whoosh',+(k*SEG).toFixed(3)]);
  [[0,.5],[0,2],[0,3],[1,1],[2,1],[2,2.6],[4,1],[5,1],[5,2],[6,1],[7,1],[7,2],[8,1],[8,2],[8,3],[8,4],[8,5],[9,3],[9,4]].forEach(([s,b])=>e.push(['golpe',+(s*SEG+b*BT).toFixed(3)]));
  e.push(['swipe',+(3*SEG).toFixed(3)],['swipe',+(3*SEG+1.4*BT).toFixed(3)],['swipe',+(3*SEG+2.8*BT).toFixed(3)],['golpe',+(5*SEG+3.5*BT).toFixed(3)],['riser',+(9*SEG-1).toFixed(3)],['campana',+(9*SEG+1).toFixed(3)],['pop',+(9*SEG+6*BT).toFixed(3)]);
  return e.sort((a,b)=>a[1]-b[1])})(),
musica:{estilo:'rock',bpm:132,tono:'E',hits:[0,SEG*3,SEG*6,SEG*8,SEG*9].map(v=>+v.toFixed(3)),final:+(SEG*9).toFixed(3)}});
})();
