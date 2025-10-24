import React from 'react';
import { useNavigate } from 'react-router-dom';

import PizzaImg from '../../assets/Pizza.png';
import ChickenImg from '../../assets/Chicken.png';
import SaladImg from '../../assets/Salad.png';
import BreadImg from '../../assets/Bread.png';
import LollipopImg from '../../assets/Candy.png';
import IcecreamImg from '../../assets/Icecream.png';

const Store = () => {
  const navigate = useNavigate();

  const items = [
    { name: 'Pizza', src: PizzaImg, amount: 5 },
    { name: 'Chicken', src: ChickenImg, amount: 5 },
    { name: 'Salad', src: SaladImg, amount: 5 },
    { name: 'Bread', src: BreadImg, amount: 5 },
    { name: 'Lollipop', src: LollipopImg, amount: 5 },
    { name: 'Icecream', src: IcecreamImg, amount: 5 },
  ];

  const handleBuy = (amount: number) => {
    alert(`밥 ${amount}개 구매 완료!`);
    navigate('/mypage', { state: { addedFood: amount } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <h1 className="text-2xl font-bold mb-6">상점</h1>

      <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-4 border border-blue-200 rounded-lg bg-blue-50"
          >
            <img src={item.src} alt={item.name} className="w-16 h-16 mb-3" />
            <button
              onClick={() => handleBuy(item.amount)}
              className="w-full py-2 bg-blue-400 text-white rounded-lg font-bold active:scale-95 transition"
            >
              BUY
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-8 px-6 py-3 bg-gray-400 text-white rounded-lg font-bold"
      >
        돌아가기
      </button>
    </div>
  );
};

export default Store;
