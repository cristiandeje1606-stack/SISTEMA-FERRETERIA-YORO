# Guion de los dos cortos de OPINIÓN de UNE Visión Noticias. Calcula tiempos y escribe cartas_N.js + musica_N.mid
import json, re, sys
import pretty_midi as pm

def palabras(c):
    s = ' '.join([c.get('l1', ''), c.get('l2', ''), c.get('t', ''), c.get('fecha', ''), c.get('big', ''), c.get('bigl', ''),
                  c.get('q', ''), ' '.join(c.get('items', [])), c.get('titulo', '')])
    return len(re.findall(r"[\wÁÉÍÓÚÑáéíóúñ0-9,]+", s))

def dur(c):
    if c['k'] == 'cierre': return 6.5
    return round(max(3.0, palabras(c) / 2.3 + 1.3) + c.get('extra', 0), 2)

V1 = [
 dict(k='golpe', pais='EE. UU.', l1='TRUMP, HUMILLADO', l2='DERROTADO EN SU PROPIA CASA', img='trump', gris=1),
 dict(k='texto', pais='EE. UU.', fecha='3 DE NOVIEMBRE DE 2026', t='Estados Unidos le dio la espalda a *Trump*.', img='capitolio', lab='CAPITOLIO · WASHINGTON'),
 dict(k='texto', pais='EE. UU.', t='El Partido Demócrata gana la *CÁMARA DE REPRESENTANTES* y el *SENADO*.', src='Fuente: AP, CBS News · 4 nov 2026', img='cupula', lab='CONGRESO DE ESTADOS UNIDOS'),
 dict(k='contador', pais='EE. UU.', big='0', bigl='ESCAÑOS', t='Los republicanos no lograron voltear *NI UN SOLO* escaño.', src='Fuente: CNBC · 4 nov 2026'),
 dict(k='texto', pais='EE. UU.', t='Cayeron hasta sus bastiones: estados *profundamente republicanos* votaron contra él.', src='Fuente: NBC News · 4 nov 2026', img='casablanca', lab='CASA BLANCA · WASHINGTON'),
 dict(k='lista', pais='EE. UU.', titulo='LA FACTURA DE TRUMP', items=['Una guerra con Irán que no termina', 'Combustibles por las nubes', 'Aranceles que vacían el bolsillo', 'Un costo de vida insoportable'], src='Guerra con Irán: ABC News'),
 dict(k='texto', pais='AMÉRICA LATINA', t='Su política la pagó el mundo entero. *América Latina* también la está pagando.', mapa='latam'),
 dict(k='golpe', pais='HONDURAS', l1='¿Y HONDURAS?', l2='', mapa='hn', img='bandera1'),
 dict(k='cita', pais='HONDURAS', red='Truth Social', autor='Donald Trump', cargo='Presidente de Estados Unidos', img='trump', fecha='Noviembre de 2025 · dos días antes de la elección en Honduras',
      q='"Si Tito Asfura gana… lo apoyaremos firmemente. Si no gana, Estados Unidos no malgastará su dinero."', src='Fuente: El Observador / EFE · Traducido del inglés'),
 dict(k='texto', pais='HONDURAS', t='*Asfura ganó.* Hoy gobierna Honduras con el Partido Nacional.', img='asfura', zn='NASRY ASFURA', zc='Presidente de Honduras'),
 dict(k='golpe', pais='HONDURAS', l1='LA MÁQUINA', l2='DE BOTS', img='bandera2', corto=1),
 dict(k='texto', pais='HONDURAS', tag='LA MÁQUINA DE BOTS', t='Su estratega digital: el argentino *Fernando Cerimedo*, asesor de la campaña de Asfura y del Partido Nacional.', src='Fuente: El Heraldo', zn='FERNANDO CERIMEDO', zc='Estratega digital argentino'),
 dict(k='texto', pais='BOLIVIA', tag='LA MÁQUINA DE BOTS', fecha='AGOSTO DE 2026', t='Cerimedo es detenido en Bolivia, *acusado de tentativa de feminicidio*. Hoy sigue en prisión preventiva.', src='Fuente: El Heraldo, Buenos Aires Times, Infobae', mapa='bo'),
 dict(k='sello', pais='BOLIVIA', tag='LA MÁQUINA DE BOTS', sellos=['GRANJA DE BOTS'], t='En los allanamientos, la Fiscalía boliviana halló una *"mini granja de bots"*.', src='Fiscalía de La Paz · 20 ago 2026', extra=.6),
 dict(k='texto', pais='AMÉRICA LATINA', tag='LA MÁQUINA DE BOTS', t='Trabajó para *Milei* en Argentina y para *Rodrigo Paz* en Bolivia. *Chile* abrió una comisión para investigar bots en campañas.', src='Fuente: El Heraldo, Pauta · sep 2026', mapa='latam'),
 dict(k='texto', pais='HONDURAS', tag='LA MÁQUINA DE BOTS', t='En Honduras, *Salvador Nasralla* pidió al Ministerio Público investigar si en la campaña de Asfura se usaron bots y quién los pagó.', src='Fuente: El Heraldo · 10 sep 2026', img='nasralla', zn='SALVADOR NASRALLA', zc='Excandidato presidencial · Partido Liberal'),
 dict(k='texto', pais='HONDURAS', tag='LA MÁQUINA DE BOTS', t='Asfura se desmarcó: *"Él es responsable de sus actuaciones".*', src='Fuente: El Heraldo · 11 sep 2026', img='asfura', zn='NASRY ASFURA', zc='Presidente de Honduras'),
 dict(k='sello', pais='HONDURAS', sellos=['INDULTADO', 'NARCOTRAFICANTE CONDENADO'], fecha='DICIEMBRE DE 2025', t='Trump liberó a un narcotraficante condenado: *Juan Orlando Hernández*, 45 años de prisión en Nueva York.', src='Fuente: El Heraldo, La Prensa · 2 dic 2025', img='joh', zn='JUAN ORLANDO HERNÁNDEZ', zc='Expresidente de Honduras (2014-2022)', extra=.8),
 dict(k='texto', pais='EE. UU.', t='El padrino de la derecha latinoamericana, *derrotado en su propia casa*.', img='trump', gris=1),
 dict(k='texto', pais='AMÉRICA LATINA', t='Lo que pasó en Estados Unidos puede pasar en *Honduras* y en toda *América Latina*.', mapa='latam', enciende=1),
 dict(k='golpe', pais='AMÉRICA LATINA', l1='LA DERECHA DESTRUYE ECONOMÍAS.', l2='LOS PUEBLOS YA DESPERTARON.', mapa='latam', final=1),
 dict(k='cierre'),
]
V2 = [
 dict(k='golpe', pais='PARAGUAY', l1='PARAGUAY SAQUEADO', l2='AL BORDE DEL COLAPSO', img='palacio'),
 dict(k='texto', pais='PARAGUAY', fecha='5 DE NOVIEMBRE DE 2026', t='Cae *Santiago Peña*. El presidente renuncia en plena tormenta.', src='Fuente: CNN, Infobae', img='pena', zn='SANTIAGO PEÑA', zc='Presidente de Paraguay (2023-2026)'),
 dict(k='texto', pais='PARAGUAY', t='La causa: la caída de *Ueno Bank*. El Banco Central lo intervino porque su solvencia cayó por debajo de la *mitad del mínimo exigido*.', src='Fuente: BCP / EFE · 3 nov 2026'),
 dict(k='contador', pais='PARAGUAY', big='2,9', bigl='MILLONES', t='de clientes, en un país de 6,1 millones: *casi la mitad de Paraguay*.', src='Fuente: EFE'),
 dict(k='texto', pais='PARAGUAY', t='Cuentas, tarjetas y aplicaciones: *APAGADAS*.', src='Fuente: EFE'),
 dict(k='contador', pais='PARAGUAY', big='355', bigl='MILLONES DE DÓLARES', t='del Instituto de Previsión Social (IPS), *la plata de los trabajadores*, estaban invertidos en ese banco.', src='Fuente: EFE'),
 dict(k='contador', pais='PARAGUAY', big='32', bigl='MIL', t='jubilados tienen sus cuentas en Ueno.', src='Fuente: EFE'),
 dict(k='golpe', pais='PARAGUAY', l1='LA PLATA DE LOS TRABAJADORES', l2='ATRAPADA EN UN BANCO QUEBRADO', corto=1),
 dict(k='texto', pais='PARAGUAY', t='*Dos de cada tres* pagos electrónicos del comercio pasaban por Ueno.', src='Fuente: Asimcopar vía EFE'),
 dict(k='sello', pais='PARAGUAY', sellos=['ACCIONISTA'], t='El presidente era accionista del banco: Santiago Peña fue accionista de Ueno Holding *hasta 2025*.', src='Fuente: EFE', img='pena', zn='SANTIAGO PEÑA', zc='Presidente de Paraguay (2023-2026)', extra=.6),
 dict(k='sello', pais='PARAGUAY', sellos=['27 IMPUTADOS'], t='La Fiscalía imputó a *27 personas* por préstamos y sobregiros a empresas del mismo grupo económico.', src='Fuente: Fiscalía de Paraguay / EFE · 4 nov 2026', extra=.5),
 dict(k='texto', pais='PARAGUAY', t='*Ocho directivos* detenidos. La Fiscalía pidió prisión preventiva para el fundador y mayor accionista del banco.', src='Fuente: EFE · 4 nov 2026'),
 dict(k='texto', pais='PARAGUAY', t='35 diputados pidieron juicio político a Peña por *conflicto de intereses*. Renunció antes de la votación.', src='Fuente: El Universo, Infobae · 5 nov 2026', img='palacio', lab='PALACIO DE LÓPEZ · ASUNCIÓN'),
 dict(k='golpe', pais='PARAGUAY', l1='UN BANCO AMIGO DEL PODER.', l2='Y EL PUEBLO PAGA LA CUENTA.', final=1),
 dict(k='cierre'),
]
TICKER = {1: 'DEMÓCRATAS GANAN LA CÁMARA Y EL SENADO   ·   TRUMP INDULTÓ A JUAN ORLANDO HERNÁNDEZ   ·   ',
          2: 'RENUNCIA SANTIAGO PEÑA   ·   CAE UENO BANK   ·   2,9 MILLONES DE CLIENTES AFECTADOS   ·   '}

def musica(cartas, T, n):
    m = pm.PrettyMIDI(initial_tempo=120); B = .5
    I = lambda p, d=False: (m.instruments.append(pm.Instrument(program=p, is_drum=d)) or m.instruments[-1])
    bass, pad, pl, arp, brass, bells, hitI, timp, strg = I(38), I(89), I(50), I(81), I(61), I(14), I(55), I(47), I(48)
    dr = I(0, True)
    def nn(i, p, t, d, v): i.notes.append(pm.Note(velocity=int(max(1, min(127, v))), pitch=int(p), start=t, end=t + d))
    fin = [c for c in cartas if c['k'] == 'cierre'][0]['t0']
    CH = [(38, [50, 53, 57]), (34, [46, 50, 53]), (36, [48, 52, 55]), (33, [45, 49, 52])]  # Dm Bb C A
    t = 0.0; k = 0
    while t < fin - .01:
        r, tri = CH[(k // 2) % 4]; bar = 4 * B
        for j in range(16):
            tt = t + j * B / 4
            if tt >= fin: break
            nn(bass, r + (12 if j % 4 == 2 else 0), tt, B / 4 * .8, 78 + (14 if j % 4 == 0 else 0))
        for p in tri: nn(pad, p, t, min(bar, fin - t), 48); nn(strg, p - 12, t, min(bar, fin - t), 40)
        for j in range(8):
            tt = t + j * B / 2
            if tt < fin: nn(arp, tri[j % 3] + 12, tt, B / 2 * .6, 42)
        for b in range(4):
            tt = t + b * B
            if tt >= fin: break
            nn(dr, 36, tt, .1, 92 if b % 2 == 0 else 70); nn(dr, 42, tt + B / 2, .05, 50)
            if b % 2 == 1: nn(dr, 38, tt, .1, 72)
        t += bar; k += 1
    # golpes, sellos y risers
    for c in cartas:
        if c['k'] in ('golpe', 'sello') and c['t0'] > .2:
            for j in range(10): nn(dr, 38, c['t0'] - 1 + j * .1, .08, 40 + j * 7)
            nn(timp, 38, c['t0'], 1.2, 120); nn(hitI, 50, c['t0'], 1, 100); nn(dr, 49, c['t0'], 1.5, 100); nn(brass, 50, c['t0'], .8, 95); nn(brass, 38, c['t0'], .8, 95)
        if c['k'] == 'golpe' and c['t0'] <= .2:
            nn(timp, 38, 0, 1.2, 120); nn(hitI, 50, 0, 1, 105); nn(dr, 49, 0, 1.5, 100)
    # cierre en Re mayor con las 4 campanas La-Re-Fa#-La
    for p in [38, 50, 54, 57, 62]: nn(strg, p, fin, 5.5, 90); nn(brass, p, fin, 3, 95)
    for j, p in enumerate([69, 74, 78, 81]): nn(bells, p, fin + .6 + j * .45, 3, 105)
    nn(timp, 38, fin, 1.5, 115); nn(dr, 49, fin, 2.5, 100); nn(bass, 26, fin, 4, 100)
    m.write(f'musica_{n}.mid')

for n, cartas in ((1, V1), (2, V2)):
    t = 0.0; ev = []
    for c in cartas:
        c['d'] = dur(c); c['t0'] = round(t, 2); t += c['d']
    T = round(t, 2)
    json.dump(dict(cartas=cartas, total=T, ticker=TICKER[n], estilo=n), open(f'cartas_{n}.json', 'w'), ensure_ascii=False)
    open(f'cartas_{n}.js', 'w').write('window.GUION=' + json.dumps(dict(cartas=cartas, total=T, ticker=TICKER[n], estilo=n), ensure_ascii=False) + ';')
    musica(cartas, T, n)
    print(n, 'total', T, 'cartas', len(cartas), [c['d'] for c in cartas])
