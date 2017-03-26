<template lang="pug">
div#submit
  mu-toast(v-if="showToast",:message="message" @close="hideToast")
  div#title
    span(v-if="!userName").
      #[span.login(@click="login") 登陆]后就可以评论了呢
    span(v-else).
      Hi {{userName}} #[span.logout(@click="logout") (注销)]，欢迎评论哦
  mu-text-field(hintText="回复内容(必填)", :multiLine="true", :rows="10", :fullWidth="true", v-model="content")
  mu-raised-button(label="提交", @click="submit", :disabled="!userName || !content", secondary)
</template>


<style lang="stylus">
@import '../assets/variables'

#submit
  #title
    font-size 24px
    color $primary_text_color
    margin-bottom 20px
    .login, .logout
      cursor pointer
      color $secondary_color
    .logout
      font-size 20px
</style>


<script>
import { mapState } from 'vuex'
import { Comment } from '../model'
import { loginByGithub } from '../util'

export default {
  name: 'Submit',
  data() {
    return {
      content: '',
      showToast: false,
      message: ''
    };
  },
  computed: {
    guide() {
      if (this.userName) {
        return `Hello ${this.userName}<span class="small">（登出）</span>，欢迎评论哦`;
      } else {
        return `登陆后就可以评论了呢`
      }
    },
    ...mapState({
      userName: state => state.user.name || state.user.login
    })
  },
  methods: {
    async login() {
      const code = await loginByGithub();
      this.$store.dispatch('exchangeToken', code);
    },
    async logout() {
      this.$store.dispatch('logout');
    },
    async submit() {
      await Comment.create(this.$route.params.number, this.content);
      this.message = '发布成功';
      this.showToast = true;
      this.content = '';
      this.$store.dispatch('fetchComments', this.$route.params.number);
    },
    hideToast() {
      this.showToast = false;
    }
  }
};
</script>