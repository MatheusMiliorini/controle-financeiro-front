import firebase from 'src/libs/firebase'
import db from 'src/libs/database'
import user from 'src/libs/user'

abstract class Model {
  abstract collectionName: string
  // Necessário para forçar o tipo
  abstract insert (data: unknown) : Promise<firebase.firestore.DocumentReference<unknown>>
  abstract read (id: string) : Promise<unknown>
  abstract update (data: unknown) : Promise<unknown>

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
  ): Array<T & { id: string }> {
    const arr = Array<T & { id: string }>(0)
    dd.docs.forEach(doc => {
      arr.push({
        ...doc.data() as T,
        id: doc.id
      })
    })
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

  protected _read<T> (id: string): Promise<T & { id: string }> {
    return new Promise((resolve, reject) => {
      db.collection(this.collectionName)
        .doc(id)
        .get()
        .then(res => {
          resolve({
            ...res.data() as T,
            id
          })
        })
        .catch(err => reject(err))
    })
  }

  protected _update<T extends IRecord> (data: T): Promise<T> {
    return new Promise((resolve, reject) => {
      db.collection(this.collectionName)
        .doc(data.id)
        .update({
          ...data,
          id: undefined
        })
        .then(() => resolve(data))
        .catch(err => reject(err))
    })
  }

  delete (id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      db.collection(this.collectionName)
        .doc(id)
        .delete()
        .then(() => resolve())
        .catch(err => reject(err))
    })
  }
}

interface IRecord {
  id: string
}

export default Model
