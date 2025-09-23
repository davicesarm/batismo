"use client";

import { BatizadoType } from "@/types/batizado";
import Batizado from "./BatizadoCard";
import { useState, useEffect } from "react";
import DateRangePickerComp from "./DateRangePickerComp";
// import { FaFileDownload } from "react-icons/fa";
import { apiFetch } from "@/lib/utils";
import type { RangeValue } from "@react-types/shared";
import { DateValue } from "react-aria-components";

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

const today = new Date();
const currentMonth = months[today.getMonth()]; // pega o nome do mês capitalizado
const currentYear = today.getFullYear();

export default function CardsTab({ batizados }: { batizados: BatizadoType[] }) {
  const [batizadosFiltrados, setBatizadosFiltrados] = useState<BatizadoType[]>(
    []
  );
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: new Date(currentYear, today.getMonth(), 1),
    end: new Date(currentYear, today.getMonth() + 1, 0, 23, 59, 59, 999),
  });

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);

    if (month === "custom") return;

    const monthIndex = months.findIndex(
      (m) => m.toLowerCase() === month.toLowerCase()
    );

    if (monthIndex === -1) return;

    const year = new Date().getFullYear();
    const start = new Date(year, monthIndex, 1);
    const end = new Date(year, monthIndex + 1, 0, 23, 59, 59, 999);

    setDateRange({ start, end });
  };

  const handleDateRangeChange = (range: RangeValue<DateValue> | null) => {
    if (range && range.start && range.end) {
      const start = new Date(
        range.start.year,
        range.start.month - 1,
        range.start.day
      );
      const end = new Date(
        range.end.year,
        range.end.month - 1,
        range.end.day,
        ...[23, 59, 59, 999]
      );
      setDateRange({ start, end });
    } else {
      setDateRange({ start: null, end: null });
    }
  };

  useEffect(() => {
    if (!dateRange.start || !dateRange.end) {
      setBatizadosFiltrados(batizados);
      return;
    }
    setBatizadosFiltrados(
      batizados.filter((b) => {
        const dataBatizado = new Date(b.data);
        return (
          dataBatizado >= dateRange.start! && dataBatizado <= dateRange.end!
        );
      })
    );
  }, [dateRange, batizados]);

  return (
    <div className="max-w-lg mx-auto p-2 gap-4 flex flex-col">
      <div
        className={`${
          selectedMonth === "custom"
            ? "justify-between gap-2"
            : "justify-center"
        } flex sm:flex-row flex-col items-center`}>
        <select
          className={`${
            selectedMonth === "custom" ? "w-3xs sm:flex-1" : "w-3xs"
          } cursor-pointer rounded border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-700`}
          name="mes"
          id="mes"
          value={selectedMonth}
          onChange={(e) => handleMonthChange(e.target.value)}>
          <option value="custom">Personalizado</option>
          {months.map((month, i) => (
            <option key={i} value={month}>
              {month}
            </option>
          ))}
        </select>
        {selectedMonth === "custom" && (
          <DateRangePickerComp onChange={handleDateRangeChange} />
        )}
      </div>

      <div className="flex flex-col gap-4">
        {batizadosFiltrados.map((batizado: BatizadoType, idx) => (
          <Batizado key={batizado.id} batizado={batizado} />
        ))}
      </div>
    </div>
  );
}

{
  /* <button
          title="Exportar"
          className="cursor-pointer flex gap-1 items-center bg-blue-500 text-xs text-white p-2 rounded hover:bg-blue-500 transition">
          <FaFileDownload className="text-base sm:text-xs" />
          <span className="hidden sm:block">Exportar</span>
        </button> */
}
