<template>
  <div id="app">
    <app-header/>
    <transition enter-active-class="animated bounceInLeft">
      <router-view/>
    </transition>
    <app-footer/>
    <mu-float-button :icon="fab" v-show="show_fab" class="float-button" secondary @click="click_fab"/>
  </div>
</template>

<script>
import AppHeader from './components/header.vue'
import AppFooter from './components/footer.vue'

export default {
  name: 'app',
  data(){
    return {
      fab:'home',
      show_fab:false
    }
  },
  created(){
    window.addEventListener('scroll', ()=> {
      this.update_fab();
    });
  },
  watch:{
    $route: function(){
      this.update_fab();
    }
  },
  methods:{
    update_fab(){
      this.fab = window.scrollY <= 200 ? 'home' : 'keyboard_arrow_up';
      this.show_fab = !(this.$route.name === 'home' && this.fab === 'home');
    },
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
  #app{
    & {
      height: 100%;
    }
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 60%;
      min-height: 600px;
      background: linear-gradient(to bottom, #81d4fa 60%, white);
      z-index: -100;
    }
  }
  .float-button {
    position: fixed;
    z-index: 1000;
    right: 25px;
    bottom: 20px;
  }
</style>
