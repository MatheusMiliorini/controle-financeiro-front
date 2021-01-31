import { Notify } from 'quasar'

export default {
  error (val: string) {
    Notify.create({
      message: val,
      icon: 'error',
      color: 'negative',
      html: true,
      closeBtn: '👌'
    })
  },
  warn (val: string) {
    Notify.create({
      message: val,
      icon: 'warning',
      color: 'warning',
      html: true,
      closeBtn: '👌'
    })
  },
  success (val: string) {
    Notify.create({
      message: val,
      icon: 'done',
      color: 'positive',
      html: true,
      closeBtn: '👌'
    })
  }
}
