<template>
    <div class="music-head">
        <div class="logo"></div>
        <div class="search">
            <input type="text" :placeholder="placeholder" @focus="searchFocus" @blur="searchBlur" @keyup.enter="searchHandler(searchText)" v-model="searchText">
        </div>
        <div class="right">
            <img :src="user.avatarUrl">
            <div class="setting">
                <span class="username" id="user">{{user.nickname}}</span>
                <i style="margin-left: 80px;" class="fa fa-heart"></i>
                <i class="fa fa-envelope-o"></i>
                <i class="fa fa-cog"></i>
            </div>
            <transition name="fade">
                <div class="head-dialog" v-if="showOption" ref="headDialog">
                    <div class="avatar">
                        <img :src="user.avatarUrl">
                        <span class="avatar-name">{{user.nickname}}</span>
                        <span @click="sign" :class="[isSigned ? 'signed' : 'sign']">{{signTxt}}</span>
                    </div>
                    <ul class="social">
                        <li>
                            <p class="social_num">0</p>
                            <p class="social_txt">动态</p>
                        </li>
                        <li>
                            <p class="social_num">0</p>
                            <p class="social_txt">关注</p>
                        </li>
                        <li style="border-right: 0">
                            <p class="social_num">999</p>
                            <p class="social_txt">粉丝</p>
                        </li>
                    </ul>
                    <ul class="userinfo">
                        <li>
                            <i class="fa fa-vimeo fa-fw"></i>
                            <span>会员中心</span>
                            <span class="goto">未订购
                                <span class="gt">&gt;</span>
                            </span>
                        </li>
                        <li>
                            <i class="fa fa-database fa-fw"></i>
                            <span>等级</span>
                            <span class="goto">LV10
                                <span class="gt">&gt;</span>
                            </span>
                        </li>
                        <li>
                            <i class="fa fa-opencart fa-fw"></i>
                            <span>积分商城</span>
                            <span>
                                <span class="gt">&gt;</span>
                            </span>
                        </li>
                    </ul>
                    <ul class="userinfo">
                        <li>
                            <i class="fa fa-cogs fa-fw"></i>
                            <span>个人信息设置</span>
                            <span class="goto">
                                <span class="gt">&gt;</span>
                            </span>
                        </li>
                        <li>
                            <i class="fa fa-mobile fa-fw"></i>
                            <span>绑定社交账号</span>
                            <span class="goto">
                                <i class="fa fa-weibo"></i>
                                <i class="fa fa-weixin" style="margin-left: 5px;"></i>
                                <span class="gt">&gt;</span>
                            </span>
                        </li>
                    </ul>
                    <ul class="userinfo">
                        <li>
                            <i class="fa fa-cogs fa-fw"></i>
                            <span>退出登录</span>
                        </li>
                    </ul>
                </div>
            </transition>

        </div>
    </div>
</template>

<script>
export default {
    name: 'vHead',
    data() {
        return {
            searchText: "",
            placeholder: '搜索音乐/歌手/歌词/用户',
            showOption: false,
            signTxt: "签到",
            isSigned: false,
            user: {
                nickname: "未登录",
                avatarUrl: 'http://on99ebnkk.bkt.clouddn.com/head.jpg',
            }
        }
    },
    mounted() {
        document.addEventListener('click', e => {
            if (e.target.id === 'user') {
                this.showOption = !this.showOption
                return
            }
            let eles = this.$refs.headDialog ? this.$refs.headDialog.getElementsByTagName('*') : ''
            for (let i = 0, length = eles.length; i < length; i++) {
                if (eles[i] === e.target) {
                    return
                }
            }
            this.showOption = false
        }, false)
    },
    methods: {
        searchFocus() {
            this.placeholder = ''
        },
        searchBlur() {
            this.placeholder = '搜索音乐/歌手/歌词/用户'
        },
        searchHandler() {

        },
        sign() {
            this.signTxt = "已签到";
            this.isSigned = true;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../assets/style/head';
</style>
