<template>
  <div id="post">
    <mu-row class="row">
      <mu-col width="95" tablet="80" desktop="80">
        <mu-paper class="post" :zDepth="3">
          <div class="title">{{title}}</div>
          <div class="date">Posted at {{format_date(date)}}</div>
          <div class="body markdown-body" v-html="marked(body)"></div>
          <div class="tags">
            <mu-chip v-for="tag in tags" class="tag" :style="{ backgroundColor: '#'+tag.color }">
              {{tag.name}}
            </mu-chip>
          </div>
        </mu-paper>
      </mu-col>
    </mu-row>
    <mu-row class="row" v-if="!locked">
      <mu-col width="95" tablet="80" desktop="80">
        <mu-paper class="post" :zDepth="3">
          <div id="comment-box"></div>
        </mu-paper>
      </mu-col>
    </mu-row>
  </div>
</template>

<style lang="scss" scoped>
  .row {
    justify-content: center;
  }
  .post {
    margin-top: 50px;
    padding: 40px;
    padding-top: 20px;
  }

  .title {
    font-size: 3em;
    font-weight: bold;
    width: 100%;
    padding-bottom: 5px;
  }

  .date {
    font-size: 16px;
    color: #666;
    margin-bottom: .5em;
    border-bottom: 1px dashed #ccc;
  }
  .tags {
    margin-top:20px;
    padding-top:20px;
    border-top: 1px dashed #ccc;
  }
  .tag {
    margin-right: 5px;
  }
</style>

<script>
import Axios from 'axios'
import { owner, repo, marked, format_date } from '../const'
import Storage from '../storage'

    export default{
      name: 'Post',
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
      updated(){
        if(!this.locked){
          let el = document.createElement('div');
          el.setAttribute('data-thread-key', this.$route.params.number);
          el.setAttribute('data-url', document.location.href);
          DUOSHUO.EmbedThread(el);
          let comment_el = document.querySelector('#comment-box');
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
