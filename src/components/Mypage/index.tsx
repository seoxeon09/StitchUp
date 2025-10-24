import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Stitch1 from '../../assets/Step1.png';
import Stitch2 from '../../assets/Step2.png';
import Stitch3 from '../../assets/Step3.png';
import Stitch4 from '../../assets/Step4.png';
import RoundImg from '../../assets/Round.png';
import Eat from '../../assets/Eat';
import Coin from '../../assets/Coin';

const Mypage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [coins, setCoins] = useState<number>(location.state?.coins || 0);
  const [food, setFood] = useState<number>(0);

  const [feedCount, setFeedCount] = useState<number>(() => {
    const savedCount = localStorage.getItem('feedCount');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('feedCount', feedCount.toString());
  }, [feedCount]);

  useEffect(() => {
    if (location.state) {
      const { addedFood, coins: newCoins } = location.state as {
        addedFood?: number;
        coins?: number;
      };

      if (addedFood) setFood((prev) => prev + addedFood);
      if (newCoins !== undefined) setCoins(newCoins);

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
    navigate('/shop', { state: { coins } });
  };

  const characterSize = Math.min(150 + feedCount * 1.5, 250);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-[390px] h-screen flex flex-col items-center relative p-4">
        <div className="absolute top-4 right-4 text-right z-20">
          <div className="flex items-center justify-end gap-1">
            <Coin />
            <span className="text-blue-600 font-bold text-lg">
              {coins.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-end gap-1">
            <Eat />
            <span className="text-blue-800 font-bold text-lg">{food}</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center flex-grow relative w-full">
          <img
            src={RoundImg}
            alt="Round background"
            className="absolute bottom-48 w-56 h-40 -translate-y-6 z-0 object-contain"
          />
          <img
            src={getCharacterImage()}
            alt="Stitch"
            style={{
              width: `${characterSize}px`,
              height: `${characterSize}px`,
              transition: 'all 0.3s ease-in-out',
              zIndex: 10,
              objectFit: 'contain',
            }}
          />
        </div>

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

        <div className="absolute bottom-48 right-4 text-sm text-gray-500">
          먹이를 준 횟수: {feedCount}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
