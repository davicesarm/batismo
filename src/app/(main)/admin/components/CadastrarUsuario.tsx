"use client";

import { apiFetch } from "@/lib/utils";
import { UsuarioType } from "@/types/usuario";
import { useState } from "react";

export default function CadastrarUsuario() {
  const [formData, setFormData] = useState<Partial<UsuarioType>>({
    cargo: "casal",
    nome: "",
    marido: "",
    mulher: "",
    email: "",
    // senha: "",
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

    try {
      const response = await apiFetch("/usuarios", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        window.location.reload();
      } else {
        alert(`Erro ao cadastrar: ${response.status}`);
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
      <h2 className="text-center text-lg border-b pb-2 border-neutral-300 text-neutral-700 font-medium">
        Cadastro de Usuário
      </h2>
      <div className="flex flex-col flex-1">
        <label
          htmlFor="cargo"
          className="text-xs font-medium text-neutral-700 mb-1">
          Cargo
          <span className="text-red-500"> *</span>
        </label>
        <select
          id="cargo"
          name="cargo"
          className="border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.cargo}
          onChange={handleInputChange}
          required>
          <option value="casal">Casal</option>
          <option value="secretaria">Secretaria</option>
          <option value="coordenador">Coordenador</option>
        </select>
      </div>

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

      {/* <div className="flex flex-col flex-1">
        <label
          htmlFor="senha"
          className="text-xs font-medium text-neutral-700 mb-1">
          Senha
          <span className="text-red-500"> *</span>
        </label>
        <input
          type="password"
          id="senha"
          name="senha"
          className="border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.senha}
          onChange={handleInputChange}
          required
        />
      </div> */}

      <button
        type="submit"
        className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm">
        Cadastrar Usuário
      </button>
    </form>
  );
}
