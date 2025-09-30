import { BatizadoType } from "@/types/batizado";
import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/utils";
import { Casal } from "@/types/usuario";
import { Search } from "@/components/Search";
import { FaSave } from "react-icons/fa";

export default function RealocarCasal({
  batizado,
}: {
  batizado: BatizadoType;
}) {
  const [selectedCasal, setSelectedCasal] = useState<Casal | null>(null);
  const [casais, setCasais] = useState<Casal[]>([]);

  useEffect(() => {
    apiFetch(`/casais`)
      .then((res) => res.json())
      .then((data) => setCasais(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await apiFetch(`/batizados/realocar`, {
        method: "PATCH",
        body: JSON.stringify({
          idBatizado: batizado.id,
          idCasal: selectedCasal?.idCasal,
        }),
      });
      if (response.ok) {
        alert("Casal realocado com sucesso!");
        window.location.reload();
      } else {
        alert(`Erro ao realocar: ${response.status}`);
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
        Realocar casal
      </h2>

      <div className="flex flex-col flex-1">
        <label
          className="text-xs font-medium text-neutral-700 mb-1"
          htmlFor="search">
          Casal
          <span className="text-red-500"> *</span>
        </label>
        <Search<Casal>
          required
          items={casais}
          searchKeys={["marido", "mulher"]}
          keyExtractor={(item) => item.idCasal.toString()}
          placeholder="Buscar casal..."
          getValueFromItem={(item) => item.marido + " e " + item.mulher}
          onSelect={(item) => setSelectedCasal(item)}
          renderItem={(item) => (
            <p className="select-none cursor-pointer p-2 hover:bg-blue-500 hover:text-white rounded">
              <span className="text-nowrap">{item.marido}</span> e{" "}
              <span className="text-nowrap">{item.mulher}</span>
            </p>
          )}
        />
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-1 mt-8 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm">
        <FaSave />
        Salvar alocação
      </button>
    </form>
  );
}
