import React, { useState } from 'react';
import Coin from '../../assets/Coin';
import CircleImg from 'assets/Circle.png';

const StepsPage = () => {
  const [steps, setSteps] = useState(0);
  const [coins, setCoins] = useState(0);
  const [aiComment, setAiComment] = useState('');

  let lastAiRequestTime = 0;

  const connectSerial = async () => {
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 115200 });

      const decoder = new TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(decoder.writable);
      const reader = decoder.readable.getReader();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        if (value) {
          const trimmed = value.trim();

          if (/^\d+$/.test(trimmed)) {
            const increment = parseInt(trimmed);

            setSteps((prev) => {
              const newTotal = prev + increment;
              setCoins(newTotal * 3); // 코인도 누적 반영
              return newTotal;
            });

            // AI 요청: 2시간마다
            const now = Date.now();
            if (now - lastAiRequestTime > 2 * 60 * 60 * 1000) {
              setSteps((prev) => {
                requestAiComment(prev);
                lastAiRequestTime = now;
                return prev;
              });
            }
          }
        }
      }
    } catch (err) {
      console.error('Serial connection error:', err);
    }
  };

  const requestAiComment = async (steps: number) => {
    try {
      const response = await fetch('http://localhost:3001/ai-comment', {
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
    <div className="flex justify-center items-center min-h-screen bg-white">
      {/* 고정된 390px 레이아웃 */}
      <div className="w-[390px] min-h-screen bg-white flex flex-col items-center p-4 s">
        <button
          onClick={connectSerial}
          className="self-end mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          아두이노 연결
        </button>

        <div className="self-end flex items-center text-gray-500 text-lg font-semibold">
          <Coin /> {coins.toLocaleString()}
        </div>

        <div className="flex justify-center items-center mt-12 w-full relative">
          <img src={CircleImg} alt="Start" className="w-full h-auto" />
          <div className="absolute inset-0 flex justify-center items-center text-3xl font-bold text-black">
            {steps.toLocaleString()} 걸음
          </div>
        </div>

        <div className="mt-8 w-full border border-blue-300 rounded-lg p-4">
          <p className="text-blue-500 font-bold mb-2">AI 코멘트</p>
          <p className="whitespace-pre-line text-gray-700">
            {aiComment || '걸음 수 데이터를 기다리는 중...'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepsPage;
