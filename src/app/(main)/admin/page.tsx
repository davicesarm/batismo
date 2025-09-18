"use client";

import { useState } from "react";
import Usuarios from "./components/Usuarios";
import CadastrarUsuario from "./components/CadastrarUsuario";
import { FaUserPlus } from "react-icons/fa";
import EditarUsuario from "./components/EditarUsuario";
import { UsuarioType } from "@/types/usuario";

export default function AdminPage() {
  const [isCadastrarModalOpen, setIsCadastrarModalOpen] = useState(false);
  const [isEditarModalOpen, setIsEditarModalOpen] = useState(false); // Estado para o modal de edição
  const [usuarioParaEditar, setUsuarioParaEditar] =
    useState<UsuarioType | null>(null); // Estado para o usuário a ser editado

  const handleCloseModal = () => {
    setIsCadastrarModalOpen(false);
    setIsEditarModalOpen(false);
    setUsuarioParaEditar(null); // Limpa o usuário do estado ao fechar
  };

  const handleEditUsuario = (usuario: UsuarioType) => {
    setUsuarioParaEditar(usuario);
    setIsEditarModalOpen(true);
  };

  return (
    <>
      <header className="flex flex-col items-center bg-blue-800 p-6 mx-auto text-white">
        <h1 className="text-2xl font-bold">Administração</h1>
        <h2 className="w-fit flex items-center gap-1 text-sm text-neutral-300">
          <FaUserPlus />
          <span>Cadastro de usuários</span>
        </h2>
      </header>

      <main>
        <div className="shadow-md bg-neutral-50 flex flex-col gap-4 border-l-blue-500 border-l-3 mx-auto mt-4 border border-neutral-300 p-2 sm:p-4 rounded-lg max-w-4xl">
          <button
            className="cursor-pointer flex items-center gap-1 w-fit text-sm px-2 py-1 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
            onClick={() => setIsCadastrarModalOpen(true)}>
            <FaUserPlus />
            <span>Cadastrar Usuário</span>
          </button>
          <Usuarios onEdit={handleEditUsuario} />
        </div>
      </main>

      {isCadastrarModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={handleCloseModal}>
          <div
            className="border border-neutral-300 border-l-blue-500 border-l-3 bg-neutral-50 rounded-lg p-6 max-w-lg w-full m-4 relative"
            onClick={(e) => e.stopPropagation()}>
            <button
              className="cursor-pointer absolute top-0 right-2 text-gray-500 hover:text-red-700 text-2xl"
              onClick={handleCloseModal}>
              &times;
            </button>
            <CadastrarUsuario />
          </div>
        </div>
      )}

      {isEditarModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={handleCloseModal}>
          <div
            className="bg-white rounded-lg p-6 max-w-lg w-full m-4 relative"
            onClick={(e) => e.stopPropagation()}>
            <button
              className="cursor-pointer absolute top-0 right-2 text-gray-500 hover:text-red-700 text-2xl"
              onClick={handleCloseModal}>
              &times;
            </button>
            {/* Passe o usuário selecionado como prop para o componente de edição */}
            <EditarUsuario usuario={usuarioParaEditar} />
          </div>
        </div>
      )}
    </>
  );
}
