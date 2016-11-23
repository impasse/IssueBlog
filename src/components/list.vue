<template>
  <div id="content">
    <mu-row v-for="post in posts">
      <mu-col width="95" tablet="85" desktop="80" class="post">
        <mu-card class="card">
          <div class="tags">
            <mu-chip v-for="tag in post.tags" class="tag" :style="tag_color(tag)">
              {{tag.name}}
            </mu-chip>
          </div>
          <mu-card-title :title="post.title" :subTitle="'Posted at '+ format_date(post.date)" @click="read_more(post.number)"/>
          <mu-card-text v-html="marked(init(post.body))" class="markdown-body text">
          </mu-card-text>
          <mu-card-actions class="actions">
            <mu-raised-button icon="library_books" class="more" label="More" secondary @click="read_more(post.number)"/>
          </mu-card-actions>
        </mu-card>
      </mu-col>
    </mu-row>
  </div>
</template>

<style lang="scss">
  #content {
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 60%;
      background: linear-gradient(to bottom, #81d4fa, white);
      z-index: -100;
    }
    .post:first-child {
      margin-top: 20px;
    }
    .card {
      height: 100%;
      min-height: 250px;
      border-radius: 5px;
    }
    .tags {
      list-style-type:none;
      position:absolute;
      padding:0;
      margin:0;
      right:10px;
      top: 15px;
    }
    .tag {
      display: inline-block;
      margin-right: 1px;
    }
    .text {
      margin-bottom: 60px;
    }
    .actions {
      width: 100%;
      text-align: right;
      padding-right: 4%;
      padding-bottom: 16px;
      position: absolute;
      bottom: 0;
    }
    .row {
      justify-content: center;
    }
  }
</style>

<script>
import Axios from 'axios'
import { owner, repo, site_name } from '../const'
import Utils from '../mixin'
import { Post } from '../model'

    export default{
      name: 'List',
      mixins: [Utils],
      data(){
        return {
          posts:[]
        }
      },
      created(){
        Post.all().then(posts=>this.posts = posts);
      },
      mounted(){
        document.title = site_name;
      },
      methods: {
        read_more(number){
          this.$router.push('/post/' + number);
          window.scrollTo(0,0);
        }
      }
    }
</script>
