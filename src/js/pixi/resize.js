import app from "../app";


const initResize = () => {
  app.render_scale = 1

  resize()

  window.addEventListener('resize', () => {
    setTimeout(() => {
      resize()
    }, 100);
    // setTimeout(() => {
    //   resize()
    // }, 1000);

    // setTimeout(() => {
    //   resize()
    // }, 5000);
  })
}


const resize = () => { 
  const vh = Math.max(document.documentElement.offsetHeight, window.innerHeight || 0)
  // const wrapper = document.querySelector('.wrapper')

  document.querySelector('.container').setAttribute(`style`, `height: ${vh}px !important`)
  // wrapper.setAttribute(`style`, `height: ${vh}px !important`)

  const w = window.innerWidth * app.render_scale
  const h = window.innerHeight * app.render_scale
  const k = (w + h/2) / 1000
  app.pixi.renderer.resize(w, h)
  app.render_size = k
  
  // wrapper.style.top = `${window.pageYOffset}px`
}

// window.addEventListener(`scroll`, (evt) => {
//   evt.preventDefault()
//   console.log(window.pageYOffset);
  
//   document.querySelector('.wrapper').style.top = `${window.pageYOffset}px`
// })


window.addEventListener(`touchmove`, (evt) => {
  evt.preventDefault()
}, { passive:false })


export {initResize, resize}