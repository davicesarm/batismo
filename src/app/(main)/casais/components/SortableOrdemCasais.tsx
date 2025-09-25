"use client";

import { apiFetch } from "@/lib/utils";
import { useEffect, useState } from "react";
import { IoReorderThree } from "react-icons/io5";
import { FaSave, FaRedo } from "react-icons/fa";
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

  useEffect(() => {
    apiFetch(`/casais`)
      .then((res) => res.json())
      .then((data) => {
        const ordered = data.sort((a: Casal, b: Casal) => a.ordem - b.ordem);
        setCasaisOriginal(ordered);
        setCasais([...ordered]);
      });
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

  const handleResetOrder = () => {
    setCasais([...casaisOriginal]);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <button
          onClick={handleResetOrder}
          className="cursor-pointer flex items-center gap-1 w-fit text-sm px-2 py-1 rounded-full border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white">
          <FaRedo />
          <span>Resetar</span>
        </button>
        <button
          onClick={handleSaveOrder}
          className="cursor-pointer flex items-center gap-1 w-fit text-sm px-2 py-1 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
          <FaSave />
          <span>Salvar ordem</span>
        </button>
      </div>

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
                        className={`select-none text-neutral-700 font-medium cursor-grab flex my-1 gap-3 items-center justify-between border ${
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
                <div>Carregando...</div>
              )}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
