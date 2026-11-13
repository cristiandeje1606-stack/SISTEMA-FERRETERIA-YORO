# Genera la música original de cada pieza según su estilo (pretty_midi + FluidR3).
# uso: python3 gen_music.py NN dur estilo bpm tono "hits" final  -> musica/mNN.wav
import sys,pretty_midi as pm,subprocess,random
NN=int(sys.argv[1]);DUR=float(sys.argv[2]);EST=sys.argv[3];BPM=float(sys.argv[4]);TONO=sys.argv[5]
HITS=[float(x) for x in sys.argv[6].split(',') if x];FINAL=float(sys.argv[7]) if sys.argv[7] else DUR-4
random.seed(NN*7919)
NOTAS={'C':0,'C#':1,'Db':1,'D':2,'D#':3,'Eb':3,'E':4,'F':5,'F#':6,'Gb':6,'G':7,'G#':8,'Ab':8,'A':9,'A#':10,'Bb':10,'B':11}
menor=TONO.endswith('m');raiz=NOTAS[TONO[:-1] if menor else TONO]
R=36+raiz  # raíz grave
ESC=[0,2,3,5,7,8,10] if menor else [0,2,4,5,7,9,11]
def grado(g,oct=0):return R+12*oct+ESC[g%7]+12*(g//7)
def acorde(g,oct=1):return [grado(g,oct),grado(g+2,oct),grado(g+4,oct)]
PROGS={True:[[0,5,2,6],[0,3,5,4],[0,6,5,6],[0,5,3,4]],False:[[0,4,5,3],[0,5,3,4],[0,3,4,4],[5,3,0,4]]}
prog=random.choice(PROGS[menor])
m=pm.PrettyMIDI(initial_tempo=BPM);B=60/BPM;BAR=4*B
def I(p,d=False):
    i=pm.Instrument(program=p,is_drum=d);m.instruments.append(i);return i
def n(i,p,t,d,v):
    if 0<=t<DUR: i.notes.append(pm.Note(velocity=int(max(1,min(127,v))),pitch=int(p),start=t,end=min(DUR,t+d)))
dr=I(0,True)
# instrumentos por estilo: (bajo, acordes/pad, lead, acento, estilo de batería)
CFG={
 'epic':(43,48,61,47,'epic'),'trailer':(43,49,57,47,'epic'),'cinematic':(43,49,60,47,'cine'),'orquesta':(43,48,73,47,'orq'),
 'edm':(38,81,81,55,'four'),'house':(38,4,80,55,'four'),'synth':(39,90,81,55,'synth'),'news':(39,89,81,47,'news'),
 'pop':(33,0,4,55,'pop'),'latin':(32,24,56,55,'latin'),'lofi':(32,4,11,55,'lofi'),'funk':(36,17,62,55,'funk'),
 'trap':(38,90,80,55,'trap'),'rock':(34,30,29,55,'rock'),'ambient':(32,89,92,14,'amb')}
bajo,acp,ld,acc,dst=CFG.get(EST,CFG['epic'])
Ib,Ia,Il,Ic=I(bajo),I(acp),I(ld),I(acc);Ibell=I(14);Ipad=I(89 if acp!=89 else 91)
INTRO=min(1.6,BAR*.75)
def drums(t,k):
    if dst in('four','house'):
        for j in range(4): n(dr,36,t+j*B,.1,110);n(dr,42,t+j*B+B/2,.05,70);n(dr,46,t+j*B+B/2,.1,40)
        n(dr,39,t+B,.1,90);n(dr,39,t+3*B,.1,90)
    elif dst=='synth':
        for j in range(8): n(dr,42,t+j*B/2,.05,55)
        n(dr,36,t,.1,105);n(dr,36,t+2.5*B,.1,95);n(dr,38,t+B,.1,90);n(dr,38,t+3*B,.1,90)
    elif dst=='news':
        for j in range(16): n(dr,42,t+j*B/4,.04,40+(15 if j%4==0 else 0))
        n(dr,36,t,.1,100);n(dr,36,t+2*B,.1,95);n(dr,38,t+B,.1,70);n(dr,38,t+3*B,.1,70)
    elif dst=='pop':
        n(dr,36,t,.1,100);n(dr,36,t+1.5*B,.1,85);n(dr,36,t+2*B,.1,100);n(dr,39,t+B,.1,90);n(dr,39,t+3*B,.1,90)
        for j in range(8): n(dr,42,t+j*B/2,.05,50)
    elif dst=='latin':
        for s in (0,.75,1.5,2,2.75,3.5): n(dr,36 if s in(0,2) else 38,t+s*B,.1,95 if s in(0,2) else 75)
        for j in range(8): n(dr,70,t+j*B/2,.05,55);n(dr,75,t+j*B/2+B/4,.05,35)
    elif dst=='lofi':
        n(dr,36,t,.12,80);n(dr,36,t+2.25*B,.12,70);n(dr,38,t+B,.12,65);n(dr,38,t+3*B,.12,65)
        for j in range(8): n(dr,42,t+j*B/2+(.03 if j%2 else 0),.05,38)
    elif dst=='funk':
        for s in (0,.75,2,2.5): n(dr,36,t+s*B,.1,100)
        n(dr,38,t+B,.1,95);n(dr,38,t+3*B,.1,95);n(dr,38,t+3.75*B,.05,50)
        for j in range(16): n(dr,42,t+j*B/4,.03,45+(20 if j%2==0 else 0))
    elif dst=='trap':
        n(dr,36,t,.3,110);n(dr,36,t+1.75*B,.3,95);n(dr,36,t+2.5*B,.3,100);n(dr,39,t+2*B,.1,100)
        for j in range(16):
            n(dr,42,t+j*B/4,.03,55)
            if j in(13,14,15): n(dr,42,t+j*B/4+B/8,.03,45)
    elif dst=='rock':
        n(dr,36,t,.1,115);n(dr,36,t+2*B,.1,110);n(dr,36,t+2.5*B,.1,100);n(dr,38,t+B,.1,110);n(dr,38,t+3*B,.1,110)
        for j in range(8): n(dr,51,t+j*B/2,.05,60)
    elif dst in('epic','cine'):
        n(dr,36,t,.2,105);n(dr,36,t+2*B,.2,95);n(dr,38,t+B,.1,75 if dst=='epic' else 55);n(dr,38,t+3*B,.1,80)
        for j in range(4): n(Ic,R-12,t+j*B,.25,70 if j%2 else 95)  # timbales
    elif dst=='orq':
        n(Ic,R-12,t,.4,70);n(Ic,R-12,t+2*B,.4,55)
    elif dst=='amb':
        n(dr,42,t+B*1.5,.05,25)
t=INTRO;bar=0
# intro: subida
for j in range(8): n(Ipad,grado(4,1),j*INTRO/8,INTRO/8,40+j*6)
while t<FINAL-0.05:
    g=prog[bar%4];ch=acorde(g);k=min(1,.6+bar*.08)
    for p in ch: n(Ia,p,t,BAR*.98,62 if dst!='amb' else 50);n(Ipad,p+12,t,BAR,36)
    if dst in('four','house','synth','trap','pop','funk','latin','rock','news'):
        pat={'four':[0,.5,1,1.5,2,2.5,3,3.5],'house':[.5,1.5,2.5,3.5],'synth':[0,.5,1,1.5,2,2.5,3,3.5],'trap':[0,1.75,2.5],'pop':[0,1.5,2,3],
             'funk':[0,.75,1.5,2,2.25,3,3.5],'latin':[0,.75,1.5,2,2.75,3.5],'rock':[0,.5,1,1.5,2,2.5,3,3.5],'news':[i*.25 for i in range(16)]}[dst]
        for s in pat: n(Ib,grado(g,0),t+s*B,B*.4 if dst!='trap' else B*1.2,92)
    else:
        n(Ib,grado(g,0),t,BAR*.95,80)
    # melodía/arpegio
    if dst in('amb','lofi','orq','cine'):
        for j,dd in enumerate([0,1,2,3]): n(Il,acorde(g,2)[j%3]+(12 if dst=='amb' else 0),t+dd*B,B*.9,55)
    elif bar%2==1 or dst in('four','house','edm','pop'):
        for j in range(8): n(Il,acorde(g,2)[(j*2)%3]+(12 if j==7 else 0),t+j*B/2,B*.4,60+(10 if j%4==0 else 0))
    drums(t,k);t+=BAR;bar+=1
# acentos en golpes
for h in HITS:
    if h<FINAL: n(dr,49,h,1.2,100);n(Ic,R,h,.8,105);n(Ia,grado(0,1),h,.5,95)
# final: acorde grande + campanas
for p in acorde(0,1)+[grado(0,0),grado(0,2)]: n(Ia,p,FINAL,DUR-FINAL,95);n(Ipad,p+12,FINAL,DUR-FINAL,70)
n(dr,49,FINAL,2.5,115);n(dr,36,FINAL,.4,120);n(Ic,R-12,FINAL,1.5,110)
for j,p in enumerate(acorde(0,3)+[grado(0,4)]): n(Ibell,p,FINAL+.35+j*.3,2.5,95)
m.write(f'/tmp/m{NN}.mid')
subprocess.run(['fluidsynth','-ni','-g','0.8','-r','48000','-F',f'/tmp/m{NN}.wav','/usr/share/sounds/sf2/FluidR3_GM.sf2',f'/tmp/m{NN}.mid'],capture_output=True)
subprocess.run(['ffmpeg','-v','error','-y','-i',f'/tmp/m{NN}.wav','-af',f'afade=t=in:d=0.25,atrim=0:{DUR},afade=t=out:st={DUR-1.2}:d=1.2','-ar','48000',f'musica/m{NN:02d}.wav'],check=True)
print('ok',NN)
