<template>
  <div class="header">
    <div class="title">
      <router-link to="/">Issue Blog</router-link>
    </div>
    <div class="navigation">
      <div class="left">
        <ul class="menu">
          <li>
            <router-link to="/"><i class="fa fa-home"></i>Home</router-link>
          </li>
          <li>
            <router-link to="/Links/"><i class="fa fa-link"></i>Links</router-link>
          </li>
          <li>
            <router-link to="/About/"><i class="fa fa-link"></i>About</router-link>
          </li>
        </ul>
      </div>
      <div class="mobile">
        <ul>
          <li>
            <a class="mobile-menu-toggle" title="Menu"><i class="fa fa-th-list"></i></a>
            <select class="mobile-menu-drop" id="m-menu" v-model="selected" @click="go(selected)">
              <option value="/">Home</option>
              <option value="/Links/">Links</option>
              <option value="/About/">About</option>
            </select>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>

</style>

<script>
    export default{
      data(){
        return {
          selected:''
        }
      },
      methods:{
        go(path){
          this.$router.push(path);
        }
      }
    }
</script>
