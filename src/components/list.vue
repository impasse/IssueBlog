<template>
  <div id="content">
    <mu-snackbar v-if="snackbar" :message="message" action="close" @actionClick="close_snackbar" @close="close_snackbar"/>
    <mu-row v-for="post in posts">
      <mu-col width="95" tablet="85" desktop="80" class="post">
        <mu-card class="card">
          <div @click="read_more(post.number)"><mu-card-title :title="post.title" :subTitle="'Posted at '+ format_date(post.date)"/></div>
          <mu-card-text v-html="marked(init(post.body))" class="markdown-body text">
          </mu-card-text>
          <div class="tags_more">
            <div class="tags">
              <mu-chip v-for="tag in post.tags" :style="tag_color(tag)">{{tag.name}}</mu-chip>
            </div>
            <mu-card-actions class="actions">
              <mu-raised-button icon="library_books" class="more" label="MORE" secondary @click="read_more(post.number)"/>
            </mu-card-actions>
          </div>
        </mu-card>
      </mu-col>
    </mu-row>
  </div>
</template>

<style lang="scss">
@import '../assets/variables.scss';
#content {
  & {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 196px - 64px);
  }
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
  .tags_more {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .tags {
    & {
      margin-top: 10px;
      padding-left: 4%;
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
      padding-right: 4%;
      padding-bottom: 16px;
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
  async created(){
    try{
      let posts = await Post.all();
      this.posts = posts;
    }catch(e){
      this.message = e.toString();
        this.snackbar = true;
    }
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
