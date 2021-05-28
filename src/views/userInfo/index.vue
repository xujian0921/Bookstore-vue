<template>
  <div class="container">
    <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft"  />
    <div class="content">
      <van-cell-group>
        <van-field v-model="username" required clearable label="昵称"  placeholder="请输入昵称"
          :error-message="usernameState" />
<van-field v-model="age" required clearable label="年龄" placeholder="请输入年龄"
          :error-message="usernameState" />
          <van-field v-model="tel" required clearable label="手机号"  placeholder="请输入手机号"
            :error-message="usernameState" />
            <van-field v-model="sex" required clearable label="性别"  placeholder="请输入性别"
              :error-message="usernameState" />
              <van-field v-model="city" required clearable label="城市"  placeholder="请输入城市"
                :error-message="usernameState" />
       <!-- <van-field v-model="password" type="password" label="密码" clearable placeholder="请输入密码" :right-icon="passwordIcon"
          :error-message="passwordState" required /> -->
      </van-cell-group>
      <van-button type="primary" size="normal" @click="login" :block="true">保存信息</van-button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    NavBar,
    Field,
    Cell,
    CellGroup,
    Button,
    Toast,
    Dialog
  } from 'vant'

  Vue.use(NavBar)
  Vue.use(Field)
  Vue.use(Cell).use(CellGroup)
  Vue.use(Button)
  Vue.use(Toast)
  Vue.use(Dialog)
  export default {
    data() {
      return {
        /* username: '18895312923',
        password: '123456' */
        username: '',
        age: '',
        tel:'',
        sex:'',
        city:''
      }
    },
    computed: {
      usernameState() {
        if (this.username === '') {
          return ''
        } else if (!(/^1[3456789]\d{9}$/.test(this.username))) {
          return '手机号码格式错误'
        } else {
          return ''
        }
      },
      usernameIcon() {
        if (this.username === '') {
          return ''
        } else if (/^1[3456789]\d{9}$/.test(this.username)) {
          return 'checked'
        } else {
          return ''
        }
      },
      passwordState() {
        if (this.password === '') {
          return ''
        } else if (this.password.length < 5) {
          return '密码格式错误'
        } else {
          return ''
        }
      },
      passwordIcon() {
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
      onClickLeft() {
        this.$router.back()
      },
      onClickRight() {
        this.$router.replace('/register')
      },
      login() {
        if (this.usernameIcon !== 'checked') {
          Toast('手机号格式错误')
          return null
        }
        if (this.passwordIcon !== 'checked') {
          Toast('密码格式错误')
          return null
        }
        if (this.sms !== this.code) {
          Toast('验证码错误')
          return null
        }
        // 提交数据到服务器
        fetch('/api/users/login', {
          method: 'post',
          headers: { // 看后端接口，数据类型要匹配上，还有json类型的
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: 'username=' + this.username + '&password=' + this.password
        }).then(res => res.json()).then(data => {
          //console.log(this)
           let that = this;
          // console.log(that)
          //console.log("data" + typeof(data))
          if (data === 1) {
            Toast('登录成功')
          /*  fetch('https://www.daxunxun.com/users/register', {
              methods: 'post',
              headers: { // 看后端接口，数据类型要匹配上，还有json类型的
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: 'username=' + "18939920572"
            }).then(res => res.json()).then(data => {
              console.log(data);
              alert(data);
            })
 */
            //console.log("this.userinfo",this)
            this.$store.commit('changeLoginState', 'ok')
            this.$store.commit('saveUser', this.username)
            //console.log(this.$store)
            this.$router.back() // 登录成功后会返回上个页面user页面，进入user页面前有路由守卫判断后直接进入个人用户
          } else if (data === 2) {
            Dialog.confirm({
              title: '提示',
              message: '该用户还未注册，是否注册'
            }).then(() => {
              this.$router.push('/register')
            }).catch(() => {})
          } else if (data === -1) {
            Toast('密码错误')
          } else {
            Toast('登录失败')
          }
        })
        /* }).then(data=> {
          console.log("55555")
        }) */
      }
    }
  }
</script>
