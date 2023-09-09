import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
console.log(`BACKEND_URI: ${BACKEND_URL}`);

const health = () => {
    return axios.get(`https://${BACKEND_URL}/health`)
}

export default health;
