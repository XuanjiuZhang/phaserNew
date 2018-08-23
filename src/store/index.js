import { configure } from 'mobx'
import axios from 'axios'
import MyGameStore from './MyGameStore'
import GameRuntime from './GameRuntime'
configure({ enforceActions: true })

class RootStore {

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : ''
    })
    this.gameRuntime = new GameRuntime(this)
    this.myGameStore = new MyGameStore(this)
  }
}

export default new RootStore()