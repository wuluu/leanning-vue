<template>
    <div id="app">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <router-view/>
        <v-footer></v-footer>
    </div>
</template>

<script>
import vHead from './components/dashboard/head.vue'
import vSidebar from './components/dashboard/sidebar.vue'
import vFooter from './components/dashboard/footer.vue'
export default {
    name: 'App',
    components: {
        vHead,
        vSidebar,
        vFooter
    }

}
</script>

<style>
html, body, div, span, h1, h2, h3, p, img, i, ul, li, label,
footer, header, time, mark, audio, video {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
