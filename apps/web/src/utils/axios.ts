import Axios from 'axios';

const axios = Axios.create({
  // @ts-ignore
  baseURL: process.env.NX_API_URL,
  timeout: 1000,
});

export default axios;
