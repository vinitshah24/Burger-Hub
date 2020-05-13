import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://projectapi-238001.firebaseio.com/'
});

export default instance;