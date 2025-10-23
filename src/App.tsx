import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Start } from './components/index.js';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
      </Routes>
    </Router>
  );
};

export default App;
