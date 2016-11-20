import Vue from 'vue'
import VueRouter from 'vue-router'
import './assets/embed.js'

import App from './App'
import AppList from './components/List'
import AppPost from './components/Post'

let routes = [
  {path: '/', component: AppList},
  {path: '/post/:number', component: AppPost}
];

Vue.use(VueRouter);

let router = new VueRouter({
  routes
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
