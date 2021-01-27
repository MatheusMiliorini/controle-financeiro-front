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
}

export interface ICategory {
  name: string,
  icon: string,
  iconColor: string
}

export default Category
