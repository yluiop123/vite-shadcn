import { notify } from "@/lib/notify";
import axios from "axios";
let BASE_API = '/api/'
if (import.meta.env.MODE === 'production') {
    // 正式环境地址
    BASE_API = 'http://xxxxx/api/'
}
const instance = axios.create({
  baseURL: BASE_API, // 根据环境配置
  timeout: 10000,
});
instance.interceptors.request.use(
  (config) => {
    // 如果是 FormData，取消默认的 json header 设置
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    // 加 token 等逻辑
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    notify.error("请求发送失败");
    Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data.code !== 200) {
      notify.error(data.message || "请求错误");
      return Promise.reject(data);
    }
    return data;
  },
  (error) => {
    notify.error(error?.response?.data?.message || "网络异常");
    return Promise.reject(error);
  }
);

export default instance;
