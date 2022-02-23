import { observable, action, makeObservable } from 'mobx'

interface State {
  [property: string]: any
}

class Store {
  constructor() {
    makeObservable(this)
  }

  @observable value = 1;

  [property: string]: any

  @action setState(state: State): void {
    for (const key in state) {
      if (typeof key === 'string' && Object.hasOwnProperty.call(this, key)) {
        this[key] = state[key]
      } else {
        throw new Error(`state‘s key does not exist: ${key}`)
      }
    }
  }
}

export default new Store()
