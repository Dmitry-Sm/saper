import Particle from './particle'
import Assets from './assets_manager'



class ParticleSystem {
  constructor(container, texture, number, max_number, particle_params) {
    this.container = container
    this.particles = []
    this.number = number
    this.active = 0
    this.generator
    this.generator_number = 0
    this.particles = []
    const create_asset = () => {
      const p = new Particle(texture, particle_params.width, particle_params.height)
      p.sprite.zIndex = particle_params.zIndex || p.sprite.zIndex
      container.addChild(p.sprite)
      return p
    }
    this.assets = new Assets(create_asset, max_number) 
  }

  // start_generator(func, time) {
  //   this.stop_generator()
  //   this.generator_number = 0
  //   this.generator = setInterval( () => {
  //     func()
  //     if (++this.generator_number == this.number) {
  //       this.stop_generator()
  //     }
  //   }, time)
  // }

  // stop_generator() {
  //   if (this.generator) {
  //     clearInterval(this.generator)
  //     this.generator = null
  //   }
  // }

  removeAsset(p) {
    this.assets.put(p)
    p.hide()
  }

}



export {ParticleSystem} 
