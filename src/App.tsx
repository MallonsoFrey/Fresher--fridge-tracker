import Home from "@pages/Home";
import Header from "./components/Header";
import LanguageToggle from "./components/LanguageToggle";
import GoUpButton from "./components/GoUpButton";

function App() {
  return (
    <>
      <div className="md:relative p-5 flex flex-col md:flex-row h-auto pb-[10rem] md:h-screen md:gap-[75px] max-w-[1350px] m-auto">
        <LanguageToggle />
        <GoUpButton />
        <Header />
        <Home />
        <div className="absolute gradient w-full h-screen p-0 m-0 -z-50"></div>
      </div>
    </>
  );
}

export default App;
