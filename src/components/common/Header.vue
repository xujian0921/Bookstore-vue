<template>
  <header style="display: flex">
    <img src="../../../public/img/logo.png" alt="">
    <input type="text" v-model="text_msg" @click="goSearch">
    <div>
      <van-icon name="search" @click="goSearch"/>
    </div>
  </header>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant'

Vue.use(Icon)
export default {
  data () {
    return {
      text_msg: '论语通译-张葆全'
    }
  },
  methods: {
    goSearch () {
      this.$router.push('/search')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/lib/reset.scss';

header {
  @include rect(100%, 0.46rem);
  @include flexbox();
  justify-content: space-between;
  @include align-items();
  background: linear-gradient(to bottom, #fe2828 0%,#e60000 100%);
  img {
    @include rect(1.1rem, auto);
  }
  input {
    @include flex();
    @include rect(auto, 0.34rem);
    @include margin(0.02rem 0.05rem 0.02rem 0.1rem);
    border-radius: 0.6rem;
    padding: 0;
    border: 0;
    color: #8e8e8e;
    padding-left: 0.15rem;
    font-size: 14px;
  }
  .van-icon {
    font-size: 26px;
    color: white;
    padding-right: 0.1rem;
  }
}
</style>
