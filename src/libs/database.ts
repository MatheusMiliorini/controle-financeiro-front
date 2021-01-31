import firebase from 'src/libs/firebase'
import 'firebase/auth'
import 'firebase/firestore'
import ntf from 'src/libs/notify'

const db = firebase.firestore()

// Consultas Offline
db.enablePersistence()
  .then(() => {
    ntf.success('Persistencia Offline configurada com sucesso!')
  })
  .catch((err : { code: string }) => {
    ntf.warn('Não foi possível configurar a persistência de dados Offline')
    if (err.code === 'failed-precondition') {
      console.warn('[PERSISTENCE]: Multiple tabs open, persistence can only be enabled in one tab at a a time.')
    } else if (err.code === 'unimplemented') {
      console.warn('[PERSISTENCE]: The current browser does not support all of the features required to enable persistence')
    }
  })

export default db
