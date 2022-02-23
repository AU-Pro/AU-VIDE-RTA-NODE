import { observable, action, makeObservable } from 'mobx'

class CommonStore {
  [property: string]: any

  constructor() {
    makeObservable(this)
  }

  @observable baseInfo = {}

  @observable language = 'zh-CN'

  @action
  setState(state: any): void {
    for (const property in state) {
      if (Object.hasOwnProperty.call(state, property)) {
        this[property] = state[property]
      } else {
        throw new Error(`state‘s property does not exist: ${property}`)
      }
    }
  }
}

export default new CommonStore()
