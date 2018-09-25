import AppState from './state'

import {
  applyStyle,
  getElement,
  getWindowSize,
} from './dom'

import getRandomInRange from './utils/random'
import inRange from './utils/inRange'

import {fromEvent} from 'rxjs/observable/fromEvent'
import {map, filter} from 'rxjs/operators'


type MouseCoords = {
  x: number,
  y: number,
}

type ButtonPosition = {
  left: number,
  top: number,
}


const button = getElement('#clickme')

const state = new AppState({
  buttonWidth: button.offsetWidth,
  buttonHeight: button.offsetHeight,

  left: 0,
  top: 0,
})


const getNewPosition = (): ButtonPosition => {
  const {width, height} = getWindowSize()

  return {
    left: getRandomInRange(0, width - state.get('buttonWidth')),
    top: getRandomInRange(0, height - state.get('buttonHeight'))
  }
}

const shouldUpdateApp = ({x, y}: MouseCoords): boolean => {
  const {top, left, widthRange, heightRange} = state.get()
  return inRange(x, left, widthRange) 
      && inRange(y, top, heightRange)
}

const updateApp = () => {
  const {left, top} = getNewPosition()
  state.update({ left, top })

  applyStyle(button, {
    left: `${left}px`,
    top: `${top}px`,
  })
}


const source = fromEvent(document, 'mousemove')

const observable = source.pipe(
  map((event: MouseEvent): MouseCoords => 
    ({ x: event.x, y: event.y })),
  filter(shouldUpdateApp))

observable.subscribe(() => updateApp())



updateApp()

button.addEventListener('click', () => {
  button.innerHTML = 'А мышью слабо?'
})