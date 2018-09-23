interface IStateData {
  // mandatory
  left: number,
  top: number,

  // optionals
  buttonWidth?: number,
  buttonHeight?: number,

  // computables
  widthRange?: number,
  heightRange?: number,
}


class AppState {
  state: IStateData

  constructor(data: IStateData) {
    this.state = {...data}
    this._compute()
  }

  _compute() {
    const {
      buttonHeight=0,
      buttonWidth=0,
      left=0, 
      top=0,
    } = this.state

    this.state.widthRange = left + buttonWidth
    this.state.heightRange = top + buttonHeight
  }

  
  get(field: string): any {
    return this.state[field]
  }

  set(field: string, value: any) {
    this.state[field] = value
  }

  update(data: IStateData) {
    this.state = {...this.state, ...data}
    this._compute()
  }
}


export default AppState