<template>
  <q-page padding>

    <category-form v-model="categoryForm" />

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="openCategoryForm()" />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">

import Vue from 'vue'

import CategoryForm from '../components/Forms/Category.vue'

export default Vue.extend({
  name: 'Category',
  components: {
    CategoryForm
  },
  data () {
    return {
      categoryForm: false
    }
  },
  methods: {
    openCategoryForm () {
      this.categoryForm = true
    }
  }
})
</script>
