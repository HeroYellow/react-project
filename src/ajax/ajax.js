import axios from "axios";
import { message } from "antd";
import qs from "querystring";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.timeout = 7000;

// 设置请求拦截器 ---> 当 为 post 请求和 请求参数是对象的时候 需要转换成 urlencode
axios.interceptors.request.use(config => {
  NProgress.start();
  const { method, data } = config;
  if (method.toLowerCase() === "post" && data instanceof Object) {
    config.data = qs.stringify(data);
  }
  return config;
});

axios.interceptors.response.use(
  response => {
    NProgress.done();
    return response.data;
  },
  error => {
    NProgress.done();
    let errmsg = "未知错误，请联系管理员！";
    if (error.message.indexOf("401") !== -1)
      errmsg = "身份校验失败，请重新登录！";
    else if (error.message.indexOf("Network Error") !== -1)
      errmsg = "请求失败，请检查您的网络是否正常！";
    else if (error.message.indexOf("timeout") !== -1) errmsg = "请求已超时！";
    message.error(errmsg, 1);
    return new Promise(() => {});
  }
);
export default axios;
