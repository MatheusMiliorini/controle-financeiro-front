<template>
  <q-page>
    <q-list bordered separator>
      <q-slide-item
        v-for="cat in categories"
        :key="cat.id"
        clickable v-ripple
        @click="openCategory(cat.id || '')"
        @left="({reset}) => askDelete(cat.id, cat.name, reset)"
        left-color="red"
      >
        <template v-slot:left>
          <q-icon name="delete" />
        </template>

        <q-item style="font-size: 22px">
          <q-item-section v-if="cat.emoji" avatar>
            {{ cat.emoji }}
          </q-item-section>

          <q-item-section>
            {{ cat.name }}
          </q-item-section>
        </q-item>
      </q-slide-item>
    </q-list>

    <category-form
      v-model="categoryForm"
      @submit="fetchCategories"
      :id="catId"
      @delete="askDelete"
      :key="formKey"
    />

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="openCategoryForm()" />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">

import Vue from 'vue'
import CategoryForm from '../components/Forms/Category.vue'
import user from 'src/libs/user'
import Category, { ICategory } from 'src/classes/Category'
import ntf from 'src/libs/notify'
import { Dialog } from 'quasar'

const cat = new Category()

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
      categories: Array<ICategory & { id: string }>(0),
      catId: '',
      formKey: false
    }
  },
  watch: {
    categoryForm: function (val: boolean) {
      if (!val) {
        setTimeout(() => {
          this.catId = ''
          this.formKey = !this.formKey
        }, 500)
      }
    }
  },
  methods: {
    openCategoryForm () {
      this.categoryForm = true
    },
    fetchCategories () {
      const userId = user.getUid()
      if (!userId) return

      cat.query<ICategory>(query => {
        return query.orderBy('name')
      }).then(data => {
        // Limpa a array
        this.categories = []
        // Adiciona a lista completa
        this.categories = data
      })
    },
    openCategory (id: string) {
      this.catId = id
      this.categoryForm = true
    },
    askDelete (id: string, name: string, reset?: () => void) {
      Dialog.create({
        title: 'Deletar',
        message: `Tem certeza de que deseja deletar a categoria "${name}"?`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        cat.delete(id)
          .then(() => {
            ntf.success('Categoria excluída com sucesso!')
            // Fecha o form se veio do componente filho
            if (this.categoryForm) {
              this.categoryForm = false
            }
            // Reset do slider
            if (reset) {
              reset()
            }
            // Busca a lista novamente
            this.fetchCategories()
          })
      }).onCancel(() => {
        if (reset) {
          reset()
        }
      })
    }
  }
})
</script>
