// escena 08 · MURO TIPOGRÁFICO (house, 124, Bbm) — palabras enormes Unbounded en capas y velocidades, pantalla dividida
(()=>{
const B=60/124,BAR=B*4;const C=[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i=>i*BAR); // 0,1.935,3.87,5.81,7.74,9.68,11.61,13.55,15.48,17.42,19.35,21.29,23.23
const F={f:'Unbounded',w:900};
// fila que corre: texto repetido, alterna relleno y contorno
function row(y,s,sz,off,o={}){const sep=o.sep??'  ';const unit=s+sep;const uw=mw(unit,sz,{...F,ls:o.ls||0});let x=((off%uw)+uw)%uw-uw;let i=Math.floor(-off/uw);
  X.save();if(o.a!==undefined)X.globalAlpha*=o.a;while(x<W+uw){const k=((i%2)+2)%2;const sol=o.mode==='solid'||(o.mode==='alt'&&k===0);
    if(sol)txt(unit,x,y,sz,{...F,al:'left',c:o.c||'#fff',ls:o.ls||0,glow:o.glow});else txt(unit,x,y,sz,{...F,al:'left',c:'rgba(0,0,0,0)',stroke:o.sc||'rgba(255,255,255,.35)',sw:(o.sw||2.5)*U,ls:o.ls||0});x+=uw;i++}X.restore()}
function panel(x,y,w,h,col,fn){X.save();X.beginPath();X.rect(x,y,w,h);X.clip();X.fillStyle=col;X.fillRect(x,y,w,h);fn();X.restore()}
SCENE(8,{dur:25,events:[['whoosh_largo',0],['golpe',C[1]],['whoosh',C[2]-.25],['golpe',C[2]],['swipe',C[3]],['golpe',C[3]],['whoosh',C[4]-.2],['golpe',C[4]],['pop',C[4]+B*2],['golpe',C[5]],['whoosh',C[6]-.2],['golpe',C[6]],['swipe',C[7]],['golpe',C[7]],['golpe',C[8]],['riser',C[9]-1],['golpe',C[9]],['swipe',C[10]],['golpe',C[10]],['riser',C[11]-1],['golpe',C[11]],['campana',C[11]+.5],['whoosh',C[12]]],
  musica:{estilo:'house',bpm:124,tono:'Bbm',hits:C.slice(1,12),final:C[11]},
  draw(t){const beat=t/B,bp=beat%1,pulse=Math.exp(-bp*5);
    let sx=0,sy=0;C.slice(1).forEach(h=>{const[a,b]=shake(t,h,10);sx+=a;sy+=b});X.save();X.translate(sx,sy);
    // ---- A: muro de filas (0–3.87)
    if(t<C[2]){bg('#050D18',K.noche);const ent=ex(P(t,0,1.2));const hi=t>=C[1];
      const R=[['NOTICIAS',120,-260,'alt'],['TU CANAL',170,340,'line'],['INFORMACIÓN',110,-420,'alt'],['UNE VISIÓN',230,180,hi?'solid':'line'],['NUESTRA GENTE',120,-300,'alt'],['CADA DÍA',170,380,'line'],['AQUÍ ESTAMOS',110,-220,'alt']];
      let y=H*.04;R.forEach(([s,sz,v,m],i)=>{sz*=U;y+=sz*.62;const off=t*v*U+(1-ent)*(i%2?-1:1)*W*1.5+i*137*U;
        const solid=i===3&&hi;row(y,s,sz,off,{mode:m,c:solid?K.ambar:(i%2?'#fff':K.cian),a:solid?1:(hi?.3:.55),sc:i%3===0?'rgba(8,225,255,.55)':'rgba(255,255,255,.4)',glow:solid?'rgba(253,174,3,.45)':null});y+=sz*.62});
      // palabra delantera enorme cruzando
      if(t>=C[1]){const q=(t-C[1])/(C[2]-C[1]);X.save();X.shadowColor='rgba(0,0,0,.6)';X.shadowBlur=40*U;txt('TU CANAL',lerp(W*1.25,-W*.25,q),296*U,330*U,{...F,c:'#fff'});X.restore()}}
    // ---- B: pantalla dividida vertical (3.87–7.74)
    else if(t<C[4]){const two=t>=C[3];const sp=ex(P(t,C[2],.45));const split=lerp(W*.5,W*.42,two?ex(P(t,C[3],.5)):0);
      panel(0,0,W,H,K.noche,()=>{});
      panel(0,0,split*sp,H,two?K.ambar:K.cian,()=>{for(let i=-1;i<7;i++){const y=((i*200*U-t*260*U)%(1400*U)+1400*U)%(1400*U)-100*U;txt('NUESTRA',split*sp/2,y,150*U,{...F,c:i%2?'rgba(6,18,31,.55)':'rgba(6,18,31,.2)'})}});
      panel(split,0,W-split,H,K.noche,()=>{const wd=two?'TIERRA':'GENTE';for(let i=-1;i<7;i++){const y=((i*200*U+t*260*U)%(1400*U)+1400*U)%(1400*U)-100*U;
        if(i%2)txt(wd,split+(W-split)/2,y,170*U,{...F,c:'rgba(0,0,0,0)',stroke:'rgba(255,255,255,.18)',sw:2.5*U});else txt(wd,split+(W-split)/2,y,170*U,{...F,c:two?'rgba(253,174,3,.4)':'rgba(8,225,255,.4)'})}});
      // franja central de corte
      X.fillStyle='#fff';X.fillRect(split-4*U,0,8*U,H);
      // palabra protagonista centrada sobre banda oscura
      const t0=two?C[3]:C[2];const bb=ex(P(t,t0,.35));X.fillStyle='rgba(6,18,31,.82)';X.fillRect(0,CY-250*U*bb,W,500*U*bb);X.fillStyle=two?K.ambar:K.cian;X.fillRect(0,CY-250*U*bb,W,6*U);X.fillRect(0,CY+250*U*bb-6*U,W,6*U);const wd=two?'TIERRA':'GENTE';X.save();X.shadowColor='rgba(0,0,0,.55)';X.shadowBlur=50*U;
      slam('NUESTRA',CX,CY-130*U,fit('NUESTRA',W*.62,190*U),t0+.05,t,{...F,c:'#fff',stag:.03,from:2});
      slam(wd,CX,CY+110*U,fit(wd,W*.62,240*U),t0+.2,t,{...F,c:two?K.ambar:K.cian,stag:.03,from:2.2});X.restore()}
    // ---- C: muro inclinado con relleno al compás (7.74–11.61)
    else if(t<C[6]){bg(K.marino,'#08182A');X.save();X.translate(CX,CY);X.rotate(-.18);X.translate(-CX,-CY);
      const two=t>=C[5];const wd=two?'CONTIGO':'CADA DÍA';const n=9,b=Math.floor(beat);
      for(let i=0;i<n;i++){const sz=150*U;const y=-H*.25+i*sz*1.18;const on=(b%n)===i||(b+4)%n===i;row(y,wd,sz,t*(i%2?1:-1)*(200+i*30)*U+i*300*U,{mode:on?'solid':'line',c:on?(i%2?K.ambar:K.brasa):'#fff',sc:'rgba(8,225,255,.35)',a:on?.9:.8})}
      X.restore();
      // bloque central
      const t0=two?C[5]:C[4];const bw=ex(P(t,t0,.4));X.save();X.translate(CX,CY);X.rotate(-.18);X.fillStyle=two?K.cian:'#fff';X.fillRect(-W*.7*bw,-150*U,W*1.4*bw,300*U);
      X.beginPath();X.rect(-W,-150*U,W*2,300*U);X.clip();const q=(t-t0)/BAR;txt(wd,lerp(140,-140,q)*U+(1-bw)*W,10*U,fit(wd,W*.85,230*U),{...F,c:K.noche});X.restore()}
    // ---- D: pantalla dividida horizontal (11.61–15.48)
    else if(t<C[8]){const three=t>=C[7];const m=three?ex(P(t,C[7],.5)):0;const hb=lerp(0,H*.3,m);const h1=(H-hb)/2;const q=(t-C[6])/(BAR*2);
      const ent=ex(P(t,C[6],.5));
      panel(0,0,W,h1,K.ambar,()=>{const sz=h1*.62;txt('SANTA BÁRBARA',lerp(W*.95,W*.05,q)+(1-ent)*W,h1*.54,sz,{...F,c:K.noche,al:'center'})});
      panel(0,h1+hb,W,h1,K.marino,()=>{const sz=h1*.62;txt('HONDURAS',lerp(W*.15,W*.85,q)-(1-ent)*W,h1+hb+h1*.52,sz,{...F,c:'#fff'})});
      if(hb>1)panel(0,h1,W,hb,K.rojo,()=>{txt('SAN JOSÉ DE COLINAS',CX+(1-m)*W*.5-(t-C[7])*60*U,h1+hb/2+4*U,fit('SAN JOSÉ DE COLINAS',W*.9,hb*.5),{...F,c:'#fff'})});
      X.fillStyle='#fff';X.fillRect(0,h1-3*U,W*ent,6*U);if(hb>1)X.fillRect(W*(1-ent),h1+hb-3*U,W,6*U)}
    // ---- E: zambullida en la O (15.48–17.42) y SÍGUENOS (17.42–19.35)
    else if(t<C[10]){if(t<C[9]){bg('#050D18',K.noche);const wd='INFORMACIÓN';const sz=fit(wd,W*.9,240*U);
        for(let i=0;i<5;i++)row(CY+(i-2)*sz*1.25,wd,sz*.8,t*(i%2?1:-1)*240*U,{mode:'line',sc:'rgba(8,225,255,.28)'});
        // zoom hacia la letra O (dentro de INFORMACIÓN)
        const z=Math.pow(60,eio(P(t,C[8]+BAR*.45,BAR*.55)));const pre=mw('INFORMACI',sz,F),ow=mw('Ó',sz,F),tw=mw(wd,sz,F);const ox=CX-tw/2+pre+ow/2;
        X.save();X.translate(ox,CY);X.scale(z,z);X.translate(-ox,-CY);X.fillStyle=K.noche;X.globalAlpha=cl((z-1)/3);X.fillRect(0,0,W,H);X.globalAlpha=1;
        slam(wd,CX,CY,sz,C[8]+.05,t,{...F,c:'#fff',stag:.03,from:2.2,glow:'rgba(8,225,255,.35)'});X.restore();
        if(z>20){X.fillStyle=`rgba(8,225,255,${cl((z-20)/40)})`;X.fillRect(0,0,W,H)}}
      else{bg(K.cian,'#58ECFF');for(let i=0;i<6;i++)row(H*.08+i*H*.17,'/UNEVISION',150*U,t*(i%2?1:-1)*300*U,{mode:'line',sc:'rgba(6,18,31,.25)'});
        X.save();X.shadowColor='rgba(6,18,31,.35)';X.shadowBlur=40*U;slam('SÍGUENOS',CX,CY-110*U,fit('SÍGUENOS',W*.8,250*U),C[9]+.02,t,{...F,c:K.noche,stag:.035,from:2.4});
        rise('COMPARTE · DALE ME GUSTA',CX,CY+120*U,64*U,C[9]+BAR*.5,t,{f:'Unbounded',w:700,c:'#fff',ls:4*U});X.restore()}}
    // ---- F: muro /UNEVISION (19.35–21.29)
    else if(t<C[11]){bg(K.noche,'#030A12');const st=ex(P(t,C[10]+BAR*.4,BAR*.5));
      for(let i=0;i<7;i++){const sz=130*U;const y=H*.06+i*sz*1.2;const cen=i===3;row(y,'/UNEVISION',cen?sz*1.15:sz,cen?(t-C[10])*900*U*(1-st)+st*0:t*(i%2?1:-1)*260*U,{mode:cen?'solid':'alt',c:cen?K.ambar:'rgba(255,255,255,.18)',sc:'rgba(8,225,255,.3)',glow:cen?'rgba(253,174,3,.5)':null})}}
    // ---- G: el muro se abre y aparece el logo (21.29–25)
    else{bg('#04101C',K.noche);const op=eio(P(t,C[11],.9));const g=X.createRadialGradient(CX,CY,0,CX,CY,W*.5);g.addColorStop(0,`rgba(8,225,255,${.22*op})`);g.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=g;X.fillRect(0,0,W,H);
      for(let i=0;i<7;i++){const sz=130*U;const y0=H*.06+i*sz*1.2;const dir=i<3?-1:i>3?1:0;const y=y0+dir*op*H*.75;const a=i===3?1-op:1;
        row(y,i===3?'/UNEVISION':'UNE VISIÓN',sz,t*(i%2?1:-1)*(120+200*op)*U,{mode:'alt',c:'rgba(255,255,255,.15)',sc:'rgba(8,225,255,.3)',a})}
      const lk=bk(P(t,C[11]+.25,.7),1.4);if(t<C[11]+1.1)logo(CX,CY-90*U,520*U*lk,{a:cl(lk),glow:'rgba(8,225,255,.45)'});else logo3D(CX,CY-90*U,520*U,0,{depth:10,glow:'rgba(8,225,255,.45)',shine:P(t,C[11]+1.3,1)});
      rise('EL CANAL QUE CRECE CADA DÍA',CX,CY+250*U,60*U,C[11]+1,t,{f:'Unbounded',w:700,ls:3*U});
      rise('/UNEVISION',CX,CY+345*U,48*U,C[11]+1.4,t,{f:'Unbounded',w:900,c:K.ambar,ls:6*U})}
    X.restore();
    // golpe de luz en cada compás + pulso de bombo
    C.slice(1).forEach((h,i)=>flash(t,h,i===10?.85:.45,.28));
    X.fillStyle=`rgba(255,255,255,${.035*pulse*(t<C[11]?1:0)})`;X.fillRect(0,0,W,H);vineta(.5)}
});
})();
