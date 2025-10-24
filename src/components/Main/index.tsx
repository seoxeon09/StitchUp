import React, { useState, useRef, useEffect } from 'react';
import Coin from '../../assets/Coin';
import CircleImg from 'assets/Circle.png';

const StepsPage = () => {
  const [steps, setSteps] = useState(0);
  const [coins, setCoins] = useState(0);
  const [aiComment, setAiComment] = useState('');

  const lastAiRequestTime = useRef(0); // 마지막 AI 요청 시간
  const apiKey = import.meta.env.VITE_AI_API_KEY; // .env에서 API 키 가져오기

  const connectSerial = async () => {
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 115200 });

      const decoder = new TextDecoderStream();
      port.readable.pipeTo(decoder.writable);
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
              setCoins(newTotal * 3); // 코인 누적 반영
              return newTotal;
            });
          }
        }
      }
    } catch (err) {
      console.error('Serial connection error:', err);
    }
  };

  const requestAiComment = async (currentSteps: number) => {
    try {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
        {
          // 실제 AI API URL로 변경
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ steps: currentSteps }),
        }
      );

      const data = await response.json();
      setAiComment(data.comment);
    } catch (err) {
      console.error('AI request error:', err);
      setAiComment('AI 코멘트를 불러오는 중 오류가 발생했어요.');
    }
  };

  // 5분마다 AI 요청 체크
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastAiRequestTime.current > 5 * 60 * 1000) {
        // 5분
        requestAiComment(steps);
        lastAiRequestTime.current = now;
      }
    }, 1000 * 30); // 30초마다 체크
    return () => clearInterval(interval);
  }, [steps]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-[390px] min-h-screen bg-white flex flex-col items-center p-4">
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
