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
            mu-chip(v-for="tag in tags", :style="tag_color(tag)") {{tag.name}}
    mu-row.row(v-if="!locked")
      mu-col(width="95", tablet="85", desktop="80")
        mu-paper.post(:zDepth="3")
          div#comment-box
            duo-shuo(domain="zyymoe", :thread="thread")
</template>

<style lang="scss">
@import '../assets/variables.scss';
#post {
  .row {
    justify-content: center;
  }
  .post {
    margin-top: 50px;
    padding: 40px;
    padding-top: 20px;
  }
  @media screen and (max-width:700px){
    & .post {
      padding: 16px;
      margin-top: 20px;
    }
  }
  .title {
    font-size: 24px;
    line-height: 36px;
    width: 100%;
    padding-bottom: 5px;
    color: $primary_text_color;
  }
  .date {
    & {
      font-size: 16px;
      color: #666;
      margin-bottom: .5em;
      border-bottom: 1px dashed #ccc;
    }
    &::before {
      font-family: "Material Icons";
      content: "\E916";
      display: inline-block;
      vertical-align: top;
      margin-right: 3px;
    }
  }
  .tags {
    margin-top:20px;
    padding-top:20px;
    border-top: 1px dashed #ccc;
  }
  .mu-chip {
    & {
      margin-right: 5px;
    }
    &:hover {
      animation:pulse 1s infinite;
    }
  }
}
</style>

<script>
import { owner, repo, site_name } from '../const'
import Utils from '../mixin'
import { Post } from '../model'
import DuoShuo from 'vue-duoshuo'

export default{
  name: 'Post',
  mixins: [Utils],
  data(){
    return {
      title:'',
      date:'' || '2016-11-20T19:04:18.054Z',
      body:'',
      state:'',
      locked:false,
      tags:[],
      snackbar: false,
      message: ''
    }
  },
  computed:{
    thread(){
      return this.$route.params.number;
    }
  },
  async created(){
    try{
      let post = await Post.get(this.$route.params.number);
      Object.assign(this,post);
    }catch(e){
      this.message = e.toString();
      this.snackbar = true;
    }
  },
  watch: {
    title: function(){
      document.title = this.title + ' | ' + site_name;
    }
  },
  methods: {
    close_snackbar(){
      this.snackbar = false;
    }
  },
  components: {
    DuoShuo
  }
}
</script>
