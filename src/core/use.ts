import {createPinia} from "pinia";
import piniaPluginPersist from 'pinia-plugin-persist'
import router from "../router/index";

const init = (app: any) => {
  // app.component('KTable', KTable)
  app.config.globalProperties.$window = window

  const store = createPinia()
  //piniaPluginPersist pinia持久化插件
  store.use(piniaPluginPersist)
  app.use(store)
  // 添加路由
  app.use(router)
}

export default init;
