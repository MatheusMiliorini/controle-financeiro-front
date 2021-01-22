<template>
  <q-page padding>
    <!-- content -->
  </q-page>
</template>

<script lang="ts">

import firebase from '../libs/firebase'
import 'firebase/auth'

import Vue from 'vue'

export default Vue.extend({
  name: 'Logout',
  created () {
    this.logout()
  },
  methods: {
    logout () {
      firebase.auth().signOut()
        .then(() => {
          this.$q.localStorage.remove('user')
          this.$router.push('/login')
        })
    }
  }
})
</script>
