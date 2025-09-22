"use client";

import { useEffect, useState } from "react";
import { UsuarioType } from "@/types/usuario";
import UsuarioTable from "./UsuarioTable";
import { apiFetch } from "@/lib/utils";

export default function Usuarios({
  onEdit,
}: {
  onEdit: (usuario: UsuarioType) => void;
}) {
  const [usuarios, setUsuarios] = useState<UsuarioType[]>([]);

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
    <div className="text-neutral-800 flex flex-col gap-4">
      <div>
        <h2 className="font-medium text-sm mb-2">Usuários especiais</h2>
        <UsuarioTable
          usuarios={usuarios.filter((usuario) => usuario.cargo !== "casal")}
          onEdit={onEdit}
        />
      </div>

      <div>
        <h2 className="font-medium text-sm mb-2">Casais</h2>
        <UsuarioTable
          usuarios={usuarios.filter((usuario) => usuario.cargo === "casal")}
          casal
          onEdit={onEdit}
        />
      </div>
    </div>
  );
}
