import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface RequestOptions extends AxiosRequestConfig {
  skipErrorHandler?: boolean;
}

interface ResponseData<T = any> {
  code: number;
  data: T;
  message: string;
}

// 创建axios实例
const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在请求发送之前做一些处理
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    const res = response.data;
    // 根据业务状态码处理
    if (res.code !== 0) {
      // 处理错误
      if (res.code === 401) {
        // 未授权，清除token并跳转登录页
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(res);
    }
    return res.data;
  },
  (error) => {
    // 处理HTTP错误
    console.error('请求错误', error);
    return Promise.reject(error);
  }
);

const request = {
  get: <T = any>(url: string, params?: any, options?: RequestOptions) => {
    return instance.get<T, T>(url, { params, ...options });
  },
  post: <T = any>(url: string, data?: any, options?: RequestOptions) => {
    return instance.post<T, T>(url, data, options);
  },
  put: <T = any>(url: string, data?: any, options?: RequestOptions) => {
    return instance.put<T, T>(url, data, options);
  },
  delete: <T = any>(url: string, params?: any, options?: RequestOptions) => {
    return instance.delete<T, T>(url, { params, ...options });
  },
};

export default request; 