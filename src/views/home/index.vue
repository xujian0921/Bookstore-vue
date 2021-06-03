<template>
  <div class="container">
      <Header />
      <div class="content">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- 轮播图 -->
          <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item, index) of bannerlist" :key="index" @click="goDeta(1001)">
            <img :src="item" alt="">
          </van-swipe-item>
          </van-swipe>
          <!-- 分类导航 -->
          <div class="content_kind">
            <div class="kind_1">
              <img src="../../../public/img/tb1.png" alt="" @click="goRanking('传记', '畅销榜')">
              <span>畅销榜</span>
            </div>
            <div class="kind_1">
              <img src="../../../public/img/tb2.png" alt="" @click="goRanking('成功激励', '淘好书')">
              <span>淘好书</span>
            </div>
            <div class="kind_1">
              <img src="../../../public/img/tb3.png" alt="" @click="goRanking('文化', '9.9包邮')">
              <span>9.9包邮</span>
            </div>
            <div class="kind_1">
              <img src="../../../public/img/tb5.png" alt="" @click="goRanking('军事', '新上架')">
              <span>新上架</span>
            </div>
            <div class="kind_1">
              <img src="../../../public/img/tb6.png" alt="" @click="goRanking('小说', '在线读')">
              <span>在线读</span>
            </div>
          </div>
          <div class="empty"></div>
          <img class="tip" src="../../../public/img/tip1.jpg" alt="">
          <!-- 新书速递 -->
          <div class="new">
            <div class="new_top">
              <div class="new_img">
                <img src="../../../public/img/newbook.png" alt="">
              </div>
              <div class="new_check" @click="add">
                <van-icon name="replay" />
                <span>换一批</span>
              </div>
            </div>
            <div class="new_item">
              <Detaillist :detaillist='detaillist'/>
            </div>
          </div>
          <!-- 推荐书单 -->
          <div class="recommend"></div>
          <!-- 好书推荐 -->
          <div class="prolist_title">好书推荐</div>
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <Prolist :prolist="prolist" />
          </van-list>
        </van-pull-refresh>
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Search, Swipe, SwipeItem, Grid, GridItem, List, PullRefresh, Icon } from 'vant'
import Prolist from '@/components/common/Prolist'
import Header from '@/components/common/Header'
import Detaillist from '@/components/common/Detaillist'

Vue.use(Search)
Vue.use(Swipe).use(SwipeItem)
Vue.use(Grid).use(GridItem)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Icon)
export default {
  data () {
    return {
      bannerlist: [],
      prolist: [],
      detaillist: [],
      loading: false,
      finished: false,
      pageNum: 1,
      isLoading: false,
      flag: false,
      num: 1
    }
  },
  components: {
    Prolist,
    Detaillist,
    Header
  },
  methods: {
    onRefresh () {
      this.isLoading = true
      // fetch('/api/book/find').then(res => res.json()).then(data => {
      fetch('http://47.100.225.183:8090/book/find').then(res => res.json()).then(data => {
        this.isLoading = false // 下拉刷新结束
        this.prolist = data // 重置列表的数据
        this.pageNum = 1 // 重置页码 --- 下拉刷新相当于第一页数据
        this.finished = false // 表示可以继续上拉加载下一页的数据
      })
    },
    goDeta (id) {
      this.$router.push({ name: 'detail', params: { id: id } })
    },
    onLoad () {
      console.log('可以加载数据了')
      this.loading = true // 开始加载数据
      // fetch('/api/book/find?count=20&start=' + this.pageNum * 20)
      fetch('http://47.100.225.183:8090/book/find?count=20&start=' + this.pageNum * 20)
        .then(res => res.json()).then(data => {
          this.loading = false // 数据加载完毕
          this.pageNum++
          if (data.length === 0) {
            console.log('没有数据了')
            this.finished = true // 没有数据了
          } else {
            // 有数据就要涉及到数字的合并   concat
            this.prolist = [...this.prolist, ...data.data]
          }
        })
    },
    goRanking (id, msg) {
      this.$router.push({ name: 'rankinglist', params: { id: id, msg: msg } })
    },
    add () {
      this.num++
      // fetch('/api/book/find?count=4&start=' + this.num * 4, { method: 'GET' })
      fetch('http://47.100.225.183:8090/book/find?count=4&start=' + this.num * 4, { method: 'GET' })
        .then(res => res.json()).then(data => {
          this.detaillist = data.data
        })
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
    // fetch('/api/book/find', { method: 'GET' })
    fetch('http://47.100.225.183:8090/book/find', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        console.log(data.data)
        this.prolist = data.data
      })
    // fetch('/api/book/find?count=4&start=' + this.num * 4, { method: 'GET' })
    fetch('http://47.100.225.183:8090/book/find?count=4&start=' + this.num * 4, { method: 'GET' })
      .then(res => res.json()).then(data => {
        this.detaillist = data.data
      })
  }
}
</script>

<style lang="scss" scoped>
@import '@/lib/reset.scss';

.van-swipe {
  height: 1.55rem;
  img {
    width: 100%;
  }
}
.prolist_title {
    @include padding(0.15rem 0 0 0.1rem);
    @include font-size(0.22rem);
    @include font-weight(500);
  }
.content_kind {
  @include flexbox();
  @include rect(100%, 0.8rem);
  @include border(0 0 1px 0, #efefef, solid);
  @include padding(0 0 10px 0);
  .kind_1 {
    @include flex();
    @include flexbox();
    @include flex-direction(column);
    @include justify-content();
    @include align-items();
    @include font-size(0.16rem);
    img {
      @include rect(auto, 0.45rem);
    }
    span {
      font-size: 14px;
    }
  }
}
.tip {
  @include rect(100%, auto);
  @include padding(0.05rem);
}
.empty {
  @include rect(100%, 0.1rem);
  @include background-color(#efefef)
}
.new {
  .new_top {
    @include padding(0.15rem 0);
    @include flexbox();
    @include rect(100%, 0.4rem);
    @include border(1px 0, #dddddd, solid);
    @include align-items();
    .new_img {
      @include flex(3.5);
      img {
      @include rect(1.4rem, auto);
      }
    }
    .new_check {
      @include flex(1);
      @include color(#333);
      @include font-size(0.16rem);
    }
  }
}
</style>
