import Model from './Model'
import firebase from 'src/libs/firebase'

class Category extends Model {
  collectionName = 'category'

  insert (data: ICategory) : Promise<firebase.firestore.DocumentReference<ICategory>> {
    return new Promise((resolve, reject) => {
      this._insert(data)
        .then(v => resolve(v))
        .catch(e => reject(e))
    })
  }

  read (id: string): Promise<ICategory> {
    return new Promise((resolve, reject) => {
      this._read<ICategory>(id)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  update (id: string, data: ICategory): Promise<ICategory> {
    return new Promise((resolve, reject) => {
      this._update(id, data)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }
}

export interface ICategory {
  name: string,
  emoji: string|null
}

export default Category
