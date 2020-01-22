import env from '../env';
import axios from 'axios';

const fetchApi = (resource, method) => {
    const options = {
        method: method,
        url: `${env.backend_url}/${resource}`,

    };
    return axios(options)

}

export default fetchApi 