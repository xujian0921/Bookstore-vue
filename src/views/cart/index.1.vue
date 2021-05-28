<template>
  <div class="container">
    <van-nav-bar
      title="购物车"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="content"  v-if = "cartlist.length > 0">
      <van-notice-bar
        text="优惠活动:年中大促全场5万册图书5折封顶每满68包邮快来抢购吧！"
        left-icon="volume-o"
      />
      <ul>
        <li v-for="(item, index) of cartlist" :key="index">
          <input type="checkbox" v-model="item.flag">
          <div class="item_right">
            <div class="item_img">
              <img :src="item.img" alt="" class="cartimg">
            </div>
            <div class="right_con">
              <p>{{ item.bookname }}</p>
              <div class="right_info">
                <span>{{ item.money }}</span>
                <div class="right_btn">
                  <div class="right_btn1" @click="item.num >=2 ? item.num -=1 : item.num = 1">-</div>
                  <div class="right_num">{{ item.num }}</div>
                  <div class="right_btn1" @click="item.num += 1">+</div>
                </div>
              </div>
              <div class="del" @click="deleteItem(index)">删除</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="content" v-else>
      <div class="box_else">
        <img src="../../../public/img/kong.png" alt="">
        <span>您的购物车暂无商品</span>
        <div class="else_button" @click="goHome">随便逛逛</div>
      </div>
    </div>
    <div class="end">
      <van-checkbox v-model="checked">全选</van-checkbox>
      <div class="end_box">
        <p class="p1">合计:</p>
        <!-- {{ totalPrice }} -->
        <!-- <p class="p2">￥{{ totalNum }}</p> -->
        <p class="p2">￥{{ totalPrice }}</p>
        <p class="p3" @click="Settlement">结算</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, NoticeBar, Checkbox, CheckboxGroup, ImagePreview } from 'vant'
import { mapState } from 'vuex'

Vue.use(NavBar)
Vue.use(NoticeBar)
Vue.use(Checkbox).use(CheckboxGroup)
Vue.use(ImagePreview)
export default {
  data () {
    return {
      checked: true
    }
  },
  computed: {
    ...mapState({
      cartlist (state) {
        return state.cartlist
      },
      loginState (state) {
        return state.loginState
      }
    }),
    totalNum () {
      return this.$store.getters.totalNum
    },
    totalPrice () {
      return this.$store.getters.totalPrice
    }
  },
  methods: {
    deleteItem (index) {
      let arr = this.cartlist
      arr.splice(index, 1) // 整数表示要移出的个数
      this.$store.commit('changeCartList', {
        result: arr
      })
    },
    onClickLeft () {
      this.$router.back()
    },
    goHome () {
      this.$router.push('/home')
    },
    Settlement () {
      ImagePreview([
        'https://img.yzcdn.cn/2.jpg',
        '../../../public/img/newbook.png'
      ]);
      var that = this
      setTimeout(function(){
        that.$router.push('/user')
      },1000)
    }
  },
  mounted () {
    this.cartlist.map(item => {
      item.num = 1
      item.flag = true
    })
    // 如果有数据就不需要重新去取
    // if (this.cartlist.length > 0) {
    //   return
    // }
    // this.$store.commit('changeCartList', {
    //   result: this.cartlist
    // })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.loginState === 'ok') {
        next()
      } else {
        next('/login')
      }
    })
  }
}
</script>

<style lang="scss" scoped>

ul {
  li {
    width: 100%;
    height: 1.3rem;
    display: flex;
    align-items: center;
    padding: 0.1rem;
    input {
      width: 0.2rem;
      height: 0.2rem;
    }
    .item_right {
      display: flex;
      .item_img {
        flex: 1;
        padding: 0 0.1rem;
        img {
          width: 0.6rem;
        }
      }
      .right_con {
        flex: 3;
        height: 0.6rem;
        p {
          width: 2.5rem;
          height: 0.3rem;
        }
        .right_info {
          display: flex;
          justify-content: space-between;
          padding: 0.05rem;
          span {
            font-size: 18px;
            color: red;
          }
          .right_btn {
            display: flex;
          // justify-content: space-between;
            .right_btn1 {
              width: 0.2rem;
              height: 0.2rem;
              border-radius: 50%;
              text-align: center;
              line-height: 0.18rem;
              border: 1px solid #efefef;
              background-color: #efefef;
            }
            .right_num {
              width: 0.3rem;
              height: 0.2rem;
              text-align: center;
              line-height: 0.2rem;
            }
          }
        }
        .del {
          width: 0.4rem;
          height: 0.2rem;
          // padding: 0.05rem;
          border: 1px solid #efefef;
          font-size: 12px;
          text-align: center;
          line-height: 0.2rem;
        }
      }
    }
  }
}
// .content {
//   background-color: #8e8e8e;
// }
.end {
  width: 100%;
  height: 0.46rem;
  background-color: white;
  border-top: 1px solid#efefef;
  padding: 0 0.1rem;
  display: flex;
  justify-content: space-between;
  .end_box {
    display: flex;
    align-items: center;
    .p1 {
      font-size: 16px;
    }
    .p2 {
      width: 0.5rem;
      height: 0.34rem;
      text-align: center;
      line-height: 0.34rem;
      color: red;
    }
    .p3 {
      width: 1rem;
      height: 0.36rem;
      background: linear-gradient(to bottom, #fe2828 0%,#e60000 100%);
      margin-left: 0.1rem;
      border-radius: 0.2rem;
      text-align: center;
      line-height: 0.34rem;
      color: white;
    }
  }
}
.box_else {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  span {
    padding: 0.3rem 0;
  }
  .else_button {
    width: 1.8rem;
    height: 0.4rem;
    border-radius: 0.2rem;
    background: linear-gradient(to bottom, #fe2828 0%,#e60000 100%);
    font-size: 16px;
    text-align: center;
    line-height: 0.4rem;
    color: white;
  }
}
</style>
