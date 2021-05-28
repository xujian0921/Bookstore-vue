<template>
  <div class="container">
    <van-nav-bar title="订单信息" left-arrow @click-left="onClickLeft" />
    <div class="content">

<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell
    v-for="item in list"
    :key="item"
    :title="item"
  />
</van-list>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    List,
    NavBar,
    Cell, CellGroup
  } from 'vant';

  Vue.use(List);
  Vue.use(NavBar);
  Vue.use(Cell).use(CellGroup);
  export default {
    data() {
      return {
        list: [1,2,3,4,5],
        loading: false,
        finished: false
      }
    },
    computed: {
/* ...mapState({
        loginState: 'loginState',
        userInfo: 'userInfo'
      }) */
    },
    beforeRouteEnter(to, from, next) {
      //console.log("order");

      next(vm => {
        console.log(vm);
        //验证登录
        if (vm.loginState === 'ok') {
          // 登录成功请求信息
          //console.log("vm.userInfo", vm.userInfo)
          //vm.username = vm.userInfo ? vm.userInfo : '机智的小恐龙'
        }else{
          this.$router.push('../login')
        }
      })
},
    mounted (){
      //console.log("order mounted");
/*
fetch('/api/orders/getUserOrder?tel='+userInfo)
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
      }) */
    },
    methods: {
      onClickLeft() {
        this.$router.back()
      },
      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1);
          }
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.list.length >= 40) {
            this.finished = true;
          }
        }, 500);
      }

    }

  }
</script>
