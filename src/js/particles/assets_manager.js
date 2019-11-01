class Assets {
  constructor(asset, number) {
    this.array = []
    this.length = number
    for (let i = 0; i < number; i++) {
      this.array.push(asset())
    }
  }

  put(asset) {
    this.length++
    this.array.push(asset)
  }

  pull() {
    if (this.length == 0) {
      console.log('Need more Assets!!!')
    }
    else {
      this.length--
      return this.array.pop()
    }
  }
}



export default Assets