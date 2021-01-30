import firebase from 'src/libs/firebase'
import 'firebase/auth'
import 'firebase/firestore'

const db = firebase.firestore()

// Consultas Offline
db.enablePersistence()

export default db
