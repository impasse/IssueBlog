<template lang="pug">
  div#app
    app-header
    transition(enter-active-class="animated bounceInLeft")
      router-view
    app-footer
    transition(enter-active-class="animated fadeIn", leave-active-class="animated fadeOut")
      mu-float-button(:icon="fab", v-show="show_fab", class="float-button", secondary, @click="click_fab")
</template>

<script>
import { User } from './model'

export default {
  name: 'App',
  data() {
    return {
      fab: 'home',
      show_fab: false
    };
  },
  async created() {
    (window.addEventListener || window.attachEvent)('scroll', event =>
      this.update_fab()
    );
    return this.$store.dispatch('initLogin');
  },
  watch: {
    $route: function () {
      this.update_fab();
    }
  },
  methods: {
    update_fab() {
      const pos = window.scrollY ? window.scrollY : document.documentElement.scrollTop
      this.fab = pos <= 300 ? 'home' : 'keyboard_arrow_up';
      this.show_fab = !(this.$route.name == 'home' && this.fab == 'home')
    },
    click_fab() {
      if (this.fab == 'home') {
        this.$router.push('/');
      } else {
        window.scrollTo(0, 0);
      }
    }
  },
  components: {
    AppHeader: require('./components/header.vue'),
    AppFooter: require('./components/footer.vue')
  }
};
</script>

<style lang="stylus">
@import './assets/variables'

#app
  &
    height 100%
  &::before
    content ''
    position absolute
    width 100%
    height 100%
    background linear-gradient(to bottom, #5C6BC0 65%, $background_color 35%)
    z-index -100
.float-button
  position fixed
  z-index 1000;
  right 25px
  bottom 20px
  background: $secondary_color
</style>
