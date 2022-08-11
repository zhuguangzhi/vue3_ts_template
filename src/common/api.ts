// import Http from './http'
import router from "@/router";
import {ElMessage} from "element-plus";

interface ApiResult<T> {
  result:T|null,
  error?:{message:string,code:number}|null
}

/**
 * api请求处理方法,封装返回数据格式
 */
export const ApiFormat = async <T>(fun: Promise<any>) => {
  try {
    const result = await fun
    return {result: result, error: null} as ApiResult<T>
  } catch (e) {
    return {result: null} as ApiResult<T>
  }
}

/**
 * api基础请求封装，loading,错误提示,异常处理
 */
export const ApiBase = async <T>(fun: Promise<any>, {
  // showLoading = false,
  // loadingText = '加载中',
  showError = true
} = {}) => {

  // 加载Loading
  let loading: any
  try {
    // if (showLoading) loading = ElMessage.loading({content: loadingText, key: loadingKey})

    // 发起请求
    const {result,error} = await ApiFormat(fun)

    if (showError) {
      ElMessage.error(error?.message || '请求异常')
      return {result} as ApiResult<T>
    }

    // if (result.code != 0 && showError) {
    //   message.error({ content: result.msg || '其他异常', key: loadingKey })
    //   return { result, error } as ApiResult
    // }

    if (loading) loading();
    loading = null
    return {result} as ApiResult<T>
  } catch (error: any) {
    if (showError) {
      ElMessage.error(error.message || '请求处理异常')
    } else {
      if (loading) loading();
      loading = null
    }
    return {result: null, error} as ApiResult<T>

  }
}

//错误校验
export const errorCheck = (result: any) => {
  if (!result || result.code !== 0) {
    const errorCode = [1610 , -1 , -2 , -3 , -4 , -5]
    if (errorCode.indexOf(result.code)!==-1){
      router.push('/login')
    }
    ElMessage.error(result.msg)
    return false;
  }
  return true;
}
