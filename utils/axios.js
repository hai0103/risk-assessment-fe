import axios from 'axios'
// import {Utility} from "utils/common";
import {trackPromise} from 'react-promise-tracker';

// axios.interceptors.request.use(function (config) {
//   const token = Authentication.getAccessToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//
//   return config;
// });


export function request(method,
                        url,
                        data,
                        headers = {},
                        isCheck = true,
                        responseType = '',
                        isTracking = true,
) {
  // setCommonHeader(headers);
  const defaultHeaders = {
    "Content-Type": "application/json",
    ...headers
  }

  const params = {
    method: method,
    url: url,
    headers: defaultHeaders,
  };

  const isGet = (method) => {
    return method.toUpperCase() === 'GET'
  }

  if (responseType) {
    params['responseType'] = responseType
  }

  if (isGet(method)) {
    params['params'] = data || {};
  } else {
    params['data'] = data;
  }

  const promise = axios(params).then(response => {
    return response;
  }).catch(error => {

  });

  if (isGet(method) && isTracking) {
    trackPromise(promise)
  }

  return promise
}
