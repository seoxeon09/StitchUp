import { useNavigate } from 'react-router-dom';

const Shop = () => {
  const navigate = useNavigate();

  const handleBuy = () => {
    const amount = 5; // 밥 5개 구매
    alert(`밥 ${amount}개 구매 완료!`);
    navigate('/', { state: { addedFood: amount } }); // Mypage로 돌아가면서 food 값 전달
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <h1 className="text-2xl font-bold">상점</h1>
      <button
        onClick={handleBuy}
        className="px-6 py-3 bg-green-500 text-white rounded-lg font-bold"
      >
        밥 5개 구매
      </button>
      <button
        onClick={() => navigate(-1)}
        className="px-6 py-3 bg-gray-400 text-white rounded-lg font-bold"
      >
        돌아가기
      </button>
    </div>
  );
};

export default Shop;
