"use client";

import { apiFetch } from "@/lib/utils";
import { UsuarioType } from "@/types/usuario";
import { useState } from "react";
import { FaSave, FaPowerOff } from "react-icons/fa";

export default function EditarUsuario({
  usuario,
}: {
  usuario: UsuarioType | null;
}) {
  const [formData, setFormData] = useState<Partial<UsuarioType>>({
    ...usuario,
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitting form data:", formData);

    // const submitData = {
    //   ...formData,
    //   senha: formData.senha?.trim() ? formData.senha.trim() : null,
    // };

    try {
      const response = await apiFetch(`/usuarios/${usuario?.id}/editar`, {
        method: "PATCH",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Usuário editado com sucesso!");
      } else {
        alert(`Erro ao editar: ${response.status}`);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Ocorreu um erro ao conectar com o servidor.");
    }
  };

  const handleToggleInactivate = async () => {
    if (!usuario) return;

    const op = usuario.inativo ? "ativar" : "inativar";

    const confirm = window.confirm(
      `Tem certeza que deseja ${op} este usuario?`
    );
    if (!confirm) return;

    try {
      const response = await apiFetch(`/usuarios/${usuario.id}/${op}`, {
        method: "PATCH",
      });

      if (response.ok) {
        alert(`Usuário ${op.slice(0, -1) + "do"} com sucesso!`);
        // Refresh the page to reflect changes
        window.location.reload();
      } else {
        alert(`Erro ao inativar: ${response.status}`);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Ocorreu um erro ao conectar com o servidor.");
    }
  };

  return (
    <form
      className="flex flex-col gap-4 rounded-lg p-2 max-w-4xl"
      onSubmit={handleSubmit}>
      <h2 className="text-lg text-center border-b pb-2 border-neutral-300 text-neutral-700 font-medium">
        Edição de Usuário
      </h2>

      {formData.cargo !== "casal" && (
        <div className="flex flex-col flex-1">
          <label
            htmlFor="nome"
            className="text-xs font-medium text-neutral-700 mb-1">
            Nome
            <span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            className="border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.nome}
            onChange={handleInputChange}
            required
          />
        </div>
      )}

      {formData.cargo === "casal" && (
        <>
          <div className="flex flex-col flex-1">
            <label
              htmlFor="marido"
              className="text-xs font-medium text-neutral-700 mb-1">
              Nome do Marido
              <span className="text-red-500"> *</span>
            </label>
            <input
              type="text"
              id="marido"
              name="marido"
              className="border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.marido}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col flex-1">
            <label
              htmlFor="mulher"
              className="text-xs font-medium text-neutral-700 mb-1">
              Nome da Mulher
              <span className="text-red-500"> *</span>
            </label>
            <input
              type="text"
              id="mulher"
              name="mulher"
              className="border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.mulher}
              onChange={handleInputChange}
              required
            />
          </div>
        </>
      )}

      <div className="flex flex-col flex-1">
        <label
          htmlFor="email"
          className="text-xs font-medium text-neutral-700 mb-1">
          Email
          <span className="text-red-500"> *</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      {/* 
      <div className="flex flex-col flex-1">
        <label
          htmlFor="senha"
          className="text-xs font-medium text-neutral-700 mb-1">
          Senha
          <span className="text-neutral-400"> (Opcional)</span>
        </label>
        <input
          type="password"
          id="senha"
          name="senha"
          className="border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.senha ?? ""}
          onChange={handleInputChange}
        />
      </div> */}

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex items-center gap-1 justify-center w-1/2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs sm:text-sm">
          <FaSave />
          Salvar alterações
        </button>
        <button
          onClick={handleToggleInactivate}
          type="button"
          className={`flex items-center gap-1 justify-center w-1/2 cursor-pointer ${
            usuario && usuario.inativo
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          } text-white px-4 py-2 rounded text-xs sm:text-sm`}>
          <FaPowerOff />
          {usuario && usuario.inativo ? "Reativar" : "Inativar"} usuário
        </button>
      </div>
    </form>
  );
}
