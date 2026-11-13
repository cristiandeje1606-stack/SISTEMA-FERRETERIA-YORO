// escena 13 · CHAT (redes + TV, 20 s) — lofi 85 Dm
(()=>{
const D=20;
const s13_rr=(x,y,w,h,r)=>{X.beginPath();X.roundRect(x,y,w,h,r)};
const FB={f:'Fig',w:700,st:'normal'},FK={f:'Archivo',w:900,st:'condensed'};
// panel de chat según formato
const PX0=L(80,50),PW=L(840,980),PY0=L(60,250),PH=L(960,1450);   // panel
const BF=L(50,58),BMAX=L(600,760),GAP=L(22,26);
const KX=L(1410,CX);   // columna de textos grandes (TV)
const s13_MSG=[
  {q:1,t:1.15,s:'¿Dónde veo lo que pasa en Santa Bárbara?',ty:[.2,1.0]},
  {q:0,t:2.6,s:'En /UNEVISION',hl:'/UNEVISION',tp:1.45},
  {q:1,t:5.25,s:'¿Y las noticias de nuestra gente?',ty:[4.55,5.1]},
  {q:0,t:6.6,s:'Aquí estamos, cada día.',tp:5.65},
  {q:0,t:8.5,stk:'tv'},
  {q:1,t:10.0,s:'¡Ya los sigo!',ty:[9.35,9.9]},
  {q:1,t:10.75,stk:'heart'},
  {q:0,t:12.1,s:'Crecemos contigo.',tp:11.2}];
// medidas de cada mensaje (se calculan una vez, cuando ya cargaron las fuentes)
let s13_M=null;
function s13_measure(){s13_M=s13_MSG.map(m=>{if(m.stk)return{h:L(230,270),w:L(230,270)};const lines=wrap(m.s,BMAX-70,BF,FB);const w=Math.max(...lines.map(l=>mw(l,BF,FB)))+70;return{lines,w,h:lines.length*BF*1.25+50}})}
function s13_bg(t){const g=X.createLinearGradient(0,0,W*.4,H);g.addColorStop(0,'#0B2238');g.addColorStop(.6,'#0f1d33');g.addColorStop(1,'#231a2b');X.fillStyle=g;X.fillRect(0,0,W,H);
  X.save();X.globalCompositeOperation='lighter';
  const wg=X.createRadialGradient(W*.85,H*.95,10,W*.85,H*.95,Math.max(W,H)*.7);wg.addColorStop(0,'rgba(246,144,28,.35)');wg.addColorStop(1,'rgba(246,144,28,0)');X.fillStyle=wg;X.fillRect(0,0,W,H);
  for(let i=0;i<16;i++){const x=(hs(i)*W+Math.sin(t*.25+i)*60),y=((hs(i+20)*H-t*(8+hs(i+3)*14))%H+H)%H,r=(40+hs(i+5)*110)*U;const c=i%3===0?'8,225,255':i%3===1?'253,174,3':'234,79,61';
    const rg=X.createRadialGradient(x,y,0,x,y,r);rg.addColorStop(0,`rgba(${c},.16)`);rg.addColorStop(.7,`rgba(${c},.08)`);rg.addColorStop(1,`rgba(${c},0)`);X.fillStyle=rg;X.beginPath();X.arc(x,y,r,0,7);X.fill()}
  X.restore()}
// sticker: televisor sonriente o corazón (dibujados)
function s13_sticker(kind,x,y,s,t){X.save();X.translate(x,y);X.rotate(Math.sin(t*2.2)*.06);
  X.shadowColor='rgba(0,0,0,.35)';X.shadowBlur=20;X.shadowOffsetY=8;
  if(kind==='tv'){const w=s*.86,h=s*.66;X.strokeStyle='#fff';X.lineWidth=s*.035;X.lineCap='round';X.beginPath();X.moveTo(-s*.12,-h/2);X.lineTo(-s*.26,-h/2-s*.2);X.moveTo(s*.12,-h/2);X.lineTo(s*.28,-h/2-s*.22);X.stroke();
    X.fillStyle='#fff';s13_rr(-w/2-10,-h/2-10+s*.05,w+20,h+20,s*.14);X.fill();X.shadowColor='transparent';
    const g=X.createLinearGradient(-w/2,0,w/2,0);g.addColorStop(0,K.cian);g.addColorStop(.5,K.ambar);g.addColorStop(1,K.brasa);X.fillStyle=g;s13_rr(-w/2,-h/2+s*.05,w,h,s*.11);X.fill();
    X.fillStyle=K.noche;const bl=Math.floor(t*1.3)%4===0&&(t*1.3)%1<.15;[-1,1].forEach(d=>{X.beginPath();X.ellipse(d*s*.15,s*.0,s*.05,bl?s*.01:s*.07,0,0,7);X.fill()});
    X.strokeStyle=K.noche;X.lineWidth=s*.035;X.beginPath();X.arc(0,s*.08,s*.12,.25,Math.PI-.25);X.stroke();
    X.fillStyle='rgba(234,79,61,.6)';[-1,1].forEach(d=>{X.beginPath();X.ellipse(d*s*.28,s*.12,s*.05,s*.03,0,0,7);X.fill()});
    X.save();X.translate(0,h/2+s*.2);X.rotate(-.06);X.fillStyle=K.noche;const lw=mw('¡CONTIGO!',s*.15,FK)+s*.12;s13_rr(-lw/2,-s*.11,lw,s*.22,s*.06);X.fill();txt('¡CONTIGO!',0,0,s*.15,{...FK,c:K.ambar});X.restore()}
  else{const k=s/2;const pz=1+.08*Math.max(0,Math.sin(t*9.4))**8;X.scale(pz,pz);X.beginPath();X.moveTo(0,k*.85);X.bezierCurveTo(-k*1.55,-k*.15,-k*.85,-k*1.25,0,-k*.45);X.bezierCurveTo(k*.85,-k*1.25,k*1.55,-k*.15,0,k*.85);X.closePath();
    X.lineWidth=s*.08;X.strokeStyle='#fff';X.stroke();X.shadowColor='transparent';const g=X.createLinearGradient(0,-k,0,k);g.addColorStop(0,'#ff6b6b');g.addColorStop(1,K.rojo);X.fillStyle=g;X.fill();
    X.fillStyle='rgba(255,255,255,.6)';X.beginPath();X.ellipse(-k*.45,-k*.4,k*.18,k*.1,-.6,0,7);X.fill()}
  X.restore()}
function s13_bubble(m,mm,x,y,p,t){// x,y = esquina inferior del lado del remitente
  if(p<=0)return;const sc=bk(p,1.6);X.save();X.translate(x,y);X.scale(sc,sc);X.globalAlpha*=cl(p*3);
  if(m.stk){s13_sticker(m.stk,m.q?-mm.w/2:mm.w/2,-mm.h/2,mm.h*.82,t);X.restore();return}
  const w=mm.w,h=mm.h,bx=m.q?-w:0;
  X.shadowColor='rgba(0,0,0,.35)';X.shadowBlur=24;X.shadowOffsetY=10;
  if(m.q){const g=X.createLinearGradient(bx,-h,0,0);g.addColorStop(0,K.cian);g.addColorStop(1,K.azul);X.fillStyle=g}else X.fillStyle='#FBF7F0';
  s13_rr(bx,-h,w,h,BF*.75);X.fill();X.beginPath();if(m.q){X.moveTo(-26,-30);X.lineTo(14,0);X.lineTo(-56,-2)}else{X.moveTo(26,-30);X.lineTo(-14,0);X.lineTo(56,-2)}X.fill();X.shadowColor='transparent';
  mm.lines.forEach((l,i)=>{const ly=-h+25+BF*.62+i*BF*1.25;if(m.hl&&l.includes(m.hl)){const pre=l.slice(0,l.indexOf(m.hl));txt(pre,bx+35,ly,BF,{...FB,al:'left',c:K.marino});const px=bx+35+mw(pre,BF,FB);
      const hw=mw(m.hl,BF,FB);X.fillStyle='rgba(8,225,255,.28)';X.fillRect(px-4,ly-BF*.5,(hw+8)*ex(P(t,m.t+.3,.5)),BF);txt(m.hl,px,ly,BF,{...FB,w:800,al:'left',c:'#0a5b8c'})}
    else txt(l,bx+35,ly,BF,{...FB,al:'left',c:m.q?K.noche:K.marino})});
  if(m.q){const r=P(t,m.t+.6,.3);s13_check(-34,14,r>0?K.cian:'rgba(255,255,255,.5)');s13_check(-20,14,r>0?K.cian:'rgba(255,255,255,.5)')}
  X.restore()}
function s13_check(x,y,c){X.save();X.strokeStyle=c;X.lineWidth=4;X.lineCap='round';X.beginPath();X.moveTo(x-8,y);X.lineTo(x-2,y+6);X.lineTo(x+9,y-6);X.stroke();X.restore()}
function s13_typing(x,y,a,t){if(a<=0)return;X.save();X.globalAlpha*=a;X.translate(x,y);X.scale(ex(a),ex(a));X.fillStyle='#FBF7F0';s13_rr(0,-BF*1.6,BF*3.2,BF*1.6,BF*.8);X.fill();
  for(let i=0;i<3;i++){const b=Math.max(0,Math.sin(t*9-i*.9));X.fillStyle=`rgba(11,34,56,${.35+.5*b})`;X.beginPath();X.arc(BF*.85+i*BF*.75,-BF*.8-b*BF*.22,BF*.17,0,7);X.fill()}X.restore()}
// texto grande cinético (con subrayado de marcador)
function s13_kin(lines,x,y,t0,t1,t,o={}){if(t<t0||t>t1)return;const a=1-ss(P(t,t1-.35,.35));X.save();X.globalAlpha*=a;const mx=o.mx||L(860,960);
  let yy=y-(lines.length-1)*(o.lh||1)*0.5*L(220,240);lines.forEach((ln,i)=>{const[s,c]=Array.isArray(ln)?ln:[ln,'#fff'];const sz=fit(s,mx,o.max||L(240,260),FK);
    slam(s,x,yy,sz,t0+i*.22,t,{...FK,c,from:2.4,stag:.03,d:.36,glow:'rgba(0,0,0,.5)',gb:30});
    if(c!=='#fff'){const up=ex(P(t,t0+i*.22+.35,.4));const w=mw(s,sz,FK);X.fillStyle='rgba(253,174,3,.85)';X.save();X.translate(x-w/2,yy+sz*.5);X.rotate(-.015);X.fillRect(0,0,w*up,sz*.09);X.restore()}
    yy+=L(220,240)*(o.lh||1)});X.restore()}
SCENE(13,{dur:D,draw(t){if(!s13_M)s13_measure();
  s13_bg(t);
  // cámara del chat: leve deriva + acercamiento final
  const zf=eio(P(t,14.4,.9));const zs=1+zf*2.2;const lastY=PY0+PH-L(150,190);
  X.save();const ccx=PX0+PW*.5,ccy=lerp(PY0+PH*.5,lastY-80,zf);X.translate(ccx,ccy);X.scale(zs,zs);X.rotate(Math.sin(t*.4)*.004);X.translate(-ccx,-ccy+Math.sin(t*.6)*4);
  X.globalAlpha=1-ss(P(t,15.0,.3));
  if(t<15.3){// panel
    const pin=ex(P(t,0,.6));X.save();X.translate(0,(1-pin)*60);X.globalAlpha*=pin;
    X.fillStyle='rgba(6,18,31,.55)';s13_rr(PX0,PY0,PW,PH,44);X.fill();X.strokeStyle='rgba(255,255,255,.08)';X.lineWidth=2;X.stroke();
    // cabecera
    X.save();s13_rr(PX0,PY0,PW,L(120,140),44);X.clip();X.fillStyle='rgba(11,34,56,.95)';X.fillRect(PX0,PY0,PW,L(120,140));X.restore();
    const hy=PY0+L(60,70);X.fillStyle=K.marino;X.beginPath();X.arc(PX0+L(70,80),hy,L(40,46),0,7);X.fill();X.strokeStyle=K.ambar;X.lineWidth=4;X.stroke();logo(PX0+L(70,80),hy-3,L(56,64));
    txt('UNE VISIÓN',PX0+L(130,145),hy-L(14,16),L(36,42),{...FB,w:800,al:'left'});
    const on=Math.floor(t*1.5)%2;X.fillStyle='#3ddc84';X.beginPath();X.arc(PX0+L(140,155),hy+L(24,28),7,0,7);X.fill();txt('en línea',PX0+L(156,172),hy+L(24,28),L(26,30),{...FB,w:500,al:'left',c:'rgba(255,255,255,.7)'});
    // barra para escribir
    const iy=PY0+PH-L(70,80),ih=L(84,96);X.fillStyle='rgba(255,255,255,.1)';s13_rr(PX0+24,iy-ih/2,PW-48-ih-16,ih,ih/2);X.fill();
    X.fillStyle=K.cian;X.beginPath();X.arc(PX0+PW-24-ih/2,iy,ih/2,0,7);X.fill();X.fillStyle=K.noche;X.beginPath();const sx=PX0+PW-24-ih/2;X.moveTo(sx-14,iy-16);X.lineTo(sx+18,iy);X.lineTo(sx-14,iy+16);X.lineTo(sx-6,iy);X.closePath();X.fill();
    let typing=null;for(const m of s13_MSG)if(m.ty&&t>=m.ty[0]&&t<m.t)typing=m;
    if(typing){const n=Math.floor(cl((t-typing.ty[0])/(typing.ty[1]-typing.ty[0]))*typing.s.length);let s=typing.s.slice(0,n);const maxw=PW-48-ih-16-60;while(mw(s,L(34,38),{...FB,w:500})>maxw)s=s.slice(1);
      txt(s+(Math.floor(t*4)%2?'|':''),PX0+54,iy,L(34,38),{...FB,w:500,al:'left',c:'#fff'})}
    else txt('Escribe un mensaje',PX0+54,iy,L(34,38),{...FB,w:500,al:'left',c:'rgba(255,255,255,.35)'});
    // mensajes (anclados abajo; suben cuando llega uno nuevo)
    X.save();s13_rr(PX0,PY0+L(124,144),PW,PH-L(124,144)-L(130,150),0);X.clip();
    const base=PY0+PH-L(140,160);let tpA=0;
    for(let i=s13_MSG.length-1;i>=0;i--){const m=s13_MSG[i];if(t<m.t-.0)continue;let off=0;for(let j=i+1;j<s13_MSG.length;j++)off+=(s13_M[j].h+GAP+(s13_MSG[j].q?20:0))*ex(P(t,s13_MSG[j].t,.45));
      const y=base-off;s13_bubble(m,s13_M[i],m.q?PX0+PW-36:PX0+36,y,P(t,m.t,.4),t)}
    // escribiendo...
    for(const m of s13_MSG)if(m.tp!==undefined&&t>=m.tp&&t<m.t+.1){const a=ex(P(t,m.tp,.25))*(1-P(t,m.t-.1,.15));s13_typing(PX0+36,base,a,t)}
    X.restore();X.restore()}
  X.restore();
  // ---- textos grandes: TV a la derecha; vertical encima con velo ----
  const KS=[[.4,2.6,[['¿DÓNDE','#fff'],['LO VEO?',K.ambar]],1],[2.9,4.5,[['EN','#fff'],['/UNEVISION',K.cian]],0],[4.7,6.6,[['NUESTRA','#fff'],['GENTE',K.ambar]],1],[6.9,8.6,[['AQUÍ ESTAMOS','#fff'],['CADA DÍA',K.ambar]],0],
    [8.8,11.9,[['¿YA NOS','#fff'],['SIGUES?',K.cian]],2],[12.4,15.1,[['CRECEMOS','#fff'],['CONTIGO',K.ambar]],0]];
  KS.forEach(([a,b,lines,tvOnly])=>{if(TV){s13_kin(lines,KX,CY,a,b,t,{mx:880,max:250})}else if(tvOnly===1){s13_kin(lines,CX,L(0,a<1?700:640),a,b,t,{mx:900,max:200,lh:.85})}else if(!tvOnly){if(t>=a&&t<=b){const v=ex(P(t,a,.25))*(1-ss(P(t,b-.3,.3)));X.fillStyle=`rgba(6,18,31,${.78*v})`;X.fillRect(0,0,W,H)}s13_kin(lines,CX,CY-40,a,b,t,{mx:960,max:270})}});
  // golpe suave de transición
  flash(t,15.05,.8,.6,'253,174,3');
  // ---- cierre ----
  if(t>=15.1){const p=P(t,15.1,1.2);const lx=L(640,CX),ly=L(470,760);
    const rg=X.createRadialGradient(lx,ly,10,lx,ly,700);rg.addColorStop(0,`rgba(253,174,3,${.28*ex(p)})`);rg.addColorStop(1,'rgba(253,174,3,0)');X.fillStyle=rg;X.fillRect(0,0,W,H);
    const[a1,a2]=shake(t,15.15,14);X.save();X.translate(a1,a2);
    const lp=bk(P(t,15.15,.8),1.4);X.save();X.translate(lx,ly+Math.sin((t-15)*1.4)*8);X.rotate((1-lp)*-.12);logo(0,0,L(560,600)*lerp(.4,1,lp),{a:cl(lp*2),glow:'rgba(253,174,3,.45)',gb:50});X.restore();
    // burbuja final con /UNEVISION
    const tx=L(1380,CX),by=L(470,1250);const bp=P(t,16.1,.45);if(bp>0){const sc=bk(bp,1.7);const w=L(720,820),h=L(170,180);X.save();X.translate(tx,by);X.scale(sc,sc);X.shadowColor='rgba(0,0,0,.4)';X.shadowBlur=30;
      const g=X.createLinearGradient(-w/2,0,w/2,0);g.addColorStop(0,K.cian);g.addColorStop(1,K.azul);X.fillStyle=g;s13_rr(-w/2,-h/2,w,h,h*.45);X.fill();X.beginPath();X.moveTo(-w*.3,h/2-10);X.lineTo(-w*.38,h/2+46);X.lineTo(-w*.18,h/2-10);X.fill();X.shadowColor='transparent';
      txt('/UNEVISION',0,6,fit('/UNEVISION',w-90,L(110,120),FK),{...FK,c:K.noche});X.restore()}
    const sy=L(700,1420);rise('EL CANAL QUE CRECE',tx,sy,L(64,66),16.7,t,{...FK,w:800,c:'#fff',ls:2});rise('CADA DÍA',tx,sy+L(80,82),L(64,66),16.9,t,{...FK,w:800,c:K.ambar,ls:2});
    if(t>15.5&&t<16.15){X.save();const q=P(t,16.0,.15);X.globalAlpha=1-q;s13_typing(tx-L(360,410),by-L(100,105),1,t);X.restore()}
    X.restore()}
},events:[['pop',.15],['obturador',.6],['whoosh',1.15],['pop',1.2],['pop',1.5],['pop',2.6],['golpe',2.95],['swipe',4.5],['whoosh',5.25],['pop',5.3],['pop',6.6],['golpe',6.95],['pop',8.5],['swipe',8.85],['whoosh',10.0],['pop',10.05],['pop',10.75],['pop',12.1],['riser',11.45],['golpe',12.45],['whoosh_largo',14.4],['golpe',15.15],['pop',16.1],['campana',16.7]],
musica:{estilo:'lofi',bpm:85,tono:'Dm',hits:[2.95,6.95,12.45,15.15],final:15.15}});
})();
