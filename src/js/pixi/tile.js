import * as PIXI from 'pixi.js'
import colors from './colors'


export default class Tile {
  constructor({position, width}) {
    this.position = position
    this.width = width
    this.clicked = false
    this.color = colors.idle

    this.graphics = new PIXI.Graphics();
    this.graphics.interactive = true
    this.graphics.buttonMode = true
    const click = this.click.bind(this)
    const hover = this.hover.bind(this)
    const unhover = this.unhover.bind(this)
    this.graphics.on('pointerdown', click)
      .on('pointerover', hover)
      .on('pointerout', unhover)
      // .on('pointerup', onButtonUp)
      // .on('pointerupoutside', onButtonUp)
  }

  draw(color = this.color) {
    this.color = color
    this.graphics.clear()

    this.graphics.beginFill(color);
    this.graphics.drawRect(this.position.x, this.position.y, this.width-1, this.width-1);
    this.graphics.endFill();
  }

  click(evt) {
    if (this.clicked) {
      return
    }
    this.clicked = true
    this.draw(colors.clicked)
  }

  hover() {
    if (this.clicked) {
      return
    }
    this.draw(colors.hover)
  }

  unhover() {
    if (this.clicked) {
      return
    }
    this.draw(colors.idle)
  }
}