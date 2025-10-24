import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { Start, Footer } from './components';
import Main from './components/Main';
import Mypage from './components/Mypage';
import Shop from './components/Shop';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <>
      {children}
      {location.pathname !== '/' && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/main" element={<Main />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
