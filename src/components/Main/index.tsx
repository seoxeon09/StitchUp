import React from 'react';
import { Coin } from '../../assets/Coin'; // assets 안에 Circle.tsx, Coin.tsx 가 있다고 가정
import CircleImg from 'assets/Circle.png';
const StepsPage = () => {
  const steps = 20000;
  const coins = 65200;
  const aiComment =
    '와우~~ 예시 문항입니당...\n근데 멀 써야 하짐\n내일은 200보 더 걸어봐욤!';

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-4">
      {/* 코인 표시 */}
      <div className="self-end flex items-center text-gray-500 text-lg font-semibold">
        <Coin className="mr-2 w-6 h-6" /> {coins.toLocaleString()}
      </div>

      {/* 걸음 수 원형 */}
      <div className="flex justify-center items-center mt-12">
        <img src={CircleImg} alt="Start" className="w-full h-auto" />
      </div>

      {/* AI 코멘트 박스 */}
      <div className="mt-12 w-full max-w-md border border-blue-300 rounded-lg p-4">
        <p className="text-blue-500 font-semibold mb-2">AI 코멘트</p>
        <p className="whitespace-pre-line text-gray-700">{aiComment}</p>
      </div>
    </div>
  );
};

export default StepsPage;
