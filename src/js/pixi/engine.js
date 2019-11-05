import * as PIXI from 'pixi.js'


const initPixi = () => {  
  const app = new PIXI.Application({ 
    // width: 60,         // default: 800
    // height: 40,        // default: 600
    antialias: true,    // default: false
    // transparent: false, // default: false
    resolution: 1.5,       // default: 1
    // scale: 0.5,  
    // autoResize: true
  })

  app.renderer.autoResize = true
  app.renderer.backgroundColor = 0x58819F
  app.renderer.view.classList.add('main-canvas')

  const container = document.querySelector('.container')
  container.appendChild(app.view)

  app.view.addEventListener('contextmenu', e => e.preventDefault())

  return app
}



export {initPixi}