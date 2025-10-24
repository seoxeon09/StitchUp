import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { Footer } from './components';
import Mypage from './components/Mypage';
import Shop from './components/Shop';

const Layout = () => {
  const location = useLocation();

  return <>{location.pathname !== '/' && <Footer />}</>;
};

const App = () => {
  return (
    <Router>
      <Layout /> {/* 공통 레이아웃이 있으면 여기에 두거나 */}
      <Routes>
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </Router>
  );
};

export default App;
