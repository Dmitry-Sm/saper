import * as PIXI from 'pixi.js'
import app from '../app';
import Tile from './tile';

const x_num = 30
const y_num = 20
const min_border = 40
const offset = 140

export default class Board {
  constructor() {
    this.aspect = x_num / y_num
    this.container = new PIXI.Container();
    app.pixi.stage.addChild(this.container);
    this.tiles = [[]]
    this.container.position.x = 0
    this.container.position.y = 0

    this.width = 600
    this.height = 400

    const resize = this.resize.bind(this)
    window.addEventListener('resize', resize)

  }

  init() {
    for (let x = 0; x < x_num; x++) {
      this.tiles[x] = []
      for (let y = 0; y < y_num; y++) {
        const tile = new Tile({position: {x: 15 * x, y: 15 * y}, width: 15})
        this.container.addChild(tile.graphics);
        this.tiles[x][y] = tile
      }
    }
    this.resize()
  }

  draw() {
    const t_width = this.width / x_num
    for (let x = 0; x < x_num; x++) {
      for (let y = 0; y < y_num; y++) {
        const t = this.tiles[x][y]
        t.position.x = t_width * x
        t.position.y = t_width * y
        t.width = t_width
        t.draw()
      }
    }

  }

  clear() {

  }

  resize() {
    const window_width = window.innerWidth
    const window_height = window.innerHeight - 140
    const window_aspect = window_width / window_height

    if (window_aspect < this.aspect) { //  по ширине
      this.width = window_width - min_border
      this.height = this.width / this.aspect

      this.container.position.x = min_border / 2
      this.container.position.y = min_border / 2
    }
    else { // по высоте
      this.height = window_height - min_border
      this.width = this.height * this.aspect

      this.container.position.x = window_width / 2 - this.width / 2
      this.container.position.y = window_height - this.height - min_border/2
    }
    
    this.draw()
  }

  update() {
    // this.resize()
    // this.draw()
  }
}