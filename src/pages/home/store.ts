import { observable, action, makeObservable } from 'mobx'

class Store {
  [property: string]: any

  constructor() {
    makeObservable(this)
  }

  @observable value = 1

  @action setState(state: any): void {
    for (const property in state) {
      if (typeof property === 'string' && Object.hasOwnProperty.call(this, property)) {
        this[property] = state[property]
      } else {
        throw new Error(`state‘s property does not exist: ${property}`)
      }
    }
  }
}

export default new Store()
