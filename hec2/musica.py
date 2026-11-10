import pretty_midi as pm
m=pm.PrettyMIDI(initial_tempo=120);B=.5;END=153.4
def I(p,d=False):
    i=pm.Instrument(program=p,is_drum=d);m.instruments.append(i);return i
def n(i,p,t,d,v):
    if t<END: i.notes.append(pm.Note(velocity=int(max(1,min(127,v))),pitch=int(p),start=max(0,t),end=min(END,t+d)))
bass,pulse,pad,strg,timp,hit,bells,brass,choir=I(39),I(81),I(89),I(49),I(47),I(55),I(14),I(61),I(52);dr=I(0,True)
PRO=[(38,[50,53,57]),(34,[46,50,53]),(36,[48,52,55]),(33,[45,49,52])]  # Dm Bb C A
SPOT=[(0,8.4),(49.6,53.6),(73.3,77.1)]
insp=lambda t:any(a<=t<b for a,b in SPOT)
HITS=[8.5,15.66,18.65,33.28,53.89,77.29,91.09,112.76,130.31]
bar=0;t=0
while t<143.3:
    r,ch=PRO[bar%4]
    if not insp(t):
        for j in range(16):
            tt=t+j*B/4
            if insp(tt) or tt>=143.3: continue
            n(bass,r,tt,B/4*.75,78 if j%4==0 else 62)
            if j%2==0: n(pulse,ch[(j//2)%3]+12,tt,B/4*.6,40+(10 if j%8==0 else 0))
        for k in range(4):
            tt=t+k*B
            if insp(tt) or tt>=143.3: continue
            n(dr,36,tt,.1,72);n(dr,42,tt+B/2,.05,40)
            if k%2: n(dr,39,tt,.08,50)
    for p in ch: n(pad,p,t,4*B,42 if not insp(t) else 30);n(strg,p+12,t,4*B,34)
    t+=4*B;bar+=1
for T in HITS:
    n(timp,38,T,1.2,112);n(hit,38,T,1,95);n(dr,49,T,1.5,92);n(brass,38,T,.6,90);n(brass,50,T,.6,85)
# antes de cada spot: corte con golpe
for a,b in SPOT[1:]: n(timp,38,a,1,105);n(dr,49,a,1,85)
# cierre dramático: "Honduras al borde..."
for p in (38,50,53,57,62): n(strg,p,143.3,5.8,82);n(choir,p+12,143.3,5.8,62);n(pad,p,143.3,5.8,60)
for j in range(12): n(timp,38,143.4+j*0.42,.3,60+j*4)
# logo: Re mayor con 4 campanas La-Re-Fa#-La
for p in (38,50,54,57,62): n(brass,p,149.1,4.2,105);n(strg,p+12,149.1,4.2,80)
n(timp,38,149.1,2,120);n(dr,49,149.1,3,110)
for j,p in enumerate([69,74,78,81]): n(bells,p,149.4+j*.38,3,100)
m.write('mus.mid')
