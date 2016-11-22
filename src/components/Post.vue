<template>
  <div class="wrapp">
    <div class="page">
      <div class="top">
        <div class="title">
          <a class="p-title" :title="title" rel="bookmark">
            <i class="fa fa-file-text-o"></i>{{title}}</a>
        </div>
        <div class="info">
          <div class="white">
            <span class="date">{{format_date(date)}}</span>
            <span class="dot"> - </span>
            <span class="category">
                    <ul class="post-categories">
                        <li v-for="tag in tags"><span :style="{color:'#'+tag.color}">{{tag.name}}</span></li>
            </ul>
            </span>
          </div>
        </div>
      </div>
      <div class="entry" v-html="marked(body)">
      </div>
    </div>
    <div class="comments-wrapp" v-if="!this.locked">
    </div>
  </div>
</template>

<style>

</style>

<script>
import Axios from 'axios'
import { owner, repo, marked, format_date } from '../const'
import Storage from '../storage'

    export default{
      data(){
        return {
          title:'',
          date:'' || '2016-11-20T19:04:18.054Z',
          body:'',
          state:'',
          locked:false,
          tags:[]
        }
      },
      mounted(){
        if(!this.locked){
          let el = document.createElement('div');
          el.setAttribute('data-thread-key', this.$route.params.number);
          el.setAttribute('data-url', document.location.href);
          DUOSHUO.EmbedThread(el);
          let comment_el = document.querySelector('.comments-wrapp');
          if(comment_el){
            Array.prototype.map.call(comment_el.childNodes,_=>_.remove());
            comment_el.append(el);
          }
        }
      },
      created(){
        let old = Storage.get(this.$route.params.number);
        if(old){
          Object.assign(this,old);
        }
        this.async_fetch_post();
      },
      methods:{
        async_fetch_post(){
          Axios.get(`https://api.github.com/repos/${owner}/${repo}/issues/${this.$route.params.number}`)
          .then(res=>{
            if(res.status === 200){
              let data = {
                title: res.data.title,
                date: res.data.created_at,
                body: res.data.body,
                state: res.data.state,
                number: res.data.number,
                tags: res.data.labels.map(label=>{
                      return {
                        name: label.name,
                        color: label.color
                      };
                    })
              };
              Storage.set(data.number,data);
              Object.assign(this,data);
            }else{
              console.error('Error on fetching Post');
            }
          });
        },
        marked,
        format_date
      }
    }

</script>
