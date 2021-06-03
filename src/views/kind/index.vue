<template>
  <div class="container">
      <Header />
      <div class="content">
        <div class="content_item1">
          <van-sidebar v-model="activeKey">
            <van-sidebar-item title="小说" @click="goDeta('小说')"/>
            <van-sidebar-item title="文学" @click="goDeta('文学')"/>
            <van-sidebar-item title="童书" @click="goDeta('童话')"/>
            <van-sidebar-item title="历史" @click="goDeta('历史')"/>
            <van-sidebar-item title="哲学/宗教" @click="goDeta('哲学/宗教')"/>
            <van-sidebar-item title="传记" @click="goDeta('传记')"/>
            <van-sidebar-item title="社会科学" @click="goDeta('社会科学')"/>
            <van-sidebar-item title="文化" @click="goDeta('文化')"/>
            <van-sidebar-item title="政治军事" @click="goDeta('政治')"/>
            <van-sidebar-item title="成功/励志" @click="goDeta('成功激励')"/>
            <van-sidebar-item title="军事" @click="goDeta('军事')"/>
            <van-sidebar-item title="外语" @click="goDeta('外语')"/>
            <van-sidebar-item title="古籍" @click="goDeta('古籍')"/>
            <van-sidebar-item title="管理" @click="goDeta('管理')"/>
          </van-sidebar>
        </div>
        <div class="content_item2">
          <div class="item2_banner">
            <!-- 轮播图 -->
            <van-swipe :autoplay="3000" indicator-color="white">
              <van-swipe-item v-for="(item, index) of bannerlist" :key="index" @click="getDeta(1002)">
                <img :src="item" alt="">
              </van-swipe-item>
            </van-swipe>
          </div>
          <div class="item2_box">
            <div class="item2_box1" @click="goRanking('传记', '畅销榜')">
              <img src="../../../public/img/cxb.png" alt="">
            </div>
            <div class="item2_box1" @click="goRanking('军事', '新书上架')">
              <img src="../../../public/img/xssj.png" alt="">
            </div>
          </div>
          <div class="item2_content">
            <Kindlist :kindlist='kindlist'/>
          </div>

        </div>
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Sidebar, SidebarItem, Swipe, SwipeItem } from 'vant'
import Kindlist from '@/components/common/Kindlist'
import Header from '@/components/common/Header'

Vue.use(Sidebar)
Vue.use(SidebarItem)
Vue.use(Swipe).use(SwipeItem)

export default {
  data () {
    return {
      bannerlist: [],
      activeKey: 0,
      kindlist: []
    }
  },
  components: {
    Kindlist,
    Header
  },
  methods: {
    goDeta (kind) {
      // fetch('https://www.daxunxun.com/douban?count=20&start=' + num * 20)
      // fetch('/api/book/find?kind=' + kind, { method: 'GET' })
      fetch('http://47.100.225.183:8090/book/find?kind=' + kind, { method: 'GET' })

        .then(res => res.json()).then(data => {
          console.log(data.data)
          this.kindlist = data.data
        })
    },
    getDeta (id) {
      this.$router.push({ name: 'detail', params: { id: id } })
    },
    goRanking (id, msg) {
      this.$router.push({ name: 'rankinglist', params: { id: id, msg: msg } })
    }
  },
  mounted () {
    // fetch('/api/banner')
    fetch('http://47.100.225.183:8090/banner')

      .then(res => res.json())
      .then(data => {
        console.log(data.data)
        var dataD = data.data
        var arr = []
        dataD.map(item => {
          item = item.bannerImg
          arr.push(item)
        })
        this.bannerlist = arr
      })
    // 请求的是列表的数据
    // fetch('/api/book/find?kind=小说', { method: 'GET' })
    fetch('http://47.100.225.183:8090/book/find?kind=小说', { method: 'GET' })

      .then(res => res.json()).then(data => {
        console.log(data.data)
        this.kindlist = data.data
      })
  }
}
</script>

<style lang="scss" scoped>
@import '@/lib/reset.scss';

.content {
  @include flexbox();
  .content_item1 {
    @include rect(20%, auto);
    @include overflow;
    a {
       @include color(#333);
    }
  }
  .content_item2 {
    @include flex();
    @include flexbox();
    @include flex-direction(column);
    @include padding(0.1rem);
    .item2_banner {
      @include rect(100%, 1.15rem);
      .van-swipe {
        @include rect(100%, 1.15rem);
        img {
          @include rect(100%, auto);
        }
      }
    }
    .item2_box {
      @include rect(100%, auto);
      @include flexbox();
      @include justify-content(space-between);
      @include padding(0 0 0.1rem);
      img {
        @include rect(98%, auto);
      }
    }
    .item2_content {
      @include overflow(auto);
    }
  }
}
</style>
