<template lang="pug">
  div#post
    mu-snackbar(v-if="snackbar", :message="message", action="登陆", @actionClick="login", @close="close_snackbar")
    mu-row
      mu-col(width="95", tablet="85", desktop="80")
        mu-paper.post(:zDepth="3")
          div.title {{title}}
          div.date Posted at {{format_date(date)}}
          div.body.markdown-body(v-html="marked(body)")
          div.tags
            mu-chip(v-for="tag in tags", :key="tag.name", :style="tag_color(tag)") {{tag.name}}
    mu-row.row(v-if="state ==='open'")
      mu-col(width="95", tablet="85", desktop="80")
        mu-paper.post(:zDepth="3")
          div#comment-box
            div#title 评论列表
            div(v-if="comments.length")
              div(v-for="comment in comments")
                comment(:name="comment.user.login", :avatar="comment.user.avatar_url", :body="comment.body", :time="comment.updated_at")
            div(v-else)
              div#no-comment 暂时没有评论呢，快留一个吧
          submit
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
  #comment-box
    &
      display: flex
      flex-flow column nowrap
    #title
      font-size 24px
      color $primary_text_color
      margin-top 12px
      margin-bottom 12px
    #no-comment
      text-align center
      height 200px
      line-height 200px
      color $secondary_text_color
      font-size 20px
</style>

<script>
import { mapState } from 'vuex'
import { owner, repo, site_name } from '../const'
import Util from '../mixin'
import { Post, Comment } from '../model'
import { loginByGithub } from '../util'

export default {
  name: 'Post',
  mixins: [Util],
  data() {
    return {
      snackbar: false,
      message: ''
    };
  },
  computed: {
    id() {
      return this.$route.params.number;
    },
    ...mapState({
      title: state => state.current_post.title,
      date: state => state.current_post.date,
      body: state => state.current_post.body,
      state: state => state.current_post.state,
      tags: state => state.current_post.tags,
      comments: 'current_comments'
    })
  },
  async created() {
    try {
      await Promise.all([
        this.$store.dispatch('fetchPost', this.id),
        this.$store.dispatch('fetchComments', this.id)
      ]);
    } catch (e) {
      this.message = '加载出错，你可以尝试登陆后重试';
      this.snackbar = true;
    }
  },
  watch: {
    title() {
      document.title = `${this.title} | ${site_name}`
    }
  },
  methods: {
    close_snackbar() {
      this.snackbar = false;
    },
    async login() {
      const code = await loginByGithub();
      await this.$store.dispatch('exchangeToken', code);
      await await Promise.all([
        this.$store.dispatch('fetchPost', this.id),
        this.$store.dispatch('fetchComments', this.id)
      ]);
    },
  },
  components: {
    Comment: require('./comment'),
    Submit: require('./submit')
  }
};
</script>
