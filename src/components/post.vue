<template>
  <div id="post">
    <mu-snackbar v-if="snackbar" :message="message" action="Close" @actionClick="close_snackbar" @close="close_snackbar"/>
    <mu-row>
      <mu-col width="95" tablet="85" desktop="80">
        <mu-paper class="post" :zDepth="3">
          <div class="title">{{title}}</div>
          <div class="date">Posted at {{format_date(date)}}</div>
          <div class="body markdown-body" v-html="marked(body)"></div>
          <div class="tags">
            <mu-chip v-for="tag in tags" :style="tag_color(tag)">
              {{tag.name}}
            </mu-chip>
          </div>
        </mu-paper>
      </mu-col>
    </mu-row>
    <mu-row class="row" v-if="!locked">
      <mu-col width="95" tablet="85" desktop="80">
        <mu-paper class="post" :zDepth="3">
          <div id="comment-box"></div>
        </mu-paper>
      </mu-col>
    </mu-row>
  </div>
</template>

<style lang="scss">
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
    font-size: 3em;
    font-weight: bold;
    width: 100%;
    padding-bottom: 5px;
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
import Axios from 'axios'
import { owner, repo, site_name } from '../const'
import Utils from '../mixin'
import { Post } from '../model'

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
  mounted(){
    if(!this.locked){
      let el = document.createElement('div');
      el.setAttribute('data-thread-key', this.$route.params.number);
      el.setAttribute('data-url', document.location.href);
      DUOSHUO.EmbedThread(el);
      let comment_el = document.querySelector('#comment-box');
      if(comment_el){
        comment_el.innerHTML = '';
        if(comment_el.append){
          comment_el.append(el);
        }
      }
    }
  },
  created(){
    Post.get(this.$route.params.number)
      .then(post=>Object.assign(this,post))
      .catch(e=>{
        this.message = e.toString();
        this.snackbar = true;
      });
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
  }
}
</script>
