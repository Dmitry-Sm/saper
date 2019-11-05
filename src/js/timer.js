export default class Timer {
  constructor() {
    this.time = 0
    this.paused = true
    this._onUpdate = null
    this.update()
  }
  setTime(time) {
    this.time = time
  }
  start() {
    this.paused = false
  }
  stop() {
    this.paused = true
  }
  onUpdate(foo) {
    this._onUpdate = foo
  }
  update() {
    setTimeout(() => {
      this.update()
      if (this.paused) {
        return
      }
      

      this.time++
      this._onUpdate && this._onUpdate(this)

      
    }, 1000)
  }
}