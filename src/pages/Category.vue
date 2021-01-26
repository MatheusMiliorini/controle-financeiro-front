<template>
  <q-page padding>

    <category-form
      v-model="categoryForm"
      @submit="fetchCategories"
    />

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="openCategoryForm()" />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">

import Vue from 'vue'
import CategoryForm from '../components/Forms/Category.vue'
// import db from 'src/libs/database'
import user from 'src/libs/user'
import firebase from 'src/libs/firebase'
import Category from 'src/classes/Category'

export default Vue.extend({
  name: 'Category',
  components: {
    CategoryForm
  },
  created () {
    this.fetchCategories()
  },
  data () {
    return {
      categoryForm: false,
      categories: Array<firebase.firestore.DocumentData>(0)
    }
  },
  methods: {
    openCategoryForm () {
      this.categoryForm = true
    },
    fetchCategories () {
      const userId = user.getUid()
      if (!userId) return

      const cat = new Category()
      cat.query(query => {
        return query.orderBy('name')
      }).then(data => {
        // Limpa a array
        this.categories = []
        // Adiciona a lista completa
        this.categories = data
      })
    }
  }
})
</script>
