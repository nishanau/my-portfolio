import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DeploymentWalkthrough from "./pages/DeploymentWalkthrough";
import './App.css';

function App() {
  return (
    <Router >
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CICD" element={<DeploymentWalkthrough />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;