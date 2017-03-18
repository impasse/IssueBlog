<template lang="pug">
  div#app
    app-header
    transition(enter-active-class="animated bounceInLeft")
      router-view
    app-footer
    transition(enter-active-class="animated fadeIn", leave-active-class="animated fadeOut")
      mu-float-button(:icon="fab", v-show="show_fab", class="float-button", secondary, @click="click_fab")
</template>

<script lang="coffee">
AppHeader = require './components/header.vue'
AppFooter = require './components/footer.vue'

module.exports = 
  name: 'App'
  data: () ->
    fab: 'home'
    show_fab: false
  created: () ->
    window.addEventListener 'scroll', (event) =>
      this.update_fab()
  watch:
    $route: () ->
      this.update_fab()
  methods:
    update_fab: () ->
      pos = window.scrollY ?= document.documentElement.scrollTop
      this.fab = if pos <= 300 then 'home' else 'keyboard_arrow_up'
      this.show_fab = !(this.$route.name == 'home' && this.fab == 'home')
    click_fab: () ->
      if this.fab == 'home'
        this.$router.push '/'
      else
        window.scrollTo 0, 0
  components:
    AppHeader: AppHeader
    AppFooter: AppFooter
</script>

<style lang="stylus">
@import './assets/variables'

#app
  &
    height 100%
  &::before
    content ''
    position absolute
    width 100%
    height 100%
    background linear-gradient(to bottom, #5C6BC0 65%, $background_color 35%)
    z-index -100
.float-button
  position fixed
  z-index 1000;
  right 25px
  bottom 20px
  background: $secondary_color
</style>
