<template>
  <q-dialog v-model="value">
    <q-card class="full-width" style="height: 300px">
      <q-card-section class="bg-primary" style="text-align: center; font-weight: bold">
        <span style="color: white">Categoria</span>
      </q-card-section>
      <q-card-section>
        <q-form ref="form" @submit="handleSubmit">
          <div class="row q-col-gutter-md">
            <!-- Nome -->
            <div class="col-12">
              <q-input
                v-model="form.name"
                label="Nome *"
                filled
                hide-bottom-space
                :rules="[val => !! val || 'Campo Obrigatório!']"
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="form.emoji"
                label="Emoji"
                filled
                hint="Dê um estilo à sua categoria! 😎"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>

      <div class="absolute-bottom">
        <q-separator />
        <q-card-actions align="right">
          <q-btn @click="$emit('input', false)" flat color="grey-9" label="Cancelar" />
          <q-btn v-if="id" @click="$emit('delete', id, form.name)" flat color="negative" label="Excluir" />
          <q-btn @click="submitForm()" flat color="primary" label="Salvar" />
        </q-card-actions>
      </div>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">

import Vue from 'vue'
import Category, { ICategory } from 'src/classes/Category'
import user from 'src/libs/user'
import ntf from 'src/libs/notify'
import { VForm } from 'src/types/VForm'

const cat = new Category()

export default Vue.extend({
  name: 'CategoryForm',
  props: {
    value: Boolean,
    id: String
  },
  data () {
    return {
      form: <ICategory>{
        name: '',
        emoji: null
      },
      iconPagination: {
        itemsPerPage: 35,
        page: 0
      }
    }
  },
  watch: {
    value (val: boolean) {
      if (val && this.id) {
        this.loadCategory()
      }
    }
  },
  methods: {
    submitForm () {
      (this.$refs.form as VForm).submit()
    },
    handleSubmit () {
      (this.$refs.form as VForm).validate()
        .then(valid => {
          if (!valid) return

          const userId = user.getUid()
          if (!userId) return

          // Update
          if (this.id) {
            cat.update(this.id, this.form)
              .then(doc => {
                ntf.success('Categoria atualizada com sucesso!')
                this.$emit('submit', doc)
                this.$emit('input', false)
              }).catch(() => {
                ntf.error('Ocorreu um erro ao atualizar a categoria!')
              })
          } else { // Insert
            cat.insert(this.form)
              .then((doc) => {
                ntf.success('Categoria inserida com sucesso!')
                this.$emit('submit', doc)
                this.$emit('input', false)
              }).catch(() => {
                ntf.error('Ocorreu um erro ao inserir a categoria!')
              })
          }
        })
    },
    loadCategory () {
      cat.read(this.id)
        .then(res => {
          this.form = res
        })
    }
  }
})
</script>
