import Batizados from "@/components/Batizados";
import { FaHome } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <header className="flex flex-col items-center bg-blue-500 p-6 mx-auto text-white">
        <h1 className="text-2xl font-bold">Batizados</h1>
        <h2 className="w-fit flex items-center gap-1 text-sm text-neutral-200">
          <FaHome />
          <span>Página principal</span>
        </h2>
      </header>

      <main>
        <Batizados />
      </main>
    </>
  );
}
