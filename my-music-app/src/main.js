// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

Vue.config.productionTip = false


Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        musicList: { 'musicData': [] },
        theme: 'red',
        isPlaying: false,
        nowPlayIndex: 0,
        showMiniAudio: true,
        commendList: { 'commendList': [] },
        curTimeNum: 0,
        showPlay: false,
        showAbout: false,
        showLogin: false,
        day: { 'musicData': [] },
        theme: ''
    },
    mutations: {
        setMusicList: (state, playload) => {
            state.musicList = playload
            storage.saveMusic(playload)
        },
        play: state => {
            state.isPlaying = true
        },
        pause: state => {
            state.isPlaying = false
        },
    },
})
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
