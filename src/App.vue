<template>
  <div class="main">
    <app-header/>
    <div class="content">
      <router-view/>
    </div>
    <app-footer/>
  </div>
</template>

<script>
import AppHeader from './components/Header.vue'
import AppFooter from './components/Footer.vue'
import AppPost from './components/Post.vue'

import './assets/style.css'
import 'font-awesome/css/font-awesome.css'

export default {
  name: 'app',
  components: {
    AppHeader,
    AppFooter
  }
}

</script>

<style>
</style>
