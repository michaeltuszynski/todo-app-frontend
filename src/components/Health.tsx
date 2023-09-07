// Health.tsx
import React, { useState, useEffect } from 'react';

const Health: React.FC = () => {

    const [data, setData] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_BACKEND_URI}/health`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok ${error}`);
                }
                return response.text();
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                setError(error.message);
            });
    },[error]);

    return (
        <div>
            {data}
        </div>
    );
};

export default Health;
