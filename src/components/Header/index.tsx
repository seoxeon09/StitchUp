import { Home, User } from '../../assets';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full border-t border-gray-300 bg-white flex">
      {/* 홈 아이콘 */}
      <div className="flex-1 flex justify-center items-center py-3 border-r border-gray-300">
        <Home size={24} />
      </div>
      {/* 프로필 아이콘 */}
      <div className="flex-1 flex justify-center items-center py-3">
        <User size={24} />
      </div>
    </footer>
  );
};

export default Footer;
