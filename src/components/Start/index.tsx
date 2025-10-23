import { useNavigate } from 'react-router-dom';
import StartImg from '../../assets/Start.png';

const Start = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center bg-white min-h-screen">
      <div className="w-[390px] bg-sky-400/70 flex flex-col items-center">
        <img src={StartImg} alt="Start" className="w-full h-auto" />

        <button
          onClick={() => navigate('/main')}
          className="px-12 py-2 bg-blue-400 text-white rounded-xl hover:bg-blue-500 transition"
        >
          시작하기
        </button>
      </div>
    </div>
  );
};

export default Start;
