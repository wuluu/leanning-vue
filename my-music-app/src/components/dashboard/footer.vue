<template>
    <div class="music-footer" ref="footer">
        <audio controls :src="url" v-show="false" ref="audio" @ended="next(false)" @timeupdate="timeupdate"></audio>
        <div class="footer-left">
            <span class="back" @click="prev">
                <i class="fa fa-step-backward"></i>
            </span>
            <span class="play-pause" @click="playOrPause">
                <i class="fa" :class="isPlaying ? 'fa-pause' : 'fa-play'"></i>
            </span>
            <span class="next" @click="next(true)">
                <i class="fa fa-step-forward"></i>
            </span>
        </div>
        <span class="time">{{curTime}}</span>
        <v-slider :value="curTimeNum" :totalVal="tolTimeNum" :width="1200" @skip="skip" @move="move"></v-slider>
        <span class="time">{{tolTime}}</span>
        <span class="volume" @click="volumeOff">
            <i class="fa fa-fw" :class="{'fa-volume-up': !isVolumeOff, 'fa-volume-off': isVolumeOff}"></i>
        </span>
        <v-slider :value="volume" :totalVal="1" :width="100" :style="{'margin-left': '5px'}" @skip="skipVolume" @move="moveVolume"></v-slider>
        <span class="play-state" @click="playStateIndex = playStateIndex === 3 ? 0 : ++playStateIndex">
            <i class="fa fa-fw" :class="playState"></i>
        </span>
        <span class="list-num" @click="showDialog = !showDialog">
            <span class="list-icon">
                <i class="fa fa-file-text-o fa-fw"></i>
            </span>
            {{musicList && musicList.length}}
        </span>

        <div class="list-dialog" v-show="showDialog">
            <div class="list-head">
                <span>播放列表</span>
                <span @click="showDialog = false" class="close-dialog">
                    <i class="fa fa-close"></i>
                </span>
            </div>
            <div class="info">
                <span class="info-num">总{{musicList && musicList.length}}首</span>
                <span @click="$store.commit('clear');
                    url = '';
                    $store.commit('pause');
                    $store.commit('setShowPlay', false)
                " class="clear">
                    <i class="fa fa-trash-o"></i>清空
                </span>
            </div>
            <ul id="list" v-if="musicList && musicList.length !== 0">
                <li v-for="music in musicList" :key="music.id" @click="liClick(music)" :class="{blue:music.class}">
                    <span class="name">{{music.name}}</span>
                    <span class="singer">{{music.ar[0].name}}</span>
                    <span class="duration">{{formatDuration(music.dt)}}</span>
                </li>
            </ul>
            <div class="no-song" v-else>
                <p>你还没有添加任何歌曲!</p>
                <p>去首页
                    <span @click="$router.push({path:'/'})">发现音乐</span>
                </p>
            </div>
        </div>

    </div>
</template>

<script>
import vSlider from './slider.vue'
export default {
    name: 'vFooter',
    data() {
        return {
            url: 'http://music.163.com/song/media/outer/url?id=476592630.mp3',
            curTime: '00:00',
            tolTime: '00:00',
            curTimeNum: 0,
            tolTimeNum: 0,
            volume: 1,
            isVolumeOff: false,
            saveVolume: 1,
            playStateIndex: 0,
            playStateAll: ['loop', 'loopOne', 'random', 'order'],
            showDialog: false,
            //...
            musicList: []
        }
    },
    mounted() {
        let test_data = { "playlist": { "subscribers": [], "subscribed": false, "creator": { "defaultAvatar": true, "province": 330000, "authStatus": 0, "followed": false, "avatarUrl": "http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg", "accountStatus": 0, "gender": 0, "city": 330100, "birthday": -2209017600000, "userId": 341814938, "userType": 0, "nickname": "呜噜噜-", "signature": "", "description": "", "detailDescription": "", "avatarImgId": 18686200114669622, "backgroundImgId": 2002210674180198, "backgroundUrl": "http://p1.music.126.net/i0qi6mibX8gq2SaLF1bYbA==/2002210674180198.jpg", "authority": 0, "mutual": false, "expertTags": null, "experts": null, "djStatus": 0, "vipType": 0, "remarkName": null, "avatarImgIdStr": "18686200114669622", "backgroundImgIdStr": "2002210674180198", "avatarImgId_str": "18686200114669622" }, "tracks": [{ "name": "Lemon", "id": 536622304, "pst": 0, "t": 0, "ar": [{ "id": 159300, "name": "米津玄師", "tns": [], "alias": [] }], "alia": ["电视剧《非自然死亡》主题曲 / ドラマ「アンナチュラル」主題歌"], "pop": 100.0, "st": 0, "rt": null, "fee": 0, "v": 34, "crbt": null, "cf": "", "al": { "id": 37575103, "name": "Lemon", "picUrl": "http://p1.music.126.net/r0TgUXBEEmMG48KSsEa_mg==/109951163143657970.jpg", "tns": ["柠檬"], "pic_str": "109951163143657970", "pic": 109951163143657970 }, "dt": 255510, "h": { "br": 320000, "fid": 0, "size": 10223325, "vd": -2.0 }, "m": { "br": 192000, "fid": 0, "size": 6134013, "vd": -2.0 }, "l": { "br": 128000, "fid": 0, "size": 4089356, "vd": -2.0 }, "a": null, "cd": "", "no": 1, "rtUrl": null, "ftype": 0, "rtUrls": [], "djId": 0, "copyright": 2, "s_id": 0, "rtype": 0, "rurl": null, "mst": 9, "cp": 663018, "mv": 5841179, "publishTime": 1520956800007 }, { "name": "学不会", "id": 108134, "pst": 0, "t": 0, "ar": [{ "id": 3684, "name": "林俊杰", "tns": [], "alias": [] }], "alia": [], "pop": 100.0, "st": 0, "rt": "600902000009059276", "fee": 8, "v": 46, "crbt": "6118ddb16ae2a4fd4687c6bf60998762", "cf": "", "al": { "id": 10750, "name": "学不会", "picUrl": "http://p1.music.126.net/nQUhiSnK620HHLbZwnrJ3g==/109951163298363015.jpg", "tns": [], "pic_str": "109951163298363015", "pic": 109951163298363015 }, "dt": 229546, "h": { "br": 320000, "fid": 0, "size": 9184697, "vd": -3.8 }, "m": { "br": 160000, "fid": 0, "size": 4592371, "vd": -3.36 }, "l": { "br": 96000, "fid": 0, "size": 2755440, "vd": -3.38 }, "a": null, "cd": "1", "no": 2, "rtUrl": null, "ftype": 0, "rtUrls": [], "djId": 0, "copyright": 1, "s_id": 0, "rtype": 0, "rurl": null, "mst": 9, "cp": 7002, "mv": 300033, "publishTime": 1325174400000 }, { "name": "Lier and Accuser", "id": 40147564, "pst": 0, "t": 0, "ar": [{ "id": 3684, "name": "林俊杰", "tns": [], "alias": [] }], "alia": [], "pop": 95.0, "st": 0, "rt": null, "fee": 8, "v": 4, "crbt": null, "cf": "", "al": { "id": 3438282, "name": "和自己对话 From M.E. To Myself", "picUrl": "http://p1.music.126.net/CKcTyKux_UTt0sO_5VWR9w==/16561943649388272.jpg", "tns": [], "pic_str": "16561943649388272", "pic": 16561943649388272 }, "dt": 313106, "h": { "br": 320000, "fid": 0, "size": 12527324, "vd": 0.0555792 }, "m": { "br": 160000, "fid": 0, "size": 6263684, "vd": 0.249545 }, "l": { "br": 96000, "fid": 0, "size": 3758228, "vd": 0.152695 }, "a": null, "cd": "1", "no": 14, "rtUrl": null, "ftype": 0, "rtUrls": [], "djId": 0, "copyright": 1, "s_id": 0, "rtype": 0, "rurl": null, "mst": 9, "cp": 7002, "mv": 0, "publishTime": 1450972800007 }, { "name": "天后", "id": 72408, "pst": 0, "t": 0, "ar": [{ "id": 2201, "name": "陈势安", "tns": [], "alias": [] }], "alia": [], "pop": 100.0, "st": 0, "rt": "600902000009375818", "fee": 8, "v": 100, "crbt": "7aca7d46f54ad194099a2c223bdc0c75", "cf": "", "al": { "id": 7012, "name": "天后(台湾版)", "picUrl": "http://p1.music.126.net/vK-oQF0N_HY8a38C-hixIg==/49478023262283.jpg", "tns": [], "pic": 49478023262283 }, "dt": 285387, "h": { "br": 212000, "fid": 0, "size": 7589881, "vd": -3.21 }, "m": { "br": 160000, "fid": 0, "size": 5709851, "vd": -2.79 }, "l": { "br": 96000, "fid": 0, "size": 3426331, "vd": -2.89 }, "a": null, "cd": "1", "no": 2, "rtUrl": null, "ftype": 0, "rtUrls": [], "djId": 0, "copyright": 1, "s_id": 0, "rtype": 0, "rurl": null, "mst": 9, "cp": 7002, "mv": 0, "publishTime": 1286467200000 }, { "name": "流浪记", "id": 26075648, "pst": 0, "t": 0, "ar": [{ "id": 6066, "name": "杨宗纬", "tns": [], "alias": [] }], "alia": [], "pop": 100.0, "st": 0, "rt": "600902000009573541", "fee": 8, "v": 673, "crbt": null, "cf": "", "al": { "id": 2374056, "name": "我是歌手第一季 第11期", "picUrl": "http://p1.music.126.net/CiIN1J51C5H6akrIng00Ig==/2354054395090257.jpg", "tns": [], "pic": 2354054395090257 }, "dt": 308664, "h": { "br": 320000, "fid": 0, "size": 12378015, "vd": 4.92642 }, "m": { "br": 160000, "fid": 0, "size": 6204735, "vd": 5.20714 }, "l": { "br": 96000, "fid": 0, "size": 3735039, "vd": 4.72635 }, "a": null, "cd": "1", "no": 3, "rtUrl": null, "ftype": 0, "rtUrls": [], "djId": 0, "copyright": 2, "s_id": 0, "rtype": 0, "rurl": null, "mst": 9, "cp": 404023, "mv": 0, "publishTime": 1364486400007 }, { "name": "爱不会绝迹", "id": 108428, "pst": 0, "t": 0, "ar": [{ "id": 3684, "name": "林俊杰", "tns": [], "alias": [] }], "alia": ["动画片《恐龙宝贝》主题曲"], "pop": 100.0, "st": 0, "rt": "600902000007730518", "fee": 0, "v": 49, "crbt": "32e574b02d2445ac7b7c607bfe7e27db", "cf": "", "al": { "id": 10766, "name": "100天", "picUrl": "http://p1.music.126.net/oALpJH1SwQE9eLaYQHLQHw==/109951163071285497.jpg", "tns": [], "pic_str": "109951163071285497", "pic": 109951163071285497 }, "dt": 240400, "h": { "br": 320000, "fid": 0, "size": 9618329, "vd": -3.13 }, "m": { "br": 160000, "fid": 0, "size": 4809187, "vd": -2.7 }, "l": { "br": 96000, "fid": 0, "size": 2885530, "vd": -2.76 }, "a": null, "cd": "1", "no": 9, "rtUrl": null, "ftype": 0, "rtUrls": [], "djId": 0, "copyright": 1, "s_id": 0, "rtype": 0, "rurl": null, "mst": 9, "cp": 14026, "mv": 5501557, "publishTime": 1261065600000 }, { "name": "岁月神偷", "id": 28285910, "pst": 0, "t": 0, "ar": [{ "id": 893259, "name": "金玟岐", "tns": [], "alias": [] }], "alia": [], "pop": 100.0, "st": 0, "rt": "", "fee": 0, "v": 140, "crbt": null, "cf": "", "al": { "id": 2767540, "name": "金玟岐作品集", "picUrl": "http://p1.music.126.net/54wdQi_3rpjreY2oo2jb7w==/5998935441219557.jpg", "tns": [], "pic": 5998935441219557 }, "dt": 162072, "h": null, "m": { "br": 160000, "fid": 0, "size": 3242363, "vd": 0.214968 }, "l": { "br": 96000, "fid": 0, "size": 1945436, "vd": -2.65076E-4 }, "a": null, "cd": "1", "no": 2, "rtUrl": null, "ftype": 0, "rtUrls": [], "djId": 0, "copyright": 2, "s_id": 0, "rtype": 0, "rurl": null, "mst": 9, "cp": 0, "mv": 5917771, "publishTime": 1393776000007 }, { "name": "我的梦", "id": 37202030, "pst": 0, "t": 0, "ar": [{ "id": 10561, "name": "张靓颖", "tns": [], "alias": [] }], "alia": ["华为消费者业务品牌歌曲"], "pop": 100.0, "st": 0, "rt": null, "fee": 0, "v": 20, "crbt": null, "cf": "", "al": { "id": 3414497, "name": "我的梦", "picUrl": "http://p1.music.126.net/zaZL2w5RsdRWb5KY1O_FXA==/3429376769380187.jpg", "tns": [], "pic": 3429376769380187 }, "dt": 219553, "h": { "br": 320000, "fid": 0, "size": 8784501, "vd": -1.97 }, "m": { "br": 160000, "fid": 0, "size": 4392273, "vd": -1.53 }, "l": { "br": 96000, "fid": 0, "size": 2635382, "vd": -1.55 }, "a": null, "cd": "1", "no": 1, "rtUrl": null, "ftype": 0, "rtUrls": [], "djId": 0, "copyright": 0, "s_id": 0, "rtype": 0, "rurl": null, "mst": 9, "cp": 1001, "mv": 5951107, "publishTime": 1448467200007 }, { "name": "燕窝", "id": 374608, "pst": 0, "t": 0, "ar": [{ "id": 12707, "name": "苏打绿", "tns": [], "alias": [] }], "alia": [], "pop": 90.0, "st": 0, "rt": "600902000009054100", "fee": 8, "v": 44, "crbt": "6b38727e99a05d1c660dc687ab13b809", "cf": "", "al": { "id": 37097, "name": "你在烦恼什么", "picUrl": "http://p1.music.126.net/NGBr80seZ96ILO2h8R390A==/18576248952955358.jpg", "tns": [], "pic_str": "18576248952955358", "pic": 18576248952955358 }, "dt": 301853, "h": { "br": 320000, "fid": 0, "size": 12077068, "vd": -0.87 }, "m": { "br": 160000, "fid": 0, "size": 6038604, "vd": -0.44 }, "l": { "br": 96000, "fid": 0, "size": 3623218, "vd": -0.49 }, "a": null, "cd": "1", "no": 6, "rtUrl": null, "ftype": 0, "rtUrls": [], "djId": 0, "copyright": 1, "s_id": 0, "rtype": 0, "rurl": null, "mst": 9, "cp": 11001, "mv": 0, "publishTime": 1320940800000 }, { "name": "身骑白马", "id": 306664, "pst": 0, "t": 0, "ar": [{ "id": 9940, "name": "徐佳莹", "tns": [], "alias": [] }], "alia": [], "pop": 100.0, "st": 0, "rt": "600902000007958081", "fee": 8, "v": 22, "crbt": "a7e603e0b2bb33d4d1ce6dae00141153", "cf": "", "al": { "id": 30452, "name": "LaLa首张创作专辑", "picUrl": "http://p1.music.126.net/jSLMqcE_Yq27rRKDNrRKcA==/109951163187407183.jpg", "tns": [], "pic_str": "109951163187407183", "pic": 109951163187407183 }, "dt": 313417, "h": { "br": 320000, "fid": 0, "size": 12528335, "vd": -2.12 }, "m": { "br": 160000, "fid": 0, "size": 6264695, "vd": -1.69 }, "l": { "br": 96000, "fid": 0, "size": 3759239, "vd": -1.72 }, "a": null, "cd": "1", "no": 6, "rtUrl": null, "ftype": 0, "rtUrls": [], "djId": 0, "copyright": 0, "s_id": 0, "rtype": 0, "rurl": null, "mst": 9, "cp": 14014, "mv": 5324094, "publishTime": 1243526400000 }], "trackIds": [{ "id": 536622304, "v": 34 }, { "id": 108134, "v": 46 }, { "id": 40147564, "v": 4 }, { "id": 72408, "v": 100 }, { "id": 26075648, "v": 673 }, { "id": 108428, "v": 49 }, { "id": 28285910, "v": 140 }, { "id": 37202030, "v": 20 }, { "id": 374608, "v": 44 }, { "id": 306664, "v": 22 }], "specialType": 5, "userId": 341814938, "updateTime": 1521464148238, "trackUpdateTime": 1529154362056, "trackCount": 10, "coverImgId": 18800549325533584, "createTime": 1475549679087, "privacy": 0, "newImported": false, "commentThreadId": "A_PL_0_478439300", "highQuality": false, "playCount": 11, "coverImgUrl": "http://p1.music.126.net/crLGa8-jqXHLNcZbzfYZRg==/18800549325533584.jpg", "cloudTrackCount": 0, "subscribedCount": 0, "ordered": false, "tags": [], "adType": 0, "trackNumberUpdateTime": 1521464148238, "description": null, "status": 0, "name": "呜噜噜-喜欢的音乐", "id": 478439300, "shareCount": 0, "coverImgId_str": "18800549325533584", "commentCount": 0 }, "code": 200, "privileges": [{ "id": 536622304, "fee": 0, "payed": 0, "st": 0, "pl": 320000, "dl": 320000, "sp": 7, "cp": 1, "subp": 1, "cs": false, "maxbr": 999000, "fl": 320000, "toast": false, "flag": 0, "preSell": false }, { "id": 108134, "fee": 8, "payed": 0, "st": 0, "pl": 128000, "dl": 0, "sp": 7, "cp": 1, "subp": 1, "cs": false, "maxbr": 999000, "fl": 128000, "toast": false, "flag": 4, "preSell": false }, { "id": 40147564, "fee": 8, "payed": 0, "st": 0, "pl": 128000, "dl": 0, "sp": 7, "cp": 1, "subp": 1, "cs": false, "maxbr": 999000, "fl": 128000, "toast": false, "flag": 4, "preSell": false }, { "id": 72408, "fee": 8, "payed": 0, "st": 0, "pl": 128000, "dl": 0, "sp": 7, "cp": 1, "subp": 1, "cs": false, "maxbr": 192000, "fl": 128000, "toast": false, "flag": 0, "preSell": false }, { "id": 26075648, "fee": 8, "payed": 0, "st": 0, "pl": 128000, "dl": 0, "sp": 7, "cp": 1, "subp": 1, "cs": false, "maxbr": 320000, "fl": 128000, "toast": false, "flag": 0, "preSell": false }, { "id": 108428, "fee": 0, "payed": 0, "st": 0, "pl": 320000, "dl": 320000, "sp": 7, "cp": 1, "subp": 1, "cs": false, "maxbr": 999000, "fl": 320000, "toast": false, "flag": 0, "preSell": false }, { "id": 28285910, "fee": 0, "payed": 0, "st": 0, "pl": 192000, "dl": 192000, "sp": 7, "cp": 1, "subp": 1, "cs": false, "maxbr": 192000, "fl": 320000, "toast": false, "flag": 2, "preSell": false }, { "id": 37202030, "fee": 0, "payed": 0, "st": -200, "pl": 0, "dl": 0, "sp": 0, "cp": 0, "subp": 0, "cs": false, "maxbr": 999000, "fl": 0, "toast": false, "flag": 0, "preSell": false }, { "id": 374608, "fee": 8, "payed": 0, "st": 0, "pl": 128000, "dl": 0, "sp": 7, "cp": 1, "subp": 1, "cs": false, "maxbr": 999000, "fl": 128000, "toast": false, "flag": 0, "preSell": false }, { "id": 306664, "fee": 8, "payed": 0, "st": 0, "pl": 128000, "dl": 0, "sp": 7, "cp": 1, "subp": 1, "cs": false, "maxbr": 320000, "fl": 128000, "toast": false, "flag": 0, "preSell": false }] }
        this.musicList = test_data.playlist.tracks;
        this.url = 'http://music.163.com/song/media/outer/url?id=' + this.musicList[0].id + '.mp3'
        this.$refs.audio.addEventListener('play', () => {
            this.$store.commit('play')
            this.tolTimeNum = this.$refs.audio && this.$refs.audio.duration
            this.tolTime = this.$refs.audio && this.formatTime(this.$refs.audio.duration)
            /*this.timer = setInterval(() => {
              this.curTimeNum = this.$refs.audio && this.$refs.audio.currentTime
              this.curTime = this.$refs.audio && this.formatTime(this.$refs.audio.currentTime)
            }, 990)*/
        }, false)

        this.$refs.audio.addEventListener('pause', () => {
            //播放完成自动触发pause事件
            this.$store.commit('pause')
            //clearInterval(this.timer)
        })

        document.addEventListener('click', e => {
            let eles = this.$refs.footer && this.$refs.footer.getElementsByTagName('*')
            for (let i = 0, length = eles && eles.length; i < length; i++) {
                if (e.target === eles[i] || e.target === this.$refs.footer) {
                    return
                }
            }
            this.showDialog = false
        }, false)

        this.width = document.body.clientWidth < 1450 ? 750 : 950
    },
    components: {
        vSlider
    },
    computed: {
        isPlaying() {
            return this.$store.state.isPlaying
        },
        playState() {
            let obj = {
                loop: 'fa-rotate-right',
                loopOne: 'fa-refresh',
                random: 'fa-random',
                order: 'fa-reorder'
            }
            // let { [this.playStateAll[this.playStateIndex]]: bg } = obj
            return obj[this.playStateAll[this.playStateIndex]]
        },
    },
    methods: {
        formatTime(time) {
            let second = time.toFixed() % 60
            let min = (time.toFixed() - second) / 60
            second = second > 9 ? second : `0${second}`
            min = min > 9 ? min : `0${min}`
            return `${min}:${second}`
        },
        formatDuration(time) {
            time = Math.floor(time / 1000)
            let second = time % 60
            let min = (time - second) / 60
            second = second > 9 ? second : `0${second}`
            min = min > 9 ? min : `0${min}`
            return `${min}:${second}`
        },
        timeupdate() {
            this.curTimeNum = this.$refs.audio && this.$refs.audio.currentTime
            this.curTime = this.$refs.audio && this.formatTime(this.$refs.audio.currentTime)
        },
        playOrPause() {
            if (this.isPlaying === true) {
                this.$store.commit('pause')
                this.$refs.audio.pause()
                return
            }
            this.$store.commit('play')
            this.$refs.audio.play()
        },
        prev() {

        },
        next(flag) {

        },
        skip(skipWidth) {
            if (skipWidth === 0) {
                this.$refs.audio.currentTime = 0
                this.curTimeNum = 0
                return
            }
            this.$refs.audio.currentTime = skipWidth / 1200 * this.tolTimeNum
            this.curTimeNum = this.$refs.audio.currentTime
        },
        move(value) {
            if (value === 0) {
                this.$refs.audio.currentTime = 0
                this.curTimeNum = 0
                return
            }
            this.$refs.audio.currentTime = value / 1200 * this.tolTimeNum
            this.curTimeNum = this.$refs.audio.currentTime
        },
        volumeOff() {
            this.isVolumeOff = !this.isVolumeOff
            if (this.isVolumeOff) {
                this.$refs.audio.volume = 0
                this.volume = 0
            } else {
                this.$refs.audio.volume = this.saveVolume
                this.volume = this.$refs.audio.volume
            }
        },
        skipVolume(skipWidth) {
            if (skipWidth === 0) {
                this.$refs.audio.volume = 0
                this.volume = 0
                this.saveVolume = 0
                this.isVolumeOff = true
                return
            }
            this.$refs.audio.volume = skipWidth / 100 * 1 > 0 ? skipWidth / 100 * 1 : 0
            this.volume = this.$refs.audio.volume
            this.saveVolume = this.volume
            this.isVolumeOff = false
        },
        moveVolume(value) {
            if (value === 0) {
                this.$refs.audio.volume = 0
                this.volume = 0
                this.saveVolume = this.volume
                this.isVolumeOff = true
                return
            }
            this.$refs.audio.volume = value / 100 * 1 > 0 ? value / 100 * 1 : 0
            this.volume = this.$refs.audio.volume
            this.saveVolume = this.volume
            this.isVolumeOff = false
        },
        liClick(music) {
            // let d = document.querySelectorAll('#list > li');
            // for (let p = d.length; p--;) {
            //     console.log(d[p])
            //     if (d[p] != music.id) {
            //         d[p].style.backgroundColor = '#FFFFFF'/*其他*/
            //     } else {
            //         d[p].style.backgroundColor = '#D2D2D2'/*点击的*/
            //     }
            // }
            this.musicList.forEach(m => {
                if (m.id === music.id) {
                    console.log(m)
                    m.class = true
                } else {
                    m.class = false
                }
            });
        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../assets/style/footer';
</style>
