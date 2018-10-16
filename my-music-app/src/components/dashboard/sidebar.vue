<template>
    <div class="sidebar">
        <div class="sidebar-list">
            <div class="sidebar-head">推荐</div>
            <ul>
                <li>
                    <i class="fa fa-music fa-fw"></i>发现音乐</li>
                <li>
                    <i class="fa fa-podcast fa-fw"></i>私人FM</li>
                <li>
                    <i class="fa fa-youtube-play fa-fw"></i>视频</li>
                <li>
                    <i class="fa fa-user-o fa-fw"></i>朋友</li>
            </ul>
            <div class="sidebar-head">我的音乐</div>
            <ul>
                <li>
                    <i class="fa fa-music fa-fw"></i>本地音乐</li>
                <li>
                    <i class="fa fa-download fa-fw"></i>下载管理</li>
                <li>
                    <i class="fa fa-mixcloud fa-fw"></i>我的音乐云盘</li>
                <li>
                    <i class="fa fa-user-md fa-fw"></i>我的歌手</li>
                <li>
                    <i class="fa fa-ravelry fa-fw"></i>我的电台</li>
            </ul>
            <div class="sidebar-head" style="cursor:pointer" @click="isToggleCreateList = !isToggleCreateList">创建的歌单
                <i class="fa " :class="isToggleCreateList ? 'fa-angle-right' : 'fa-angle-down' " style="margin-left:90px"></i>
            </div>
            <ul v-if="!isToggleCreateList ">
                <li @click="$router.push({name: 'songList', params:{id: '169815571'}}) ">
                    <i class="fa fa-heart-o fa-fw "></i>我喜欢的音乐</li>
                <li @click="$router.push({name: 'songList', params:{id: '471972418'}}) ">
                    <i class="fa fa-file-audio-o fa-fw "></i>敲代码时听的歌</li>
                <li @click="$router.push({name: 'songList', params:{id: '404264863'}}) ">
                    <i class="fa fa-file-audio-o fa-fw "></i>林俊杰</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'vSidebar',
    data() {
        return {
            isToggleCreateList: false,
        }
    },
    mounted() {
    },
    methods: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../assets/style/sidebar';
</style>
