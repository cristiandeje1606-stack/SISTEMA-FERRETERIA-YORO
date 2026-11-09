import pretty_midi as pm
def mk(bpm):return pm.PrettyMIDI(initial_tempo=bpm)
def I(m,p,d=False):
    i=pm.Instrument(program=p,is_drum=d);m.instruments.append(i);return i
def n(i,p,t,d,v): i.notes.append(pm.Note(velocity=int(max(1,min(127,v))),pitch=int(p),start=max(0,t),end=t+d))
# ---- PROMO 1: surf rock de caricatura, Re menor, 150 BPM (pulso 0.4 s) ----
m=mk(150);B=.4;gtr,gtr2,bass,org,brass,xylo=I(m,29),I(m,27),I(m,34),I(m,17),I(m,61),I(m,13);dr=I(m,0,True)
PRO=[(38,[50,53,57]),(36,[48,52,55]),(34,[46,50,53]),(33,[45,49,52])]  # Dm C Bb A
for bar in range(0,10):
    t=bar*4*B
    if t>=15.2: break
    r,ch=PRO[bar%4]
    for j in range(16): n(gtr,ch[0]+12 if j%4 else ch[0]+12,t+j*B/4,B/4*.8,68+(18 if j%4==0 else 0))  # tremolo
    for j in range(8): n(bass,[r,r+7,r+12,r+7][j%4],t+j*B/2,B*.45,95)
    for p in ch: n(org,p,t,4*B,45)
    for j in range(4): n(dr,36 if j%2==0 else 38,t+j*B,.1,100 if j%2 else 105);n(dr,51,t+j*B,.08,60);n(dr,51,t+j*B+B/2,.08,50)
    if bar%2==1:  # riff de respuesta
        for j,p in enumerate([62,65,67,69,67,65]): n(gtr2,p,t+2*B+j*B/3,B*.3,85)
for T in (0,2.4,6.8,12.8,15.2):
    for p in (50,53,57,62): n(brass,p,T,.5,118)
    n(dr,49,T,1.5,115);n(dr,36,T,.2,127)
for j in range(6): n(xylo,[74,77,81,86,81,86][j],5.6+j*.07,.15,100)   # clic
for j,p in enumerate([62,65,69,74,77,81]): n(xylo,p,2.4-0.36+j*.06,.1,90)
# final: guitarra surf y ta-dá
t=15.2
for j in range(8): n(bass,38,t+j*B/2,B*.45,95)
for j in range(4): n(dr,36,t+j*B,.1,100);n(dr,38,t+j*B+B,.1,90)
for j,p in enumerate([62,65,69,72,74,77]): n(gtr2,p,t+1.6+j*.1,.3,90)
for p in (38,50,57,62,65,69): n(brass,p,18.0,1.9,118);n(org,p,18.0,1.9,70)
n(dr,49,18.0,2,118);n(dr,36,18.0,.3,127);n(dr,57,18.0,2,90)
m.write('mus1.mid')
# ---- PROMO 2: fanfarria de superhéroe, Mi bemol mayor, 100 BPM (pulso 0.6 s) ----
m=mk(100);B=.6;tp,hn,tb,stg,timp,glk,pic=I(m,56),I(m,60),I(m,57),I(m,48),I(m,47),I(m,9),I(m,72);dr=I(m,0,True)
# 0-6: crece (crescendo por escalones)
for k,T in enumerate((0,2.4,3.6,4.8)):
    v=60+k*16
    for j in range(8 if k==0 else 4): n(stg,[51,55,58,63][j%4]+k*2,T+j*B/2,B*.45,v);n(dr,38,T+j*B/2,.05,40+k*12)
    n(timp,39,T,.6,v+10);n(tp,63+k*3,T,1.0,v+15);n(dr,49,T,1,v) if k else None
for j in range(8): n(dr,38,5.4+j*.075,.05,70+j*6)
# 6-13.2: tema heroico
PRO=[(39,[51,55,58]),(44,[56,60,63]),(46,[58,62,65]),(39,[51,55,58]),(36,[48,51,55]),(46,[58,62,65])]
mel=[(63,1),(70,1),(68,.5),(67,.5),(65,.5),(67,.5),(70,2),(72,1),(70,.5),(68,.5),(67,1),(65,1)]
t=6.0
for k,(r,ch) in enumerate(PRO):
    T=6.0+k*1.2
    for j in range(4): n(stg,ch[j%3]+12,T+j*B/2,B*.45,85);n(dr,38 if j%2 else 36,T+j*B/2,.08,90);n(dr,42,T+j*B/2+B/4,.04,55)
    for p in ch: n(hn,p,T,1.2,80);n(tb,r,T,1.15,95)
    n(timp,r,T,.4,95)
tt=6.0
for p,d in mel: n(tp,p+12 if tt>9.6 else p,tt,d*B*.95,110);n(pic,p+24,tt,d*B*.9,60);tt+=d*B
for T in (6.0,9.6):n(dr,49,T,1.5,120);n(dr,36,T,.2,127)
# 13.2-20: cierre triunfal
for T in (13.2,13.8,14.4,15.0):
    for p in (51,55,58,63): n(tp,p+12,T,.45,112);n(hn,p,T,.5,95)
    n(timp,39,T,.4,110);n(dr,49 if T==13.2 else 38,T,1 if T==13.2 else .1,115)
for p in (39,51,55,58,63,67,70): n(tb if p<50 else tp,p,15.6,3.6,118);n(stg,p+12,15.6,3.8,90)
for j,p in enumerate([75,79,82,87]): n(glk,p,15.9+j*.25,2,95)
n(timp,39,15.6,1.5,124);n(dr,49,15.6,3,120);n(dr,57,15.6,3,100)
m.write('mus2.mid')
