<template lang="pug">
  .comment(@mouseenter.stop="showReply", @mouseleave.stop="hideReply")
    .left
      img.avatar(:src="avatar")
      .name
        a(:href="`https://github.com/${name}`") {{name}}
    .right
      .time {{date}}
      .content.markdown-body(v-html="marked(body)")
      transition(enter-active-class="animated fadeIn", leave-active-class="animated fadeOut")
        .reply(v-show="reply_visiblity")
          span(@click="reply") 回复
</template>


<style lang="stylus">
@import '../assets/variables'

.comment
  &
    display flex
    flex-flow row nowrap
    box-sizing border-box
    padding-bottom 30px
    padding-top 20px
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
      &:hover
        transform scale(1.1)
        transition-duration .5s
    .name
      margin-top .5em
      &:hover
        transform translateX(2px)
  .right
    &
      flex 1
      display flex
      flex-direction column
    .time
      text-align right
      color $secondary_text_color
    .content
      overflow-x auto
      flex 1
    .reply
      text-align right
      span
        cursor pointer
        color $secondary_color
</style>


<script>
import moment from 'moment'
import marked from 'marked'

export default {
  props: ['name', 'avatar', 'body', 'time'],
  data() {
    return {
      reply_visiblity: false
    }
  },
  computed: {
    date() {
      return moment(this.time).format('YYYY-M-D HH:mm:ss');
    }
  },
  methods: {
    marked(v) {
      return marked(v || '', { sanitize: true })
        .replace(/@(\S{1,16})(?=\s)/g, '<a target="_blank" href="https://github.com/$1">@$1</a>');
    },
    reply() {
      this.$emit('reply', this.name, this.body.split(/\r?\n\r?\n/)[0]);
    },
    showReply() {
      this.reply_visiblity = true;
    },
    hideReply() {
      this.reply_visiblity = false;
    }
  }
};
</script>
