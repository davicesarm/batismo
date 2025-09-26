"use client";

import { useEffect, useState } from "react";
import { UsuarioType } from "@/types/usuario";
import UsuarioTable from "./UsuarioTable";
import { apiFetch } from "@/lib/utils";
import { useModal } from "@/context/ModalContext";
import { FaUserPlus } from "react-icons/fa";
import CadastrarUsuario from "./CadastrarUsuario";
import { Switch } from "@/components/Switch";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<UsuarioType[]>([]);
  const [inativos, setInativos] = useState<boolean>(false);
  const { openModal } = useModal();

  const fetchUsuarios = async () => {
    const response = await apiFetch(`/usuarios`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUsuarios(data);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <button
          className="cursor-pointer flex items-center gap-1 w-fit text-sm px-2 py-1 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
          onClick={() => openModal(<CadastrarUsuario />)}>
          <FaUserPlus />
          <span>Cadastrar Usuário</span>
        </button>
        <div className="flex gap-2 items-center">
          <Switch
            id="inativos"
            checked={inativos}
            onCheckedChange={() => setInativos(!inativos)}
          />
          <label className="text-sm text-neutral-700" htmlFor="inativos">
            Usuários inativos
          </label>
        </div>
      </div>
      <div className="text-neutral-800 flex flex-col gap-4">
        <div>
          <h2 className="font-medium text-sm mb-2">Usuários especiais</h2>
          <UsuarioTable
            usuarios={usuarios.filter(
              (usuario) =>
                usuario.cargo !== "casal" && (!usuario.inativo || inativos)
            )}
          />
        </div>

        <div>
          <h2 className="font-medium text-sm mb-2">Casais</h2>
          <UsuarioTable
            usuarios={usuarios.filter(
              (usuario) =>
                usuario.cargo === "casal" && (!usuario.inativo || inativos)
            )}
            casal
          />
        </div>
      </div>
    </>
  );
}
