import React from 'react';
import TodoList from './components/TodoList';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';

function RedirectToNewPath() {
  let navigate = useNavigate();
  navigate(`http://${process.env.REACT_APP_BACKEND_URI}/health`);
  return null;
}


export const App = () => {
  return (
    <div className="App">
      <TodoList />

      <Router>
        <Routes>
          <Route path="/health" element={<RedirectToNewPath />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
