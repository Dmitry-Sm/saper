import * as PIXI from 'pixi.js'


const textures_list = [
  { name: 'mine',
    path: require('../../assets/images/mine2.png')
  },
  { name: 'flag',
    path: require('../../assets/images/flag.png')
  },
]

const sprites = {}
const textures = {}


const loadTextures = async () => {
  const loader = PIXI.Loader.shared

  // Добавление текстур в лоадер
  for (const texture of textures_list) {    
    loader.add(texture.name, texture.path)
  }

  // Начать загрузку и ждать пока все не загрузится
  return await new Promise ((resolve) => {
    loader.load((loader, resources) => {
      for (const texture of textures_list) {
        // console.log(resources[texture.name])
        
        sprites[texture.name] = new PIXI.Sprite(resources[texture.name].texture)
        textures[texture.name] = resources[texture.name].texture
      }
      resolve()
    })
  })
}



// PIXI.Loader.shared.add(
//   'bunny', require('../assets/textures/cat.jpg')
//   )
//   .load((loader, resources) => {
//     // This creates a texture from a 'bunny.png' image
//     const bunny = new PIXI.Sprite(resources.bunny.texture);
// });





export {loadTextures, sprites, textures}