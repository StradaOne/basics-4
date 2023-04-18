const UI_ELEMENTS = {
    BUTTON_START: document.getElementById('stopwatch_start'),
    BUTTON_PAUSE: document.getElementById('stopwatch_pause'),
    BUTTON_STOP: document.getElementById('stopwatch_stop'),
  }
  
  let counter = 0
  let timerId
  
  function buttonClickPlay() {
    timerId = setInterval(() => {
      counter++
      console.log(counter + ' sec.')
    }, 1000)

    UI_ELEMENTS.BUTTON_START.disabled = true
    UI_ELEMENTS.BUTTON_PAUSE.disabled = false
    UI_ELEMENTS.BUTTON_STOP.disabled = false
  }
  
  function buttonClickPause() {
    clearInterval(timerId)
    console.log('Пауза')

    UI_ELEMENTS.BUTTON_START.disabled = false
    UI_ELEMENTS.BUTTON_PAUSE.disabled = true
    UI_ELEMENTS.BUTTON_STOP.disabled = false
  }
  
  function buttonClickStop() {
    clearInterval(timerId)
    counter = 0
    console.log('Стоп')
    
    UI_ELEMENTS.BUTTON_START.disabled = false
    UI_ELEMENTS.BUTTON_PAUSE.disabled = false
    UI_ELEMENTS.BUTTON_STOP.disabled = true
  }
  
  UI_ELEMENTS.BUTTON_START.addEventListener('click', buttonClickPlay)
  UI_ELEMENTS.BUTTON_PAUSE.addEventListener('click', buttonClickPause)
  UI_ELEMENTS.BUTTON_STOP.addEventListener('click', buttonClickStop)