<template>
  <div class="container">
    <van-nav-bar
      :title="header_msg"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="content">
      <Prolist :prolist='prolist' />
    </div>
  </div>
</template>

<script>
import Prolist from '@/components/common/Prolist'
import Vue from 'vue'
import { NavBar } from 'vant'

Vue.use(NavBar)

export default {
  data () {
    return {
      header_msg: '搜索结果',
      prolist: []
    }
  },
  components: {
    Prolist
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  },
  mounted () {
    const { search } = this.$route.params
    fetch('http://47.100.225.183:8090/book/search?search=' + search, { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        this.prolist = data.data
      })
  }
}
</script>
