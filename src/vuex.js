import Vue from 'vue'
import { User, Post, Comment } from './model'

export const state = {
    current_list: [],
    current_post: {},
    current_comments: [],
    user: {},
    token: ''
};

export const mutations = {
    LOGIN_COMPLETE(state, token) {
        state.token = token;
        window.localStorage && window.localStorage.setItem('GITHUB_TOKEN', token);
        Vue.http.headers.common['Authorization'] = `token ${token}`
    },
    USER_INFO(state, user) {
        state.user = user;
    },
    LOGOUT(state) {
        state.user = {};
        state.token = '';
        delete Vue.http.headers.common['Authorization'];
    },
    FETCHED_LIST(state, list) {
        state.current_list = list;
    },
    FETCHED_POST(state, post) {
        state.current_post = post;
    },
    FETCHED_COMMENTS(state, comments) {
        state.current_comments = comments;
    }
};

export const actions = {
    async initLogin({ commit, dispatch }) {
        const { access_token } = await User.token();
        if (access_token) {
            commit('LOGIN_COMPLETE', access_token);
            dispatch('userInfo');
        }
    },
    async exchangeToken({ commit, dispatch }, code) {
        const { access_token } = await User.exchange(code);
        if (access_token) {
            commit('LOGIN_COMPLETE', access_token);
            dispatch('userInfo');
        }
    },
    async userInfo({ commit }) {
        commit('USER_INFO', await User.info());
    },
    async logout({ commit }) {
        await User.logout();
        commit('LOGOUT');
    },
    async fetchList({ commit }) {
        commit('FETCHED_LIST', await Post.all());
    },
    async fetchPost({ state, commit }, id) {
        const post = state.current_list.find(e => e.number == id);
        if (post) {
            commit('FETCHED_POST', post);
        } else {
            commit('FETCHED_POST', await Post.get(id));
        }
    },
    async fetchComments({ commit }, id) {
        commit('FETCHED_COMMENTS', await Comment.all(id));
    }
}