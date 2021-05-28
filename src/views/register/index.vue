<template>
  <div class="container">
    <van-nav-bar
      title="注册"
      right-text="登录"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  <div class="content">
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        :right-icon="usernameIcon"
        placeholder="请输入用户名"
        :error-message="usernameState"
      />

      <van-field
          v-model="password"
          type="password"
          label="密码"
          clearable
          placeholder="请输入密码"
          :right-icon="passwordIcon"
          :error-message="passwordState"
          required
        />

       <!-- <van-field
          v-model="sms"
          center
          required
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <van-button slot="button" @click="sendCode" size="small" type="primary">发送验证码</van-button>
        </van-field> -->
      </van-cell-group>
       <van-button type="primary" size="normal" @click="register" :block="true">注册</van-button>
  </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Field, Cell, CellGroup, Button, Toast, Dialog } from 'vant'

Vue.use(NavBar)
Vue.use(Field)
Vue.use(Cell).use(CellGroup)
Vue.use(Button)
Vue.use(Toast)
Vue.use(Dialog)
export default {
  data () {
    return {
      username: '',
      password: '',
      sms: '',
      code: 'aa'
    }
  },
  computed: {
    usernameState () {
      if (this.username === '') {
        return ''
      } else if (!(/^1[3456789]\d{9}$/.test(this.username))) {
        return '手机号码格式错误'
      } else {
        return ''
      }
    },
    usernameIcon () {
      if (this.username === '') {
        return ''
      } else if (/^1[3456789]\d{9}$/.test(this.username)) {
        return 'checked'
      } else {
        return ''
      }
    },
    passwordState () {
      if (this.password === '') {
        return ''
      } else if (this.password.length < 5) {
        return '密码格式错误'
      } else {
        return ''
      }
    },
    passwordIcon () {
      if (this.password === '') {
        return ''
      } else if (this.password.length >= 5) {
        return 'checked'
      } else {
        return ''
      }
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onClickRight () {
      this.$router.replace('/login')
    },
    sendCode () {
      fetch('https://www.daxunxun.com/users/sendCode?tel=' + this.username)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if (data === 1) {
            Toast('手机号码已经被注册')
          } else if (data === 0) {
            Toast('获取验证码失败')
          } else {
            this.code = data.code // 将获取到的验证码，赋给code
          }
        })
    },
    register () {
      if (this.usernameIcon !== 'checked') {
        Toast('手机号格式错误')
        return null
      }
      if (this.passwordIcon !== 'checked') {
        Toast('密码格式错误')
        return null
      }
      /* if (this.sms !== this.code) {
        Toast('验证码错误')
        return null
      } */
      // 提交数据到服务器
      //fetch('/api/users/addAction', {
        fetch('http://47.100.225.183:8090/users/addAction', {

        method: 'post',
        headers: { // 看后端接口，数据类型要匹配上，还有json类型的
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'tel=' + this.username + '&password=' + this.password
      }).then(res => res.json()).then(data => {
        console.log(data)
        if (data === 1) {
          Toast('注册成功')
          this.$router.push('./login')
        } else if (data === 2) {
          Dialog.confirm({
            title: '提示',
            message: '该用户已经注册，是否直接登录'
          }).then(() => {
            this.$router.push('/login')
          }).catch(() => {})
        } else {
          Toast('注册失败')
        }
      })
    }
  }
}
</script>
