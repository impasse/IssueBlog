<template>
  <div id="content">
    <mu-row class="row" v-for="post in posts">
      <mu-col width="95" tablet="80" desktop="80" class="post">
        <mu-card class="card">
          <div class="tags">
            <mu-chip v-for="tag in post.tags" class="tag" :style="{ backgroundColor: '#'+tag.color }">
              {{tag.name}}
            </mu-chip>
          </div>
          <mu-card-title :title="post.title" :subTitle="'Posted at '+ format_date(post.date)" @click="read_more(post.number)"/>
          <mu-card-text v-html="marked(init(post.body))" class="markdown-body text">
          </mu-card-text>
          <mu-card-actions class="actions">
            <mu-raised-button icon="library_books" class="more" label="阅读更多" secondary @click="read_more(post.number)"/>
          </mu-card-actions>
        </mu-card>
      </mu-col>
    </mu-row>
  </div>
</template>

<style lang="scss" scoped>
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
  #content::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 60%;
    background: linear-gradient(to bottom, #81d4fa, white);
    z-index: -100;
  }
</style>

<script>
import Axios from 'axios'
import { owner, repo, marked, init, format_date } from '../const'
import Storage from '../storage'

    export default{
      name: 'List',
      data(){
        return {
          posts:[]
        }
      },
      created(){
        this.fetch_from_storage();
        this.async_fetch_posts();
      },
      methods: {
        fetch_from_storage(){
          this.posts = Storage.keys().sort((a,b)=>b-a).map(Storage.get);
        },
        async_fetch_posts(){
          Axios.get(`https://api.github.com/repos/${owner}/${repo}/issues?filter=created&state=all`)
            .then(res=>{
              if(res.status === 200){
                Storage.keys().map(Storage.delete);
                res.data.filter(single=>{
                  return single.state !== 'closed';
                }).map(single=>{
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
                });
                this.fetch_from_storage();
              }else{
                console.error('Error on fetching Posts');
              }
            })
        },
        read_more(number){
          this.$router.push('/post/' + number);
          window.scrollTo(0,0);
        },
        marked,
        init,
        format_date
      }
    }
</script>
