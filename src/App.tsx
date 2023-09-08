import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import { Config } from './components/configTypes';

const App: React.FC = () => {
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    fetch('config.json')
      .then(response => response.json())
      .then((data: Config) => setConfig(data));
  }, []);

  const apiEndpoint = config?.REACT_APP_BACKEND_URL || "";

  return (
    <div className="App">
      <TodoList apiEndpoint={apiEndpoint}/>
    </div>
  );
}

export default App;
