# 4 músicas originales distintas para los mantenimientos de UNE Visión (20 s c/u)
import pretty_midi as pm
def nuevo(bpm):
    m=pm.PrettyMIDI(initial_tempo=bpm);return m
def I(m,p,d=False):
    i=pm.Instrument(program=p,is_drum=d);m.instruments.append(i);return i
def n(i,p,t,d,v): i.notes.append(pm.Note(velocity=int(max(1,min(127,v))),pitch=int(p),start=t,end=t+d))
END=20.0
# 1 · IMPACTO: tráiler épico, Si bemol menor, braams de metales, toms, riser y golpe a 1.2 / 8 / 12
m=nuevo(90);B=60/90;brass,low,str_,choir,timp,taiko,hit,bells,pad=I(m,61),I(m,58),I(m,48),I(m,52),I(m,47),I(m,116),I(m,55),I(m,14),I(m,95);dr=I(m,0,True)
for j in range(12): n(str_,58+j,0.1*j,1.2-0.1*j,40+j*6)
for t0 in (1.2,8.0,12.0):
    for p in (34,46,53): n(brass,p,t0,2.4,120);n(low,p-12 if p>40 else p,t0,2.4,110)
    n(taiko,36,t0,1.5,127);n(timp,34,t0,1.5,120);n(hit,46,t0,1,110);n(dr,49,t0,2,110)
for k in range(10):
    t=1.2+k*B*2
    if t<16: n(taiko,41 if k%2 else 36,t,.5,95);n(taiko,36,t+B,.5,80);n(dr,38,t+B*1.5,.2,70)
for t0,ch in ((1.2,[46,49,53]),(4.9,[44,48,51]),(8,[46,49,53]),(12,[42,46,49]),(16,[46,50,53])):
    for p in ch: n(str_,p,t0,3.7,70);n(choir,p+12,t0,3.7,60);n(pad,p,t0,3.7,50)
for j,p in enumerate([70,74,77,82]): n(bells,p,16.2+j*.4,3,100)
n(timp,34,16,2,110);n(dr,49,16,3,100)
m.write('mus1.mid')
# 2 · NOTICIAS: cortina noticiosa en Mi menor, 128 BPM, cuerdas en staccato, pluck de sintetizador, timbal
m=nuevo(128);B=60/128;stc,pl,bass,pad,timp,brass,bells,hit=I(m,45),I(m,84),I(m,38),I(m,89),I(m,47),I(m,61),I(m,14),I(m,55);dr=I(m,0,True)
PRO=[(40,[52,55,59]),(36,[48,52,55]),(43,[55,59,62]),(38,[50,54,57])]
t=0;k=0
while t<16:
    r,ch=PRO[(k//2)%4]
    for j in range(8):
        tt=t+j*B/2
        n(stc,ch[j%3]+12,tt,B*.3,72+(12 if j%4==0 else 0));n(pl,ch[(j+1)%3]+24,tt,B*.25,48)
        n(bass,r,tt,B*.4,85 if j%2==0 else 70)
    for p in ch: n(pad,p,t,4*B,45)
    for j in range(4): n(dr,36 if j%2==0 else 38,t+j*B,.1,85);n(dr,42,t+j*B+B/2,.05,55)
    t+=4*B;k+=1
for t0 in (2,7,16): n(timp,40,t0,1.2,115);n(hit,52,t0,1,100);n(dr,49,t0,1.5,100);n(brass,40,t0,1,95);n(brass,52,t0,1,95)
for p in (38,50,54,57,62): n(brass,p,16,3.5,100)
for j,p in enumerate([69,74,78,81]): n(bells,p,16.5+j*.45,3,105)
m.write('mus2.mid')
# 3 · COBERTURA: electrónica con arpegiador, La menor, 110 BPM, ping de radar
m=nuevo(110);B=60/110;arp,bass,pad,lead,bells,pad2=I(m,81),I(m,39),I(m,90),I(m,80),I(m,14),I(m,88);dr=I(m,0,True)
PRO=[(33,[57,60,64]),(29,[53,57,60]),(36,[55,60,64]),(31,[55,59,62])]
t=0;k=0
while t<16:
    r,ch=PRO[k%4]
    for j in range(16):
        tt=t+j*B/4
        if tt<16: n(arp,ch[j%3]+12*(j//8),tt,B/4*.7,55+(10 if j%4==0 else 0))
    n(bass,r,t,B*1.8,90);n(bass,r,t+2*B,B*1.8,85)
    for p in ch: n(pad,p,t,4*B,48)
    if t>3:
        for j in range(4): n(dr,36,t+j*B,.1,88);n(dr,39 if j%2 else 42,t+j*B+B/2,.05,55)
    t+=4*B;k+=1
for j in range(12): n(bells,93,3+j*1.1,.3,40)  # ping
n(dr,49,3,2,95);n(dr,49,12.6,2,100)
for p in (45,57,61,64,69): n(pad2,p,12.6,7,85)
for j,p in enumerate([69,74,78,81]): n(bells,p,13.2+j*.45,3,100)
m.write('mus3.mid')
# 4 · RITMO: pop electrónico brillante, Fa mayor, 128 BPM, palmas y bombo a negras
m=nuevo(128);B=60/128;bass,pl,pad,lead,bells,brass=I(m,38),I(m,84),I(m,89),I(m,81),I(m,14),I(m,61);dr=I(m,0,True)
PRO=[(41,[53,57,60]),(38,[50,53,57]),(34,[46,50,53]),(36,[48,52,55])]
t=0;k=0
while t<12:
    r,ch=PRO[k%4]
    for j in range(4):
        n(dr,36,t+j*B,.1,100);n(dr,42,t+j*B+B/2,.05,62)
        if j%2==1: n(dr,39,t+j*B,.1,90)
        n(bass,r,t+j*B+B/2,B*.4,90)
    for j in range(8): n(pl,ch[j%3]+12,t+j*B/2,B*.3,60)
    for p in ch: n(pad,p,t,4*B,45)
    mel=[ch[2]+12,ch[1]+12,ch[2]+12,ch[0]+24]
    for j,p in enumerate(mel): n(lead,p,t+j*B,B*.8,70)
    t+=4*B;k+=1
for j in range(8): n(dr,38,12-1+j*.12,.1,50+j*8)
n(dr,49,12,2,110);n(dr,49,13.4,2,100)
for p in (41,53,57,60,65): n(brass,p,13.4,4,105);n(pad,p,13.4,6,70)
for j,p in enumerate([69,74,78,81]): n(bells,p,14+j*.45,3,105)
m.write('mus4.mid')
print('ok')
