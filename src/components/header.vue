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
        <img src="//q.qlogo.cn/qqapp/100229475/2229ECE6C6AA666326E6E67A8B541781/160"/>
      </div>
      <mu-content-block v-html="marked(site_description)" style="text-align:center">
      </mu-content-block>
      <mu-content-block class="tags">
        <mu-chip v-for="tag in tags" :style="tag_color(tag)">{{tag.name}}</mu-chip>
      </mu-content-block>
    </mu-drawer>
  </div>
</template>

<style lang="scss">
@import '../assets/variables.scss';
#header {
  .mu-appbar {
    background-color: $primary_color;
  }
  .tags {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .icon {
    & {
      width: 100%;
      height: auto;
      text-align:center;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    img {
      & {
        border-radius: 50%;
        width: 160px;
        height: 160px;
        box-shadow: 0px 0px 3px #909;
      }
      &:hover {
        animation:rotateIn 1.2s infinite;
      }
    }
  }
  .mu-chip {
    & {
      margin-right: 1px;
    }
    &:hover {
      animation:pulse 1s infinite;
    }
  }
}
</style>

<script>
import { site_name, site_description } from '../const'
import Storage from '../storage'
import Utils from '../mixin'

export default {
  mixins: [Utils],
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
