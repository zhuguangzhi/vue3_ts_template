import {defineStore} from "pinia";
import {AccountProps} from "@/store/type/account";

export default defineStore({
  id:"account",
  state:()=>({
    token:'',
    userInfo:{},
    vipRank:0,//vip等级
    userConfig:{},//个人配置信息
  }),

  actions: {
    Login(payload:AccountProps){
      this.$state.token = payload.token
      this.$state.userInfo = payload.userInfo
      this.$state.vipRank = payload.vipRank || 0
      this.$state.userConfig = payload.userConfig || {}
    },
    LoginOut(){
      this.$state.token = ""
      this.$state.userInfo = {}
      this.$state.vipRank = 0
      this.$state.userConfig = {}
    }
  },

  getters:{
    getState(state){
      return state
    },
    getToken(state){
      return state.token
    }
  }

})
