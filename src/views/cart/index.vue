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
      <div class="end_box1">
        <p class="p1">合计:</p>
        <p class="p2">￥{{ totalPrice }}</p>
      </div>
      <div class="end_box">
        <!-- {{ totalPrice }} -->
        <!-- <p class="p2">￥{{ totalNum }}</p> -->
        <p class="p3" @click="Settlement">结算</p>
      </div>
      <div class="task" id="task">
        <div class="end_pay">
          <img src="../../../public/img/payM.png" alt="">
          <div class="end_btn" id="end_btn" @click="exit">确认付款</div>
        </div>
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
      var task = document.getElementById('task')
      task.style.display = 'block'
    },
    exit () {
      var task = document.getElementById('task')
      task.style.display = 'none'
      this.$router.push('/user')
    }
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
    // input {
    //   // width: 0.2rem;
    //   // height: 0.2rem;
    // }
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
  .end_box1{
    display: flex;
    align-items: center;
    .p1 {
      font-size: 18px;
    }
    .p2 {
      width: 0.5rem;
      height: 0.34rem;
      text-align: center;
      line-height: 0.34rem;
      font-size: 18px;
      color: red;
    }
  }
  .end_box {
    display: flex;
    align-items: center;
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
  .task{
    display: none;
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    .end_pay {
      position: absolute;
      top: 10%;
      left: 10%;
      width: 80%;
      height: 60%;
      display: flex;
      flex-direction: column;
    img {
      margin: 0.3rem 0 0;
      height: 4rem;
    }
    .end_btn {
      margin:0.4rem 0.4rem 0.1rem;
      padding: 0.1rem 0;
      border-radius: 0.5rem;
      background: linear-gradient(to bottom, #fe2828 0%,#e60000 100%);
      text-align: center;
      color: white
    }
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
