import firebase from 'src/libs/firebase'
import db from 'src/libs/database'
import user from 'src/libs/user'

abstract class Model {
  abstract collectionName: string
  // Necessário para forçar o tipo
  abstract insert(data: unknown) : Promise<firebase.firestore.DocumentReference<unknown>>

  /**
   * Realiza a query na collection
   * @param queryFilter
   */
  async query<T> (
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
    return this.parseDocumentData<T>(result)
  }

  /**
   * Itera todos os dados da QuerySnapshot
   */
  private parseDocumentData<T> (
    dd: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  ): Array<T> {
    const arr = Array<T>(0)
    dd.docs.forEach(doc => { arr.push(doc.data() as T) })
    return arr
  }

  protected _insert<T> (data: T) : Promise<firebase.firestore.DocumentReference<T>> {
    return new Promise((resolve, reject) => {
      db.collection(this.collectionName)
        .add({ ...data, userId: user.getUid() })
        .then(val => resolve(val as firebase.firestore.DocumentReference<T>))
        .catch(e => reject(e))
    })
  }
}

export default Model
