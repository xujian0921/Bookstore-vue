<template>
  <ul class="newlist">
    <!-- 编程式导航 -->
    <li class="newitem" v-for="(item, index) of prolist" :key="index" @click="goDeta(item.id)">
      <div class="itemimg">
        <img :src="item.img" :alt="item.alt">
      </div>
      <div class="iteminfo">
        <h3>{{ item.bookname }}</h3>
        <div class="details">
          简介：<span>{{ item.publishingouse }}</span>
        </div>
        <div class="write">
          <span>{{ item.writer }}</span>
          <span>{{ item.money }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    newlist: Array
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
.newlist {
  .proitem {
    @include flexbox();
    @include rect(100%, 1.1rem);
    @include padding(0 0 10px 0);
    @include border (0 0 1px, #efefef, solid);
    @include margin(5px 0 0);
    .itemimg {
      @include rect(1.1rem, 1.1rem);
      img {
        @include rect(0.9rem, 0.9rem);
        @include margin(0.1rem);
      }
    }
    .iteminfo {
      @include flex();
      @include padding(0.05rem 0.2rem 0 0);
      @include flexbox();
      @include flex-direction(column);
      h3 {
        @include rect(100%, 0.2rem);
        @include font-size(0.16rem);
        @include ellipsis(1);
      }
      .details {
        @include flex();
        @include rect(100%, auto);
        @include padding(0.1rem 0);
      }
      .write {
        @include rect(100%, 0.2rem);
        @include flexbox();
        @include justify-content(space-between);
        @include ellipsis(1);
      }
    }
  }
}
</style>