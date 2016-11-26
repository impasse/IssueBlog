<template>
  <div id="content">
    <mu-snackbar v-if="snackbar" :message="message" action="close" @actionClick="close_snackbar" @close="close_snackbar"/>
    <mu-row v-for="post in posts">
      <mu-col width="95" tablet="85" desktop="80" class="post">
        <mu-card class="card">
          <div class="tags">
            <mu-chip v-for="tag in post.tags" :style="tag_color(tag)">{{tag.name}}</mu-chip>
          </div>
          <div @click="read_more(post.number)"><mu-card-title :title="post.title" :subTitle="'Posted at '+ format_date(post.date)"/></div>
          <mu-card-text v-html="marked(init(post.body))" class="markdown-body text">
          </mu-card-text>
          <mu-card-actions class="actions">
            <mu-raised-button icon="library_books" class="more" label="READ MORE" secondary @click="read_more(post.number)"/>
          </mu-card-actions>
        </mu-card>
      </mu-col>
    </mu-row>
  </div>
</template>

<style lang="scss">
@import '../assets/variables.scss';
#content {
  .post:first-child {
    margin-top: 20px;
  }
  .card {
    height: 100%;
    min-height: 250px;
    border-radius: 5px;
  }
  .mu-card-title{
    cursor: pointer;
    user-select: none;
  }
  .mu-card-sub-title {
    &::before {
      font-family: "Material Icons";
      content: "\E916";
      display: inline-block;
      vertical-align: top;
    }
    & {
      padding-bottom: 3px;
      border-bottom: 1px dashed #ccc;
    }
  }
  .tags {
    & {
      position:absolute;
      padding:0;
      margin:0;
      right:10px;
      top: 15px;
      z-index: 101;
    }
    .mu-chip {
      & {
        display: inline-block;
        margin-right: 1px;
      }
      &:hover {
        animation:pulse 1s infinite;
      }
    }
  }
  .text {
    margin-bottom: 60px;
  }
  .actions {
    & {
      width: 100%;
      text-align: right;
      padding-right: 4%;
      padding-bottom: 16px;
      bottom: 0;
    }
    .mu-raised-button-secondary{
      background-color: $secondary_color;
    }
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
      snackbar: false,
      message: '',
      posts:[]
    }
  },
  created(){
    Post.all()
      .then(posts=>this.posts = posts)
      .catch(e=>{
        this.message = e.toString();
        this.snackbar = true;
      });
  },
  mounted(){
    document.title = site_name;
  },
  methods: {
    read_more(number){
      this.$router.push('/post/' + number);
      window.scrollTo(0,0);
    },
    close_snackbar(){
      this.snackbar = false;
    }
  }
}
</script>
