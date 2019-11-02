import * as PIXI from 'pixi.js'
import colors from './colors'


export default class Tile {
  constructor({bombs, position, width}) {
    this.position = position
    this.width = width
    this.clicked = false
    this.color = colors.idle
    this.bombs = bombs
    this.near = [] // array of tiles
    this.near_bombs = bombs

    this.graphics = new PIXI.Graphics();
    this.graphics.interactive = true
    this.graphics.buttonMode = true
    this.text = new PIXI.Text(this.bombs, {fontFamily : 'Arial', fontSize: 12, fill : 0xaaaaaa})
    this.b_text = new PIXI.Text(this.bombs, {fontFamily : 'Arial', fontSize: 14, fill : 0x111122})
    this.text.visible = false
    this.b_text.visible = false

    this.graphics.addChild(this.text)
    this.graphics.addChild(this.b_text)

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
    this.text.position.set(this.position.x + 4, this.position.y)
    this.b_text.position.set(this.position.x + 12, this.position.y + 12)

    this.graphics.beginFill(color);
    this.graphics.drawRect(this.position.x, this.position.y, this.width-1, this.width-1);
    this.graphics.endFill();
  }

  click(evt) {
    console.log(evt.data.originalEvent);
    const info = document.querySelector('.game-info')
    info.innerHTML = evt.data.originalEvent.which
    
    if (this.clicked) {
      return
    }
    this.clicked = true
    
    if (this.bombs > 0) {
      const info = document.querySelector('.game-info')
      info.innerHTML = 'Game over'
      this.text.visible = true

      return
    }
    this.draw(colors.clicked)

    if (this.near_bombs == 0) {
      for (const t of this.near) {
        t.click()
      }
    }
    else {
      this.b_text.visible = true
    }
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