let configExports: { REACT_APP_BACKEND_URL?: string } = {};

export const loadConfig = async () => {
    const response = await fetch('./config.json');
    const configJson = await response.json();
    configExports.REACT_APP_BACKEND_URL = `https://${configJson.REACT_APP_BACKEND_URL}:5000`;
}

export default configExports;
