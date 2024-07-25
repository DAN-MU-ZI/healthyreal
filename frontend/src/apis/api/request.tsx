import {defaultInstance} from "../api";
import {Method, AxiosResponse} from "axios";

const request = <T,>(
  method: Method,
  url: string,
  params?: any
): Promise<AxiosResponse<T>> => {
  return defaultInstance.request<T>({
    method,
    url,
    params,
  });
};

export default request;
