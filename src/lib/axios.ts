import { notify } from "@/lib/notify";
import axios from "axios";

const instance = axios.create({
  baseURL: "/api", // 根据环境配置
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
    if (data.code !== 0) {
      notify.error(data.message || "请求错误");
      return Promise.reject(data);
    }
    return data.data;
  },
  (error) => {
    notify.error(error?.response?.data?.message || "网络异常");
    return Promise.reject(error);
  }
);

export default instance;
