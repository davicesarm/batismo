"use client";

import { useEffect, useState } from "react";
import { UsuarioType } from "@/types/usuario";
import UsuarioTable from "./UsuarioTable";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<UsuarioType[]>([]);

  const fetchUsuarios = async () => {
    const response = await fetch(`${API_URL}/usuarios`);
    const data = await response.json();
    setUsuarios(data);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="text-neutral-800 flex flex-col gap-4">
      <div>
        <h2 className="font-medium text-sm mb-2">Usuários especiais</h2>
        <UsuarioTable
          usuarios={usuarios.filter((usuario) => usuario.cargo !== "casal")}
        />
      </div>

      <div>
        <h2 className="font-medium text-sm mb-2">Casais</h2>
        <UsuarioTable
          usuarios={usuarios.filter((usuario) => usuario.cargo === "casal")}
          casal
        />
      </div>
    </div>
  );
}
