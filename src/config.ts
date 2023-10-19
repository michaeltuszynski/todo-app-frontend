let configExports: { REACT_APP_BACKEND_URL?: string } = {};

export const loadConfig = async () => {
    try {
        const response = await fetch('/config.json');
        if (!response.ok) {
            console.error('Failed to load config.json with status:', response.status);
            return;
        }
        const configJson = await response.json();
        configExports.REACT_APP_BACKEND_URL = `https://${configJson.REACT_APP_BACKEND_URL}:5000`;
    } catch (error) {
        console.error('Error loading config.json:', error);
    }
}


export default configExports;
