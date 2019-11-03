import * as PIXI from 'pixi.js'
import colors from './colors'
import { loose } from './main'


export default class Tile {
  constructor({isBomb = false, position, width}) {
    this.position = position
    this.width = width
    this.checked = false
    this.marked = false
    this.color = colors.idle
    this.isBomb = isBomb
    this.near = [] // array of tiles
    this.near_bombs = 0

    this.graphics = new PIXI.Graphics();
    this.graphics.interactive = true
    this.graphics.buttonMode = true
    this.text = new PIXI.Text(this.isBomb ? 'X' : '', {fontFamily : 'Arial', fontSize: 12, fill : 0xaaaaaa})
    this.b_text = new PIXI.Text(this.near_bombs, {fontFamily : 'Arial', fontSize: 14, fill : 0x111122})
    // this.text.visible = false
    this.b_text.visible = false

    this.graphics.addChild(this.text)
    this.graphics.addChild(this.b_text)

    const check = this.check.bind(this)
    const mark = this.mark.bind(this)
    const hover = this.hover.bind(this)
    const unhover = this.unhover.bind(this)
    this.graphics.on('click', check)
      .on('rightclick', mark)
      .on('pointerover', hover)
      .on('pointerout', unhover)
      // .on('pointerup', onButtonUp)
      // .on('pointerupoutside', onButtonUp)
  }

  draw(color = this.color) {
    this.color = color
    this.graphics.clear()
    this.text.position.set(this.position.x + 4, this.position.y)
    this.b_text.position.set(this.position.x + 12, this.position.y + 12)

    this.graphics.beginFill(color);
    this.graphics.drawRect(this.position.x, this.position.y, this.width-1, this.width-1);
    this.graphics.endFill();
  }

  check(evt) {
    if (this.checked || this.marked) {
      return
    }
    this.checked = true
    
    if (this.isBomb) {
      loose()

      return
    }
    this.draw(colors.checked)

    if (this.near_bombs == 0) {
      for (const t of this.near) {
        t.check(evt)
      }
    }
    else {
      this.b_text.visible = true
    }
  }

  mark() {
    if (this.checked) {
      return
    }
    this.marked = !this.marked
    if (this.marked) {
      this.draw(colors.marked)
    }
    else {
      this.draw(colors.idle)
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
    this.draw(colors.idle)
  }
}