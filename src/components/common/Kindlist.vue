<template>
  <ul class="kindlist">
    <!-- 编程式导航 -->
    <li class="kinditem" v-for="(item, index) of kindlist" :key="index" @click="goDeta(item.id)">
      <div class="itemimg">
        <img :src="item.img" :alt="item.alt" :οnerrοr="logo">
      </div>
      <div class="iteminfo">
        <h3>{{ item.bookname }}</h3>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      logo: "this.src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562519306115&di=c79f74d34c0649302deedcd7374a3cec&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F1a4d0e172847d92d55d94a84e4638aff55289dd51814b-jWUAC1_fw658'"
    }
  },
  props: {
    kindlist: Array
  },
  methods: {
    goDeta (id) {
      this.$router.push({ name: 'detail', params: { id: id } })
    }
  }
}
</script>

<style lang="scss">
@import '@/lib/reset.scss';
.kindlist {
  @include flexbox();
  @include margin(0.1rem 0 0 0);
  @include flex-wrap(wrap);
  .kinditem {
    @include flexbox();
    @include rect(33%, 1.2rem);
    @include padding(0.1rem);
    @include flex-direction(column);
    @include margin(0.1rem 0);
    .itemimg {
      @include rect(100%, 1rem);
      img {
        @include rect(100%, 100%);
        // @include margin(0.1rem);
      }
    }
    .iteminfo {
      h3 {
        @include font-size(0.12rem);
        @include ellipsis(1);
        @include text-align();
        @include margin(0.05rem 0 0);
      }
    }
  }
}
</style>
