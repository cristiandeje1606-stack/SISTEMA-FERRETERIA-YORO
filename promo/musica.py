# Promo UNE Visión "Colinas" · 30 s · Fa# menor · 128 BPM · híbrido tráiler + electrónica (original)
import pretty_midi as pm
B=60/128;BAR=4*B
m=pm.PrettyMIDI(initial_tempo=128)
def I(p,d=False):
    i=pm.Instrument(program=p,is_drum=d);m.instruments.append(i);return i
def n(i,p,t,d,v): i.notes.append(pm.Note(velocity=int(max(1,min(127,v))),pitch=int(p),start=max(0,t),end=t+d))
bass,saw,pad,brass,str_,choir,taiko,timp,hit,bells,lead=I(38),I(81),I(89),I(61),I(48),I(52),I(116),I(47),I(55),I(14),I(87)
dr=I(0,True)
PRO=[(30,[54,57,61]),(26,[50,54,57]),(33,[57,61,64]),(28,[52,56,59])]  # F#m D A E
# golpe inicial
for p in (42,49,54): n(brass,p,0,1.6,120)
n(taiko,36,0,1.2,127);n(timp,30,0,1.4,120);n(dr,49,0,2,115);n(hit,42,0,1,110)
for j in range(16): n(dr,42,j*B/4,.05,40+j*4)  # tic-tac que acelera hacia el primer corte
for bar in range(1,13):
    t=bar*BAR;r,ch=PRO[((bar-1)//2)%4]
    for j in range(8):
        tt=t+j*B/2
        n(bass,r+12,tt,B*.42,100 if j%2==0 else 82);
        n(saw,ch[j%3]+12,tt,B*.3,62+(14 if j%4==0 else 0))
    for p in ch: n(pad,p,t+B*.12,BAR-B*.2,52);n(str_,p,t,BAR,58)
    for j in range(4):
        n(dr,36,t+j*B,.12,110);n(dr,42,t+j*B+B/2,.05,62)
        if j%2: n(dr,39,t+j*B,.1,92);n(dr,38,t+j*B,.1,70)
    n(taiko,36,t,.6,100);n(taiko,41,t+B*2.5,.4,80)
    n(brass,ch[0]-12,t,B*.6,105);n(brass,ch[0],t,B*.6,100)
    if bar in (5,9): n(dr,49,t,2,105);n(timp,r+12,t,1,110)
    if bar>=7:  # melodía alta en la segunda mitad
        mel=[ch[2]+12,ch[1]+12,ch[0]+12,ch[1]+12]
        for j,p in enumerate(mel): n(lead,p,t+j*B,B*.9,70)
# compás 13: quiebre y subida
t=13*BAR
for p in (54,57,61): n(pad,p,t,BAR,60);n(choir,p+12,t,BAR,70)
for j in range(16): n(dr,38,t+j*B/4,.06,50+j*4)
for j in range(8): n(timp,30,t+BAR/2+j*B/4,.2,70+j*7)
for j in range(12): n(str_,54+j,t+j*BAR/12,BAR/12*1.1,60+j*4)
# compás 14: golpe del logo y cola
t=14*BAR
for p in (30,42,49,54,57,61): n(brass,p,t,3.4,124)
for p in (54,57,61,66): n(choir,p,t,3.6,90);n(str_,p,t,3.6,85);n(pad,p,t,3.7,70)
n(taiko,36,t,1.6,127);n(timp,30,t,2,124);n(hit,42,t,1.5,115);n(dr,49,t,3,120);n(dr,57,t+.02,3,100)
for j,p in enumerate([73,78,81,85]): n(bells,p,t+.5+j*.32,2.4,100)
n(taiko,36,t+B*2,.8,90);n(timp,30,t+B*2,1,95)
m.write('mus.mid')
