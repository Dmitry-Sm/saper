import app from "./app"

const initControls = (params) => {
  const start_btn = document.querySelector('.start-btn')
  const exit_btn = document.querySelector('.exit-btn')
  const resume_btn = document.querySelector('.resume-btn')
  const restart_btn = document.querySelector('.restart-btn')
  const pause_btn = document.querySelector('.pause-btn')

  const start_menu = document.querySelector('.start-menu')
  const pause_menu = document.querySelector('.pause-menu')

  
  start_btn.addEventListener('click', evt => {
    start_menu.style.visibility = 'hidden'
    pause_btn.style.visibility = 'visible'
    // restart
    const text_result = document.querySelector('.game-result')
    text_result.innerHTML = ''
    app.game.start()
  })
  
  restart_btn.addEventListener('click', evt => {
    pause_menu.style.visibility = 'hidden'
    pause_btn.style.visibility = 'visible'
    // restart

    const text_result = document.querySelector('.game-result')
    text_result.innerHTML = ''
    app.game.start()
  })

  pause_btn.addEventListener('click', evt => {

    app.game.pause()
    pause_menu.style.visibility = 'visible'
    pause_btn.style.visibility = 'hidden'

  })
  
  exit_btn.addEventListener('click', evt => {
    start_menu.style.visibility = 'visible'
    pause_menu.style.visibility = 'hidden'
    app.game.stop()
    
    // clear board
    
  })
  resume_btn.addEventListener('click', evt => {
    pause_btn.style.visibility = 'visible'
    pause_menu.style.visibility = 'hidden'
    app.game.resume()
    
  })
  
}



export default initControls