import '../css/style.scss'
import * as PIXI from 'pixi.js'
import { initPixi } from './pixi/engine';
import app from './app'

import { loadTextures, sprites } from './pixi/textures';
import { initResize } from './pixi/resize';
import Board from './board';
import { startLoop } from './loop';
import initControls from './controls';



window.onload = async () => {
  app.pixi = initPixi()
  await loadTextures()
  console.log('Textures loaded')
  initResize()

  app.board = new Board()
  app.board.init()
  app.board.draw()

  initControls()

  startLoop()

  // const cat = sprites.cat
  // cat.width = 60
  // cat.height = 60
  // cat.position.set(10, 200)

  // app.pixi.stage.addChild(sprites.cat)
}

const win = () => {
  console.log('Win!');
  
  app.board.interactive = false
}

const loose = () => {
  console.log('Loose!');

  app.board.interactive = false
  
}

export {
  win,
  loose
}


// TODO: visual