<template lang="pug">
div.comment
  div.left
    img.avatar(:src="avatar")
    div.name
      a(:href="`https://github.com/${name}`") {{name}}
  div.right
    div.time {{date}}
    div.content(v-html="marked(body)")
</template>


<style lang="stylus">
@import '../assets/variables'

.comment
  &
    display flex
    flex-flow row nowrap
    padding-bottom 30px
    margin-bottom 20px
    border-bottom 1px dashed #fcf
  .left
    &
      margin-left -30px
      width 200px
      text-align center
      @media screen and (max-width: 700px)
        width 150px
    .avatar
      width 90px
      height 90px
      border-radius 50% 50%
      display inline-block
      background-color pink
    .name
      margin-top .5em
  .right
    &
      flex 1
    .time
      text-align right
      color $secondary_text_color
    .content
      overflow-x auto
</style>


<script>
import moment from 'moment'
import marked from 'marked'

export default {
  props: ['name', 'avatar', 'body', 'time'],
  computed: {
    date() {
      return moment(this.time).format('YYYY-M-D HH:mm:ss');
    }
  },
  methods: {
    marked(v) {
      return marked(v || '', { sanitize: true })
        .replace(/@(\S{1,16})(?=\s)/g, '<a class="at" href="https://github.com/$1">@$1</a>');
    }
  }
};
</script>
