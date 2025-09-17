import Usuarios from "./components/Usuarios";
import { FaUserPlus, FaHome } from "react-icons/fa";

export default function AdminPage() {
  return (
    <>
      <header className="flex flex-col items-center bg-blue-800 p-6 mx-auto text-white">
        <h1 className="text-2xl font-bold">Administração</h1>
        <h2 className="w-fit flex items-center gap-1 text-sm text-neutral-300">
          <FaHome />
          <span>Página principal</span>
        </h2>
      </header>
      <nav>
        <div className="max-w-sm mx-auto mt-4 p-2 text-sm text-center text-neutral-600">
          Área administrativa. Aqui você pode gerenciar usuários e outras
          configurações do sistema.
        </div>
      </nav>
      <main>
        <div className="flex flex-col gap-4 border-l-blue-400 border-l-3 mx-auto mt-4 border border-neutral-300 p-2 sm:p-4 rounded-lg max-w-4xl">
          <a
            className="flex items-center gap-1 w-fit text-sm px-2 py-1 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
            href="/admin/cadastrar-usuario">
            <FaUserPlus />
            <span>Cadastrar Usuário</span>
          </a>
          <Usuarios />
        </div>
      </main>
    </>
  );
}
