<template>
  <q-dialog v-model="value">
    <q-card class="full-width full-height">
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
            <!-- Cor Ícone -->
            <div class="col-6">
              <q-input
              type="text"
              v-model="form.iconColor"
              label="Cor"
              ref="fct_color"
              readonly
              hide-bottom-space
              :rules="[val => !! val || 'Campo Obrigatório!']"
            >
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer" color="primary">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-color
                      v-model="form.iconColor"
                      no-header
                      no-footer
                      default-view="palette"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            </div>
            <!-- Ícone -->
            <div class="col-6">
              <q-input
                type="text"
                v-model="form.icon"
                label="Ícone"
                ref="fac_icon"
                hide-bottom-space
                :rules="[val => !! val || 'Campo Obrigatório!']"
              >
                <template v-if="form.icon" v-slot:prepend>
                  <q-icon :name="form.icon" class="cursor-pointer" :style="`color: ${form.iconColor}`" />
                </template>
                <template v-slot:append>
                  <q-icon name="extension" class="cursor-pointer" color="primary">
                    <q-popup-proxy>
                      <q-icon-picker
                        v-model="form.icon"
                        icon-set="material-icons"
                        :pagination.sync="iconPagination"
                        :color="form.iconColor"
                        style="height: 300px; width: 300px; background-color: white;"
                        :filter="form.icon"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </q-form>
      </q-card-section>

      <div class="absolute-bottom">
        <q-separator />
        <q-card-actions align="right">
          <q-btn @click="$emit('input', false)" flat color="grey-9" label="Cancelar" />
          <q-btn @click="submitForm()" flat color="primary" label="Salvar" />
        </q-card-actions>
      </div>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">

import Vue from 'vue'
import Category, { ICategory, isFullCategory } from 'src/classes/Category'
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
        id: undefined,
        name: '',
        icon: '',
        iconColor: ''
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
          if (isFullCategory(this.form)) {
            cat.update(this.form)
              .then(doc => {
                ntf.success('Categoria atualizada com sucesso!')
                this.$emit('submit', doc)
                this.$emit('input', false)
              }).catch(() => {
                ntf.error('Ocorreu um erro ao inserir a categoria!')
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
