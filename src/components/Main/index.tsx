import React, { useState } from 'react';
import Coin from '../../assets/Coin'; // assets 안에 Coin.tsx
import CircleImg from 'assets/Circle.png';

const StepsPage = () => {
  const [steps, setSteps] = useState(0);
  const [coins, setCoins] = useState(0);
  const [aiComment, setAiComment] = useState('');

  // 아두이노 연결 및 시리얼 읽기
  const connectSerial = async () => {
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });

      const decoder = new TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(decoder.writable);
      const reader = decoder.readable.getReader();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        if (value) {
          const newSteps = parseInt(value.trim());
          if (!isNaN(newSteps)) {
            setSteps(newSteps);
            setCoins(newSteps * 3); // 예시: 걸음수 * 3 코인
            requestAiComment(newSteps); // AI 코멘트 요청
          }
        }
      }
    } catch (err) {
      console.error('Serial connection error:', err);
    }
  };

  // AI 코멘트 요청
  const requestAiComment = async (steps: number) => {
    try {
      const response = await fetch('http://localhost:3000/ai-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ steps }),
      });
      const data = await response.json();
      setAiComment(data.comment);
    } catch (err) {
      console.error('AI request error:', err);
      setAiComment('AI 코멘트를 불러오는 중 오류가 발생했어요.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-4">
      {/* 아두이노 연결 버튼 */}
      <button
        onClick={connectSerial}
        className="self-end mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        아두이노 연결
      </button>

      {/* 코인 표시 */}
      <div className="self-end flex items-center text-gray-500 text-lg font-semibold">
        <Coin /> {coins.toLocaleString()}
      </div>

      {/* 원 이미지 */}
      <div className="flex justify-center items-center mt-12 w-full max-w-md relative">
        <img src={CircleImg} alt="Start" className="w-full h-auto" />
        {/* 걸음 수를 이미지 위에 표시 */}
        <div className="absolute inset-0 flex justify-center items-center text-3xl font-bold text-blue-500">
          {steps.toLocaleString()} 걸음
        </div>
      </div>

      {/* AI 코멘트 박스 */}
      <div className="mt-12 w-full max-w-md border border-blue-300 rounded-lg p-4">
        <p className="text-blue-500 font-semibold mb-2">AI 코멘트</p>
        <p className="whitespace-pre-line text-gray-700">
          {aiComment || '걸음 수 데이터를 기다리는 중...'}
        </p>
      </div>
    </div>
  );
};

export default StepsPage;
