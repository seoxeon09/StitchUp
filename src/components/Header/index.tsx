import Home from '../../assets/Home.js';
import User from '../../assets/User.js';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full border-t border-gray-300 bg-white flex">
      <div className="flex-1 flex justify-center items-center py-3 border-r border-gray-300">
        <Home />
      </div>
      <div className="flex-1 flex justify-center items-center py-3">
        <User />
      </div>
    </footer>
  );
};

export default Footer;
