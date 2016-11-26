import Vue from 'vue'
import VueRouter from 'vue-router'

import MuseUI from 'muse-ui'

import 'material-design-icons-iconfont/dist/material-design-icons.scss'
import 'muse-ui/dist/muse-ui.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'github-markdown-css/github-markdown.css'
import 'animate.css/animate.css'
import 'assets/style.scss'

import consts from './const'
import App from './App'
import AppList from './components/list.vue'
import AppPost from './components/post.vue'
import AppPage from './components/page.vue'

Vue.use(VueRouter);
Vue.use(MuseUI);

let routes = [
  { path: '/', name:'home', component: AppList },
  { path: '/post/:number', component: AppPost },
  { path: '/Links', component: AppPage },
  { path: '/About', component: AppPage },
  { path: '*', component: AppPage }
];

let router = new VueRouter({
  routes
});

new Vue({
  el: '#app',
  render: f => f(App),
  router
});
