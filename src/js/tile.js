import * as PIXI from 'pixi.js'
import colors from './colors'
import { loose } from './main'
import app from './app'


export default class Tile {
  constructor({mine_pic, flag_pic, color, position, width}) {
    this.position = position
    this.width = width
    this.mine_pic = mine_pic
    this.flag_pic = flag_pic
    this.def_color = color

    this.graphics = new PIXI.Graphics();
    this.graphics.interactive = true
    this.graphics.buttonMode = true
    this.text = new PIXI.Text(this.near_bombs, {fontFamily : 'Arial', fontSize: 12, fill : 0xaaaaaa})
    // this.b_text.visible = false
    this.graphics.addChild(this.text)

    this.reset()
    this.resize()
    this._initControls()
  }

  _initControls() {
    const check = this.check.bind(this)
    const mark = this.mark.bind(this)
    const hover = this.hover.bind(this)
    const unhover = this.unhover.bind(this)

    let touch_timer = 0
    let longpress = false
    const touchstart = (evt => {
      longpress = false
      touch_timer = setTimeout(() => {
        longpress = true
        mark()
      }, 400);
    })
    const touchend = (evt => {
      clearTimeout(touch_timer)
      if (!longpress) {
        check()
      }
    })

    this.graphics.on('click', check)
      .on('rightclick', mark)
      .on('mouseover', hover)
      .on('mouseout', unhover)
      .on('touchstart', touchstart)
      .on('touchend', touchend)
      // .on('pointerup', onButtonUp)
      // .on('pointerupoutside', onButtonUp)
  }

  draw(color = this.color) {
    this.color = color
    this.graphics.clear()
    // this.resize()

    this.graphics.beginFill(color);
    this.graphics.drawRect(this.position.x, this.position.y, this.width, this.width);
    this.graphics.endFill();
  }

  reset() {
    this.checked = false
    this.marked = false
    this.isBomb = false
    this.text.visible = false
    this.mine_pic.visible = false
    this.flag_pic.visible = false

    this.color = this.def_color
    this.near = [] // array of tiles
    this.near_bombs = 0
    
    this.resize()
  }

  resize() {
    const half_width = this.width / 2
    this.mine_pic.width = half_width
    this.mine_pic.height = half_width
    this.mine_pic.position.set(this.position.x + half_width /2, this.position.y + half_width /2)
    
    this.flag_pic.width = half_width
    this.flag_pic.height = half_width
    this.flag_pic.position.set(this.position.x + half_width /2, this.position.y + half_width * 0.35)
    
    this.text.position.set(this.position.x + this.width * 0.37, this.position.y + half_width * 0.45)
    this.text.style.fontSize = half_width
  }

  check(evt) {
    if (this.checked || this.marked) {
      return
    }
    this.checked = true
    
    if (this.isBomb) {
      app.game.loose()

      return
    }
    this.draw(colors.checked)

    if (this.near_bombs == 0) {
      for (const t of this.near) {
        t.check(evt)
      }
    }
    else {
      this.text.visible = true
    }
  }

  mark() {
    if (this.checked) {
      return
    }
    this.marked = !this.marked
    if (this.marked) {
      this.draw(colors.marked)
      this.flag_pic.visible = true
    }
    else {
      this.draw(this.def_color)
      this.flag_pic.visible = false
    }
  }

  hover() {
    if (this.checked || this.marked) {
      return
    }
    this.draw(colors.hover)
  }

  unhover() {
    if (this.checked || this.marked) {
      return
    }
    this.draw(this.def_color)
  }
}