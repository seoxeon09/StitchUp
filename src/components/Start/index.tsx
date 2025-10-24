import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { StartText } from 'assets';
import StartImg from 'assets/Start.png';

const Start = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-blue-400/70 min-h-screen overflow-hidden gap-4">
      <div
        className={`flex-shrink-0 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
      >
        <StartText className="mb-24" />
      </div>

      <div
        className={`flex-shrink-0 w-full max-w-[390px] -mt-20 transition-all duration-700 delay-200 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
      >
        <img src={StartImg} alt="Start" className="w-full h-auto" />
      </div>

      <div
        className={`flex-shrink-0 mt-20 transition-all duration-700 delay-400 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
      >
        <button
          onClick={() => navigate('/main')}
          className="w-[260px] py-3.5 bg-blue-400 text-white font-bold rounded-xl hover:bg-blue-500 transition"
        >
          시작하기
        </button>
      </div>
    </div>
  );
};

export default Start;
