import env from "../env";
import axios from "axios";

const fetchApi = (resource, method, values) => {
  const options = {
    method: method,
    url: `${env.backend_url}/${resource}`,
    data: values
  };
  return axios(options);
};
const fetchSingleApi = (resource, method, id) => {
  const options = {
    method: method,
    url: `${env.backend_url}/${resource}/${id}`
  };
  return axios(options);
};
const deleteApi = (resource, method, id) => {
  const options = {
    method: method,
    url: `${env.backend_url}/${resource}/${id}`
  };
  axios(options)
};
const updateApi = (resource, method, values, id) => {
  const options = {
    method: method,
    url: `${env.backend_url}/${resource}/${id}`,
    data: Object.assign(
      {
        id: id,
        categoryId: 0
      },
      values
    )
  };
  return axios(options);
};
const searchApi = (resource, method, values) => {
  const options = {
    method: method,
    url: `${env.backend_url}/${resource}/Search?term=${values}`
  };
  return axios(options);
};
export { fetchApi, deleteApi, fetchSingleApi, updateApi, searchApi };
