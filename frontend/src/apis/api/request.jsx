import {defaultInstance} from "../api";

/**
 * HTTP 요청을 보내는 함수
 * @param {string} method - HTTP method ('GET', 'POST', 'PUT', 'DELETE')
 * @param {string} url - 요청할 URL
 * @param {Object} [params] - 요청 파라미터
 * @returns {Promise} - Axios 응답 데이터
 */
const request = (method, url, params) => {
  return defaultInstance.request({
    method: method,
    url: url,
    params: params,
  });
};

export default request;
