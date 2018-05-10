import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `http://localhost:9090/`,
  headers: {
    //Authorization: 'Bearer {token}'
    //"Access-Control-Allow-Origin": "*"
    "Content-Type": "application/json"
  }
})