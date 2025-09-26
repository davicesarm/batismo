"use client";

import Usuarios from "./components/Usuarios";
import CadastrarUsuario from "./components/CadastrarUsuario";
import { FaUserPlus } from "react-icons/fa";
import { useModal } from "@/context/ModalContext";

export default function AdminPage() {
  const { openModal } = useModal();

  return (
    <>
      <header className="flex flex-col items-center bg-blue-950 pt-6 mx-auto text-white">
        <h1 className="text-2xl font-bold">Administração</h1>
        <h2 className="w-fit flex items-center gap-1 text-sm text-neutral-300">
          <FaUserPlus />
          <span>Cadastro de usuários</span>
        </h2>
        <span className="border-t-3 border-blue-700 bg-neutral-100 h-8 w-full mt-6 rounded-t-xl"></span>
      </header>

      <main className="mx-2">
        <div className="shadow-md bg-neutral-50 flex flex-col gap-4 border-l-blue-500 border-l-3 mx-auto mt-4 border border-neutral-300 p-2 sm:p-4 rounded-lg max-w-4xl">
          <Usuarios />
        </div>
      </main>
    </>
  );
}
