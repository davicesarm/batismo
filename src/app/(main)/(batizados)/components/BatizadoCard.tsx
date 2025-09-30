"use client";

import { BatizadoType } from "@/types/batizado";
import {
  FaCalendarWeek,
  FaCalendar,
  FaClock,
  FaCross,
  FaHeart,
  FaDove,
  FaEdit,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useModal } from "@/context/ModalContext";
import { getScope } from "@/lib/utils";
import RealocarCasal from "./RealocarCasal";
import EditarBatizado from "./EditarBatizado";

export default function Batizado({ batizado }: { batizado: BatizadoType }) {
  const [scope, setScope] = useState<string | null>(null);
  const { openModal } = useModal();

  useEffect(() => {
    setScope(getScope());
  }, []);

  const isPast = new Date(batizado.data) < new Date();
  const isBatizadoToday =
    new Date(batizado.data).toDateString() === new Date().toDateString();

  const DATA = new Date(batizado.data).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const HORA = new Date(batizado.data).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const SEMANA = new Date(batizado.data).toLocaleDateString("pt-BR", {
    weekday: "long",
  });

  return (
    <div
      className={`bg-neutral-50 border-l-3 border border-neutral-300 ${
        isBatizadoToday
          ? "border-l-green-400"
          : isPast
          ? "border-l-amber-400"
          : "border-l-blue-500"
      } flex flex-col gap-2 text-xs text-neutral-700 relative rounded-xl p-4 shadow-md justify-between`}>
      {scope !== "casal" && (
        <div className="flex justify-between items-start flex-wrap gap-2">
          {scope && ["secretaria", "admin"].includes(scope) && (
            <button
              onClick={() => openModal(<EditarBatizado batizado={batizado} />)}
              className="self-start border-blue-500 rounded-full border text-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer flex items-center gap-1 px-2 py-1 font-semibold text-xs">
              <FaEdit className="text-sm" />
              Editar
            </button>
          )}

          {scope && ["coordenador", "admin"].includes(scope) && (
            <button
              onClick={() => openModal(<RealocarCasal batizado={batizado} />)}
              className="self-start border-blue-500 rounded-full border text-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer flex items-center gap-1 px-2 py-1 font-semibold text-xs">
              <FaEdit className="text-sm" />
              Realocar casal
            </button>
          )}
        </div>
      )}
      <div className="flex flex-col gap-2 w-full">
        <h2 className="font-medium flex justify-between w-full">
          <span
            className={`${
              isPast && "line-through"
            } flex gap-1 items-center rounded-full border border-neutral-300 shadow-xs px-2 py-1`}>
            <FaCalendar />
            {DATA}
          </span>
          <span className="flex gap-1 items-center rounded-full border border-neutral-300 shadow-xs px-2 py-1">
            <FaClock />
            {HORA}
          </span>
        </h2>
        <span className="capitalize self-start flex gap-1 items-center rounded-full border border-neutral-300 shadow-xs px-2 py-1">
          <FaCalendarWeek />
          {SEMANA}
        </span>
      </div>

      <ul className="mb-2">
        {batizado.catecumenos.map((b) => (
          <li
            className="flex gap-1 items-center border-b border-neutral-300 p-2"
            key={b.nome}>
            <FaDove />
            {b.nome}
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-2 sm:flex-row-reverse sm:justify-between sm:items-center">
        <p className="flex gap-1 items-center w-fit rounded-full border border-neutral-300 shadow-xs px-2 py-1 truncate text-center">
          <FaCross />
          {batizado.celebrante ?? "A definir"}
        </p>

        <div className="flex items-center gap-1 w-fit rounded border border-neutral-300 shadow-xs px-2 py-1">
          <FaHeart className="text-red-400" />
          <div>
            <p className="truncate">{batizado.casal.marido}</p>
            <p className="truncate">{batizado.casal.mulher}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
