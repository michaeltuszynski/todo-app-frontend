import axios from 'axios';

const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;
console.log(`BACKEND_URI: ${BACKEND_URI}`);

const health = () => {
    return axios.get(`http://${BACKEND_URI}/health`)
}

export default health;
