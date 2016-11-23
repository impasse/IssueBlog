<template>
  <div id="page">
    <mu-row>
      <mu-col width="95" tablet="85" desktop="80">
        <mu-paper class="page" :zDepth="3">
          <div class="title">{{title}}</div>
          <div class="body" v-html="marked(body)"></div>
        </mu-paper>
      </mu-col>
    </mu-row>
  </div>
</template>

<style lang="scss">
  #page {
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
  }
</style>

<script>
import { pages, site_name } from '../const'
import Utils from '../mixin'

  export default{
    name: 'Page',
    mixins: [Utils],
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
    watch:{
      title:function(){
        document.title = this.title + ' - ' + site_name;
      }
    }
  }
</script>
