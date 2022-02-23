import { observable, makeObservable } from 'mobx'
// action

class CommonStore {
  constructor() {
    makeObservable(this)
  }

  @observable emojiInfo = {}

  // @action
  // setState(state: any) {
  //   for (const key in state) {
  //     if (Object.hasOwnProperty.call(state, key)) {
  //       this[key] = state[key]
  //     }
  //   }
  // }
}

export default new CommonStore()
