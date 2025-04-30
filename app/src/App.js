import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DeploymentWalkthrough from "./pages/DeploymentWalkthrough";
import DeploymentWalkthroughK8s from './pages/DeploymentWalkthroughK8s';
import './App.css';

function App() {
  return (
    <Router >
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CICD" element={<DeploymentWalkthrough />} />
          <Route path="/K8sCICD" element={<DeploymentWalkthroughK8s />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;