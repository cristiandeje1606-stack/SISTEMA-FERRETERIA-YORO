import sys, subprocess, asyncio
from playwright.async_api import async_playwright
# uso: render.py out.mp4 t0 t1   |  render.py prev t1,t2,...
out=sys.argv[1]; W,H,FPS=1080,1920,30
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--allow-file-access-from-files'])
        pg=await b.new_page(viewport={'width':W,'height':H})
        import os
        await pg.goto('file://'+os.path.abspath('index.html'))
        await pg.wait_for_function('window.ready===true',timeout=120000)
        if out=='prev':
            for t in sys.argv[2].split(','):
                await pg.evaluate(f'render({t})'); await pg.screenshot(path=f'prev/p_{float(t):06.2f}.jpg',type='jpeg',quality=80)
        else:
            t0,t1=float(sys.argv[2]),float(sys.argv[3])
            ff=subprocess.Popen(['ffmpeg','-v','error','-y','-f','image2pipe','-framerate',str(FPS),'-i','-','-c:v','libx264','-preset','veryfast','-crf','16','-pix_fmt','yuv420p',out],stdin=subprocess.PIPE)
            for f in range(round(t0*FPS),round(t1*FPS)):
                await pg.evaluate(f'render({f/FPS})'); ff.stdin.write(await pg.screenshot(type='jpeg',quality=92))
            ff.stdin.close(); ff.wait()
        await b.close()
asyncio.run(main())
