<template lang="pug">
  div#content
    mu-snackbar(v-if="snackbar", :message="message", action="close", @actionClick="close_snackbar", @close="close_snackbar")
    mu-row(v-for="post in posts")
      mu-col(width="95", tablet="85", desktop="80", class="post")
        mu-card.card
          div(@click="read_more(post.number)")
            mu-card-title(:title="post.title", :subTitle="'Posted at '+ format_date(post.date)")
          mu-card-text(v-html="marked(init(post.body))", class="markdown-body text")
          div.tags_more
            div.tags
              mu-chip(v-for="tag in post.tags", :style="tag_color(tag)") {{tag.name}}
            mu-card-actions.actions
              mu-raised-button(icon="library_books", class="more", label="MORE", secondary, @click="read_more(post.number)")
</template>

<style lang="stylus">
@import '../assets/variables'

#content
  &
    display flex
    flex-direction column
    min-height calc(100vh - 196px - 64px)
  .post:first-child
    margin-top 20px
  .card
    &
      padding 20px
      border-radius 5px
    @media screen and (max-width: 700px)
      &
        padding: 0
        padding-bottom 10px
  .mu-card-title
    cursor pointer
    user-select none
  .mu-card-sub-title
    &::before
      font-family "Material Icons"
      content "\E916"
      display inline-block
      vertical-align top
    &
      padding-bottom 3px
      border-bottom 1px dashed #ccc
  .tags_more
    display flex
    flex-direction row
    justify-content space-between
    margin-left 16px
    margin-right 16p
  .tags
    &
      flex 1
      display flex
      flex-direction row
      align-items center
    .mu-chip
      &
        margin-right 1px
      &:hover
        animation pulse 1s infinite
  .text
    margin-bottom 60px
  .actions
    .mu-raised-button-secondary
      background-color $secondary_color
  .row
      justify-content: center
</style>

<script lang="coffee">
{ owner, repo, site_name } = require '../const'
Utils = require '../mixin'
{ Post } = require '../model'

module.exports =
  name: 'List'
  mixins: [ Utils ]
  data: () ->
    snackbar: false
    message: '',
    posts: []
  created: () ->
    Post.all()
      .then (posts) =>
        this.posts = posts
      .catch (err) =>
        this.message = err.toString()
        this.snackbar = true
  mounted: () ->
    document.title = site_name
  methods:
    read_more: (number) ->
       this.$router.push '/post/' + number
       window.scrollTo 0, 0
    close_snackbar: () ->
      this.snackbar = false
</script>
