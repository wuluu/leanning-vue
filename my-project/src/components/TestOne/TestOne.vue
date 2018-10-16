<template>
    <div id="TestOne">
        <app-header></app-header>
        <div id="songs">
            <ul>
                <li v-for="song in songs">
                    <h2>
                        <a target="_Blank" :href="'http://music.163.com/#/song?id='+song.id">{{song.name}}</a>
                    </h2>
                    <span>{{song.author}}</span>-
                    <span>{{song.Album}}</span>
                </li>
            </ul>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
import header from "./Header"
import footer from "./Footer"
export default {
    name: "TestOne",
    data() {
        return {
            songs: [
                { name: "剪云者", author: "JJ", Album: "伟大的渺小", id: "526464392" },
                { name: "圣所", author: "JJ", Album: "伟大的渺小", id: "526464394" },
                { name: "小瓶子", author: "JJ", Album: "伟大的渺小", id: "526464396" },
                { name: "伟大的渺小", author: "JJ", Album: "伟大的渺小", id: "526470318" },
                { name: "丹宁执着", author: "JJ", Album: "伟大的渺小", id: "526468335" },
                { name: "黑夜问白天", author: "JJ", Album: "伟大的渺小", id: "526470317" },
                { name: "Until the day", author: "JJ", Album: "伟大的渺小", id: "526470316" }
            ]
        }
    },
    components: {
        "app-header": header,
        "app-footer": footer
    }
};
</script>

<style scoped>
#songs {
    width: 100%;
    max-width: 1200px;
    margin: 40px auto;
    padding: 0 20px;
    box-sizing: border-box;
}
ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
}
li {
    flex-basis: 200px;
    padding: 30px;
    border: 1px solid #222;
    margin: 10px;
}
a {
    text-decoration:none
}

</style>
