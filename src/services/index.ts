
export const BASE_URL = import.meta.env.VITE_BASE_URL
import axios, { AxiosInstance } from "axios";

class APIService {
  axiosFunction: AxiosInstance;

  constructor(token?: boolean) {
    this.axiosFunction = axios.create({ baseURL: BASE_URL })
    if (token) {
      this.setToken();
    }
  }

  setToken() {
    const token = localStorage.getItem("token");
    this.axiosFunction.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  get(uri: string, params?: any) {
    return this.axiosFunction.get(uri, { params });
  }

  post(uri: string, data: any, params?: any) {
    return this.axiosFunction.post(uri, data, { params });
  }

  delete(uri: string, params?: any) {
    return this.axiosFunction.delete(uri, { params });
  }
}

export default APIService;
