import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import MuseUI from 'muse-ui'

import * as vuex from './vuex'

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'muse-ui/dist/muse-ui.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'github-markdown-css/github-markdown.css'
import 'animate.css/animate.css'
import './assets/style.styl'

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(MuseUI);
Vue.use(Vuex);

Vue.http.options.root = '/api';
const token = window.localStorage && window.localStorage.getItem('GITHUB_TOKEN');
if (token) {
    Vue.http.headers.common['Authorization'] = `token ${token}`
}
//Vue.http.options.credentials = true;

const routes = [
    { path: '/', name: 'home', component: require('./components/list.vue') },
    { path: '/post/:number', component: require('./components/post.vue') },
    { path: '/Links', component: require('./components/page.vue') },
    { path: '/About', component: require('./components/page.vue') },
    { path: '*', component: require('./components/page.vue') }
];

const store = new Vuex.Store(vuex);

const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
});

new Vue({
    el: '#app',
    render: f => f(require('./App')),
    router,
    store
});

