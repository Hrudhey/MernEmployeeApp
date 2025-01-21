import axios from "axios";
const axiosInstance= axios.create({                          // to attach a token for every request we created this file
    baseURL: 'http://localhost:3000'                    
})
axiosInstance.interceptors.request.use((config)=>{
    const accessToken=sessionStorage.getItem('logintoken');    // saving the token to a variable
    if(accessToken){
        if(config){
            config.headers.token=accessToken;             // if the token is available we create a field called token and we are embedding a keyword to the token
        }                                              // config.header is a keyword
    }
    return config;
},(error)=>{
    return Promise.reject(error);
})

export default axiosInstance                           // instead of axios we use axiosInstance in front end that is for each request the token is attached using axios