<template>
  <div id="page">
    <mu-row class="row">
      <mu-col width="95" tablet="80" desktop="80">
        <mu-paper class="page" :zDepth="3">
          <div class="title">{{title}}</div>
          <div class="body" v-html="marked(body)"></div>
        </mu-paper>
      </mu-col>
    </mu-row>
  </div>
</template>

<style lang="scss" scoped>
  .row {
    justify-content: center;

  }
  .title {
    font-size:3em;
    border-bottom: 1px dashed #ccc;
  }
  .page {
    margin-top: 30px;
    padding:30px;
    min-height: 100%;
  }
</style>

<script>
import { marked, pages } from '../const'
  export default{
    data(){
      return {
        body:'',
        title:''
      }
    },
    beforeRouteEnter (to, from, next) {
      let current = pages[to.path];
        if(current){
          next(vm=>Object.assign(vm,current));
        }else{
          next(vm=>Object.assign(vm,pages[404]));
        }
    },
    methods:{
      marked
    }
  }
</script>
