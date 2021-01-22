<template>
  <q-layout view="hHh LpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="leftDrawer = !leftDrawer" />

        <q-toolbar-title>
          Controle Financeiro
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawer" side="left" bordered>
      <q-list bordered separator>
        <drawer-link link="/contas" title="Contas" icon="account_balance" />
        <drawer-link link="/categorias" title="Categorias" icon="category" />
        <drawer-link link="/logout" title="Logout" icon="exit_to_app" />
      </q-list>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">

import { defineComponent } from '@vue/composition-api'

import DrawerLink from '../components/DrawerLink.vue'

import firebase from '../libs/firebase'
import 'firebase/analytics'

// Initialize Firebase
firebase.analytics()

export default defineComponent({
  components: {
    DrawerLink
  },
  data () {
    return {
      leftDrawer: false
    }
  }
})
</script>
