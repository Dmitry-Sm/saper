import app from "./app"

const startLoop = (params) => {
  requestAnimationFrame(loop)  
}

const loop = (params) => {
  requestAnimationFrame(loop)


  app.board.update()
}


export {startLoop}