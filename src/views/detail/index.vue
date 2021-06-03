<template>
  <div class='box'>
    <div class='container'>
      <van-nav-bar
        :title='title'
        left-text='返回'
        right-text=''
        left-arrow
        @click-left='back'
        @click-right='share'
      />
      <div class='content'>
        <!-- 主图 -->
        <div class="bookCover">
          <div class="master">
           <!-- <a :href="img"><img :src="img" alt=""></a> -->
           <img :src="img" alt="">
<!--            ImagePreview(['{{img}}']); -->
            <!-- <a href="http://image31.bookschina.com/2019/zuo/6/8041723.jpg"><img src="http://image31.bookschina.com/2019/zuo/6/8041723.jpg" alt=""></a> -->
          </div>
        </div>
        <!-- 详情 -->
        <div class="content_item">
          <p>{{ title }}</p>
          <div class="introduction">
            {{ intro }}
          </div>
          <div class="pri">
            <div class="pri_1"> {{ money }} </div>
            <div class="sales">月销量&nbsp;:&nbsp;&nbsp;50本</div>
          </div>
        </div>
        <div class="empty"></div>
        <van-row>
          <van-col span="24">{{ writer }}</van-col>
          <van-col span="24">{{ publishingouse }}</van-col>
          <van-col span="24">{{ time }}</van-col>
          <van-col span="24">分类: {{ kind }} </van-col>
        </van-row>
        <div class="explain">
          <van-row>
            <van-col span="8">
              <van-icon name="passed" />
              <span>&nbsp;&nbsp;正版好图书</span>
            </van-col>
            <van-col span="8">
              <van-icon name="passed" />
              <span>&nbsp;&nbsp;满69包邮</span>
            </van-col>
            <van-col span="8">
              <van-icon name="passed" />
              <span>&nbsp;&nbsp;特价1折起</span>
            </van-col>
          </van-row>
        </div>
        <div class="reminder">
          <p>温馨提示：5折以下图书主要为出版社尾货，大部分为全新，个别图书品相8.9成新、切口有划线标记、光盘等附件不全</p>
        </div>
        <div class="empty"></div>
        <div class="adphoto">
          <img src="http://image31.bookschina.com/pro-images/190717wz/700185.jpg?id=1" alt="">
        </div>
        <div class="empty"></div>
        <div class="detail_tip">
          <p class="detail_p">图文详情</p>
          <div class="detail_content">
            <h5>内容简介:</h5>
            <p>{{ intro }}</p>
          </div>
        </div>
        <h4 class="five">本类五星书籍</h4>
        <div class="detail_item">
          <Detaillist :detaillist='detaillist'/>
        </div>
        <div class="empty"></div>
        <div class="empty"></div>
        <div class="empty"></div>
        <div class="empty"></div>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon='chat-o' text='客服' @click='chat' />
      <van-goods-action-icon info='5' icon='cart-o' text='购物车' @click='goCart' />
      <van-goods-action-icon icon='shop-o' text='店铺' @click='goShop' />
      <van-goods-action-button type='warning' text='加入购物车' @click='addCart' />
      <van-goods-action-button type='danger' text='立即购买' @click='buy' />
    </van-goods-action>
    <!-- <van-sku
      v-model='show'
      stepper-title='我要买'
      :sku='sku'
      :goods='goods'
      show-add-cart-btn
      reset-stepper-on-hide
      :initial-sku='initialSku'
    ></van-sku> -->
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
import { GoodsAction, GoodsActionIcon, GoodsActionButton, NavBar, Sku, Tab, Tabs, Row, Col, Icon, Toast, ImagePreview } from 'vant'

import Detaillist from '@/components/common/Detaillist'
Vue.use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
Vue.use(NavBar)
Vue.use(Sku)
Vue.use(Tab).use(Tabs)
Vue.use(Row).use(Col)
Vue.use(Icon)
Vue.use(Toast)
Vue.use(ImagePreview)

export default {
  data () {
    return {
      goDate: '',
      id: '',
      title: '',
      img: '',
      intro: '',
      money: '',
      writer: '',
      publishingouse: '',
      time: '',
      kind: '',
      rating: '',
      activeNames: ['0'],
      show: false,
      detaillist: []
    }
  },
  components: {
    Detaillist
  },
  computed: {
    ...mapState({
      // loginState: (state) => { return state.loginState }
      loginState: 'loginState',
      cartlist: 'cartlist'
    }),
    // len () {
    //   return this.list.length
    // }
    ...mapGetters({ // 获取值不能使用函数
      len: 'len'
    })

  },
  methods: {
    chat () {
      console.log('客服')
    },
    goCart () {
      this.$router.push('/cart')
    },
    goShop () {
      this.$router.push('/home')
    },
    addCart () {
      // this.show = true
      const { $store: { state: { loginState } } } = this
      if (loginState === 'ok') {
        Toast.success('成功加入购物车')
        // console.log(this.goDate)
        this.goDate.flag = true
        this.goDate.num = 1
        // this.goDate.map(item => {
        //   item.flag = true
        //   item.num = 1
        // })
        this.cartlist.push(this.goDate)
        this.$store.commit('changeCartList', {
          result: this.cartlist
        })
        console.log(this.cartlist)
        // var arr = []
        // var goodid = getCook
      } else {
        this.$router.push('/login')
      }
    },
    buy () {
      if (this.loginState === 'ok') {
        console.log('立即购买')
      } else {
        this.$router.push('/login')
      }
    },
    back () {
      this.$router.back()
    },
    share () {
      console.log('分享')
    }
  },
  mounted () {
    // console.log(this.$route)
    const { id } = this.$route.params
    const wid = this.$route.params.id
    // console.log("$route",$route);
    console.log('id', id)
    console.log('wid', wid)
    // fetch('/api/book/find?id=' + id)
    fetch('http://47.100.225.183:8090/book/find?id=' + id)
      .then(res => res.json())
      .then(data => {
        var detailData = data.data[0]
        this.goDate = detailData
        this.id = detailData.id
        this.title = detailData.bookname
        this.img = detailData.img
        this.intro = detailData.intro
        this.money = detailData.money
        this.writer = detailData.writer
        this.publishingouse = detailData.publishingouse
        this.time = detailData.time
        this.kind = detailData.kind
        // fetch('/api/book/find?kind=' + this.kind, { method: 'GET' })
        fetch('http://47.100.225.183:8090/book/find?kind=' + this.kind, { method: 'GET' })
          .then(res => res.json()).then(data => {
            this.detaillist = data.data
          })
      })
  }
}
</script>

<style lang='scss' scoped>
@import '@/lib/reset.scss';

.box {
  @include rect(100%, 100%);
  @include flexbox();
  .container {
    @include flex ();
    @include rect(100%, auto);
    @include flexbox();
    @include flex-direction(column);
    .content {
      @include flex();
      @include rect(100%, auto);
      @include overflow();
      .bookCover {
        @include rect(100%, 3rem);
        @include padding(0.1rem 0);
        .master {
          @include rect(2.8rem, 2.8rem);
          @include margin(auto);
          @include border(1px, #ddd, solid);
          @include text-align();
          img{
            @include rect(auto, 2.6rem);
            @include padding(0.1rem);
          }
        }
      }
      .content_item {
        @include padding(0.1rem);
        @include border(1px 0 0, #ddd, solid);
        p {
          @include font-size(20px);
          @include font-weight(700);
        }
        .introduction {
          @include rect(100%, 1rem);
          @include margin(0.15rem 0);
          @include line-height(0.24rem);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          overflow: hidden;
        }
        .pri {
          @include flexbox();
          @include justify-content(space-between);
          .pri_1 {
            @include font-size(0.3rem);
            @include color(#e60000);
            @include font-weight(bold);
          }
          .sales{
            @include padding(0.2rem 0 0);
          }
        }
      }
      .empty {
          @include rect(100%, 0.2rem);
          @include background-color(#efefef)
      }
      .van-row {
        .van-col {
          @include padding(0.1rem 0.1rem);
          @include border(1px 0 0, #ddd, solid);
          @include font-size(0.16rem);
        }
      }
      .explain {
        @include background-color(#efefef);
        @include rect(100%, 0.4rem);
        .van-col {
          @include color(#e60000);
          @include font-size(14px);
        }
        span {
          @include font-size(14px);
          @include color(#666);
        }
      }
      .reminder {
        p {
          @include rect(100%, 0.6rem);
          @include color(#dd3535);
          @include font-size(12px);
          @include padding(0.1rem);
          @include line-height(0.22rem);
        }
      }
      .adphoto {
        img {
          @include rect(100%, auto);
        }
      }
      .detail_tip {
        .detail_p {
          @include text-align();
          @include font-size(20px);
          @include font-weight(700);
          @include padding(0.15rem);
          @include border(0 0 1px, #dddddd, solid);
        }
        .detail_content {
          h5 {
            @include padding(0.15rem 0.15rem 0);
          }
          p {
            @include padding(0.15rem);
            @include line-height(0.25rem);
          }
        }
      }
      .five {
          @include padding(0.1rem);
          @include background-color(#efefef);
        }
    }
  }
}
</style>
