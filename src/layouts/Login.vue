<template>
  <q-layout view='hHh Lpr fFf' class='column justify-center'>
    <!-- <q-page-container>
      <router-view />
    </q-page-container> -->
    <div id='firebaseui-auth-container' />
  </q-layout>
</template>

<script lang='ts'>

import Vue from 'vue'

import user from 'src/libs/user'
import firebase from '../libs/firebase'
import 'firebase/analytics'
import 'firebase/auth'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

// Initialize Firebase
firebase.analytics()

export default Vue.extend({
  name: 'Login',
  data () {
    return {

    }
  },
  created () {
    this.setupLoginListener()
  },
  mounted () {
    this.setupLoginUI()
  },
  methods: {
    setupLoginUI () {
      const ui = new firebaseui.auth.AuthUI(firebase.auth())
      ui.start('#firebaseui-auth-container', {
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: '/'
      })
    },
    setupLoginListener () {
      // Aguarda o usuário fazer login
      firebase.auth().onAuthStateChanged(_user => {
        if (!_user) return
        user.setUser(_user)
        this.$router.push('/')
      })
    }
  }
})
</script>
