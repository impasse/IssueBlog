<template lang="pug">
  div#post
    mu-snackbar(v-if="snackbar", :message="message", action="Close", @actionClick="close_snackbar", @close="close_snackbar")
    mu-row
      mu-col(width="95", tablet="85", desktop="80")
        mu-paper.post(:zDepth="3")
          div.title {{title}}
          div.date Posted at {{format_date(date)}}
          div.body.markdown-body(v-html="marked(body)")
          div.tags
            mu-chip(v-for="tag in tags", :key="tag.name", :style="tag_color(tag)") {{tag.name}}
    mu-row.row(v-if="!locked")
      mu-col(width="95", tablet="85", desktop="80")
        mu-paper.post(:zDepth="3")
          div#comment-box
            duo-shuo(domain="zyymoe", :thread="thread")
</template>

<style lang="stylus">
@import '../assets/variables'

#post
  .row
    justify-content center
  .post
    margin-top 50px
    padding 40px
    padding-top 20px
  @media screen and (max-width: 700px)
    & .post
      padding 16px
      margin-top 20px
  .title
    font-size 24px
    line-height 36px
    width 100%
    padding-bottom 5px
    color $primary_text_color
  .date
    &
      font-size 16px
      color #666
      margin-bottom .5em
      border-bottom 1px dashed #ccc
    &::before
      font-family "Material Icons"
      content "\E916"
      display inline-block
      vertical-align top
      margin-right 3px
  .tags
    margin-top 20px
    padding-top 20px
    border-top 1px dashed #ccc
  .mu-chip
    &
      margin-right 5px
    &:hover
      animation pulse 1s infinite
</style>

<script lang="coffee">
{ owner, repo, site_name } = require '../const'
Utils = require '../mixin'
{ Post } = require '../model'
DuoShuo = require 'vue-duoshuo'
  .default

module.exports =
  name: 'Post'
  mixins: [ Utils ]
  data: () ->
    title: ''
    date: ''
    body: ''
    state: ''
    locked: false
    tags: []
    snackbar: false
    message: ''
  computed:
    thread: () ->
      this.$route.params.number
  created: () ->
    Post.get this.$route.params.number
    .then (post) =>
      Object.assign this, post
    .catch (err) =>
      this.message = err.toString()
      this.snackbar = true
  watch:
    title: () ->
      document.title = "#{this.title} | #{site_name}"
  methods:
    close_snackbar: () ->
      this.snackbar = false
  components:
    DuoShuo: DuoShuo
</script>
