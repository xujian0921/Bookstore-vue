<template>
  <div class="container">
    <!-- <header>toubu </header> -->
    <div class="content">
      <div class="user-poster aaa">
        <div class="user-top" @click="onLogin">
          <img src="../../../public/img/userimg.jpeg" alt="">
          <p> {{ username }} </p>
        </div>
      </div>
      <!-- <van-row class="user-links">
        <van-col span="6">
          <van-icon name="pending-payment" />
          全部订单
        </van-col>
        <van-col span="6">
          <van-icon name="records" />
          待付款
        </van-col>
        <van-col span="6">
          <van-icon name="tosend" />
          待发货
        </van-col>
        <van-col span="6">
          <van-icon name="logistics" />
          待收货
        </van-col>
      </van-row>
-->
      <van-cell-group class="user-group">
        <van-cell icon="records" title="个人信息" is-link @click="goUserInfo" />
      </van-cell-group>

      <van-cell-group>
        <van-cell icon="gold-coin-o" title="订单信息" is-link @click="goOrder" />
        <van-cell icon="gift-o" title="关于我们" is-link @click="aboutUs" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
  import {
    Row,
    Col,
    Icon,
    Cell,
    CellGroup
  } from 'vant'
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        username: '点击登录'
      }
    },
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Icon.name]: Icon,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup
    },
    methods: {
      onLogin() {
        let tel = this.$store.state.saveTel;
        if (tel === "" || tel === undefined) {
          this.$router.push('/login')
        }
      },
      goUserInfo() {
        let tel = this.$store.state.saveTel;
        if (tel !== "" && tel !== undefined) {
          this.$router.push('/userInfo')
        } else {
          this.$router.push('/login')
        }
      },
      goOrder() {
        let tel = this.$store.state.saveTel;
        if (tel !== "" && tel !== undefined) {
          this.$router.push('/order')
        } else {
          this.$router.push('/login')
        }

      },
      aboutUs() {
        this.$router.push('/aboutUs')
      }
    },
    computed: {
      ...mapState({
        loginState: 'loginState',
        saveTel: 'saveTel',
        saveId: 'saveId'
      })
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (vm.loginState === 'ok') {

          vm.username = vm.saveTel ? vm.saveTel : '机智的小恐龙'
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .aaa {
    width: 100%;
    height: 2.3rem;
    display: block;
    background: url(../../../public/img/usertop.png) no-repeat;
    background-size: 100% 100%;

    .user-top {
      padding-top: 50px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        width: 90px;
        border-radius: 50%;
      }

      p {
        color: #fff;
        font-size: 20px;
        padding-top: 15px;
      }
    }
  }

  .user-group {
    margin-bottom: 15px;
  }

  .user-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;

    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
</style>
