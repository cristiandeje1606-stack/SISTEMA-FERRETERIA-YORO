import pretty_midi as pm
m=pm.PrettyMIDI(initial_tempo=120);B=.5
def I(p,d=False):
    i=pm.Instrument(program=p,is_drum=d);m.instruments.append(i);return i
def n(i,p,t,d,v): i.notes.append(pm.Note(velocity=int(max(1,min(127,v))),pitch=int(p),start=max(0,t),end=t+d))
pulse,bass,strg,brass,timp,glk,hit,xylo,pad=I(81),I(38),I(49),I(57),I(116),I(11),I(55),I(12),I(91);dr=I(0,True)
PRO=[(36,[48,51,55]),(44,[56,60,63]),(39,[51,55,58]),(43,[55,59,62])]  # Cm Ab Eb G
# 0-1.6 entrada: tic-tac de reloj de noticias y subida
for j in range(13): n(dr,75,j*.125,.05,60+j*4)
for j in range(8): n(timp,36,.6+j*.125,.1,60+j*8)
for bar in range(0,8):
    t=bar*2.0
    if t>=15.5: break
    r,ch=PRO[bar%4]
    for j in range(16):
        tt=t+j*B/4
        if tt<1.6 or tt>=15.5: continue
        n(pulse,ch[j%3]+12,tt,B/4*.8,58+(16 if j%4==0 else 0));n(bass,r,tt,B/4*.7,80 if j%2==0 else 62)
    if t>=1.6:
        for p in ch: n(pad,p,t,2.0,45);n(strg,p,t,2.0,55)
        for j in range(4):
            tt=t+j*B
            n(dr,36,tt,.1,105 if j%2==0 else 90);n(dr,42,tt+B/2,.05,58)
            if j%2: n(dr,39,tt,.1,95);n(dr,38,tt,.1,70)
        n(dr,75,t+B*1.5,.05,70);n(dr,75,t+B*3.5,.05,70)
for T,ch in ((2.2,[36,48,55]),(4.6,[44,56,63]),(9.6,[39,51,58]),(15.5,[36,48,51,55,60])):
    for p in ch: n(brass,p,T,.5 if T<15 else 3.8,120)
    n(timp,36,T,1,122);n(hit,43,T,1,110);n(dr,49,T,1.5,115);n(dr,36,T,.2,127)
for j,p in enumerate([74,79,82,86]): n(xylo,p-2,7.4+j*.08,.15,95)       # globo
for T in (10.4,11.7,13.0): n(glk,86,T,.6,105);n(glk,91,T+.1,.6,95)     # ding
for T in (16.0,16.5,17.1): n(brass,60,T,.35,105);n(brass,67,T,.35,100)
for p in (48,51,55,60): n(strg,p,15.5,4.3,90);n(pad,p,15.5,4.3,70)
for j,p in enumerate([72,75,79,84]): n(glk,p,17.4+j*.3,1.8,95)
n(dr,49,17.1,2.5,110);n(timp,36,17.1,1.5,110)
m.write('mus_b.mid')
