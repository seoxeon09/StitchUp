import Starst from '@/assets/Start.png';

const Start = () => {
  return (
    <div className="flex justify-center bg-gray-300 min-h-screen">
      <div className="w-[390px] h-screen bg-sky-400/70">
        <img src={Starst} alt="Start" className="w-full h-auto"></img>
      </div>
    </div>
  );
};

export default Start;
