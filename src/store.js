import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // 需要管理的组件的状态
    loginState: 'nook',
<<<<<<< HEAD
    cartlist: [],
    saveTel: '',
    saveId: ''
  },
  getters: {
    totalNum(state) {
=======
    cartlist: []
  },
  getters: {
    totalNum (state) {
>>>>>>> db717d48058ee26ff4c6dfd3a669cf1b9c85bd51
      let totalNum = 0
      // for (let i=0;i < state.cartlist.length;i++) {
      //   state.cartlist[i].flag ? totalNum += item.num : totalNum += 0
      // }
<<<<<<< HEAD
      /* state.cartlist.map(item => {
         // item.flag ? totalNum += item.num : totalNum += 0
         totalNum += item.num */
      state.cartlist.map(item => {
        item.flag ? totalNum += item.num : totalNum += 0
      })
      return totalNum
    },
    /* totalPrice (state) {
       let totalPrice = 0
       state.cartlist.map(item => {
         // item.flag ? totalPrice += item.num * item.price : totalPrice += 0
         let amoney = item.money
         // let newMoney = amoney.split('¥')[1]
         console.log(amoney.split('¥')[0])
         console.log(typeof (amoney))
         // totalPrice += item.num * newMoney
         // totalPrice = 5
       })
       return totalPrice */
    totalPrice(state) {
=======
      state.cartlist.map(item => {
        item.flag ? totalNum += item.num : totalNum += 0
        // totalNum += item.num
      })
      return totalNum
    },
    totalPrice (state) {
>>>>>>> db717d48058ee26ff4c6dfd3a669cf1b9c85bd51
      let totalPrice = 0
      console.log(state.cartlist)
      state.cartlist.map(item => {
        let amoney = item.money
        let newMoney = amoney.split('¥')[1] * 1
        console.log(item.flag)
        console.log(item.id)
        item.flag ? totalPrice += item.num * newMoney : totalPrice += 0
        // console.log(amoney.split('¥')[1])
        // totalPrice = item.num * newMoney
        // totalPrice = parseFloat(totalPrice).toFixed(1)
      })
      return parseFloat(totalPrice).toFixed(1)
    }
  },
  mutations: { // 唯一改变状态的地方
    changeLoginState(state, data) { // state代表的是初始化的数据
      state.loginState = data
    },
<<<<<<< HEAD
    changeCartList(state, data) {
      state.cartlist = data.result
    },
    saveTel(state, data) {
      state.saveTel = data
    },
    saveId(state, data) {
      state.saveId = data
    },

=======
    changeCartList (state, data) {
      let newArray = Array.from(new Set(data.result))
      state.cartlist = newArray
    }
>>>>>>> db717d48058ee26ff4c6dfd3a669cf1b9c85bd51
  },
  actions: {

  }
})
