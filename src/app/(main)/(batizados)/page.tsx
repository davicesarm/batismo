import CardsTab from "./components/CardsTab";
import { FaHome } from "react-icons/fa";
import Tabs from "./components/Tabs";

export default function Home() {
  return (
    <>
      <header className="flex flex-col items-center bg-blue-900 pt-6 mx-auto text-white">
        <h1 className="text-2xl font-bold">Batizados</h1>
        <h2 className="w-fit flex items-center gap-1 text-sm text-neutral-100">
          <FaHome />
          <span>Página principal</span>
        </h2>
        <span className="border-t-3 border-blue-500 bg-neutral-100 h-8 w-full mt-6 rounded-t-xl"></span>
      </header>

      <main>
        <Tabs />

        {/* <CardsTab /> */}
      </main>
    </>
  );
}
