<template lang="pug">
  div#page(@animationend="removeAnim")
    mu-row
      mu-col(width="95", tablet="85", desktop="80")
        mu-paper(:zDepth="3")
          div.title(v-show="title.length!==0") {{title}}
          div.body(v-html="marked(body)")
</template>

<style lang="stylus">
#page
  &
    min-height calc(100vh - 260px)
    display flex
    flex-direction column
  .row
    &
      justify-content center
      flex 1
  .title
    font-size 3em
    border-bottom 1px dashed #ccc
  .mu-paper
    margin-top 30px
    min-height 400px
    padding 30px
</style>

<script lang="coffee">
{ pages, site_name } = require '../const'
Utils = require '../mixin'

module.exports =
  name: 'Page'
  mixins: [ Utils ]
  data: () ->
    body: 'Connecting to misaka network...'
    title: 'Loading...'
  mounted: ()->
    this.refresh_page()
  methods:
    refresh_page: () ->
      current = pages[this.$route.path]
      if current
        Object.assign this, current
      else
        Object.assign this, pages[404]
    removeAnim: () ->
      this.$el.classList.remove 'animated', 'bounceInLeft'
  watch:
    title: () ->
      document.title = "#{this.title} - #{site_name}"
    $route: () ->
      this.$el.classList.add('animated','bounceInLeft')
      this.refresh_page()
</script>
