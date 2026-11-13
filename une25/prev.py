# uso: python3 prev.py N W H t1,t2,... [salida.jpg]  -> hoja de cuadros para revisar
import sys,asyncio,os
from playwright.async_api import async_playwright
n,w,h,ts=int(sys.argv[1]),int(sys.argv[2]),int(sys.argv[3]),[float(x) for x in sys.argv[4].split(',')]
out=sys.argv[5] if len(sys.argv)>5 else f'prev/s{n:02d}_{w}x{h}.jpg'
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--allow-file-access-from-files']);pg=await b.new_page(viewport={'width':w,'height':h})
        errs=[];pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else None);pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file://'+os.path.abspath('index.html')+f'?n={n}&w={w}&h={h}');await pg.wait_for_function('window.ready===true',timeout=30000)
        fs=[]
        for t in ts:
            await pg.evaluate(f'render({t})');f=f'/tmp/pv_{n}_{t}.jpg';await pg.screenshot(path=f,type='jpeg',quality=80);fs.append(f)
        await b.close()
        cols=min(4,len(fs));tw=480 if w>h else 270
        os.system(f"montage {' '.join(fs)} -tile {cols}x -geometry {tw}x+3+3 -quality 70 {out}")
        print('hoja:',out,'| errores:',errs[:5] if errs else 'ninguno')
asyncio.run(main())
