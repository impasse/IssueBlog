<template>
  <div class="wrapp">
    <div class="post" v-for="post in posts">
      <div class="top">
        <div class="title">
          <router-link class="p-title" :to="`/post/${post.number}`" :title="post.title" href="#" rel="bookmark">
            <i class="fa fa-file-text-o"></i>{{post.title}}
          </router-link>
        </div>
        <div class="info">
          <div class="white">
            <span class="date">{{ format_date(post.date)}}</span>
          </div>
        </div>
      </div>
      <div class="entry" v-html="marked(init(post.body))">
      </div>
      <div class="bottom">
        <div class="left">
          <router-link class="more ripple" :to="`/post/${post.number}`"><i class="fa fa-caret-square-o-right"></i>阅读全文
          </router-link>
        </div>
        <div class="right">
          <div class="tag">
            <span v-for="tag in post.tags" :style="{color: '#'+tag.color}">{{tag.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
import Axios from 'axios'
import { owner, repo, marked, init, format_date } from '../const'
import Storage from '../storage'

    export default{
      data(){
        return {
          posts:[]
        }
      },
      created(){
        this.posts = Storage.keys().sort().reverse().map(Storage.get);
        this.async_fetch_posts();
      },
      methods: {
        async_fetch_posts(){
          Axios.get(`https://api.github.com/repos/${owner}/${repo}/issues?filter=created&state=all`)
            .then(res=>{
              if(res.status === 200){
                Storage.keys().map(Storage.delete);
                this.posts = res.data.map(single=>{
                  let data =  {
                    title: single.title,
                    state: single.state,
                    number: single.number,
                    body: single.body,
                    date: single.created_at,
                    tags: single.labels.map(label=>{
                      return {
                        name: label.name,
                        color: label.color
                      };
                    })
                  };
                  Storage.set(data.number,data);
                  return data;
                });
              }else{
                console.error('Error on fetching Posts');
              }
            })
        },
        marked,
        init,
        format_date
      }
    }

</script>
