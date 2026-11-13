// 03 · LÍQUIDO ELEGANTE — manchas orgánicas que se funden (metaballs con brillo), Syne fina + gruesa, calma premium
const s03_COL=[[8,225,255],[76,143,226],[253,174,3],[246,144,28],[234,79,61],[227,23,62],[76,143,226],[8,225,255]];
// secciones: [inicio, fin, fina, gruesa, lado(-1 izq / 1 der), ancla x, ancla y]
const s03_S=[[0.8,3.45,'AQUÍ','ESTAMOS',-1,.78,.5],[3.6,6.45,'NUESTRA','GENTE',1,.22,.52],[6.6,9.45,'HECHO EN','SANTA|BÁRBARA',-1,.8,.55],
  [9.6,12.45,'LO QUE','PASA|AQUÍ',1,.2,.45],[12.6,15.45,'CRECEMOS','CONTIGO',-1,.78,.45],[15.6,18.6,'NOTICIAS','DE AQUÍ',1,.21,.55]];
let s03_cv=null,s03_cx=null,s03_F=null;
function s03_anchor(t){let a=[.5,.5],k=0;for(let i=0;i<s03_S.length;i++)if(t>=s03_S[i][0]-.6)k=i;
  const cur=s03_S[k],prv=s03_S[Math.max(0,k-1)];const q=k===0?1:eio(P(t,cur[0]-.6,1.3));
  a=[lerp(prv[5],cur[5],q),lerp(prv[6],cur[6],q)];
  const m=eio(P(t,18.4,1.4));a=[lerp(a[0],.5,m),lerp(a[1],.47,m)];return a}
function s03_blobs(t){const[ax,ay]=s03_anchor(t);const out=[];const born=ex(P(t,0,1.6));
  const conv=eio(P(t,18.4,1.4))*(1-ex(P(t,20.8,1.2)));const ring=ex(P(t,20.8,1.4));
  for(let i=0;i<8;i++){const ph=i*.785+hs(i)*2;
    let x=ax*W+Math.cos(ph+t*(.28+hs(i+1)*.2))*W*(.06+hs(i+2)*.07)*(1-conv*.8)+Math.sin(t*.5+i)*W*.02;
    let y=ay*H+Math.sin(ph*1.3+t*(.24+hs(i+3)*.2))*H*(.16+hs(i+4)*.12)*(1-conv*.8);
    let r=W*(.055+hs(i+5)*.04)*(1+.12*Math.sin(t*.9+i))*born*(1+conv*.35);
    if(ring>0){const a=i/8*Math.PI*2+t*.18;const rx=CX+Math.cos(a)*W*.41,ry=CY-30*U+Math.sin(a)*H*.45;x=lerp(x,rx,ring);y=lerp(y,ry,ring);r*=lerp(1,.62,ring)}
    out.push([x,y,r,s03_COL[i]])}
  return out}
function s03_liquid(t){const rw=Math.round(W/5),rh=Math.round(H/5),sc=rw/W;if(!s03_cv){s03_cv=document.createElement('canvas');s03_cv.width=rw;s03_cv.height=rh;s03_cx=s03_cv.getContext('2d');s03_F=new Float32Array(rw*rh)}
  const bl=s03_blobs(t).map(b=>[b[0]*sc,b[1]*sc,(b[2]*sc)**2,b[3]]);const img=s03_cx.createImageData(rw,rh);const d=img.data;const C=new Float32Array(rw*rh*3);
  for(let y=0;y<rh;y++)for(let x=0;x<rw;x++){let f=0,r=0,g=0,b=0,ws=0;for(const q of bl){const dx=x-q[0],dy=y-q[1];const v=q[2]/(dx*dx+dy*dy+1);f+=v;const w=v*v*v;r+=w*q[3][0];g+=w*q[3][1];b+=w*q[3][2];ws+=w}
    const o=y*rw+x;s03_F[o]=f;C[o*3]=r/ws;C[o*3+1]=g/ws;C[o*3+2]=b/ws}
  for(let y=1;y<rh-1;y++)for(let x=1;x<rw-1;x++){const o=y*rw+x,f=s03_F[o];const a=ss((f-.82)/.36);if(a<=0)continue;
    const gx=s03_F[o+1]-s03_F[o-1],gy=s03_F[o+rw]-s03_F[o-rw];const gl=Math.hypot(gx,gy)+1e-6;const lit=(-gx*.6-gy*.8)/gl;const edge=cl(1.6/f);
    const spec=Math.pow(cl(lit),6)*edge*230,shade=1-cl(-lit)*.35*edge,core=cl((f-1.2)/3)*.25;
    d[o*4]=cl(C[o*3]*shade+spec+core*255,0,255);d[o*4+1]=cl(C[o*3+1]*shade+spec+core*255,0,255);d[o*4+2]=cl(C[o*3+2]*shade+spec+core*255,0,255);d[o*4+3]=a*255}
  s03_cx.putImageData(img,0,0);X.save();X.imageSmoothingQuality='high';X.filter=`blur(${3*U}px)`;X.drawImage(s03_cv,0,0,W,H);X.filter='none';X.restore()}
// texto fino + grueso, entrada con desenfoque a nitidez
function s03_txt(sec,t){const[t0,t1,thin,thick,side]=sec;if(t<t0-.05||t>t1+.05)return;const al=side<0?'left':'right';const x=side<0?W*.07:W*.93;
  const out=ss(P(t,t1-.55,.55));const lines=thick.split('|');const thz=Math.min(...lines.map(l=>fit(l,W*.64,320*U,{f:'Syne',w:800,ls:-4*U})));
  const ty=CY-(lines.length>1?250:170)*U,by=ty+95*U+thz*.5;
  X.save();X.globalAlpha=1-out;if(out>0)X.filter=`blur(${out*14*U}px)`;
  const ls=lerp(26,14,ex(P(t,t0,1.2)))*U+out*30*U;const chars=[...thin];const tw=mw(thin,74*U,{f:'Syne',w:400,ls});let cx=al==='left'?x:x-tw;
  chars.forEach((ch,i)=>{const p=ex(P(t,t0+i*.04,.8));const w=mw(ch,74*U,{f:'Syne',w:400,ls});txt(ch,cx,ty+(1-p)*30*U,74*U,{f:'Syne',w:400,ls,al:'left',c:'#CFE9FF',a:p});cx+=w});
  const lp=ex(P(t,t0+.25,1));X.fillStyle='rgba(255,255,255,.7)';const lw=140*U*lp;X.fillRect(al==='left'?x:x-lw,ty+56*U,lw,2*U);
  lines.forEach((ln,j)=>{const p=P(t,t0+.35+j*.18,1.1);const e=ex(p);if(p<=0)return;X.save();if(e<1)X.filter=`blur(${(1-e)*18*U+out*14*U}px)`;const sc=1.12-.12*e;X.translate(x,by+j*thz*.98);X.scale(sc,sc);
    txt(ln,0,0,thz,{f:'Syne',w:800,al,a:cl(p*2.5),grad:['#ffffff','#e6f4ff'],ls:-4*U,glow:'rgba(4,11,21,.75)',gb:34*U});X.restore()});
  X.restore()}
SCENE(3,{dur:25,
  draw(t){const g=X.createLinearGradient(0,0,W,H);g.addColorStop(0,'#040b15');g.addColorStop(.6,'#081a2c');g.addColorStop(1,'#0b2238');X.fillStyle=g;X.fillRect(0,0,W,H);
    // halos suaves de fondo
    for(let i=0;i<3;i++){const x=CX+Math.cos(t*.12+i*2.1)*W*.35,y=CY+Math.sin(t*.1+i*1.7)*H*.3;const rg=X.createRadialGradient(x,y,0,x,y,W*.35);rg.addColorStop(0,`rgba(${s03_COL[i*2].join(',')},.10)`);rg.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=rg;X.fillRect(0,0,W,H)}
    s03_liquid(t);
    // ondas elegantes en cada entrada
    s03_S.forEach(s=>{const p=P(t,s[0]+.35,1.6);if(p>0&&p<1){X.save();X.strokeStyle=`rgba(255,255,255,${.35*(1-p)})`;X.lineWidth=1.5*U;X.beginPath();X.arc(s[5]*W,s[6]*H,60*U+520*U*ex(p),0,7);X.stroke();X.restore()}});
    // velo de lectura del lado del texto
    const sd=s03_S.find(s=>t>=s[0]-.3&&t<=s[1]+.3);if(sd){const a=win(t,sd[0]-.3,sd[1]+.3,.6,.6);const lg=X.createLinearGradient(sd[4]<0?0:W,0,sd[4]<0?W*.6:W*.4,0);lg.addColorStop(0,`rgba(4,11,21,${.55*a})`);lg.addColorStop(1,'rgba(4,11,21,0)');X.fillStyle=lg;X.fillRect(0,0,W,H)}
    s03_S.forEach(s=>s03_txt(s,t));
    // cierre: el líquido se funde en el centro y se abre en anillo; el logo emerge
    if(t>=20.5){const p=P(t,20.8,1.4),e=ex(p);const ly=CY-70*U;
      const rg=X.createRadialGradient(CX,ly,0,CX,ly,420*U);rg.addColorStop(0,`rgba(4,11,21,${.85*e})`);rg.addColorStop(1,'rgba(4,11,21,0)');X.fillStyle=rg;X.fillRect(0,0,W,H);
      X.save();if(e<1)X.filter=`blur(${(1-e)*24*U}px)`;logo(CX,ly,lerp(380,470,e)*U,{a:cl(p*2),glow:'rgba(255,255,255,.25)',gb:40*U});X.restore();
      const ap=ex(P(t,22.0,1.2));const y1=CY+235*U;
      const a1='EL CANAL QUE ',a2='CRECE CADA DÍA';const s1=52*U;const w1=mw(a1,s1,{f:'Syne',w:400,ls:6*U}),w2=mw(a2,s1,{f:'Syne',w:800,ls:2*U});const x0=CX-(w1+w2)/2;
      X.save();if(ap<1)X.filter=`blur(${(1-ap)*10*U}px)`;txt(a1,x0,y1,s1,{f:'Syne',w:400,ls:6*U,al:'left',c:'#CFE9FF',a:ap});txt(a2,x0+w1,y1,s1,{f:'Syne',w:800,ls:2*U,al:'left',c:'#fff',a:ap});X.restore();
      const rp=ex(P(t,22.8,1));txt(DATOS.redes,CX,CY+318*U,40*U,{f:'Syne',w:700,ls:lerp(30,12,rp)*U,c:K.ambar,a:rp});
      const lp=ss(P(t,22.4,1.2));X.fillStyle='rgba(255,255,255,.55)';X.fillRect(CX-200*U*lp,CY+278*U,400*U*lp,1.5*U);}
    vineta(.45);
  },
  events:[['whoosh_largo',.3],['pop',1.15],['swipe',3.4],['pop',3.95],['swipe',6.4],['pop',6.95],['swipe',9.4],['pop',9.95],['swipe',12.4],['pop',12.95],['swipe',15.4],['pop',15.95],['whoosh_largo',18.4],['riser',19.8],['golpe',20.8],['whoosh',22.0],['pop',22.8],['campana',23.3]],
  musica:{estilo:'ambient',bpm:90,tono:'Eb',hits:[1.15,3.95,6.95,9.95,12.95,15.95,20.8],final:20.8}
});
