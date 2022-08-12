import { account } from '@/store';
import axios from 'axios'
import router from "@/router";
import {ElMessage} from "element-plus";
// 添加请求拦截器，在发送请求之前做些什么(**具体查看axios文档**)--------------------------------------------
axios.interceptors.request.use(function (config) {
  console.log("请求：",config);
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器(**具体查看axios文档**)----------------------------------------------------------------
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么，允许在数据返回客户端前，修改响应的数据
  // 如果只需要返回体中数据，则如下，如果需要全部，则 return response 即可
  return response.data
}, (error) => {
  if (error?.response?.status===401) {
    ElMessage.error('未登录或登录已过期！')
    router.push('/login')
    return
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 封装数据返回失败提示函数---------------------------------------------------------------------------
function errorState (response: any) {
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    // 如果不需要除了data之外的数据，可以直接 return response.data
    return response
  } else {
    // alert('数据获取错误')
  }
}

// 封装数据返回成功提示函数---------------------------------------------------------------------------
function successState (res: any) {
  console.log("响应数据：",res)
  // 统一判断后端返回的错误码(错误码与后台协商而定)
  if (res.error === 0) {
    return res
  }else{
  }
}
// 封装axios--------------------------------------------------------------------------------------
function apiAxios (method: string, url: string, params: any, header?: any) {

  if (!header) { header = {} }

  const accountStore = account()
  // 从state中取出token
  const token = accountStore.getToken
  if(token){
    header.token = token
    // if (params) {
    //   if (!params['token']) {
    //     params['token'] = accountStore.token
    //   }
    // } else {
    //   params = { token: accountStore.token }
    // }
    // if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
    //   url = url + '?token=' + accountStore.token
    // }
  } else {
    console.log('token为空')
  }

  // eslint-disable-next-line prefer-const
  let httpDefault: any = {
    method: method,
    url: url,
    // `params` 是即将与请求一起发送的 URL 参数
    // `data` 是作为请求主体被发送的数据
    params: method === 'GET' ? params : null,
    data: method === 'POST' || method === 'PUT' || method === 'DELETE' || method === 'PATCH' ? params : null,
    timeout: 30000
  }

  // 如果headers中还需要其他信息可以在这边合并
  httpDefault.headers = {
    ...header
  }

  // 注意**Promise**使用(Promise首字母大写)
  return new Promise((resolve, reject) => {
    axios(httpDefault).then((res) => {
      successState(res)
      resolve(res)
    }).catch((response) => {
      errorState(response)
      reject(response)
    })
  })
}

// 输出函数getAxios、postAxios、putAxios、delectAxios，供其他文件调用-----------------------------
// Vue.js的插件应当有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
export default {
  get: (url: string, params: any, header?: any) => apiAxios('GET', url, params, header),
  post: (url: string, params: any, header?: any) => apiAxios('POST', url, params, header),
  put: (url: string, params: any, header?: any) => apiAxios('PUT', url, params, header),
  delete: (url: string, params: any, header?: any) => apiAxios('DELETE', url, params, header),
  patch: (url: string, params: any, header?: any) => apiAxios('PATCH', url, params, header)
}
