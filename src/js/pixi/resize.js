import app from "../app";


const initResize = () => {
  app.render_scale = 1

  resize()

  window.addEventListener('resize', resize)
}


const resize = () => { 
  const w = window.innerWidth
  const h = window.innerHeight

  app.pixi.renderer.resize(w, h)
}


export {initResize, resize}