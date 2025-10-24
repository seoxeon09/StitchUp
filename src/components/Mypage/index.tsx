import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Stitch1 from '../../assets/Step1.png';
import Stitch2 from '../../assets/Step2.png';
import Stitch3 from '../../assets/Step3.png';
import Stitch4 from '../../assets/Step4.png';
import RoundImg from '../../assets/Round.png';
import Eat from '../../assets/Eat';

const Mypage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [coins, setCoins] = useState(65200);
  const [food, setFood] = useState(0);
  const [feedCount, setFeedCount] = useState(0);

  // Shop에서 돌아올 때 food 증가
  useEffect(() => {
    if (location.state?.addedFood) {
      setFood((prev) => prev + location.state.addedFood);
      // state 초기화해서 재실행 방지
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  const getCharacterImage = () => {
    if (feedCount >= 60) return Stitch4;
    if (feedCount >= 40) return Stitch3;
    if (feedCount >= 20) return Stitch2;
    return Stitch1;
  };

  const handleFeed = () => {
    if (food <= 0) {
      alert('구매해 놓은 밥이 떨어졌어요! 상점에서 다시 구매하세요!');
      return;
    }
    setFood((prev) => prev - 1);
    setFeedCount((prev) => prev + 1);
  };

  const goToShop = () => {
    navigate('/shop'); // 함수 전달하지 않음
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-[390px] h-screen flex flex-col items-center relative p-4">
        {/* 상단 코인/먹이 */}
        <div className="absolute top-4 right-4 text-right z-20">
          <div className="flex items-center justify-end gap-1">
            <span className="text-blue-600 font-bold text-lg">
              {coins.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-end gap-1">
            <Eat />
            <span className="text-blue-800 font-bold text-lg">{food}</span>
          </div>
        </div>

        {/* 캐릭터 + Round */}
        <div className="flex flex-col items-center justify-center flex-grow relative w-full">
          <img
            src={RoundImg}
            alt="Round background"
            className="absolute bottom-48 w-56 h-40 -translate-y-6 z-0 object-contain"
          />
          <img
            src={getCharacterImage()}
            alt="Stitch"
            className="w-40 h-40 object-contain z-10"
          />
        </div>

        {/* 버튼 */}
        <div className="flex flex-col gap-3 absolute bottom-10 w-full mb-6 z-10">
          <button
            onClick={handleFeed}
            className="w-full py-3 bg-blue-400 text-white rounded-lg font-bold active:scale-95 transition"
          >
            밥 주기
          </button>
          <button
            onClick={goToShop}
            className="w-full py-3 bg-blue-400 text-white rounded-lg font-bold active:scale-95 transition"
          >
            상점 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
