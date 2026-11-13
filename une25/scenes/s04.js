// 04 · SEÑAL DIGITAL — glitch RGB elegante, barras de transmisión, códigos, Space Grotesk, cortes secos al ritmo (110 bpm)
const s04_B=60/110;
const s04_C=[0,2,6,10,14,18,22,26,30,34,38].map(b=>+(b*s04_B).toFixed(3)); // cortes sobre el tiempo
const s04_GL='01#%&/<>[]{}=+*ABCDEFXZ';
const s04_SP={f:'Space',w:700};
function s04_shot(t){let k=0;for(let i=0;i<s04_C.length;i++)if(t>=s04_C[i])k=i;return[k,t-s04_C[k]]}
function s04_gI(t){let g=0;for(const c of s04_C)if(c>0)g=Math.max(g,1-Math.abs(t-c)/.13);const b=Math.floor(t/s04_B);const lb=t-b*s04_B;if(hs(b*7.3)>.62&&b>1&&t<20.5)g=Math.max(g,(1-lb/.09)*.55);return cl(g)}
function s04_rgbT(s,x,y,sz,amt,o={}){const q={...s04_SP,...o};X.save();X.globalCompositeOperation='lighter';txt(s,x-amt,y,sz,{...q,c:'#ff1f4f',grad:null,a:(o.a??1)*.9});txt(s,x+amt,y,sz,{...q,c:'#08e1ff',grad:null,a:(o.a??1)*.9});X.restore();
  txt(s,x,y,sz,{...q,c:o.c||'#fff'})}
// decodificar: caracteres aleatorios que se resuelven
function s04_dec(s,x,y,sz,t0,t,o={}){if(t<t0)return;const q={...s04_SP,...o};const ch=[...s];const tot=mw(s,sz,q);let cx=(o.al==='left')?x:x-tot/2;const fr=Math.floor(t*24);
  const amt=(o.rgb||0)*U;
  ch.forEach((c,i)=>{const w=mw(c,sz,q);const tr=t0+(o.st??.035)*i+(o.hold??.22);if(t>=t0+i*.012){let cc=c;if(t<tr&&c!==' ')cc=s04_GL[Math.floor(hs(i*13.1+fr*.77)*s04_GL.length)];
      if(amt>0)s04_rgbT(cc,cx+w/2,y,sz,amt,{...q,al:'center'});else txt(cc,cx+w/2,y,sz,{...q,al:'center',c:t<tr?K.cian:(o.c||'#fff')})}cx+=w})}
function s04_hud(t,k){const a=k===0?ex(P(t,.2,.3)):1;X.save();X.globalAlpha=a*.9;const m=56*U;const tc=Math.floor(t*30);const ff=n=>String(n).padStart(2,'0');
  const code=`${ff(0)}:${ff(0)}:${ff(Math.floor(t))}:${ff(tc%30)}`;
  X.fillStyle='rgba(3,8,15,.6)';X.fillRect(m-14*U,m-6*U,250*U,40*U);X.fillRect(W-m-210*U,m-6*U,224*U,40*U);
  if(Math.floor(t*2)%2===0){X.fillStyle=K.rojo;X.beginPath();X.arc(m+10*U,m+14*U,9*U,0,7);X.fill()}
  txt('TRANSMISIÓN',m+32*U,m+14*U,24*U,{...s04_SP,al:'left',ls:6*U});txt(code,W-m,m+14*U,24*U,{f:'Space',w:400,al:'right',ls:4*U,c:K.cian});
  // esquinas de encuadre
  X.strokeStyle='rgba(255,255,255,.55)';X.lineWidth=2.5*U;const e=40*U,b=m-14*U;
  [[b,b,1,1],[W-b,b,-1,1],[b,H-b,1,-1],[W-b,H-b,-1,-1]].forEach(([x,y,sx,sy])=>{X.beginPath();X.moveTo(x,y+sy*e);X.lineTo(x,y);X.lineTo(x+sx*e,y);X.stroke()});
  // barra de progreso segmentada
  const n=40;for(let i=0;i<n;i++){X.fillStyle=i/n<t/25?K.cian:'rgba(255,255,255,.15)';X.fillRect(m+i*((W-2*m)/n),H-m-4*U,(W-2*m)/n-4*U,5*U)}
  X.restore()}
function s04_bars(t,t0,top=.68){const cs=['#ffffff',K.ambar,K.cian,K.azul,K.naranja,K.brasa,K.rojo];const bw=W/7;
  cs.forEach((c,i)=>{const p=ex(P(t,t0+i*.03,.3));X.fillStyle=c;X.fillRect(i*bw,-H*(1-p),bw+1,H*top)});
  const cs2=[K.rojo,K.noche,K.brasa,K.noche,K.cian,K.noche,'#ffffff'];cs2.forEach((c,i)=>{const p=ex(P(t,t0+.1+i*.03,.3));X.fillStyle=c;X.fillRect(i*bw,H*top+H*(1-p),bw+1,H*.08)});
  X.fillStyle='#03080f';X.fillRect(0,H*(top+.08),W,H);const pp=ex(P(t,t0+.3,.4));for(let i=0;i<24;i++){X.fillStyle=i%2?'rgba(255,255,255,.08)':'rgba(8,225,255,.18)';X.fillRect(i*W/24,H*(top+.08)+30*U,W/24*pp,H*.06)}}
function s04_code(t,x,w){X.save();X.beginPath();X.rect(x,0,w,H);X.clip();const lh=34*U;const off=(t*120*U)%lh;
  for(let i=-1;i<H/lh+1;i++){const n=i+Math.floor(t*120*U/lh);const hx=Math.floor(hs(n*3.7)*0xffffff).toString(16).toUpperCase().padStart(6,'0');const bn=Math.floor(hs(n*1.9)*255).toString(2).padStart(8,'0');
    txt(`0x${hx}  ${bn}  ${String(Math.floor(hs(n)*999)).padStart(3,'0')}`,x+10*U,i*lh-off+lh,22*U,{f:'Space',w:400,al:'left',ls:2*U,c:hs(n*5)>.85?K.ambar:'rgba(8,225,255,.55)'})}X.restore()}
function s04_post(t,g){if(g<=.02)return;if(!s04_post.c){s04_post.c=document.createElement('canvas')}const c=s04_post.c;c.width=W;c.height=H;c.getContext('2d').drawImage(X.canvas,0,0);
  const fr=Math.floor(t*30);let y=0,i=0;while(y<H){const h=(20+hs(fr*3.1+i)*130)*U;const dx=(hs(fr*1.7+i*2.3)-.5)*2*160*U*g*(hs(i+fr)>.45?1:.15);
    X.drawImage(c,0,y,W,h,dx,y,W,h);if(hs(i*9+fr)>.8&&g>.3){X.save();X.globalCompositeOperation='lighter';X.fillStyle=`rgba(${hs(i+fr)>.5?'8,225,255':'227,23,62'},${.25*g})`;X.fillRect(0,y,W,h);X.restore()}y+=h;i++}}
SCENE(4,{dur:25,
  draw(t){const[k,lt]=s04_shot(t);const g=s04_gI(t);const amt=(4+g*40)*U;
    X.fillStyle='#03080f';X.fillRect(0,0,W,H);
    if(k===0){// arranque: línea de exploración y señal
      const p=ex(P(t,.15,.5));X.fillStyle=K.cian;X.fillRect(CX-W*.4*p,CY-1.5*U,W*.8*p,3*U);
      s04_dec('SINTONIZANDO',CX,CY-80*U,96*U,.35,t,{ls:20*U,st:.03});}
    else if(k===1){// barras de transmisión + SINTONIZA
      s04_bars(t,s04_C[1],.74);const p=ex(P(lt,.12,.35));X.fillStyle='#03080f';const bh=250*U;X.fillRect(0,CY-bh/2-90*U,W*p,bh);
      s04_dec('SINTONIZA',CX,CY-90*U,fit('SINTONIZA',W*.8,230*U,s04_SP),s04_C[1]+.12,t,{rgb:6,ls:4*U});}
    else if(k===2){// códigos + NOTICIAS / INFORMACIÓN
      grid(t,1,'8,225,255',80);s04_code(t,60*U,560*U);
      const sw=lt>s04_B*2;const wd=sw?'INFORMACIÓN':'NOTICIAS';const t0=s04_C[2]+(sw?s04_B*2:0);
      X.fillStyle=sw?K.cian:K.ambar;X.fillRect(680*U,CY+110*U,(W-760*U)*ex(P(t,t0,.4)),8*U);
      s04_dec(wd,680*U,CY-10*U,fit(wd,W-760*U,240*U,s04_SP),t0,t,{al:'left',rgb:5,st:.03});
      txt(sw?'02 / DATOS':'01 / ACTUALIDAD',680*U,CY-170*U,30*U,{f:'Space',w:400,al:'left',ls:8*U,c:K.cian,a:ex(P(t,t0+.1,.3))});}
    else if(k===3){// bandas de barrido + LO QUE PASA AQUÍ
      for(let i=0;i<9;i++){const p=ex(P(lt,i*.025,.35));X.fillStyle=i%3===0?K.marino:i%3===1?'#06172a':'#0a1d33';X.fillRect(0,i*H/9,W*p,H/9+1)}
      const pp=ex(P(lt,.2,.4));X.fillStyle=K.ambar;X.fillRect(0,CY-6*U,W*pp,12*U);
      s04_dec('LO QUE PASA',CX,CY-140*U,fit('LO QUE PASA',W*.85,210*U,s04_SP),s04_C[3]+.12,t,{rgb:4});
      s04_dec('AQUÍ',CX,CY+150*U,220*U,s04_C[3]+.45,t,{rgb:6,c:K.ambar});}
    else if(k===4){// tres paneles cortados
      const cols=[K.cian,K.ambar,K.brasa];for(let i=0;i<3;i++){const p=ex(P(lt,i*.06,.35));X.save();X.beginPath();X.rect(i*W/3,0,W/3,H);X.clip();X.fillStyle=cols[i];X.fillRect(i*W/3,H*(1-p)*(i%2?-1:1),W/3,H);X.restore()}
      X.fillStyle='#03080f';const sp=ex(P(lt,.3,.3));X.fillRect(0,CY-180*U,W,360*U*sp);
      s04_dec('TU CANAL',CX,CY,fit('TU CANAL',W*.86,300*U,s04_SP),s04_C[4]+.32,t,{rgb:6});}
    else if(k===5){// osciloscopio + NUESTRA VOZ
      grid(t,.8,'8,225,255',60);X.save();X.globalCompositeOperation='lighter';
      [[K.cian,1,0],[K.ambar,.6,1.3],[K.brasa,.35,2.6]].forEach(([c,a,ph])=>{X.strokeStyle=c;X.globalAlpha=a;X.lineWidth=4*U;X.beginPath();for(let x=0;x<=W;x+=6*U){const n=x/W;const env=Math.sin(n*Math.PI);
        const y=CY+260*U+env*(Math.sin(n*22+t*9+ph)*70+Math.sin(n*57-t*14+ph)*30)*U*(.5+.5*Math.abs(Math.sin(t*3.6)));x?X.lineTo(x,y):X.moveTo(x,y)}X.stroke()});X.restore();
      s04_dec('NUESTRA VOZ',CX,CY-90*U,fit('NUESTRA VOZ',W*.86,250*U,s04_SP),s04_C[5]+.1,t,{rgb:5});}
    else if(k===6){// espectro + mira + SANTA BÁRBARA
      for(let i=0;i<64;i++){const h=(.15+.85*Math.abs(Math.sin(t*(2+hs(i)*5)+i)))*H*.22*(.4+hs(i+2)*.6);X.fillStyle=i%9===0?K.ambar:'rgba(8,225,255,.55)';X.fillRect(i*W/64+2*U,H-90*U-h,W/64-5*U,h)}
      const rp=ex(P(lt,0,.5));X.save();X.strokeStyle='rgba(255,255,255,.5)';X.lineWidth=2*U;X.beginPath();X.arc(CX,CY-60*U,(260+40*Math.sin(t*4))*U*rp,0,7);X.stroke();X.setLineDash([10*U,14*U]);X.beginPath();X.arc(CX,CY-60*U,330*U*rp,t,t+6);X.stroke();X.restore();
      s04_dec('SANTA BÁRBARA',CX,CY-80*U,fit('SANTA BÁRBARA',W*.86,220*U,s04_SP),s04_C[6]+.1,t,{rgb:5});
      s04_dec('SAN JOSÉ DE COLINAS · HONDURAS',CX,CY+70*U,44*U,s04_C[6]+.6,t,{f:'Space',w:400,ls:10*U,c:K.cian,st:.015,hold:.15});}
    else if(k===7){// bloques de datos + CADA DÍA
      const fr=Math.floor(t*12);for(let j=0;j<6;j++)for(let i=0;i<12;i++){const v=hs(i*7+j*13+fr);if(v>.72){X.fillStyle=[K.cian,K.azul,K.ambar,K.brasa][Math.floor(v*40)%4];X.globalAlpha=.18+.3*(v-.72);X.fillRect(i*W/12,j*H/6,W/12-4*U,H/6-4*U);X.globalAlpha=1}}
      s04_dec('CADA DÍA',CX,CY,fit('CADA DÍA',W*.86,320*U,s04_SP),s04_C[7]+.1,t,{rgb:8});}
    else if(k===8){// NUESTRA GENTE con barrido de línea de exploración
      const sy=((lt/.9)%1)*H;const lg=X.createLinearGradient(0,sy-120*U,0,sy);lg.addColorStop(0,'rgba(8,225,255,0)');lg.addColorStop(1,'rgba(8,225,255,.25)');X.fillStyle=lg;X.fillRect(0,sy-120*U,W,120*U);
      s04_dec('NUESTRA',CX,CY-150*U,fit('NUESTRA',W*.7,200*U,s04_SP),s04_C[8]+.08,t,{rgb:4,c:K.cian});
      s04_dec('GENTE',CX,CY+110*U,300*U,s04_C[8]+.35,t,{rgb:7});}
    else if(k===9){// medidor de señal + SÍGUENOS
      const bx=CX-560*U,by=CY+150*U;for(let i=0;i<5;i++){const on=lt>.15+i*s04_B*.6;const h=(70+i*55)*U;X.fillStyle=on?(i>2?K.ambar:K.cian):'rgba(255,255,255,.12)';X.fillRect(bx+i*62*U,by-h,44*U,h)}
      s04_dec('SÍGUENOS',bx+380*U,CY-60*U,fit('SÍGUENOS',W*.5,190*U,s04_SP),s04_C[9]+.1,t,{al:'left',rgb:5});
      s04_dec(DATOS.redes,bx+384*U,CY+110*U,96*U,s04_C[9]+.6,t,{al:'left',c:K.cian,f:'Space',w:700,ls:4*U});}
    else {// cierre: logo con glitch que se estabiliza
      const p=P(t,s04_C[10],.7);const e=ex(p);const ly=CY-80*U;const lw=470*U;
      const gl=X.createRadialGradient(CX,ly,0,CX,ly,620*U);gl.addColorStop(0,'rgba(8,225,255,.16)');gl.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=gl;X.fillRect(0,0,W,H);
      const off=(1-e)*60*U+(s04_gI(t)*30*U);X.save();X.globalCompositeOperation='lighter';logo(CX-off,ly,lw,{tint:'cian',a:.55*(1-e*.85)});logo(CX+off,ly,lw,{tint:'ambar',a:.55*(1-e*.85)});X.restore();
      logo(CX,ly,lw,{a:cl(p*3)});
      s04_dec(DATOS.eslogan,CX,CY+265*U,fit(DATOS.eslogan,W*.7,56*U,s04_SP),21.75,t,{st:.02,hold:.18,ls:3*U});
      s04_dec(DATOS.redes,CX,CY+345*U,44*U,22.5,t,{c:K.cian,ls:10*U,f:'Space',w:400});
      const bp=ex(P(t,22.2,.5));const cs=[K.cian,K.azul,K.ambar,K.naranja,K.brasa,K.rojo];cs.forEach((c,i)=>{X.fillStyle=c;X.fillRect(CX-300*U+i*100*U,CY+300*U,100*U*bp,6*U)});}
    s04_hud(t,k);
    // líneas de barrido muy sutiles
    X.fillStyle='rgba(0,0,0,.10)';for(let y=0;y<H;y+=4*U)X.fillRect(0,y,W,1.5*U);
    s04_post(t,g);
    flash(t,s04_C[1],.5,.12);flash(t,s04_C[10],.6,.2);
    vineta(.4);
  },
  events:[['obturador',.35],...s04_C.slice(1).map(c=>['golpe',c]),['swipe',s04_C[2]+s04_B*2],['swipe',s04_C[3]+.45],['pop',s04_C[6]+.6],['pop',s04_C[8]+.35],['pop',s04_C[9]+.6],['riser',s04_C[10]-1],['whoosh',21.75],['obturador',22.5],['campana',23.0]],
  musica:{estilo:'synth',bpm:110,tono:'Am',hits:s04_C.slice(1),final:s04_C[10]}
});
