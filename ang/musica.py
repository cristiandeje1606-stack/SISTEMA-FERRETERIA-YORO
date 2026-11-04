# Música original PROAUDIH (cinemática, emotiva) para el mensaje de la diputada Angélica Smith — 49.5 s
import pretty_midi as pm
m = pm.PrettyMIDI(initial_tempo=96)
def I(p, d=False):
    i = pm.Instrument(program=p, is_drum=d); m.instruments.append(i); return i
piano, strg, strg2, pizz, choir, brass, horn, timp, taiko, bells, harp, cello, bass, hit = I(0), I(48), I(49), I(45), I(52), I(61), I(60), I(47), I(116), I(14), I(46), I(42), I(33), I(55)
dr = I(0, True)
def n(i, p, t, d, v):
    i.notes.append(pm.Note(velocity=int(max(1, min(127, v))), pitch=int(p), start=t, end=t + d))
BEAT = 60 / 96; BAR = BEAT * 4; T0 = 3.2
CH = [(50, [50, 53, 57]), (46, [46, 50, 53]), (41, [45, 48, 53]), (48, [48, 52, 55])]  # Dm Bb F C
END = 44.4
# Teaser: dron y subida
for p in [38, 50, 57]: n(strg2, p, 0, 3.2, 55); n(choir, p + 12, .5, 2.7, 40)
for j in range(12): n(timp, 38, 1.6 + j * .13, .13, 30 + j * 6)
# Golpe de entrada
n(taiko, 36, T0, 1.5, 120); n(hit, 50, T0, 1, 95); n(timp, 38, T0, 1, 110); n(dr, 49, T0, 2, 100)
t = T0; k = 0
while t < END - .01:
    root, tri = CH[k % 4]; sec = 0 if t < 20.6 else (1 if t < 34.9 else 2)
    d = min(BAR, END - t)
    for p in tri: n(strg2, p, t, d, 52 + sec * 10); n(choir, p + 12, t, d, 0 if sec == 0 else 45 + sec * 10)
    n(cello, root - 12, t, d, 70 + sec * 8); n(bass, root - 24, t, d, 0 if sec == 0 else 80)
    # arpegio de piano
    arp = [tri[0], tri[1], tri[2], tri[0] + 12, tri[2], tri[1], tri[2] + 12, tri[1] + 12]
    for j in range(8):
        tt = t + j * BEAT / 2
        if tt < END: n(piano, arp[j] + 12, tt, BEAT * .9, 62 + (8 if j % 4 == 0 else 0))
    if sec >= 1:
        for j in range(8):
            tt = t + j * BEAT / 2
            if tt < END: n(strg, tri[j % 3] + 12, tt, BEAT * .45, 70 + sec * 8)
        for b in (0, 2):
            n(taiko, 36, t + b * BEAT, .5, 95 + sec * 10); n(dr, 36, t + b * BEAT, .2, 90)
        n(dr, 38, t + 3 * BEAT, .2, 70 + sec * 12)
    if sec == 2:
        for b in (1, 3): n(dr, 36, t + b * BEAT + BEAT / 2, .2, 85); n(taiko, 41, t + b * BEAT, .4, 90)
        for p in tri: n(brass, p, t, d * .95, 92); n(horn, p - 12, t, d, 80)
        for j in range(8): n(dr, 42, t + j * BEAT / 2, .1, 55)
        if k % 2 == 0: n(dr, 49, t, 2, 95)
    if sec == 0 and k % 2 == 0:
        for j in range(8): n(harp, tri[j % 3] + 24, t + j * .12, 1.5, 45)
    t += BAR; k += 1
# subida antes del logo
for j in range(16): n(dr, 38, END - 1.6 + j * .1, .1, 60 + j * 4)
for j in range(10): n(timp, 38, END - 1.2 + j * .12, .12, 70 + j * 5)
# Final en Re mayor (logo)
for p in [38, 50, 54, 57, 62]: n(brass, p + 12, END, 4.5, 115); n(strg, p + 12, END, 5, 100); n(choir, p + 12, END, 5, 95)
for p in [62, 66, 69, 74]: n(bells, p, END, 4, 100)
n(taiko, 36, END, 2, 127); n(hit, 50, END, 1.5, 110); n(timp, 38, END, 2, 120); n(dr, 49, END, 3, 120); n(bass, 26, END, 4.5, 110)
for j in range(14): n(harp, [62, 66, 69][j % 3] + 12 * (j // 6), END + .3 + j * .1, 2, 70)
m.write('musica.mid'); print(m.get_end_time())
