import { notify } from "@/lib/notify";
import axios, { AxiosError } from "axios";
const BASE_API = import.meta.env.VITE_BASE_API || '/api/'
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
    const locale = localStorage.getItem("locale")||navigator.language.split("-")[0];
    if (locale) {
      config.headers['Locale'] = locale;
    }
    return config;
  },
  (error:AxiosError) => {
    notify.error(error.message ||"请求发送失败");
    Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (data.code !== 200) {
      notify.error(data.message || "请求错误");
      return Promise.reject(data);
    }
    return response;
  },
  (error:AxiosError) => {
    notify.error(error.message || "网络异常");
    return Promise.reject(error);
  }
);

export default instance;
