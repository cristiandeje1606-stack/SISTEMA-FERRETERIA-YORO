// escena 10 · PARTÍCULAS (trailer, 116, Bm) — miles de partículas que vuelan y forman las palabras y luego el logo
(()=>{
const N=6500;
const A=[1.55,5.7,9.8,13.95,18.1,22.2];          // llegada de cada forma (golpe)
const S=A.map(a=>a-1.25);                         // salida de la forma anterior
const WORDS=[['NOTICIAS',['8,225,255','76,143,226','220,250,255'],'LO QUE PASA AQUÍ',1],['NUESTRA GENTE',['253,174,3','246,144,28','255,236,190'],'TU CANAL',1],
  ['SANTA BÁRBARA',['8,225,255','255,255,255','253,174,3'],'HONDURAS',1],['CADA DÍA',['234,79,61','253,174,3','255,220,150'],'AQUÍ ESTAMOS',1],['CONTIGO',['255,255,255','8,225,255','76,143,226'],'CRECEMOS',-1]];
let PT=null;
function sample(drawFn,colFn){const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d',{willReadFrequently:true});drawFn(x);const d=x.getImageData(0,0,W,H).data;const pts=[];const st=Math.max(2,Math.round(3*U));
  for(let y=0;y<H;y+=st)for(let xx=0;xx<W;xx+=st){const i=(y*W+xx)*4;if(d[i+3]>140)pts.push([xx,y,colFn(xx,y,d[i],d[i+1],d[i+2])])}
  const out=[];const n=pts.length;for(let k=0;k<N;k++){const j=n>=N?Math.floor(k*n/N):k%n;const p=pts[(j*7919)%n];out.push([p[0]+(k>=n?(hs(k)-.5)*st:0),p[1]+(k>=n?(hs(k+1)-.5)*st:0),p[2]])}return out}
function rgb(s){return s.split(',').map(Number)}
function prep(){const sets=[];
  // estado 0: nube dispersa
  sets.push(Array.from({length:N},(_,i)=>[ (hs(i*3)*1.6-.3)*W,(hs(i*3+1)*1.6-.3)*H,[200,230,255]]));
  WORDS.forEach(([w,cols])=>{const o={f:'BigSh',w:900,st:'normal',ls:6*U};const sz=fit(w,W*.88,360*U,o);
    sets.push(sample(x=>{x.font=font(sz,o);x.letterSpacing=(6*U)+'px';x.textAlign='center';x.textBaseline='middle';x.fillStyle='#fff';x.fillText(w,CX,CY-30*U)},
      (xx)=>{const f=cl((xx-W*.08)/(W*.84))*(cols.length-1);const i=Math.min(cols.length-2,Math.floor(f));const a=rgb(cols[i]),b=rgb(cols[i+1]),k=f-i;return[lerp(a[0],b[0],k),lerp(a[1],b[1],k),lerp(a[2],b[2],k)]}))});
  const lw=560*U,lh=lw*LR();sets.push(sample(x=>x.drawImage(LOGO,CX-lw/2,CY-90*U-lh/2,lw,lh),(xx,yy,r,g,b)=>[r,g,b]));
  PT={sets,word:WORDS.map(([w])=>{const o={f:'BigSh',w:900,st:'normal',ls:6*U};return fit(w,W*.88,360*U,o)})}}
function stateAt(t){let k=0;for(let i=0;i<S.length;i++)if(t>=S[i])k=i+1;return k} // k = forma de destino actual
SCENE(10,{dur:25,events:[['whoosh_largo',.25],['riser',.55],['golpe',A[0]],['whoosh_largo',S[1]],['riser',A[1]-1],['golpe',A[1]],['whoosh_largo',S[2]],['riser',A[2]-1],['golpe',A[2]],['obturador',A[2]+1.5],['whoosh_largo',S[3]],['riser',A[3]-1],['golpe',A[3]],['whoosh_largo',S[4]],['riser',A[4]-1],['golpe',A[4]],['whoosh_largo',S[5]],['riser',A[5]-1],['golpe',A[5]],['campana',A[5]+.6],['whoosh',A[5]+1.2]],
  musica:{estilo:'trailer',bpm:116,tono:'Bm',hits:A,final:A[5]},
  draw(t){if(!PT)prep();
    // fondo de tráiler: negro azulado con haces de luz
    bg('#010409','#06101C');X.save();X.globalCompositeOperation='lighter';for(let i=0;i<5;i++){const x=W*(.15+.18*i)+Math.sin(t*.25+i)*80*U;const g=X.createLinearGradient(x,0,x+200*U,H);g.addColorStop(0,`rgba(76,143,226,${.07+.03*Math.sin(t+i)})`);g.addColorStop(1,'rgba(0,0,0,0)');
      X.fillStyle=g;X.beginPath();X.moveTo(x-30*U,-10);X.lineTo(x+30*U,-10);X.lineTo(x+260*U,H);X.lineTo(x+60*U,H);X.fill()}X.restore();particulas(t,.5,40,['120,200,255','253,174,3']);
    let sx=0,sy=0;A.forEach(h=>{const[a,b]=shake(t,h,16);sx+=a;sy+=b});X.save();X.translate(sx,sy);
    const k=stateAt(t);const from=PT.sets[Math.max(0,k-1)],to=PT.sets[k];const t0=k>0?S[k-1]:0;
    // resplandor tenue de la palabra formada (legibilidad)
    const hold=k>0?ex(P(t,A[k-1]-.1,.4)):0;
    if(k>=1&&k<=5&&hold>0){const fade=k<5?1-ss(P(t,S[k],.3)):1-ss(P(t,S[5],.3));X.save();X.globalAlpha=.26*hold*fade;txt(WORDS[k-1][0],CX,CY-30*U,PT.word[k-1],{f:'BigSh',w:900,st:'normal',ls:6*U,c:`rgb(${WORDS[k-1][1][0]})`,glow:`rgb(${WORDS[k-1][1][0]})`,gb:50*U});X.restore()}
    // barrido de luz por la forma
    const swT=k>0?A[k-1]+.6:-9;const swX=lerp(-W*.1,W*1.1,P(t,swT,1.1));
    const cx0=CX,cy0=CY;X.save();
    for(let i=0;i<N;i++){const a=from[i],b=to[i];let x,y,sz=2.8*U,br=1;
      if(k===0){x=a[0]+Math.sin(t*.7+i)*30*U;y=a[1]+Math.cos(t*.6+i*1.3)*30*U}
      else{const dl=hs(i*1.7)*.35,p=P(t,t0+dl,.9),q=eio(p);
        const ax=k===1?a[0]+Math.sin(t0*.7+i)*30*U:a[0],ay=k===1?a[1]+Math.cos(t0*.6+i*1.3)*30*U:a[1];
        // punto medio: explosión en remolino
        const mx=(ax+b[0])/2,my=(ay+b[1])/2;const ang=(hs(i)-.5)*2.4+(k%2?1:-1);const dx=mx-cx0,dy=my-cy0;const rr=1.25+hs(i+9)*.6;
        const Mx=cx0+(dx*Math.cos(ang)-dy*Math.sin(ang))*rr+(hs(i+3)-.5)*500*U,My=cy0+(dx*Math.sin(ang)+dy*Math.cos(ang))*rr+(hs(i+4)-.5)*400*U;
        x=(1-q)*(1-q)*ax+2*(1-q)*q*Mx+q*q*b[0];y=(1-q)*(1-q)*ay+2*(1-q)*q*My+q*q*b[1];
        const mid=Math.sin(Math.PI*q);sz*=1+mid*(1+hs(i+5)*3);br=1+mid*.6;
        if(p>=1){x+=Math.sin(t*3+i)*1.2*U;y+=Math.cos(t*2.6+i)*1.2*U;if(Math.abs(x-swX)<90*U)br=1+1.5*(1-Math.abs(x-swX)/(90*U))}}
      const ca=a[2],cb=to[i][2];const q2=k===0?0:eio(P(t,t0+hs(i*1.7)*.35,.9));const r=lerp(ca[0],cb[0],q2)*br,g=lerp(ca[1],cb[1],q2)*br,bb=lerp(ca[2],cb[2],q2)*br;
      X.fillStyle=`rgb(${r|0},${g|0},${bb|0})`;X.fillRect(x-sz/2,y-sz/2,sz,sz)}
    X.restore();
    // brillo (bloom) del cuadro
    X.save();X.globalCompositeOperation='lighter';X.globalAlpha=.55;X.filter=`blur(${Math.round(9*U)}px)`;X.drawImage(cv,-sx,-sy);X.restore();X.filter='none';
    // subtítulos
    if(k>=1&&k<=5){const[w,cols,sub,pos]=WORDS[k-1];const fade=1-ss(P(t,S[k]-.2,.3));X.save();X.globalAlpha=fade;
      const y=pos>0?CY+190*U:CY-300*U;const p=ex(P(t,A[k-1]+.25,.6));X.fillStyle=`rgba(${cols[0]},.9)`;X.fillRect(CX-300*U*p,y-62*U,600*U*p,3*U);
      rise(sub,CX,y,58*U,A[k-1]+.3,t,{f:'BigSh',w:700,st:'normal',ls:22*U,c:'#fff'});X.restore()}
    // cierre: logo nítido sobre las partículas + eslogan
    if(t>A[5]){const lk=ex(P(t,A[5]+.5,.9));logo3D(CX,CY-90*U,560*U,0,{depth:10,a:lk,glow:'rgba(8,225,255,.5)',shine:P(t,A[5]+1.3,1.1)});
      rise('EL CANAL QUE CRECE CADA DÍA',CX,CY+255*U,72*U,A[5]+.7,t,{f:'BigSh',w:800,st:'normal',ls:14*U});
      rise('/UNEVISION',CX,CY+345*U,50*U,A[5]+1.1,t,{f:'BigSh',w:900,st:'normal',ls:18*U,c:K.ambar})}
    X.restore();
    A.forEach(h=>{flash(t,h,.55,.3,'200,235,255');flare(CX,CY-30*U,Math.max(0,1-P(t,h,.7))*.9*(t>=h?1:0),'180,230,255')});
    vineta(.7)}
});
})();
