import {ParticleSystem} from './particle_system'

const 
  start_width = 64, 
  delta_widtth = 0.2,
  delta_alpha = -0.008,
  start_speed = {min: 2, max: 3},
  acceleration = 1.02,
  number = 1,
  max_number = 100


class Trace extends ParticleSystem {
  constructor(container, texture) {
    super(container, texture, number, max_number, {width: start_width, height: start_width})
  }

  start(x, y, angle, scale) {
    // const dist = Math.sqrt(angle.x **2 + angle.y **2)
    // console.log(Math.atan2(angle.y, -angle.x) / Math.PI)
    // console.log(dist)
    
    for (let i = 0; i < this.number; i++) {
      let p = this.assets.pull()
      if (!p) {
        break
      }
      
      // const direction = Math.atan2(angle.y, -angle.x) * (1 + (Math.sin(performance.now()/40))/4)
      // const direction = Math.atan2(angle.y, -angle.x) * (1 + (Math.random() - 0.5)/2)
      // const direction = Math.random() * Math.PI * 2
      const direction = (angle + (Math.random() - 0.5) / 10)
      const speed = start_speed.min + Math.random() * (start_speed.max - start_speed.min) 
      // const speed = 1 + Math.random() * start_speed
      const x_velocity =  Math.cos(direction) * speed * 0.8,
            y_velocity = -Math.sin(direction) * speed * 0.8
      
      p.delta_alpha = delta_alpha * (1 - Math.random()/2)
      
      p.show()
      p.start(x, y, x_velocity, y_velocity)
      p.sprite.width = p.sprite.height = scale * start_width
      p.sprite.alpha = 0.6
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
        p.vy += p.sprite.width / 80
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



export {Trace} 
