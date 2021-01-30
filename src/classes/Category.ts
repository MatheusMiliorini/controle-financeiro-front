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

  update (data: IFullCategory): Promise<IFullCategory> {
    return new Promise((resolve, reject) => {
      this._update(data)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }
}

export interface ICategory {
  id?: string,
  name: string,
  icon: string,
  iconColor: string
}

export interface IFullCategory extends ICategory {
  id: string
}

export function isFullCategory (category: ICategory): category is IFullCategory {
  return category.id !== undefined
}

export default Category
