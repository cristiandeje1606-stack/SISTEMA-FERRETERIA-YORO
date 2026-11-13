// 02 · TÚNEL DE LUZ / HIPERESPACIO — estelas a toda velocidad, palabras que cruzan el túnel, salida al logo
const s02_W=[['TU CANAL'],['NOTICIAS'],['NUESTRA GENTE'],['INFORMACIÓN'],['NUESTRA VOZ'],['SANTA BÁRBARA','HONDURAS'],['CADA DÍA'],['CONTIGO']];
const s02_T0=k=>1.6+k*2.3;
const s02_EXIT=20.6;
function s02_D(t){const te=t<s02_EXIT?t:s02_EXIT+(1-Math.exp(-(t-s02_EXIT)*2.2))/2.2;
  let d=260*t+2900*Math.max(0,te-1.2)+1400*ss(P(t,.9,.6));
  for(let k=0;k<8;k++)d+=1500*ss(P(t,s02_T0(k)+1.85,.5));d+=4200*ss(P(t,19.9,.75));return d}
function s02_col(t){const m=ss(P(t,12.9,.6));const A=[[8,225,255],[76,143,226],[255,255,255]],B=[[253,174,3],[234,79,61],[255,236,200]];
  return A.map((a,i)=>a.map((v,j)=>Math.round(lerp(v,B[i][j],m))))}
function s02_vp(t){return[CX+Math.sin(t*.55)*70*U*(1-P(t,20,.8)),CY+Math.cos(t*.43)*40*U*(1-P(t,20,.8))]}
function s02_word(s,sub,t0,t,col){const ta=t0+.5,th=t0+1.85,te=t0+2.3;if(t<t0||t>te)return;
  let z;if(t<ta)z=lerp(7000,260,ex(P(t,t0,.5)));else if(t<th)z=lerp(260,-130,(t-ta)/(th-ta));else z=-130-700*Math.pow(P(t,th,.45),2.2);
  const f=900;const sc=f/(f+z);const[vx,vy]=s02_vp(t);const o={w:900,it:true,ls:2*U,st:'semi-expanded'};const base=fit(s,W*.74,270*U,o);const a=cl(P(t,t0,.18))*(1-P(t,te-.2,.2));
  X.save();X.translate(vx,vy);X.transform(1,0,-.12,1,0,0);
  // estela de velocidad (copias atrás)
  X.globalCompositeOperation='lighter';
  for(let k=6;k>=1;k--){const zk=z+k*(t<ta?900:t<th?60:220);const sk=f/(f+zk);X.globalAlpha=a*.13*(1-k/7);txt(s,0,0,base*sk,{...o,c:`rgb(${col[0]})`})}
  // aberración cromática
  const ab=(t<ta?(1-P(t,t0,.5))*30:t>th?P(t,th,.45)*40:3)*U+2*U;
  X.globalAlpha=a*.85;txt(s,-ab,0,base*sc,{...o,c:'#ff2a55'});txt(s,ab,0,base*sc,{...o,c:'#08e1ff'});
  X.globalCompositeOperation='source-over';X.globalAlpha=a;
  txt(s,0,0,base*sc,{...o,grad:['#ffffff',`rgb(${col[2]})`],glow:`rgba(${col[0]},.7)`,gb:30*U});
  if(sub){const sa=a*ex(P(t,ta+.15,.4));txt(sub,0,base*sc*.85,base*sc*.36,{w:800,ls:base*sc*.1,c:`rgb(${col[0]})`,a:sa})}
  X.restore()}
SCENE(2,{dur:25,
  draw(t){const D=s02_D(t),v=(D-s02_D(t-1/30))*30;const col=s02_col(t);const[vx,vy]=s02_vp(t);const f=900*U;
    X.fillStyle='#02060d';X.fillRect(0,0,W,H);
    const roll=Math.sin(t*.38)*.12+eio(P(t,12.6,1.1))*Math.PI*2+ss(P(t,19.8,1))*.25;
    // resplandor del punto de fuga
    const cg=X.createRadialGradient(vx,vy,0,vx,vy,W*.5);const ia=cl(.25+v/9000);cg.addColorStop(0,`rgba(${col[2]},${ia})`);cg.addColorStop(.12,`rgba(${col[0]},${ia*.45})`);cg.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=cg;X.fillRect(0,0,W,H);
    X.save();X.translate(vx,vy);X.rotate(roll);X.globalCompositeOperation='lighter';
    // anillos del túnel
    const RL=9000,RS=900;for(let k=0;k<10;k++){const z=((k*RS-D*.9)%RL+RL)%RL;if(z<40)continue;const s=f/(f+z*U);const fa=cl(z/400)*cl(1-z/RL)*cl(.4+v/5000)*P(t,.9,.6);if(fa<=0)continue;
      const c=k%2?col[0]:col[1];const rw=1900*U*s,rh=1080*U*s;X.lineJoin='round';
      X.strokeStyle=`rgba(${c},${.18*fa})`;X.lineWidth=26*U*s;X.beginPath();X.roundRect(-rw/2,-rh/2,rw,rh,120*U*s);X.stroke();
      X.strokeStyle=`rgba(${c},${.8*fa})`;X.lineWidth=5*U*s;X.beginPath();X.roundRect(-rw/2,-rh/2,rw,rh,120*U*s);X.stroke()}
    // estelas de luz
    const SL=7000,str=Math.min(2600,60+v*.16);
    for(let i=0;i<380;i++){const a=hs(i)*Math.PI*2,r=(220+hs(i+1)*1500)*U;const z=((hs(i+2)*SL-D)%SL+SL)%SL+30;
      const z2=z+str*(.6+hs(i+3)*.8);const s1=f/(f+z*U),s2=f/(f+z2*U);const ca=Math.cos(a)*r,sa=Math.sin(a)*r*.62;
      const al=cl(1-z/SL)*cl(.3+v/3500)*(t<.9?.3+P(t,0,.9)*.4:1);const c=i%7===0?col[2]:i%3?col[0]:col[1];
      const g=X.createLinearGradient(ca*s2,sa*s2,ca*s1,sa*s1);g.addColorStop(0,`rgba(${c},0)`);g.addColorStop(1,`rgba(${c},${al})`);
      X.strokeStyle=g;X.lineWidth=(1.2+hs(i+4)*2.6)*U*s1*1.4;X.beginPath();X.moveTo(ca*s2,sa*s2);X.lineTo(ca*s1,sa*s1);X.stroke()}
    X.restore();
    // golpes de luz al llegar cada palabra
    s02_W.forEach((w,k)=>{const g=s02_T0(k)+.5;const p=P(t,g,.5);if(p>0&&p<1){X.save();X.globalCompositeOperation='lighter';X.strokeStyle=`rgba(${col[0]},${(1-p)*.8})`;X.lineWidth=10*U*(1-p);X.beginPath();X.ellipse(vx,vy,W*.1+W*.6*ex(p),H*.08+H*.55*ex(p),0,0,7);X.stroke();X.restore()}});
    // palabras
    s02_W.forEach((w,k)=>s02_word(w[0],w[1],s02_T0(k),t,col));
    // salida del túnel: destello y logo
    flash(t,1.2,.55,.35);flash(t,13.0,.35,.3,'253,174,3');
    if(t>=19.9&&t<20.6){X.fillStyle=`rgba(255,255,255,${ss(P(t,20.1,.5))})`;X.fillRect(0,0,W,H)}
    if(t>=20.6){const p=P(t,20.6,.9);
      X.save();X.globalAlpha=1-ex(P(t,20.6,.5));X.fillStyle='#fff';X.fillRect(0,0,W,H);X.restore();
      const z=lerp(3500,0,ex(p));const s=900/(900+z);const ly=CY-70*U;
      const rg=X.createRadialGradient(CX,ly,0,CX,ly,700*U);rg.addColorStop(0,`rgba(8,225,255,${.3*ex(p)})`);rg.addColorStop(.6,'rgba(234,79,61,.06)');rg.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=rg;X.fillRect(0,0,W,H);
      for(let k=4;k>=1&&p<1;k--){logo(CX,ly,520*U*900/(900+z+k*500),{a:.18*(1-p)})}
      logo(CX,ly,520*U*s,{glow:'rgba(8,225,255,.55)',gb:50*U});
      if(t>21.8){const sp=P(t,21.9,.9);if(sp<1){X.save();X.globalCompositeOperation='lighter';flare(CX-300*U+600*U*ss(sp),ly,.5*Math.sin(sp*Math.PI));X.restore()}}
      const lp=ex(P(t,22.0,.9));const es=DATOS.eslogan;const sz=fit(es,W*.66,52*U,{w:800});
      txt(es,CX,CY+270*U,sz,{w:800,ls:lerp(40,3,lp)*U,a:lp,c:'#fff'});
      const rp=ex(P(t,22.7,.6));txt(DATOS.redes,CX,CY+350*U,48*U,{w:800,ls:8*U,a:rp,c:K.cian,glow:'rgba(8,225,255,.6)'});
      if(rp>0){X.save();X.globalAlpha=rp;const gl=X.createLinearGradient(CX-300*U,0,CX+300*U,0);gl.addColorStop(0,'rgba(8,225,255,0)');gl.addColorStop(.5,K.ambar);gl.addColorStop(1,'rgba(234,79,61,0)');X.fillStyle=gl;X.fillRect(CX-300*U,CY+311*U,600*U,3*U);X.restore()}
    }
    vineta(.5);
  },
  events:[['riser',.2],['golpe',1.2],['whoosh_largo',1.25],
    ...s02_W.flatMap((w,k)=>[['whoosh',s02_T0(k)],['golpe',s02_T0(k)+.5]]),
    ['riser',19.6],['whoosh_largo',19.9],['golpe',20.6],['swipe',22.0],['pop',22.7],['campana',23.1]],
  musica:{estilo:'edm',bpm:128,tono:'Fm',hits:[1.2,...s02_W.map((w,k)=>+(s02_T0(k)+.5).toFixed(2)),20.6],final:20.6}
});
