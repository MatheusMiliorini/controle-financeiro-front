import { LocalStorage } from 'quasar'
import firebase from './firebase'

export default {
  logged () : boolean {
    return LocalStorage.has('user')
  },

  setUser (user : firebase.User) {
    LocalStorage.set('user', user)
  },

  getUser () : firebase.User|null {
    if (this.logged()) {
      return LocalStorage.getItem<firebase.User>('user')
    } else {
      return null
    }
  },

  getUid () : string|null {
    const user = this.getUser()
    if (user) {
      return user.uid
    } else {
      return null
    }
  }
}
