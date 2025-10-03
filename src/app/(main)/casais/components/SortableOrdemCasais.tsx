"use client";

import { apiFetch } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  IoReorderThree,
  //  IoWarning
} from "react-icons/io5";
import {
  FaSave,
  FaRedo,
  // FaStream
} from "react-icons/fa";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

type Casal = {
  idCasal: number;
  marido: string;
  mulher: string;
  ordem: number;
};

export default function SortableOrdemCasais() {
  const [casaisOriginal, setCasaisOriginal] = useState<Casal[]>([]);
  const [casais, setCasais] = useState<Casal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiFetch(`/casais`)
      .then((res) => res.json())
      .then((data) => {
        const ordered = data.sort((a: Casal, b: Casal) => a.ordem - b.ordem);
        setCasaisOriginal(ordered);
        setCasais([...ordered]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const novaLista = Array.from(casais);
    const [removido] = novaLista.splice(result.source.index, 1);
    novaLista.splice(result.destination.index, 0, removido);

    // Atualiza ordens locais
    const atualizada = novaLista.map((c, index) => ({
      ...c,
      ordem: index + 1,
    }));

    setCasais(atualizada);
  };

  const handleSaveOrder = () => {
    console.log(JSON.stringify({ ordemCasais: casais }));
    apiFetch("/casais/ordem", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ordemCasais: casais }),
    }).then((res) => {
      if (res.ok) {
        setCasaisOriginal([...casais]);
        alert("Ordem salva com sucesso!");
      } else {
        alert("Erro ao salvar a ordem.");
      }
    });
  };

  // Rearranjar escala dos batizados futuros com base na nova ordem dos casais
  // const handleRearrangeBaptisms = () => {
  //   apiFetch("/batizados/refazer-escala", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //   }).then((res) => {
  //     if (res.ok) {
  //       alert(
  //         "Escala dos batizados futuros rearranjada com sucesso com base na nova ordem dos casais!"
  //       );
  //       window.location.reload();
  //     } else {
  //       alert("Erro ao rearranjar a escala dos batizados futuros.");
  //     }
  //   });
  // };

  // const isSameOrder = () => {
  //   if (casais.length !== casaisOriginal.length) return false;
  //   for (let i = 0; i < casais.length; i++) {
  //     if (casais[i].idCasal !== casaisOriginal[i].idCasal) return false;
  //   }
  //   return true;
  // };

  const handleResetOrder = () => {
    setCasais([...casaisOriginal]);
  };

  return (
    <>
      <div className="flex justify-between items-center flex-wrap gap-2">
        <button
          onClick={handleResetOrder}
          className="cursor-pointer flex items-center gap-1 w-fit text-sm px-2 py-1 rounded-full border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white">
          <FaRedo />
          <span>Resetar</span>
        </button>
        {/* <div className={`relative ${isSameOrder() ? "group" : ""}`}>
          <button
            onClick={handleRearrangeBaptisms}
            disabled={!isSameOrder()}
            className="self-end cursor-pointer flex items-center gap-1 w-fit text-sm px-2 py-1 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white disabled:bg-neutral-100 disabled:text-neutral-400 disabled:border-neutral-300 disabled:cursor-not-allowed" // 3. Estilos para o estado desabilitado
          >
            <FaStream />
            <span>Rearranjar escala</span>
          </button>

          <p className="absolute top-full left-1/2 mt-1 -translate-x-1/2 w-48 bg-white border border-neutral-300 rounded shadow-lg p-2 italic text-neutral-700 text-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200">
            <IoWarning className="text-sm text-amber-400 inline-block mr-1" />
            Atenção: Esta ação substitui os casais de todos os batizados futuros
            (a partir de amanhã), usando a ordem da lista. A ordem dos casais
            será atualizada.
          </p>
        </div> */}
        <button
          onClick={handleSaveOrder}
          className="cursor-pointer flex items-center gap-1 w-fit text-sm px-2 py-1 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
          <FaSave />
          <span>Salvar ordem</span>
        </button>
      </div>

      {loading ? (
        <p className="text-center text-neutral-500 my-1">Carregando...</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="casais">
            {(provided) => (
              <ul
                className="text-sm"
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {casais.length > 0 ? (
                  casais.map((casal, index) => (
                    <Draggable
                      key={casal.idCasal}
                      draggableId={casal.idCasal.toString()}
                      index={index}>
                      {(provided, snapshot) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`select-none text-neutral-700 cursor-grab flex my-1 gap-3 items-center justify-between border ${
                            casal.idCasal !== casaisOriginal[index].idCasal
                              ? "border-blue-500"
                              : "border-neutral-300"
                          } px-3 py-2 rounded ${
                            snapshot.isDragging ? "bg-neutral-200" : ""
                          }`}>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-base text-neutral-500 w-4 text-right">
                              {index + 1}.
                            </span>
                            {casal.marido} e {casal.mulher}
                          </div>
                          <IoReorderThree className="text-lg" />
                        </li>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <p className="text-center text-neutral-500 my-1">
                    Nenhum casal encontrado...
                  </p>
                )}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  );
}
