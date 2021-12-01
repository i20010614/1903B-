import axios from 'axios';
import { Message } from 'element-ui';

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://creationapi.shbwyz.com' : 'https://creationapi.shbwyz.com',
    timeout: 3000
});
// 请求拦截器
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    // return config
    // {
    //     ...config,
    //     headers:{
    //         ...config.headers,
    //         // token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMxN2EyYWM4LTc1ZmItNGZiNS05N2ExLWI2MzVmYjdlM2ViNiIsIm5hbWUiOiJqYXNvbiIsImVtYWlsIjpudWxsLCJyb2xlIjoidmlzaXRvciIsImlhdCI6MTYzNzMwMjYwNCwiZXhwIjoxNjM3MzE3MDA0fQ.6wowhuV5mpfD2CNGbPpeFSRYAcMqH5TBWjTqfG4Efw4"
    //     }
    // };
   
        // 先把config.url进行URI编码，然后全局替换其中的特殊字符，然后再URI解码
        config.url = decodeURI(encodeURI(config.url).replace(/%E2%80%8B/g, ""))
        return config

}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 相应拦截器
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log('response: ', response)
    if (response.status === 200) {
        return response.data.data;
    } else {
        Message.error(response.data.msg || response.statusText)
    }

    // return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

// 抛出instance
export default instance;