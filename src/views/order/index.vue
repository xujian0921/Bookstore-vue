<template>
  <div class="container">
    <van-nav-bar title="订单信息" left-arrow @click-left="onClickLeft" />
    <div class="content">
<!--
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in objItem[0]" :key="item" :title="item" />
      </van-list> -->
  <van-collapse v-model="activeNames" >

  <van-collapse-item title="商品" name="1" v-for="item in objItem" ><!-- {{item}} -->

  <div v-for="idata in item"><!-- {{idata}} -->
  <van-row>

  <van-col span="4"><img :src="idata.img" alt="" style="width: 50px;height: 50px;"></van-col>
  <van-col span="8">购买时间:{{idata.time}}</van-col>
  <van-col span="3">{{idata.kind}}</van-col>
  <van-col span="3">数量:{{idata.num}}</van-col>
  <van-col span="3">￥:{{idata.unitPrice}}</van-col>
  <van-col span="3">总价:{{idata.money}}</van-col>
</van-row>

  </div>
  </van-collapse-item>

 <!-- <van-collapse-item title="标题2" name="2">{{item}}</van-collapse-item>
  <van-collapse-item title="标题3" name="3" >{{item}}</van-collapse-item> -->
</van-collapse>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    Row, Col,
    List,
    NavBar,
    Field,
    Cell,
    CellGroup,
    Button,
    Toast,
    Dialog,
    Collapse, CollapseItem
  } from 'vant'


  Vue.use(NavBar)
  Vue.use(Field)
  Vue.use(Cell).use(CellGroup)
  Vue.use(Button)
  Vue.use(Toast)
  Vue.use(Dialog)
  Vue.use(List);
  Vue.use(Collapse).use(CollapseItem);
  Vue.use(Row).use(Col);
  export default {
    data() {
      return {
        list: [1],
        loading: false,
        finished: false,
        objItem:'',
         activeNames: ['1']
      }
    },
    computed: {

    },
    mounted (){
 let id = this.$store.state.saveId;
 if ("" !== id && undefined !== id) {
           //fetch("/api/orders/getUserOrder", {
           fetch("http://47.100.225.183:8090/orders/getUserOrder", {

             method: "POST",
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             body: "id=" + id
           }).then(res => res.json()).then(data => {
             //console.log(data);
             var obj = new Object
             data.data.map(function(o) {
               //console.log(o)
               var tmpArr = obj[o.orderId] == undefined ? [] : obj[o.orderId]
               tmpArr.push(o)
               obj[o.orderId] = tmpArr
             })
             this.objItem = obj;
             console.log(obj)
 // 这里开始要布局了

           });
         }
    },
    methods: {
      onClickLeft() {
        this.$router.back()
      },
      onLoad() {
        //console.log(this.$store.state.saveId);
        //let id = this.$store.state.saveId;

        // 异步更新数据
       /* setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1);
          }
          //console.log(this)
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.list.length >= 40) {
            this.finished = true;
          }
        }, 500); */
      },
      beforeRouteEnter(to, from, next) {
        console.log("order");

        next(vm => {
          console.log(vm);
          //验证登录
          if (vm.loginState === 'ok') {
            // 登录成功请求信息
            //console.log("vm.userInfo", vm.userInfo)
            //vm.username = vm.userInfo ? vm.userInfo : '机智的小恐龙'
          } else {
            this.$router.push('../login')
          }
        })
      },
      mounted() {
        console.log("order mounted");
        console.log(this.$store.state.userInfo);
      },
      created() {
        console.log(this.$store.state.userInfo);
      }
    }
  }
</script>
