import {ParticleSystem} from './particle_system'

const 
  start_width = 12, 
  delta_widtth = 0.6,
  delta_alpha = -0.02,
  start_speed = {min: 6, max: 14},
  acceleration = 0.94,
  number = 30,
  max_number = 160


class Plack extends ParticleSystem {
  constructor(container, texture) {
    super(container, texture, number, max_number, {width: start_width, height: start_width})
  }

  start(x, y) {
    for (let i = 0; i < this.number; i++) {
      let p = this.assets.pull()
      if (!p) {
        break
      }
      // angle.x = 0
      // angle.y = -1
      
      // const direction = Math.atan2(angle.y, -angle.x) * (1 + (Math.sin(performance.now()/40))/4)
      // const direction = Math.atan2(angle.y, -angle.x) * (1 + (Math.random() - 0.5)/2)
      const direction = Math.random() * Math.PI * 2
      const speed = start_speed.min + Math.random() * (start_speed.max - start_speed.min) 
      // const speed = 1 + Math.random() * start_speed
      const x_velocity =  Math.cos(direction) * speed,
            y_velocity = -Math.sin(direction) * speed
      
      p.delta_alpha = delta_alpha * (1 - Math.random()/2)
      p.show()
      p.start(x, y, x_velocity, y_velocity)
      // p.sprite.alpha = 0.6
      this.particles.push(p)
    }
  }

  is_dead (particle) {
    return particle.sprite.alpha <= 0
  }

  update (delta) { 
    let particles = this.particles

    for (let i = particles.length-1; i >= 0; i--) {

      let p = particles[i]
      if (p.alife) {
        p.vy -= 0.01
        p.sprite.x += p.vx
        p.sprite.y += p.vy

        p.vx *= acceleration
        p.vy *= acceleration

        p.sprite.width  += delta_widtth
        p.sprite.height += delta_widtth

        // p.sprite.alpha  *= 0.95
        p.sprite.alpha  += p.delta_alpha

        if (this.is_dead(p)) {
          particles.splice(i, 1)
          this.removeAsset(p)
        }
      }
    }
  }

}



export {Plack} 
