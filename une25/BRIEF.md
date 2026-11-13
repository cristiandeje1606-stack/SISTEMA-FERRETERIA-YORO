# Encargo: 25 piezas de motion graphics para UNE Visión (canal de TV de Santa Bárbara, Honduras)

Trabajas en `/home/claude/tmpv/une25/`. Cada pieza es UN archivo `scenes/sNN.js` (NN = 01..25) que registra una escena en un motor común (canvas 2D, determinista). NO toques `engine.js`, `index.html` ni los archivos de otros. Si necesitas una función propia, defínela dentro de tu archivo con prefijo único (ej. `s07_onda`).

## Nivel exigido (el dueño es muy exigente)
- Debe verse como plantilla premium de After Effects / Envato de élite: letras que llegan y retumban, golpes de cámara, brillos que recorren, profundidad, transiciones limpias. NUNCA aspecto de Filmora/Vegas, ni de los años 90, ni cajas planas aburridas, ni texto chico. Letras GRANDES y legibles en celular.
- Cada pieza totalmente distinta a las demás (concepto, tipografía principal, movimiento, transición, cierre). Respeta el concepto asignado.
- Ritmo: un cambio visual fuerte cada 1.5–3 s. Sin grano/ruido encima.
- Cierre de cada pieza: logo de UNE Visión protagonista (2–4 s) + eslogan y/o /UNEVISION según la pieza.

## Marca y textos PERMITIDOS (no inventes datos)
- Nombre: "UNE VISIÓN" (logo: `logo.png`, ya cargado; funciones `logo`, `logo3D`, `logoWipe`; variantes de color en `LG.white`, `LG.cian`, `LG.ambar`, `LG.dark`).
- Eslogan: "EL CANAL QUE CRECE CADA DÍA". Redes: "/UNEVISION". Lugar: "SANTA BÁRBARA · HONDURAS", "SAN JOSÉ DE COLINAS".
- Frases emotivas genéricas permitidas: TU CANAL, NUESTRA GENTE, NUESTRA TIERRA, CONTIGO, AQUÍ ESTAMOS, CADA DÍA, NOTICIAS, INFORMACIÓN, NUESTRA VOZ, SÍGUENOS, COMPARTE, DALE ME GUSTA, ACTIVA LAS NOTIFICACIONES, ¿YA NOS SIGUES?, LO QUE PASA AQUÍ, HECHO EN SANTA BÁRBARA, CRECEMOS CONTIGO, y similares sin datos.
- PROHIBIDO: número de canal ("Canal 20"), cableoperador, nombres de programas (no uses "Revés y Derecho"), horarios, cifras de seguidores/audiencia, logos de Facebook/Instagram/TikTok/YouTube (usa íconos genéricos dibujados: corazón, campana, flecha de compartir, globo de comentario, play), personas, fotos. Español correcto con tildes.
- Colores de marca: noche #06121F, marino #0B2238, cian #08E1FF, azul #4C8FE2, ámbar #FDAE03, naranja #F6901C, brasa #EA4F3D, rojo #E3173E (objeto `K`). Puedes variar la proporción y sumar blanco o negro según el concepto.

## Contrato técnico
```js
SCENE(NN,{dur:25, draw(t){ ... }, events:[['golpe',0.2],['whoosh',3.1],...], musica:{estilo:'...',bpm:120,tono:'Dm'}});
```
- `draw(t)` dibuja el cuadro del segundo t (puede ser `async`). Todo depende SOLO de t (nada de Date.now, Math.random, requestAnimationFrame). Usa `hs(i)` para pseudo-azar.
- `W,H,U,CX,CY,TV,L(a,b)` (L elige valor para horizontal o vertical), `SAFE_T`, `SAFE_B` (en 9:16 no pongas texto importante arriba de SAFE_T ni debajo de SAFE_B).
- Ayudas en engine.js (léelo, son cortas): curvas `ex ss eio bk el P win lerp cl`; texto `txt mw fit wrap rise slam typeOn` (fuentes: 'Archivo' expandida por defecto, 'Fig', 'Anton', 'Bebas', 'Unbounded', 'Syne', 'Space', 'Playfair', 'BigSh', 'Oswald', 'Bang', 'Luck', 'Neue'); fondo y efectos `bg vineta particulas rays grid piso flash shake streak flare cintas dots glass`; 3D `p3 rotY rotX card3D`; logo `logo logo3D logoWipe`; `d3`, `topojson`, `MUNDO` (países, Honduras id 340) disponibles.
- `events`: sonidos a colocar en su segundo exacto. Tipos válidos: golpe, whoosh, whoosh_largo, swipe, pop, riser (dura 1 s, ponlo 1 s antes de un golpe grande), campana, obturador. Pon uno en cada golpe visual importante (10–25 por pieza).
- `musica`: usa EXACTAMENTE el estilo/bpm/tono asignado abajo; agrega `hits:[segundos]` con los golpes fuertes (la música pone un acento ahí) y `final:segundo` donde entra el logo.

## Formatos y duración
- 01–10 PROMOS de TV: 1920x1080 (16:9 real, pantalla completa), 25 s.
- 11–15 PROMOS DE REDES: 1080x1920 (9:16), 20 s.
- 16–25 REELS: 1080x1920 (9:16), 30 s.
Diseña para tu formato (no centres un diseño horizontal en vertical).

## Revisión obligatoria (sin videos, solo cuadros)
`cd /home/claude/tmpv/une25 && python3 prev.py NN ANCHO ALTO 0.5,2,4,...  ` genera `prev/sNN_ANCHOxALTO.jpg` y lista errores de consola. Míralo con Read. Revisa al menos 10–14 instantes repartidos en toda la duración (incluye entradas a medio animar y el cierre). Corrige textos cortados, encimados, fuera de pantalla o chicos. Cero errores de consola. La máquina tiene 2 núcleos y otros agentes trabajan a la vez: no lances videos ni renders largos.

## Entrega
Cuando las 5 piezas estén listas, responde SOLO: lista de archivos, una línea por pieza con su concepto, y cualquier duda. Sé breve.

## Conceptos asignados (estilo musical entre paréntesis — usa ese)
01 IMPACTO 3D: bloques/cubos de colores que vuelan desde la profundidad y se ensamblan; cámara con golpes; tipografía Anton gigante. (epic, 120, Dm)
02 TÚNEL DE LUZ / HIPERESPACIO: estelas de luz a toda velocidad, palabras que pasan por el túnel, salida al logo. (edm, 128, Fm)
03 LÍQUIDO ELEGANTE: manchas de color orgánicas que se funden (metaballs/gradientes en movimiento), tipografía Syne fina+gruesa, calma premium. (ambient, 90, Eb)
04 SEÑAL DIGITAL: glitch RGB elegante, barras de transmisión, códigos, tipografía Space Grotesk, cortes secos al ritmo. (synth, 110, Am)
05 MAPA Y TIERRA: Honduras con relieve low-poly, zoom a Santa Bárbara y San José de Colinas, ondas de señal que salen de un pin. (cinematic, 100, Cm)
06 SALA DE REDACCIÓN HUD: radar, anillos de datos, globo/mapa del mundo con D3, rótulos tipo noticiero, Bebas/Oswald. (news, 120, Gm)
07 PAPEL RECORTADO: capas de papel de colores con sombras y parallax, tipografía Playfair itálica + Archivo. (orquesta, 96, F)
08 MURO TIPOGRÁFICO: palabras enormes Unbounded cruzando la pantalla a distintas velocidades y capas, pantalla dividida. (house, 124, Bbm)
09 PRISMA DE CRISTAL: prismas/vidrios que refractan luz en colores de marca, reflejos, lujo. (pop, 104, A)
10 PARTÍCULAS: miles de partículas que vuelan y forman las palabras y luego el logo (usa getImageData de un canvas oculto para muestrear la forma; precalcula una vez). (trailer, 116, Bm)
11 CELULAR 3D (redes): teléfono que gira en 3D, feed que sube, avisos de notificación, mano/dedo tocando "SEGUIR". (pop, 118, G)
12 LLUVIA DE ÍCONOS (redes): corazones, campanas, compartir, comentarios que caen y rebotan con física simulada (fórmulas, determinista), textos "DALE ME GUSTA · COMPARTE · ACTIVA LAS NOTIFICACIONES". (latin, 100, Am)
13 CHAT (redes): globos de conversación tipo mensajería con preguntas y respuestas genéricas ("¿Dónde veo lo que pasa en Santa Bárbara?" → "En /UNEVISION"), escribiendo..., stickers. (lofi, 85, Dm)
14 CRECIMIENTO (redes): barras y flechas que suben, curva de crecimiento, "CADA DÍA MÁS" (sin cifras), plantas/brotes geométricos. (funk, 112, E)
15 GESTOS (redes): dedo que desliza, toca dos veces, mantiene, la pantalla responde con efectos; "/UNEVISION" gigante; deslizar hacia arriba. (trap, 140, F#m)
16 UN DÍA CONTIGO (reel): el cielo pasa de amanecer a noche (sol/luna), palabras por momento del día, cierre de noche con el logo brillando. (cinematic, 92, D)
17 MOSAICO (reel): fichas de colores que se voltean en 3D en cascada revelando palabras y al final el logo. (house, 122, Cm)
18 MANIFIESTO EDITORIAL (reel): fondo blanco/negro, tipografía enorme negro y rojo, recortes y subrayados de marcador, estilo revista. (rock, 132, E)
19 CAMBIO DE CANAL (reel): televisor moderno, zapping entre señales de colores (sin estática fea), se detiene en UNE Visión. (synth, 115, Gm)
20 CUBO 3D (reel): cubo que rota mostrando una palabra en cada cara (NOTICIAS / NUESTRA GENTE / SANTA BÁRBARA / TU CANAL), luces y reflejos. (edm, 126, Am)
21 SEÑAL QUE LLEGA (reel): mapa de Honduras, departamento de Santa Bárbara iluminado, torre/antena en San José de Colinas emitiendo ondas que llegan a casas. (epic, 108, Ebm)
22 ECUALIZADOR (reel): barras y ondas de audio que bailan al ritmo de la música (usa el bpm 124), palabras que golpean en cada tiempo. (edm, 124, C#m)
23 ORIGAMI (reel): formas geométricas planas que se doblan y desdoblan con sombreado de caras, formando un ave/estrella y luego el logo. (ambient, 88, Bb)
24 CUENTA REGRESIVA (reel): 5-4-3-2-1 energético estilo deportivo con cortes diagonales y destellos, "¿ESTÁS LISTO?" → UNE VISIÓN. (trap, 145, Cm)
25 CONSTELACIÓN (reel): cielo nocturno, estrellas que se conectan con líneas formando palabras y la silueta del logo, emotivo, "CRECEMOS CONTIGO". (orquesta, 80, Ab)
