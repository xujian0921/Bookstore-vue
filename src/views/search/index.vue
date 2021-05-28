<template>
  <div class="container">
    <header style="display: flex">
      <van-icon
        name="arrow-left"
        size="30px"
        color="white"
        @click="goBack"
      />
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        background="linear-gradient(to bottom, #fe2828 0%,#e60000 100%)"
        show-action
        shape="round"
        @search="onSearch"
      >
        <div slot="action" @click="onSearch(value)" style="color:#ffffff">搜索</div>
      </van-search>
    </header>
    <div class="content" style="background: #efefef">
      <div class="content_item">
        <h3>热门搜索</h3>
        <div class="item_content">
          <div class="item_box">
            <p @click="onSearch('卢作孚的选择')">卢作孚的选择</p>
            <p @click="onSearch('人间失格')">人间失格</p>
          </div>
          <div class="item_box">
            <p @click="onSearch('胡适的情缘与晚境')">胡适的情缘与晚境</p>
            <p @click="onSearch('中国古代用人故事大观')">中国古代用人故事大观</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Search, Icon } from 'vant'

Vue.use(Search)
Vue.use(Icon)

export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    onSearch (search) {
      this.$router.push({ name: 'searchlist', params: { search: search } })
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
  .van-icon {
    @include rect(auto, 0.34rem);
    @include line-height(0.34rem);
    @include padding(0 0 0 0.05rem);
    @include text-align();
  }
  .van-search {
    @include flex();
    @include rect(auto, 0.34rem);
    @include margin(0.02rem 0.05rem 0.02rem 0);
  }
}
.content {
  .content_item {
    @include rect(100%, 2rem);
    h3 {
      @include padding(0.2rem 0.1rem 0.1rem);
      @include font-size(16px);
    }
    .item_content {
      .item_box {
        @include rect(100%, 0.4rem);
        @include flexbox();
        @include padding(0 0 0.1rem);
        p {
          @include text-align();
          line-height: 0.3rem;
          @include rect(auto, 0.3rem);
          @include padding(0 0.1rem);
          margin: 0 3% ;
          background-color: #fff;
          border-radius: 0.1rem;
          color: #e60000;
        }
      }
    }
  }
}
</style>
