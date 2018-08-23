import { observable, computed, action, decorate, autorun, reaction, when, configure, toJS } from 'mobx'

class GameStore {

  rootStore

  constructor(rootStore) {
    this.rootStore = rootStore
  }

}

export default GameStore