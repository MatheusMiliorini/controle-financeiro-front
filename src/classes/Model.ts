import firebase from 'src/libs/firebase'
import db from 'src/libs/database'
import user from 'src/libs/user'

abstract class Model {
  abstract collectionName: string

  /**
   * Realiza a query na collection
   * @param queryFilter
   */
  async query (
    queryFilter?: (query: firebase.firestore.Query) => firebase.firestore.Query
  ) {
    const collection = db
      .collection(this.collectionName)
      .where('userId', '==', user.getUid()) // Restrição a partir do Model

    let result: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>

    if (queryFilter) {
      result = await queryFilter(collection).get()
    } else {
      result = await collection.get()
    }
    return this.parseDocumentData(result)
  }

  /**
   * Itera todos os dados da QuerySnapshot
   */
  private parseDocumentData (
    dd: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  ): Array<firebase.firestore.DocumentData> {
    const arr = Array<firebase.firestore.DocumentData>(0)
    dd.docs.forEach(doc => { arr.push(doc.data()) })
    return arr
  }

  protected insert (data: firebase.firestore.DocumentData) : Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>> {
    return new Promise((resolve, reject) => {
      db.collection(this.collectionName)
        .add({ ...data, userId: user.getUid() })
        .then(val => { resolve(val) })
        .catch(e => { reject(e) })
    })
  }
}

export default Model
