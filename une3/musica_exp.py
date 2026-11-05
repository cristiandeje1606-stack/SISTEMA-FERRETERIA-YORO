# Música propia para "Paraguay saqueado" (estilo Expediente): Do menor, 84 BPM, reloj marcado, piano grave, cuerdas, golpes. Distinta a la del video 1.
import json, pretty_midi as pm
G=json.load(open('cartas_2.json'));C=G['cartas'];fin=[c for c in C if c['k']=='cierre'][0]['t0']
m=pm.PrettyMIDI(initial_tempo=84);B=60/84
def I(p,d=False):
    i=pm.Instrument(program=p,is_drum=d);m.instruments.append(i);return i
piano,cello,cb,strg,choir,timp,taiko,celesta,bells,horn,hit=I(0),I(42),I(43),I(49),I(53),I(47),I(116),I(8),I(14),I(60),I(55)
dr=I(0,True)
def n(i,p,t,d,v): i.notes.append(pm.Note(velocity=int(max(1,min(127,v))),pitch=int(p),start=t,end=t+d))
PROG=[(36,[48,51,55]),(32,[44,48,51]),(34,[46,50,53]),(31,[43,47,50])]  # Cm Ab Bb G
t=0;k=0
while t<fin-.01:
    r,tri=PROG[k%4];bar=4*B;d=min(bar,fin-t)
    n(cb,r,t,d,70);n(cello,r+12,t,d,58)
    for p in tri: n(strg,p,t,d,46); n(choir,p+12,t,d,30 if k>3 else 0)
    # motivo de piano en negras, grave y seco
    for j,p in enumerate([tri[0],tri[2],tri[1],tri[2]]):
        tt=t+j*B
        if tt<fin: n(piano,p,tt,B*.8,60+(10 if j==0 else 0))
    # reloj: tic-tac en corcheas (woodblock alto/bajo)
    for j in range(8):
        tt=t+j*B/2
        if tt<fin: n(dr,76 if j%2==0 else 77,tt,.05,58)
    n(dr,36,t,.15,80);n(dr,36,t+2*B,.15,70)
    if k%4==3: n(celesta,tri[2]+24,t+3*B,1,45)
    t+=bar;k+=1
for c in C:
    if c['k'] in ('golpe','sello') and c['t0']>.2:
        n(taiko,36,c['t0'],1.2,118);n(timp,36,c['t0'],1.2,110);n(hit,48,c['t0'],.8,85);n(horn,36,c['t0'],1.2,90)
        for j in range(8): n(dr,41,c['t0']-.8+j*.1,.08,40+j*8)
    if c['k']=='golpe' and c['t0']<=.2: n(taiko,36,0,1.2,120);n(timp,36,0,1.2,110);n(horn,36,0,1.5,95)
# cierre de marca UNE en Re mayor con las 4 campanas La-Re-Fa#-La
for p in [38,50,54,57,62]: n(strg,p,fin,5.5,85);n(horn,p,fin,3,85)
for j,p in enumerate([69,74,78,81]): n(bells,p,fin+.6+j*.45,3,105)
n(timp,38,fin,1.5,110);n(dr,49,fin,2.5,95);n(cb,38,fin,4,95)
m.write('musica_2.mid');print('ok',fin)
