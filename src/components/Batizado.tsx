import { BatizadoType } from "@/types/batizado";
import {
  FaCalendarWeek,
  FaCalendar,
  FaClock,
  FaCross,
  FaHeart,
  FaDove,
} from "react-icons/fa";

export default function Batizado({ batizado }: { batizado: BatizadoType }) {
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
    <div className="border-l-3 border border-neutral-300 border-l-blue-400 flex flex-col gap-2 text-xs text-neutral-700 relative bg-neutral-50 rounded-xl p-4 shadow-md justify-between">
      <div className="flex flex-col gap-2 w-full">
        <h2 className="font-medium flex justify-between w-full">
          <span className="flex gap-1 items-center rounded-full border border-neutral-300 shadow-xs px-2 py-1">
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
