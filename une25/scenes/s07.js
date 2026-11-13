// escena 07 · PAPEL RECORTADO (orquesta, 96, F) — capas de papel con sombras y parallax, Playfair itálica + Archivo
(()=>{
// itálica real de Playfair (archivos en fonts/); si falla, el navegador usa la oblicua
const FF=[['700','fonts/playfair-display-latin-700-italic.woff2'],['900','fonts/playfair-display-latin-900-italic.woff2']].map(([w,u])=>new FontFace('Playfair',`url(${u})`,{style:'italic',weight:w}));
FF.forEach(f=>document.fonts.add(f));const RDY=Promise.all(FF.map(f=>f.load())).catch(()=>{});
const CREAM='#F3EBDD',PAPER='#FFFBF4',INK=K.marino;
const T=[4.4,8.1,11.9,16.25,20];   // cortes con hoja de papel
function sh(b=26,oy=10,a=.32){X.shadowColor=`rgba(25,15,5,${a})`;X.shadowBlur=b*U;X.shadowOffsetY=oy*U;X.shadowOffsetX=0}
function nosh(){X.shadowColor='transparent';X.shadowBlur=0;X.shadowOffsetY=0}
function it(s,x,y,sz,o={}){txt(s,x,y,sz,{f:'Playfair',it:true,w:o.w||700,...o})}
function hill(y0,amp,seed,col,dx,o={}){X.save();sh(o.b||30,o.oy??-8,o.a||.35);X.fillStyle=col;X.beginPath();X.moveTo(-60*U,H+60*U);
  for(let x=-60*U;x<=W+60*U;x+=12*U){const xx=x+dx;const y=y0-amp*(.55*Math.sin(xx/(W*.21)+seed)+.3*Math.sin(xx/(W*.09)+seed*2.3)+.15*Math.sin(xx/(W*.037)+seed*5))+(hs(Math.floor(xx/(12*U))+seed*100)-.5)*2.4*U;X.lineTo(x,y)}
  X.lineTo(W+60*U,H+60*U);X.closePath();X.fill();X.restore()}
function blob(cx,cy,r,seed,col,o={}){X.save();sh(o.b||28,o.oy??10,o.a||.3);X.fillStyle=col;X.beginPath();const n=90;for(let i=0;i<=n;i++){const a=i/n*Math.PI*2;const rr=r*(1+.012*Math.sin(a*7+seed)+.008*Math.sin(a*13+seed*3))+(hs(i+seed*50)-.5)*1.6*U;X.lineTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr)}X.fill();X.restore()}
function cloud(x,y,s,seed){X.save();sh(18,8,.22);X.fillStyle=PAPER;X.beginPath();[[0,0,1],[.8,.15,.75],[-.8,.2,.7],[.35,-.35,.7]].forEach(([a,b,r])=>{X.moveTo(x+a*s+r*s,y+b*s);X.arc(x+a*s,y+b*s,r*s,0,7)});X.fill();X.restore()}
// hoja de papel que barre la pantalla (corte en t0)
function sheet(t,t0,col,col2,dir){const d=1;const p=P(t,t0-d/2,d);if(p<=0||p>=1)return;X.save();X.translate(CX,CY);X.rotate(-.13*dir);
  [[col2,-.07],[col,0]].forEach(([c,dl])=>{const q=eio(cl(p+dl));const bw=W*1.9,rng=W/2+bw/2+W*.2;const cx=dir*(-rng+2*rng*q);X.save();sh(40,0,.4);X.fillStyle=c;X.beginPath();
    const hh=DG*.75;for(let y=-hh;y<=hh;y+=16*U)X.lineTo(cx-bw/2+(hs(y/U*.13+3)-.5)*7*U,y);for(let y=hh;y>=-hh;y-=16*U)X.lineTo(cx+bw/2+(hs(y/U*.17+9)-.5)*7*U,y);X.fill();X.restore()});X.restore()}
// letras de papel que caen con rebote y sombra que crece
function paperSlam(s,x,y,sz,t0,t,o={}){X.save();sh(o.b||20,o.oy||12,o.sa||.35);slam(s,x,y,sz,t0,t,{from:1.9,back:1.9,stag:.05,d:.5,...o});X.restore()}
function cardS(x,y,w,h,col,rot,o={}){X.save();X.translate(x,y);X.rotate(rot);sh(o.b||40,o.oy||18,o.a||.35);X.fillStyle=col;X.beginPath();X.roundRect(-w/2,-h/2,w,h,o.r||10*U);X.fill();X.restore()}
function heart(x,y,s,col){X.save();sh(16,8,.3);X.fillStyle=col;X.translate(x,y);X.scale(s/100,s/100);X.beginPath();X.moveTo(0,30);X.bezierCurveTo(-60,-10,-40,-60,0,-30);X.bezierCurveTo(40,-60,60,-10,0,30);X.fill();X.restore()}
function bubble(x,y,w,h,col,tail=1){if(w<2||h<2)return;X.save();sh(34,16,.33);X.fillStyle=col;X.beginPath();X.roundRect(x-w/2,y-h/2,w,h,h*.32);X.moveTo(x-w*.25*tail,y+h/2-2);X.lineTo(x-w*.36*tail,y+h/2+h*.28);X.lineTo(x-w*.08*tail,y+h/2-2);X.fill();X.restore()}
function share(x,y,s,col){X.save();sh(16,8,.3);X.strokeStyle=col;X.fillStyle=col;X.lineWidth=s*.12;X.translate(x,y);const p=[[-.35*s,0],[.35*s,-.35*s],[.35*s,.35*s]];X.beginPath();X.moveTo(...p[1]);X.lineTo(...p[0]);X.lineTo(...p[2]);X.stroke();p.forEach(q=>{X.beginPath();X.arc(q[0],q[1],s*.16,0,7);X.fill()});X.restore()}
function house(x,base,w,h,col,roof,k,seed){if(k<=0)return;X.save();X.translate(x,base);X.scale(1,k);sh(20,-6,.3);X.fillStyle=col;X.fillRect(-w/2,-h,w,h);X.fillStyle=roof;X.beginPath();X.moveTo(-w/2-12*U,-h);X.lineTo(0,-h-w*.5);X.lineTo(w/2+12*U,-h);X.fill();nosh();
  X.fillStyle='rgba(6,18,31,.75)';X.fillRect(-w*.12,-h*.45,w*.24,h*.45);X.fillStyle=K.ambar;X.fillRect(-w*.36,-h*.8,w*.16,h*.18);X.fillRect(w*.2,-h*.8,w*.16,h*.18);X.restore()}
SCENE(7,{dur:25,events:[['whoosh',.1],['golpe',1.25],['pop',1.9],['swipe',2.4],['golpe',2.5],['whoosh_largo',3.9],['golpe',4.45],['pop',5],['swipe',6.2],['golpe',6.25],['whoosh_largo',7.6],['golpe',8.2],['swipe',9.95],['golpe',10],['whoosh_largo',11.4],['pop',12.3],['pop',12.6],['golpe',13],['pop',14.4],['whoosh_largo',15.75],['golpe',16.4],['swipe',18],['golpe',18.1],['pop',18.6],['pop',19],['riser',19.6],['golpe',20.7],['campana',21.4],['whoosh',22.3]],
  musica:{estilo:'orquesta',bpm:96,tono:'F',hits:[1.25,2.5,4.4,6.25,8.1,10,11.9,13,16.25,18.1,20.7],final:20.7},
  async draw(t){await RDY;
    // ---- 1: paisaje de papel
    if(t<T[0]){const g=X.createLinearGradient(0,0,0,H);g.addColorStop(0,'#FBEFD8');g.addColorStop(1,'#F6D9A8');X.fillStyle=g;X.fillRect(0,0,W,H);
      blob(W*.84,H*.62-ex(P(t,0,1.6))*H*.12,150*U,1,K.ambar,{a:.25});cloud(W*.12+t*14*U,H*.5,60*U,1);cloud(W*.62-t*10*U,H*.5,46*U,2);
      const cols=[K.hielo,K.cian,K.azul,K.marino,K.noche];
      cols.forEach((c,i)=>hill(H*(.66+i*.075)+(1-bk(P(t,.05+i*.11,.8),1.3))*H*.7,(70-i*6)*U,i*1.7+1,c,t*(16+i*26)*U));
      X.save();X.globalAlpha=ex(P(t,.7,.5));it('Nuestra',CX,H*.16+(1-ex(P(t,.7,.6)))*30*U,124*U,{c:INK,w:900});X.restore();
      const out=ex(P(t,2.3,.3));X.save();X.translate(0,-out*H*.4);X.globalAlpha=1-out;paperSlam('TIERRA',CX,H*.36,fit('TIERRA',W*.72,290*U),1.25,t,{c:INK,ls:6*U});X.restore();
      if(t>2.4)paperSlam('GENTE',CX,H*.36,fit('GENTE',W*.72,290*U),2.5,t,{c:K.rojo,ls:6*U})}
    // ---- 2: anillos de papel
    else if(t<T[1]){const lt=t-T[0];X.fillStyle=CREAM;X.fillRect(0,0,W,H);const cols=['#FDE3A7',K.ambar,K.naranja,K.brasa,K.rojo,K.azul,K.marino];
      const sw=t>=6.25?bk(P(t,6.25,.6),2.2):0;
      cols.forEach((c,i)=>{const r=(980-i*125)*U*bk(P(t,4.45+i*.07,.7),1.4)*(1+.06*Math.sin(sw*Math.PI)*(i%2?1:-1));if(r>0)blob(CX,CY,r,i*2+(t*.2*(i%2?1:-1)),c,{a:.38,oy:6})});
      const two=t>=6.25;const t0=two?6.25:4.7;
      X.save();if(!two){X.globalAlpha=1-ss(P(t,6.05,.2))}
      it(two?'Aquí':'Tu',CX,CY-150*U,120*U,{c:K.ambar,w:900,a:ex(P(t,t0,.4))});
      const wd=two?'ESTAMOS':'CANAL';paperSlam(wd,CX,CY+50*U,fit(wd,W*.62,230*U),t0+.15,t,{c:PAPER,ls:4*U});X.restore()}
    // ---- 3: tiras diagonales
    else if(t<T[2]){X.fillStyle=K.hielo;X.fillRect(0,0,W,H);X.save();X.translate(CX,CY);X.rotate(-.17);
      const cols=[K.cian,PAPER,K.marino,K.ambar,K.brasa],hs_=[230,230,330,200,230];let y=-640*U;const sl=t>=10?eio(P(t,10,.7)):0;
      cols.forEach((c,i)=>{const h=hs_[i]*U;const dir=i%2?1:-1;const xo=dir*(1-bk(P(t,8.2+i*.08,.75),1.2))*W*1.4+dir*sl*120*U+dir*(t-8)*14*U;
        X.save();sh(30,-10,.35);X.fillStyle=c;X.fillRect(-W*1.2+xo,y,W*2.4,h);X.restore();
        if(i===1){const two=t>=10;it(two?'Crecemos':'Cada día',xo*.2-80*U,y+h/2,150*U,{c:INK,w:900,a:1-ss(P(t,9.8,.2))+ex(P(t,10.1,.3))*(two?1:0)})}
        if(i===2){X.save();X.beginPath();X.rect(-W,y,W*2,h);X.clip();const two=t>=10;const wd=two?'CONTIGO':'NOTICIAS';X.save();X.globalAlpha=two?1:1-ss(P(t,9.8,.2));
          paperSlam(wd,xo*.15+40*U,y+h/2+6*U,fit(wd,W*.8,250*U),two?10.05:8.55,t,{c:two?K.ambar:PAPER,ls:6*U,sa:.5});X.restore();X.restore()}
        y+=h});X.restore()}
    // ---- 4: pueblo que se despliega
    else if(t<T[3]){const g=X.createLinearGradient(0,0,0,H);g.addColorStop(0,'#DDF3FF');g.addColorStop(1,'#FFF3DC');X.fillStyle=g;X.fillRect(0,0,W,H);
      blob(W*.1,H*.5,100*U,3,K.ambar,{a:.25});cloud(W*.66-(t-12)*12*U,H*.42,40*U,3);
      hill(H*.66,90*U,3.2,K.azul,(t-12)*20*U);hill(H*.73,60*U,5.1,K.marino,(t-12)*34*U);
      // torre con ondas
      const tx=W*.84,tb=H*.70,tk=bk(P(t,12.6,.6));X.save();X.translate(tx,tb);X.scale(1,tk);sh(18,-6,.3);X.fillStyle=K.rojo;X.beginPath();X.moveTo(-40*U,0);X.lineTo(0,-230*U);X.lineTo(40*U,0);X.fill();X.fillStyle=PAPER;X.beginPath();X.arc(0,-230*U,16*U,0,7);X.fill();X.restore();
      if(t>13)for(let i=0;i<3;i++){const q=((t-13)*.7+i/3)%1;X.save();sh(10,4,.25);X.strokeStyle=`rgba(8,225,255,${1-q})`;X.lineWidth=12*U;X.lineCap='round';X.beginPath();X.arc(tx,tb-230*U,34*U+q*120*U,-2.4,-.74);X.stroke();X.restore()}
      const HS=[[.06,150,170,PAPER,K.rojo],[.15,120,220,K.ambar,K.marino],[.25,170,150,K.cian,K.brasa],[.36,130,240,PAPER,K.azul],[.46,160,180,K.naranja,K.marino],[.56,130,140,K.brasa,'#7A1E2B'],[.66,150,200,PAPER,K.rojo],[.75,120,150,K.azul,K.ambar]];
      HS.forEach(([fx,w,h,c,r],i)=>house(W*fx+(t-12)*-6*U,H*.86,w*U,h*U,c,r,bk(P(t,12.1+i*.07,.5),2),i));
      hill(H*.9,24*U,7.7,K.cian,(t-12)*50*U);
      it('Hecho en',CX,H*.13,96*U,{c:INK,w:900,a:ex(P(t,12.2,.4))});
      paperSlam('SANTA BÁRBARA',CX,H*.3,fit('SANTA BÁRBARA',W*.86,190*U),12.4,t,{c:K.rojo,ls:2*U});
      // cinta de papel
      const rp=bk(P(t,14.3,.6));if(rp>0){X.save();X.translate(CX,H*.47);X.rotate(-.03);X.scale(rp,rp);const tw=mw('SAN JOSÉ DE COLINAS',56*U)+120*U;sh(22,10,.32);X.fillStyle=K.marino;
        X.beginPath();X.moveTo(-tw/2-50*U,-40*U);X.lineTo(tw/2+50*U,-40*U);X.lineTo(tw/2+20*U,0);X.lineTo(tw/2+50*U,40*U);X.lineTo(-tw/2-50*U,40*U);X.lineTo(-tw/2-20*U,0);X.fill();nosh();
        txt('SAN JOSÉ DE COLINAS',0,2*U,56*U,{c:PAPER,ls:3*U});X.restore()}}
    // ---- 5: globos de conversación
    else if(t<T[4]){X.fillStyle=K.ambar;X.fillRect(0,0,W,H);X.save();X.globalAlpha=.55;rays(CX,CY,22,'rgba(0,0,0,0)','rgba(246,144,28,.6)',t*.08);X.restore();
      const two=t>=18.1;const t0=two?18.1:16.4;
      bubble(CX+150*U,CY-40*U,1250*U*bk(P(t,16.35,.6)),600*U*bk(P(t,16.35,.6)),K.brasa,-1);
      bubble(CX+60*U,CY-10*U,1250*U*bk(P(t,16.45,.6)),600*U*bk(P(t,16.45,.6)),K.marino,1);
      const fk=bk(P(t,16.55,.6),2);X.save();X.translate(CX,CY+20*U);X.rotate((1-fk)*.2+(two?.03*Math.sin((t-18.1)*8)*Math.exp(-(t-18.1)*4):0));bubble(0,0,1180*U*fk,560*U*fk,PAPER,1);X.restore();
      if(fk>.5){it(two?'Síguenos en':'Nuestra',CX,CY-140*U,two?100*U:120*U,{c:K.brasa,w:900,a:ex(P(t,t0+.1,.4))});
        const wd=two?'/UNEVISION':'VOZ';paperSlam(wd,CX,CY+70*U,fit(wd,1000*U,two?170*U:280*U),t0+.2,t,{c:INK,ls:4*U,sa:.25})}
      if(two){heart(W*.12,H*.24,150*U*bk(P(t,18.5,.5),2.4),K.rojo);share(W*.9,H*.78,120*U*bk(P(t,18.9,.5),2.4),K.marino);
        const ck=bk(P(t,18.7,.5),2.4);if(ck>0){X.save();X.translate(W*.88,H*.2);X.scale(ck,ck);bubble(0,0,170*U,110*U,K.cian,1);X.fillStyle=PAPER;for(let i=-1;i<=1;i++){X.beginPath();X.arc(i*40*U,0,11*U,0,7);X.fill()}X.restore()}}}
    // ---- 6: cierre con el logo sobre cartas de papel
    else{X.fillStyle=CREAM;X.fillRect(0,0,W,H);
      hill(H*.86,70*U,2,K.hielo,(t-20)*14*U);hill(H*.93,50*U,4,K.cian,(t-20)*26*U);
      const f=i=>bk(P(t,20.2+i*.17,.7),1.5);const cy=CY-70*U;
      cardS(CX-20*U,cy-H*(1-f(0)),860*U,640*U,K.ambar,-.07);cardS(CX+20*U,cy-H*(1-f(1)),860*U,640*U,K.cian,.05);
      const lk=f(2);cardS(CX,cy-H*(1-lk),860*U,640*U,K.marino,(1-lk)*.2);
      if(lk>.9){logo3D(CX,cy-40*U,440*U,0,{depth:12,shine:P(t,22,1.2),a:ex(P(t,20.75,.4))});
                it('/UNEVISION',CX,cy+262*U,58*U,{c:K.ambar,w:900,a:ex(P(t,22.6,.5))})}
      // cinta del eslogan
      const rp=bk(P(t,21.6,.6),1.6);if(rp>0){X.save();X.translate(CX,H*.885);X.scale(rp,1);sh(24,10,.32);X.fillStyle=PAPER;X.fillRect(-720*U,-50*U,1440*U,100*U);X.fillStyle=K.rojo;X.fillRect(-720*U,-50*U,16*U,100*U);X.fillRect(704*U,-50*U,16*U,100*U);nosh();
        txt('EL CANAL QUE CRECE CADA DÍA',0,3*U,54*U,{c:INK,w:800,ls:3*U});X.restore()}}
    // hojas de transición
    sheet(t,T[0],K.ambar,K.naranja,1);sheet(t,T[1],K.marino,K.azul,-1);sheet(t,T[2],K.cian,PAPER,1);sheet(t,T[3],K.brasa,K.ambar,-1);sheet(t,T[4],K.noche,K.cian,1);
    vineta(.22)}
});
})();
