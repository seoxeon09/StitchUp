import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { Start, Footer } from './components';

const Layout = () => {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
      </Routes>
      {location.pathname !== '/' && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
