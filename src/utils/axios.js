import axios from 'axios';

axios.defaults.timeout = 20000;
axios.defaults.baseURL = 'http://10.66.51.134:3000';

axios.interceptors.request.use(
    config => {
        // console.log('request~~~config~~~', config)
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//http response 拦截器
axios.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        return Promise.reject(error)
    }
)

export default axios