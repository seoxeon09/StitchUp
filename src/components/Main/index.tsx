import React, { useState, useRef, useEffect } from 'react';
import Coin from '../../assets/Coin';
import CircleImg from 'assets/Circle.png';
import { useNavigate, useLocation } from 'react-router-dom';

const StepsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [steps, setSteps] = useState<number>(0);
  const [coins, setCoins] = useState<number>(location.state?.coins || 0);
  const [aiComment, setAiComment] = useState<string>('');
  const lastAiRequestTime = useRef<number>(0);
  const apiKey = process.env.REACT_APP_AI_API_KEY;
  const portRef = useRef<any | null>(null);
  const readerRef = useRef<any | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      (async () => {
        try {
          if (readerRef.current) {
            await readerRef.current.cancel();
            readerRef.current.releaseLock?.();
          }
          if (portRef.current && portRef.current.readable) {
            await portRef.current.close();
          }
        } catch (e) {}
      })();
    };
  }, []);

  const smoothIncrease = (increment: number) => {
    if (increment <= 10) {
      setSteps((prev) => {
        const newTotal = prev + increment;
        setCoins(newTotal * 3);
        return newTotal;
      });
      return;
    }
    let i = 0;
    const stepDelay = 60;
    const timer = setInterval(() => {
      if (!mountedRef.current) {
        clearInterval(timer);
        return;
      }
      i += 1;
      setSteps((prev) => {
        const newTotal = prev + 1;
        setCoins(newTotal * 3);
        return newTotal;
      });
      if (i >= increment) {
        clearInterval(timer);
      }
    }, stepDelay);
  };

  const connectSerial = async () => {
    try {
      const port = await (navigator as any).serial.requestPort();
      portRef.current = port;
      await port.open({ baudRate: 115200 });
      const decoder = new TextDecoderStream();
      port.readable.pipeTo(decoder.writable);
      const reader = decoder.readable.getReader();
      readerRef.current = reader;
      while (mountedRef.current) {
        const { value, done } = await reader.read();
        if (done) break;
        if (!value) continue;
        const trimmed = String(value).trim();
        console.log('[Serial] received:', trimmed);
        if (/^\d+$/.test(trimmed)) {
          const increment = parseInt(trimmed, 10);
          smoothIncrease(increment);
        } else {
          console.log('[Serial] non-numeric message:', trimmed);
        }
      }
    } catch (err: any) {
      console.error('Serial connection error:', err);
    }
  };

  const requestAiComment = async (currentSteps: number) => {
    if (!apiKey) {
      console.error('API key가 없습니다.');
      setAiComment('AI 키가 설정되지 않았습니다.');
      return;
    }
    try {
      const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      const body = {
        contents: [
          {
            parts: [
              {
                text: `지금까지 ${currentSteps}걸음 걸었어요. 짧고 힘이 나는 응원 한 마디만 알려줘.`,
              },
            ],
          },
        ],
      };
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!resp.ok) {
        const text = await resp.text().catch(() => '');
        console.error('AI API 응답 에러:', resp.status, text);
        setAiComment(`AI 요청 실패: ${resp.status}`);
        return;
      }
      const data = await resp.json();
      console.log('AI 응답 전체:', data);
      const comment =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        data?.candidates?.[0]?.content?.[0]?.text ||
        data?.output?.[0]?.content?.[0]?.text ||
        'AI 코멘트가 없습니다.';
      setAiComment(comment);
    } catch (err) {
      console.error('AI request error:', err);
      setAiComment('AI 코멘트를 불러오는 중 오류가 발생했어요.');
    }
  };

  useEffect(() => {
    const checkInterval = 30 * 1000;
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastAiRequestTime.current > 5 * 60 * 1000) {
        requestAiComment(steps);
        lastAiRequestTime.current = now;
      }
    }, checkInterval);
    return () => clearInterval(interval);
  }, [steps, apiKey]);

  const goToMypage = () => {
    navigate('/mypage', { state: { coins } });
  };

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
