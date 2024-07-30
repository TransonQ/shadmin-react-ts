import axios from "axios"
import {
  onRequest,
  onRequestError,
  onResponse,
  onResponseError,
} from "../handlers"

const ax = axios.create({
  baseURL: "http://127.0.0.1:3100",
})

// 请求拦截器
ax.interceptors.request.use(onRequest, onRequestError)

// 响应拦截器
ax.interceptors.response.use(onResponse, onResponseError)

export { ax }
