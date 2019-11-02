import * as PIXI from 'pixi.js'
import app from './app';
import Tile from './tile';

const x_num = 10
const y_num = 8
const min_border = 20
const offset = 120

export default class Board {
  constructor() {
    this.aspect = x_num / y_num
    this.container = new PIXI.Container();
    app.pixi.stage.addChild(this.container);
    this.tiles = [[]]
    this.container.position.x = 0
    this.container.position.y = 0

    const resize = this.resize.bind(this)
    resize()
    window.addEventListener('resize', () => {
      resize()
      this.draw()
    })

  }

  init() {
    for (let x = 0; x < x_num; x++) {
      this.tiles[x] = []
      for (let y = 0; y < y_num; y++) {
        const bombs = Math.floor(Math.max(0, Math.random() * 3 - 1))
        const tile = new Tile({bombs, position: {x: 15 * x, y: 15 * y}, width: 15})
        this.container.addChild(tile.graphics);
        this.tiles[x][y] = tile
      }
    }

    for (let x = 0; x < x_num; x++) {
      for (let y = 0; y < y_num; y++) {
        const t = this.tiles[x][y]
        if (x - 1 >= 0) {}
        const left = x - 1 >= 0
        const top = y - 1 >= 0
        const right = x + 1 < x_num
        const bottom = y + 1 < y_num

        left            ? t.near.push( this.tiles[x - 1][y] ) : null
        left && top     ? t.near.push( this.tiles[x - 1][y - 1] ) : null
        top             ? t.near.push( this.tiles[x][y - 1] ) : null
        top && right    ? t.near.push( this.tiles[x + 1][y - 1] ) : null
        right           ? t.near.push( this.tiles[x + 1][y] ) : null
        right && bottom ? t.near.push( this.tiles[x + 1][y + 1] ) : null
        bottom          ? t.near.push( this.tiles[x][y + 1] ) : null
        bottom && left  ? t.near.push( this.tiles[x - 1][y + 1] ) : null

        let sum = 0
        for (const n_t of t.near) {
          sum += n_t.bombs
        }
        t.near_bombs = sum
        t.b_text.text = t.near_bombs
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
    const window_height = window.innerHeight - offset
    const window_aspect = window_width / window_height

    if (window_aspect < this.aspect) { //  по ширине
      this.width = window_width - min_border
      this.height = this.width / this.aspect

      this.container.position.x = min_border / 2
      this.container.position.y = window_height / 2 - this.height / 2 + offset
    }
    else { // по высоте
      this.height = window_height - min_border
      this.width = this.height * this.aspect

      this.container.position.x = window_width / 2 - this.width / 2
      // this.container.position.y = window_height - this.height - min_border/2 + offset
      this.container.position.y = min_border/2 + offset
    }
  }

  update() {
    // this.resize()
    // this.draw()
  }
}