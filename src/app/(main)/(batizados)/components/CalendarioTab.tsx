"use client";

import { useState } from "react";
import { BatizadoType } from "@/types/batizado";
import { useModal } from "@/context/ModalContext";
import BatizadoCard from "./BatizadoCard";

interface CalendarioTabProps {
  batizados: BatizadoType[];
}

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export default function CalendarioTab({ batizados }: CalendarioTabProps) {
  const { openModal } = useModal();
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const batizadoDays = new Set(
    batizados
      .map((b) => new Date(b.data))
      .filter((d) => d.getMonth() === month && d.getFullYear() === year)
      .map((d) => d.getDate())
  );

  const calendarDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // Cria as linhas para a tabela
  const rows: (number | null)[][] = [];
  let cells: (number | null)[] = [];

  calendarDays.forEach((day, index) => {
    cells.push(day);
    if ((index + 1) % 7 === 0 || index === calendarDays.length - 1) {
      rows.push(cells);
      cells = [];
    }
  });

  return (
    <div className="mx-2">
      <div className="flex justify-between items-center mb-2 gap-2">
        <select
          className="w-1/2 cursor-pointer rounded border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-700"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}>
          {months.map((m, i) => (
            <option key={i} value={i}>
              {m}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="w-1/2 focus:outline-none rounded border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-sm text-neutral-700"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
      </div>

      <div className="flex justify-center pb-8 pt-2 bg-neutral-50 border-l-3 border border-neutral-300 border-l-blue-400 text-sm text-neutral-700 relative rounded-xl shadow-md">
        <table className="w-11/12 table-fixed border-collapse">
          <thead>
            <tr className="">
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(
                (day, i) => (
                  <th
                    key={i}
                    className="py-4 text-center font-medium text-gray-500">
                    {day}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((day, cellIndex) => (
                  <td key={cellIndex} className="">
                    {day ? (
                      <button
                        onClick={() => {
                          let batizado: BatizadoType = batizados.find((b) => {
                            const d = new Date(b.data);
                            return (
                              d.getDate() === day &&
                              d.getMonth() === month &&
                              d.getFullYear() === year
                            );
                          })!;
                          if (batizado) {
                            openModal(<BatizadoCard batizado={batizado} />);
                          }
                        }}
                        className={`h-10 w-full border mx-auto flex items-center justify-center transition-colors ${
                          batizadoDays.has(day)
                            ? "cursor-pointer bg-blue-500 hover:bg-blue-600 text-white"
                            : "bg-neutral-100/70 cursor-not-allowed"
                        }`}>
                        {day}
                      </button>
                    ) : (
                      <div className="" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
