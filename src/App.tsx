import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Footer } from './components';

const Layout = () => {
  const location = useLocation();

  return <>{location.pathname !== '/' && <Footer />}</>;
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
