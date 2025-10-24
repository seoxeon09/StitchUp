import { useNavigate } from 'react-router-dom';
import Home from '../../assets/Home';
import User from '../../assets/User';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] border-t border-gray-300 bg-white flex">
      <div
        className="flex-1 flex justify-center items-center py-3 border-r border-gray-300 cursor-pointer"
        onClick={() => navigate('/main')}
      >
        <Home />
      </div>
      <div
        className="flex-1 flex justify-center items-center py-3 cursor-pointer"
        onClick={() => navigate('/mypage')}
      >
        <User />
      </div>
    </footer>
  );
};

export default Footer;
