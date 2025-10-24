import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import PizzaImg from '../../assets/Pizza.png';
import ChickenImg from '../../assets/Chicken.png';
import SaladImg from '../../assets/Salad.png';
import BreadImg from '../../assets/Bread.png';
import LollipopImg from '../../assets/Candy.png';
import IcecreamImg from '../../assets/Icecream.png';

const Store = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const coins = location.state?.coins ?? 0;

  const items = [
    { name: 'Pizza', src: PizzaImg, amount: 5, price: 300 },
    { name: 'Chicken', src: ChickenImg, amount: 5, price: 300 },
    { name: 'Salad', src: SaladImg, amount: 5, price: 300 },
    { name: 'Bread', src: BreadImg, amount: 5, price: 300 },
    { name: 'Lollipop', src: LollipopImg, amount: 5, price: 300 },
    { name: 'Icecream', src: IcecreamImg, amount: 5, price: 300 },
  ];

  const handleBuy = (item: { amount: number; price: number }) => {
    const totalCost = item.amount * item.price;

    if (coins < totalCost) {
      alert('포인트가 부족합니다!');
      return;
    }

    const remainingCoins = coins - totalCost;
    alert(`밥 ${item.amount}개 구매 완료! 포인트 ${totalCost} 차감`);

    navigate('/mypage', {
      state: {
        addedFood: item.amount,
        coins: remainingCoins,
      },
    });
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
              onClick={() => handleBuy(item)}
              className="w-full py-2 bg-blue-400 text-white rounded-lg font-bold active:scale-95 transition"
            >
              BUY {item.price}P
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

      <div className="mt-4 text-gray-500 text-sm">현재 포인트: {coins}</div>
    </div>
  );
};

export default Store;
