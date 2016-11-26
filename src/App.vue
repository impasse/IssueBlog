<template>
  <div id="app">
    <app-header/>
    <transition enter-active-class="animated bounceInLeft">
      <router-view/>
    </transition>
    <app-footer/>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <mu-float-button :icon="fab" v-show="show_fab" class="float-button" secondary @click="click_fab"/>
    </transition>
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
      let pos = window.scrollY === undefined ? document.documentElement.scrollTop : window.scrollY;
      this.fab = pos <= 300 ? 'home' : 'keyboard_arrow_up';
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
@import './assets/variables.scss';
#app{
  & {
    height: 100%;
  }
  &::before {
    content: '';
    position: fixed;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #5C6BC0 65%, #FCE4EC 35%);
    z-index: -100;
  }
}
.float-button {
  position: fixed;
  z-index: 1000;
  right: 25px;
  bottom: 20px;
  background: $secondary_color;
}
</style>
