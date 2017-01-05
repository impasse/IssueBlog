<template>
  <div id="page" @animationend="removeAnim">
    <mu-row>
      <mu-col width="95" tablet="85" desktop="80">
        <mu-paper :zDepth="3">
          <div class="title" v-show="title.length!==0">{{title}}</div>
          <div class="body" v-html="marked(body)"></div>
        </mu-paper>
      </mu-col>
    </mu-row>
  </div>
</template>

<style lang="scss">
#page {
  & {
    min-height: calc(100vh - 260px);
    display: flex;
    flex-direction: column;
  }
  .row {
    & {
      justify-content: center;
      flex: 1;
    }
  }
  .title {
    font-size:3em;
    border-bottom: 1px dashed #ccc;
  }
  .mu-paper {
    margin-top: 30px;
    min-height: 400px;
    padding:30px;
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
    mounted(){
      this.refresh_page();
    },
    methods:{
      refresh_page(){
        let current = pages[this.$route.path];
        if(current){
          Object.assign(this,current);
        }else{
          Object.assign(this,pages[404]);
        }
      },
      removeAnim(){
        this.$el.classList.remove('animated','bounceInLeft');
      }
    },
    watch:{
      title:function(){
        document.title = this.title + ' - ' + site_name;
      },
      $route:function(){
        this.$el.classList.add('animated','bounceInLeft');
        this.refresh_page();
      }
    }
  }
</script>
