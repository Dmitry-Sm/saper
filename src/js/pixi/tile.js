import * as PIXI from 'pixi.js'
import colors from './colors'


export default class Tile {
  constructor({bombs, position, width}) {
    this.position = position
    this.width = width
    this.clicked = false
    this.color = colors.idle
    this.bombs = bombs
    this.near_bombs = bombs

    this.near = []
    // this.l  = null // соседи
    // this.lt = null 
    // this.t  = null
    // this.tr = null
    // this.r  = null
    // this.rb = null
    // this.b  = null
    // this.bl = null

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
    this.b_text.visible = true

    // const l = this.l
    // const r = this.r
    // const t = this.t
    // const b = this.b
    
    // l && l.draw(colors.hover)
    // r && r.draw(colors.hover)
    // t && t.draw(colors.hover)
    // b && b.draw(colors.hover)

    // const n_bombs = 
    //   (l ? l.bombs == 0 : 0) +
    //   (r ? r.bombs == 0 : 0) +
    //   (t ? t.bombs == 0 : 0) +
    //   (b ? b.bombs == 0 : 0)
      
    console.log(this);
    // console.log('L - ' + l.bombs);
    // console.log(r.bombs);
    // console.log('B - ' + b.bombs);
    
    // if (n_bombs >= 4) {
    //   l && !l.bombs && l.click()
    //   r && !r.bombs && r.click()
    //   t && !t.bombs && t.click()
    //   b && !b.bombs && b.click()
    // }
    
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