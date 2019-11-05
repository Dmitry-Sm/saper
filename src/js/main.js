import '../css/style.scss'
import * as PIXI from 'pixi.js'
import { initPixi } from './pixi/engine';
import app from './app'

import { loadTextures, sprites } from './pixi/textures';
import { initResize } from './pixi/resize';
import Board from './board';
import { startLoop } from './loop';
import initControls from './controls';
import Timer from './timer';
import Game from './game';



window.onload = async () => {
  app.pixi = initPixi()
  await loadTextures()
  initResize()
  
  app.game = new Game()
  app.game.start()
  
  initControls()
}


// TODO: visual