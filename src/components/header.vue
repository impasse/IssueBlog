<template lang="pug">
  div#header
    mu-appbar(:title="site_name", @click="goto('/')")
      mu-icon-button( icon="menu", slot="left", @click="toggle_drawer")
      mu-icon-menu(icon="more_vert", slot="right")
        mu-menu-item(title="Home", leftIcon="home", @click="goto('/')")
        mu-menu-item(title="Links", leftIcon="link", @click="goto('/Links')")
        mu-menu-item(title="About", leftIcon="person_pic", @click="goto('/About')")
    mu-drawer(:open="drawer_open", @close="toggle_drawer", :docked="false")
      mu-appbar(:title="site_name")
      div.icon
        img(src="//q.qlogo.cn/qqapp/100229475/2229ECE6C6AA666326E6E67A8B541781/160")
      mu-content-block(v-html="marked(site_description)", style="text-align:center")
      mu-content-block.tags
        mu-chip(v-for="tag in tags", :key="tag.name", :style="tag_color(tag)") {{tag.name}}
</template>

<style lang="stylus">
@import '../assets/variables'

#header
  .mu-appbar
    background-color $primary_color
  .mu-appbar-title > span
    cursor pointer
  .tags
    display flex
    flex-wrap wrap
    justify-content space-around
  .icon
    &
      width 100%
      height auto
      text-align center
      margin-top 20px
      margin-bottom 20px
    img
      &
        border-radius 50%
        width 160px
        height 160px
        box-shadow 0px 0px 3px #909
      &:hover
        animation rotateIn 1.2s infinite
  .mu-chip
    &
      margin-right 1px
      margin-bottom 5px
    &:hover
      animation pulse 1s infinite
</style>

<script lang="coffee">
{ site_name, site_description } = require '../const'
{ Post } = require '../model'
Utils = require '../mixin'

module.exports =
  name: 'Header'
  mixins: [ Utils ]
  mounted: () ->
    document.querySelectorAll '.mu-appbar-title>span'
    .forEach (title) =>
      title.addEventListener 'click', () =>
        if this.drawer_open
          this.drawer_open = false
        this.goto '/'
  data: () ->
    site_name: site_name
    site_description: site_description
    drawer_open: false
    tags: []
  methods:
    goto: (path) ->
      this.$router.push path
    toggle_drawer: () ->
      this.drawer_open = !this.drawer_open
      if this.tags.length == 0
        store = {}
        Post.all()
        .then (posts) =>
          posts.forEach (post) ->
            for own index, tag of post.tags
              store[tag.name] = tag.color
          this.tags = Object.entries store
            .map (kv) ->
              name: kv[0]
              color: kv[1]
</script>
