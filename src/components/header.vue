<template>
  <div id="header">
    <mu-appbar :title="site_name" @click="goto('/')">
      <mu-icon-button icon="menu" slot="left" @click="toggle_drawer"/>
      <mu-icon-menu icon="more_vert" slot="right">
        <mu-menu-item title="Home" leftIcon="home" @click="goto('/')"/>
        <mu-menu-item title="Links" leftIcon="link" @click="goto('/Links')"/>
        <mu-menu-item title="About" leftIcon="person_pic" @click="goto('/About')"/>
      </mu-icon-menu>
    </mu-appbar>
    <mu-drawer :open="drawer_open" @close="toggle_drawer" :docked="false">
      <mu-appbar :title="site_name"/>
      <div class="icon">
        <img src="http://q.qlogo.cn/qqapp/100229475/2229ECE6C6AA666326E6E67A8B541781/160"/>
      </div>
      <mu-content-block v-html="site_description" style="text-align:center">
      </mu-content-block>
      <mu-content-block>
        <mu-chip v-for="tag in tags" :style="{ backgroundColor: '#'+tag.color }">{{tag.name}}</mu-chip>
      </mu-content-block>
    </mu-drawer>
  </div>
</template>

<style lang="scss">
  #header {
    .icon {
      & {
        width: 100%;
        height: auto;
        text-align:center;
        margin-top: 20px;
        margin-bottom: 20px;
      }
      img {
        border-radius: 50%;
        width: 160px;
        height: 160px;
     }
    }
    .mu-chip {
      margin-right: 1px;
    }
  }
</style>

<script>
import { site_name, site_description } from '../const'
import Storage from '../storage'

  export default {
  name: 'Header',
  data(){
    return {
      site_name,
      site_description,
      drawer_open:false,
      tags:[]
    }
  },
  methods:{
    goto(path){
      this.$router.push(path);
    },
    toggle_drawer(){
      this.drawer_open = !this.drawer_open;
      if(this.tags.length === 0){
        let s = {}
        Storage.each(item=>{
          for(let v of item.tags){
            s[v.name] = v.color;
          }
        });
        this.tags = Object.keys(s).map(k=>{
          return {
            name:k,
            color:s[k]
          };
        });
      }
    }
  }
}

</script>
