import app from "./app"
import Timer from "./timer"
import Board from "./board"

export default class Game {
  constructor() {
    this.is_play = false
    this.timer = new Timer()
    this.timer.onUpdate((timer) => {
      const timer_text = document.querySelector('.timer')
      timer_text.innerHTML = `Time - ${timer.time}`    
    })
  
    this.board = new Board()
    
  }

  start() {
    this.is_play = true
    this.board.interactive = true
    this.board.init()
    this.board.draw()

    this.timer.start()
    this.timer.time = 0
    const timer_text = document.querySelector('.timer')
    timer_text.innerHTML = `Time - ${0}`  
  }

  stop() {
    this.is_play = false
    this.board.interactive = false
  
    this.timer.stop()
  }

  pause() {
    this.timer.stop()
  }

  resume() {
    if (this.is_play) {
      this.timer.start()
    }
  }

  win() {
    const text_result = document.querySelector('.game-result')
    text_result.innerHTML = 'You win!'
    this.stop()
    this.board.showMines()

  }

  loose() {
    const text_result = document.querySelector('.game-result')
    text_result.innerHTML = 'You loose!'
    this.stop()
    this.board.showMines()

  }
}