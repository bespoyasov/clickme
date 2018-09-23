import AppState from './state'

import {
  applyStyle,
  getElement,
  getWindowSize,
} from './dom'

import getRandomInRange from './utils/random'
import inRange from './utils/inRange'

import {fromEvent} from 'rxjs/observable/fromEvent'
import {map} from 'rxjs/operators'


const button = getElement('#clickme')

const state = new AppState({
  buttonWidth: button.offsetWidth,
  buttonHeight: button.offsetHeight,

  left: 0,
  top: 0,
})


const getNewPosition = () => {
  const {width, height} = getWindowSize()

  return {
    left: getRandomInRange(0, width - state.get('buttonWidth')),
    top: getRandomInRange(0, height - state.get('buttonHeight'))
  }
}

const updateApp = () => {
  const {left, top} = getNewPosition()

  state.update({ left, top })

  applyStyle(button, {
    left: `${left}px`,
    top: `${top}px`,
  })
}



updateApp()

const source = fromEvent(document, 'mousemove')

const observable = source.pipe(
  map((event:any) => ({x: event.x, y: event.y})))

observable.subscribe(({x, y}) => {
  const left = state.get('left')
  const top = state.get('top')

  const widthRange = state.get('widthRange')
  const heightRange = state.get('heightRange')

  if (inRange(x, left, widthRange)
    && inRange(y, top, heightRange)) {
      updateApp()
    }
})


button.addEventListener('click', () => {
  button.innerHTML = 'А мышью слабо?'
})