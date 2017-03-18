require 'babel-polyfill'
Vue = require 'vue'
  .default
VueRouter = require 'vue-router'
  .default

MuseUI = require 'muse-ui'

require 'material-design-icons-iconfont/dist/material-design-icons.css'
require 'muse-ui/dist/muse-ui.css'
require 'roboto-fontface/css/roboto/roboto-fontface.css'
require 'github-markdown-css/github-markdown.css'
require 'animate.css/animate.css'
require './assets/style.styl'

consts = require './const'
App = require './App'
AppList = require './components/list.vue'
AppPost = require './components/post.vue'
AppPage = require './components/page.vue'

Vue.use VueRouter
Vue.use MuseUI


routes = [
  { path: '/', name:'home', component: AppList }
  { path: '/post/:number', component: AppPost }
  { path: '/Links', component: AppPage }
  { path: '/About', component: AppPage }
  { path: '*', component: AppPage }
]

router = new VueRouter
  routes: routes

new Vue
  el: '#app'
  render: (f) -> f(App)
  router: router
