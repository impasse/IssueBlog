<template lang="pug">
  #page(@animationend.stop="removeAnim")
    mu-row
      mu-col(width="95", tablet="85", desktop="80")
        mu-paper(:zDepth="3")
          .title(v-show="title.length!==0") {{title}}
          .body(v-html="marked(body)")
</template>

<style lang="stylus">
#page
  &
    min-height calc(100vh - 260px)
    display flex
    flex-flow column nowrap
  .row
    &
      justify-content center
      flex 1
  .title
    font-size 3em
    border-bottom 1px dashed #ccc
  .mu-paper
    margin-top 30px
    min-height 400px
    padding 30px
</style>

<script>
import { pages, site_name } from '../const'
import Util from '../mixin'

export default {
  name: 'Page',
  mixins: [Util],
  data() {
    return {
      body: 'Connecting to misaka network...',
      title: 'Loading...'
    };
  },
  mounted() {
    this.refresh_page();
  },
  methods: {
    refresh_page() {
      const current = pages[this.$route.path]
      if (current) {
        Object.assign(this, current);
      } else {
        Object.assign(this, pages[404]);
      }
    },
    removeAnim() {
      this.$el.classList.remove('animated', 'bounceInLeft');
    }
  },
  watch: {
    title() {
      document.title = `${this.title} - ${site_name}`;
    },
    $route() {
      this.$el.classList.add('animated', 'bounceInLeft');
      this.refresh_page();
    }
  }
};
</script>
