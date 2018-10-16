import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Games from "@/components/games/Games"
import Download from "@/components/TestDownload/download"
import TestOne from "@/components/TestOne/TestOne"

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/games',
            name: 'Games',
            component: Games
        },
        {
            path: '/download',
            name: 'download',
            component: Download
        },
        {
            path: '/test1',
            name: 'Test1',
            component: TestOne
        }
    ]
})
