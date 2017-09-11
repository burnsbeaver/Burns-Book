import axios from 'axios';

export function setAxiosDefaults(){
  axios.defaults.headers['token-type'] = "Bearer";
  axios.defaults.headers.client  = localStorage.getItem("client");
  axios.defaults.headers.expiry  = localStorage.getItem("expiry");
  axios.defaults.headers.uid  = localStorage.getItem("uid");
  axios.defaults.headers['access-token']  = localStorage.getItem("access-token");

  // axios.interceptors.response.use((res) => {
  //   if (res.headers['access-token']){
  //     localStorage.setItem("access-token", res.headers['access-token'])
  //     axios.defaults.headers['access-token'] = res.headers['access-token'];
  //   }
  //   return res
  // });
}

export function setAxiosHeaders(headers){
  // Set Axios Headers with Auth tokens for the next request.
  axios.defaults.headers['access-token'] = headers['access-token'];
  axios.defaults.headers.client = headers.client;
  axios.defaults.headers.uid = headers.uid;
  axios.defaults.headers.expiry = headers.expiry;

  // Save Auth tokens to localStorage to persist log-in if the window is closed
  localStorage.setItem("access-token", headers['access-token']);
  localStorage.setItem("client", headers.client);
  localStorage.setItem("uid", headers.uid);
  localStorage.setItem("expiry", headers.expiry);
}
