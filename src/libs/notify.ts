import { Notify } from 'quasar'

export default {
  error (val: string) {
    Notify.create({
      message: val,
      icon: 'error',
      color: 'negative',
      html: true
    })
  },
  warn (val: string) {
    Notify.create({
      message: val,
      icon: 'warning',
      color: 'warning',
      html: true
    })
  },
  success (val: string) {
    Notify.create({
      message: val,
      icon: 'done',
      color: 'positive',
      html: true
    })
  }
}
