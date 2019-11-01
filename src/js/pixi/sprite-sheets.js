import * as PIXI from 'pixi.js'


const sprite_sheet_list = [
  { name: 'horses',
    animation: true,
    sprite: require('../../assets/spritesheets/horses/spritesheet.png'),
    json: require('../../assets/spritesheets/horses/spritesheet.json')
  },
  { name: 'cars',
    animation: false,
    sprite: require('../../assets/spritesheets/cars/spritesheet.png'),
    json: require('../../assets/spritesheets/cars/spritesheet.json')
  },
  { name: 'train',
    animation: true,
    sprite: require('../../assets/spritesheets/train/spritesheet.png'),
    json: require('../../assets/spritesheets/train/spritesheet.json')
  },
  { name: 'carousel',
    animation: true,
    sprite: require('../../assets/spritesheets/carousel/spritesheet.png'),
    json: require('../../assets/spritesheets/carousel/spritesheet.json')
  },
  { name: 'ship',
    animation: true,
    sprite: require('../../assets/spritesheets/ship/spritesheet.png'),
    json: require('../../assets/spritesheets/ship/spritesheet.json')
  }
]

const sprite_sheets = {}
const animations = {}


const loadSpritesheets = async () => {
  const loader = PIXI.Loader.shared

  // Добавление текстур в лоадер
  for (const sprite_sheet of sprite_sheet_list) {    
    loader.add(sprite_sheet.name, sprite_sheet.sprite)
  }

  // Начать загрузку и ждать пока все не загрузится
  return await new Promise ((resolve) => {
    loader.load((loader, resources) => {
      for (const sprite_sheet of sprite_sheet_list) {

        const base_texture = resources[sprite_sheet.name].texture.baseTexture
        const s = new PIXI.Spritesheet(base_texture, sprite_sheet.json)

        s.parse(() => {})
        sprite_sheets[sprite_sheet.name] = s
        
        const txs = []
        Object.keys(s.textures).sort().forEach(key => {
          txs.push(s.textures[key])
        })

        if (sprite_sheet.animation) {
          const a = new PIXI.AnimatedSprite(txs)
          animations[sprite_sheet.name] = a
        }
      }
      resolve()
    })
  })
}




export {loadSpritesheets, sprite_sheets, animations}