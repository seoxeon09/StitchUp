import React, { useState } from 'react';
import Stitch1 from '../../assets/stitch1.png';
import Stitch2 from '../../assets/stitch2.png';
import Stitch3 from '../../assets/stitch3.png';
import Stitch4 from '../../assets/stitch4.png';

const Mypage = () => {
  const [coins, setCoins] = useState(65200);
  const [food, setFood] = useState(0);
  const [feedCount, setFeedCount] = useState(0);

  // 성장 단계 계산 (20번마다 성장)
  const getCharacterImage = () => {
    if (feedCount >= 60) return Stitch4;
    if (feedCount >= 40) return Stitch3;
    if (feedCount >= 20) return Stitch2;
    return Stitch1;
  };

  const handleFeed = () => {
    if (food <= 0) return; // 밥이 없으면 아무 일도 안 함
    setFood((prev) => prev - 1);
    setFeedCount((prev) => prev + 1);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-[390px] h-screen flex flex-col items-center relative p-4">
        {/* 코인, 밥 수 */}
        <div className="absolute top-4 right-4 text-right">
          <div className="flex items-center justify-end gap-1">
            <span className="text-yellow-400 text-2xl">🪙</span>
            <span className="text-blue-600 font-bold text-lg">
              {coins.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-end gap-1">
            <span className="text-gray-800 text-xl">🍴</span>
            <span className="text-blue-800 font-bold text-lg">{food}</span>
          </div>
        </div>

        {/* 캐릭터 */}
        <div className="flex flex-col items-center justify-center flex-grow">
          <img
            src={getCharacterImage()}
            alt="Stitch"
            className="w-40 h-40 object-contain"
          />
          <p className="text-gray-500 text-sm mt-2">
            현재 성장: {feedCount} / 20회마다 성장
          </p>
        </div>

        {/* 버튼 */}
        <div className="flex flex-col gap-3 w-full mb-10">
          <button
            onClick={handleFeed}
            className="w-full py-3 bg-blue-400 text-white rounded-lg font-bold active:scale-95 transition"
          >
            밥 주기
          </button>
          <button className="w-full py-3 bg-blue-400 text-white rounded-lg font-bold active:scale-95 transition">
            상점 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
