<template>
  <div id="app">
    <app-header/>
    <transition enter-active-class="animated bounceOutLeft" leave-active-class="animated fadeIn">
      <router-view/>
    </transition>
    <app-footer/>
    <mu-float-button :icon="fab" class="float-button" @click="click_fab"/>
  </div>
</template>

<script>
import AppHeader from './components/header.vue'
import AppFooter from './components/footer.vue'

export default {
  name: 'app',
  data(){
    return {
      fab:'home'
    }
  },
  created(){
    window.addEventListener('scroll', ()=> {
      this.fab = window.scrollY <= 100 ? 'home' : 'keyboard_arrow_up';
    });
  },
  methods:{
    click_fab(){
      if(this.fab === 'home'){
        this.$router.push('/');
      }else{
        window.scrollTo(0,0);
      }
    }
  },
  components: {
    AppHeader,
    AppFooter
  }
}

</script>

<style lang="scss">
  .float-button {
    position: fixed;
    z-index: 1000;
    right: 25px;
    bottom: 20px;
  }
</style>
