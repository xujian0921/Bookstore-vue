<template>
  <div class="container">
    <van-nav-bar title="关于我们" left-arrow @click-left="onClickLeft"  />
    <div class="content">
<van-row type="flex" justify="space-around" class="logdiv">
  <van-col span="8"></van-col>
  <van-col span="8" style="text-align: center;">
    <b style="font-size: 0.4rem;" class="logo">全民书城</b></van-col>
  <van-col span="8"></van-col>
</van-row>
<br>
<van-row type="flex" justify="space-around" >
<van-col span="5"></van-col>
<van-col span="14" style="text-align: center;" >全民书城，便宜图书、海量小说</van-col>
<van-col span="5"></van-col>
  </van-row>
  <van-row type="flex" justify="space-around" class="edition">
  <van-col span="5"></van-col>
  <van-col span="14" style="text-align: center;">当前版本： V 1.0.1</van-col>
  <van-col span="5"></van-col>
    </van-row>
    <van-row type="flex" justify="space-around" >
    <van-col span="5"></van-col>
    <van-col span="14" style="text-align: center;"><van-button type="primary" class="vbutton" @click="vbutton" >点击升级到最新版本</van-button></van-col>
    <van-col span="5"></van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  import {
    NavBar,
Row, Col,
Button,
Toast
  } from 'vant'

  Vue.use(NavBar);
  Vue.use(Button);
  Vue.use(Row).use(Col);
  Vue.use(Toast);
  export default {
    data() {
      return {

      }
    },
    computed: {

    },
    methods: {
      onClickLeft() {
        this.$router.back()
      },
vbutton(){
Toast('已经是最新版本了');
}
    }
  }
</script>

<style lang="scss" scoped>
@import '@/lib/reset.scss';
.logo{
width: 1.2rem;
height: 1.2rem;
display: block;
border: 1px solid yellow;
background: yellow;
border-radius: 7%;
align-self: center;
margin: 0 auto;
}
.logdiv{
  margin: 1.2rem auto 0;
}
.edition{
  margin-top: 2.5rem;
}
.vbutton{
color: white;
height: 0.3rem;
padding-left: 5px;
padding-right: 5px;
}

</style>
