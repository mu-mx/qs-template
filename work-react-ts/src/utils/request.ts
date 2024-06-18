import axios from 'axios';
import { notification } from 'antd';
import storage from './storage';
import { ENV } from '@/constants';
import { getBaseURL } from '@/../config/proxy';

axios.defaults.withCredentials = true;
const instance = axios.create({ baseURL: getBaseURL(ENV) });

instance.interceptors.request.use(
  (config: any) => {
    config.headers = {
      ...config.headers,
      Authorization: storage.get('token') || '',
      Workcode: (storage.get('admin') || { workcode: '' }).workcode,
    };

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  //http状态码为2xx的时候执行
  (response) => {
    const { data } = response;
    const { code } = data;

    if (code != 200) {
      notification.error({
        message: data.message,
      });
    }

    return data;
  },
  //http状态码不为2xx的时候执行
  (error) => {
    const { response = {} } = error;
    const { status } = response;

    enum CodeMessage {
      '发出的请求有错误，服务器没有进行新建或修改数据的操作。' = 400,
      '用户未登录。' = 401,
      '用户得到授权，但是访问是被禁止的。' = 403,
      '发出的请求针对的是不存在的记录，服务器没有进行操作。' = 404,
      '请求的格式不可得。' = 406,
      '请求的资源被永久删除，且不会再得到的。' = 410,
      '当创建一个对象时，发生一个验证错误。' = 422,
      '服务器发生错误，请检查服务器。' = 500,
      '网关错误。' = 502,
      '服务不可用，服务器暂时过载或维护。' = 503,
      '网关超时。' = 504,
      '系统错误' = 600,
    }

    notification.error({
      message:
        response?.data?.message || status
          ? CodeMessage[status]
          : CodeMessage[600],
    });

    if (status === 401) {
      //   const {
      //     _store: { dispatch },
      //   } = getDvaApp();
      //   dispatch({
      //     type: 'user/resetLoginStatus',
      //   });
    }

    return Promise.reject(error);
  }
);

export default instance;
