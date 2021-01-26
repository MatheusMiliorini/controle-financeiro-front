import Model from './Model'
import firebase from 'src/libs/firebase'

class Category extends Model {
  collectionName = 'category'

  insert (data: ICategory) : Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>> {
    return new Promise((resolve, reject) => {
      super.insert(data)
        .then(val => resolve(val))
        .catch(e => reject(e))
    })
  }
}

interface ICategory {
  name: string,
  icon: string,
  iconColor: string
}

export default Category
