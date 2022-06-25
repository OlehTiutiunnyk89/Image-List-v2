import axios from "axios";

const instance = axios.create({
    baseURL: 'https://picsum.photos'
})

instance.interceptors.response.use(function(response){
    console.log('response', response);
    return response.data;
})

export default instance;