import Home from "@pages/Home";

function App() {
  return (
    <div className="p-5 flex flex-col md:flex-row h-screen md:gap-[40px] md:grow max-w-[1350px] m-auto">
      <header className="text-[#8E9388] text-lg md:text-[28px] md:max-w-[264px] font-bold uppercase flex md:flex-row-reverse justify-between md:h-fit md:gap-5 md:justify-normal items-center mb-4">
        Fridge Tracker
        <span className="flex bg-[#EEF2E9] select-none w-fit rounded-[100px] p-4">
          🥬
        </span>
      </header>
      <Home />
    </div>
  );
}

export default App;
