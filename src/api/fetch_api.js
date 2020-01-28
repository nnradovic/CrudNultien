import env from "../env";
import axios from "axios";

async function fetchApi(resource, method, values) {
  const options = {
    method: method,
    url: `${env.backend_url}/${resource}`,
    data: values
  };
  return await axios(options)

};
async function fetchSingleApi(resource, method, id) {
  const options = {
    method: method,
    url: `${env.backend_url}/${resource}/${id}`
  };
  return await axios(options);
};
async function deleteApi(resource, method, id) {
  const options = {
    method: method,
    url: `${env.backend_url}/${resource}/${id}`
  };
  return await axios(options)

};
async function updateApi(resource, method, values, id) {
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
  return await axios(options);
};
async function searchApi(resource, method, values) {
  const options = {
    method: method,
    url: `${env.backend_url}/${resource}/Search?term=${values}`
  };
  return await axios(options);
};
export { fetchApi, deleteApi, fetchSingleApi, updateApi, searchApi };
