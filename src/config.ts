let configExports: { REACT_APP_BACKEND_URL?: string } = {};

export const loadConfig = async () => {
    try {
        const response = await fetch('config.json');
        if (!response.ok) {
            console.log('Failed to fetch config.json with status:', response.status);
            return;
        } else {
            console.log('Successfully fetch config.json :' + response.body);
        }

        const configJson = await response.json();
        configExports.REACT_APP_BACKEND_URL = `https://${configJson.REACT_APP_BACKEND_URL}`;
    } catch (error) {
        console.error('Error loading config.json file:', error);
    }
}


export default configExports;
