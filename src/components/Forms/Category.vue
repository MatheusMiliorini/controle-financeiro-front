<template>
  <q-dialog v-model="value">
      <q-card class="full-width full-height">
        <q-card-section class="bg-primary" style="text-align: center; font-weight: bold">
          <span style="color: white">Categoria</span>
        </q-card-section>
        <q-card-section>
          <q-form>
            <div class="row">
              <div class="col-12">
                <q-input
                  label="Nome *"
                  filled
                  hide-bottom-space
                  :rules="[val => !! val || 'Campo Obrigatório!']"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>

        <div class="absolute-bottom">
          <q-separator />

          <q-card-actions align="right">
            <q-btn @click="$emit('input', false)" flat color="grey-9" label="Cancelar" />
            <q-btn flat color="primary" round label="Salvar" />
          </q-card-actions>
        </div>
      </q-card>
    </q-dialog>
</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  name: 'CategoryForm',
  props: {
    value: Boolean
  }
})
</script>
