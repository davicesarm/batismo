"use client";

import { apiFetch } from "@/lib/utils";
import { BatizadoType, CadastrarBatizadoType } from "@/types/batizado";
import { useState } from "react";
import dayjs from "dayjs";
import { FaPlus, FaTrash, FaSave } from "react-icons/fa";

export default function CadastrarBatizado({
  batizado,
  editar = false,
}: {
  batizado?: BatizadoType;
  editar?: boolean;
}) {
  const [formData, setFormData] = useState<CadastrarBatizadoType>({
    data: batizado
      ? dayjs(batizado.data).format("YYYY-MM-DDTHH:mm")
      : dayjs().format("YYYY-MM-DDTHH:mm"),
    celebrante: batizado ? batizado.celebrante : null,
    catecumenos: batizado ? batizado.catecumenos.map((c) => c.nome) : [""],
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value === "" && name === "celebrante" ? null : value,
    }));
  };

  const handleAddCatecumeno = () => {
    const lastCatecumeno =
      formData.catecumenos[formData.catecumenos.length - 1];
    if (lastCatecumeno.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        catecumenos: [...prevData.catecumenos, ""],
      }));
    }
  };

  const handleCatecumenoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newCatecumenos = [...formData.catecumenos];
    newCatecumenos[index] = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      catecumenos: newCatecumenos,
    }));
  };

  const handleRemoveCatecumeno = (index: number) => {
    setFormData((prevData) => {
      const newCatecumenos = prevData.catecumenos.filter((_, i) => i !== index);
      return {
        ...prevData,
        catecumenos: newCatecumenos,
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      formData.catecumenos.length === 0 ||
      formData.catecumenos.every((c) => c.trim() === "")
    ) {
      alert("Por favor, preencha pelo menos um catecumeno.");
      return;
    }

    const filteredCatecumenos = formData.catecumenos.filter(
      (c) => c.trim() !== ""
    );
    const submissionData = {
      ...formData,
      catecumenos: filteredCatecumenos,
      ...(editar ? { id: batizado?.id } : {}),
    };

    try {
      const response = await apiFetch("/batizados", {
        method: editar ? "PATCH" : "POST",
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        alert("Batizado cadastrado com sucesso!");
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
        {editar ? "Editar" : "Cadastro de"} Batizado
      </h2>

      <div className="flex flex-col flex-1">
        <label
          className="text-xs font-medium text-neutral-700 mb-1"
          htmlFor="data">
          Data do Batizado
          <span className="text-red-500"> *</span>
        </label>
        <input
          type="datetime-local"
          id="data"
          name="data"
          value={formData.data}
          onChange={handleInputChange}
          className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col flex-1">
        <label
          className="text-xs font-medium text-neutral-700 mb-1"
          htmlFor="celebrante">
          Celebrante
          <span className="text-neutral-400"> (Não obrigatório)</span>
        </label>
        <input
          type="text"
          id="celebrante"
          name="celebrante"
          value={formData.celebrante ?? ""}
          onChange={handleInputChange}
          className="placeholder:text-xs border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col flex-1">
        <label
          className="text-xs font-medium text-neutral-700 mb-1"
          htmlFor="catecumenos">
          Catecúmenos
          <span className="text-red-500"> *</span>
        </label>

        {formData.catecumenos.map((catecumeno, i) => (
          <div key={i} className="flex gap-2 items-center mb-2">
            <input
              type="text"
              value={catecumeno}
              onChange={(e) => handleCatecumenoChange(e, i)}
              className="flex-1 placeholder:text-xs border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formData.catecumenos.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveCatecumeno(i)}
                className="cursor-pointer p-1 text-neutral-500 hover:text-red-400 ">
                <FaTrash />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddCatecumeno}
          className="cursor-pointer mt-1 flex items-center gap-2 text-sm text-neutral-500 hover:text-blue-500">
          <FaPlus />
          Adicionar mais um catecúmeno
        </button>
      </div>

      <button
        type="submit"
        className="flex items-center gap-1 justify-center cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm">
        <FaSave />
        {editar ? "Salvar" : "Cadastrar Batizado"}
      </button>
    </form>
  );
}
