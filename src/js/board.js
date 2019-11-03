import * as PIXI from 'pixi.js'
import app from './app';
import Tile from './tile';
import { win } from './main';

const x_num = 3
const y_num = 2
const min_border = 20
const offset = 120
const bombs_num = 3


export default class Board {
  constructor() {
    this.aspect = x_num / y_num
    this.container = new PIXI.Container();
    this.tiles = [[]]
    // this.container.position.x = 0
    // this.container.position.y = 0
    this.container.width = x_num
    this.container.height = y_num
    this.container.interactive = true
    app.pixi.stage.addChild(this.container);

    const check = this.check.bind(this)
    const mark = this.mark.bind(this)
    this.container.on('click', check)
      .on('rightclick', mark)
      // .on('pointerover', hover)
      // .on('pointerout', unhover)

    const resize = this.resize.bind(this)
    // resize()
    // console.log(this.container.width);
    
    window.addEventListener('resize', () => {
      resize()
      this.draw()
    })

    for (let x = 0; x < x_num; x++) {
      this.tiles[x] = []
      for (let y = 0; y < y_num; y++) {
        const tile = new Tile({position: {x: x, y: y}, width: 1})
        this.container.addChild(tile.graphics);
        this.tiles[x][y] = tile
      }
    }
  }

  init() {
    for (let x = 0; x < x_num; x++) {
      for (let y = 0; y < y_num; y++) {
        this.tiles[x][y].reset()
      }
    }
    const safe_bombs_num = Math.min(x_num * y_num, bombs_num)
    for (let bi = 0; bi < safe_bombs_num; bi++) {
      let x = Math.floor( Math.random() * x_num)
      let y = Math.floor( Math.random() * y_num)
      while (this.tiles[x][y].isBomb) { // ?
        x = Math.floor( Math.random() * x_num)
        y = Math.floor( Math.random() * y_num)
      }
      this.tiles[x][y].isBomb = true
      this.tiles[x][y].text.text = 'X'
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
          sum += n_t.isBomb
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

  check(evt) {
    let finded_bombs = 0
    for (let x = 0; x < x_num; x++) {
      for (let y = 0; y < y_num; y++) {
        finded_bombs += !this.tiles[x][y].checked
      }
    }
    if (finded_bombs == bombs_num) {
      win()
    }
  }

  mark(evt) {
  }

  set interactive(val) {
    this.container.interactive = val
    
    for (let x = 0; x < x_num; x++) {
      for (let y = 0; y < y_num; y++) {
        this.tiles[x][y].graphics.interactive = val
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
      this.container.position.y = min_border/2 + offset
    }
  }

  update() {
    // this.resize()
    // this.draw()
  }
}