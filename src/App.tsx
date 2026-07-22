import Home from "@pages/Home";
import Header from "./components/Header";

function App() {
  return (
    <div className="p-5 flex flex-col md:flex-row h-auto pb-20 md:mb-20 md:h-screen md:gap-[40px] max-w-[1350px] m-auto">
      <Header />
      <Home />
      <div className="absolute gradient w-full h-screen p-0 m-0 -z-50"></div>
    </div>
  );
}

export default App;
