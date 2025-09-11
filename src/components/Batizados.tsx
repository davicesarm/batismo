"use client";

import { BatizadoType } from "@/types/batizado";
import Batizado from "./Batizado";
import { useState, useEffect } from "react";
import DateRangePickerComp from "@/components/DateRangePickerComp";
import { FaFileDownload } from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Batizados() {
  const [batizados, setBatizados] = useState<BatizadoType[]>([]);
  const [batizadosFiltrados, setBatizadosFiltrados] = useState<BatizadoType[]>(
    []
  );
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });

  useEffect(() => {
    fetch(`${API_URL}/batizados`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((batizados) => {
        setBatizados(batizados);
      });
  }, [API_URL]);

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
    <div className="max-w-sm mx-auto mt-8 p-2 gap-4 flex flex-col">
      <p className="text-center text-sm text-muted-foreground">
        Total de batizados: {batizadosFiltrados.length}
      </p>
      <div className="border-b border-neutral-300 pb-4 flex justify-between items-end">
        <DateRangePickerComp
          onChange={(range) => {
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
                23,
                59,
                59,
                999
              );
              setDateRange({ start, end });
            } else {
              setDateRange({ start: null, end: null });
            }
          }}
        />
        <button
          title="Exportar"
          className="cursor-pointer flex gap-1 items-center bg-blue-400 text-xs text-white p-2 rounded hover:bg-blue-500 transition">
          <FaFileDownload className="text-base sm:text-xs" />
          <span className="hidden sm:block">Exportar</span>
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {batizadosFiltrados.map((batizado: BatizadoType) => (
          <Batizado key={batizado.id} batizado={batizado} />
        ))}
      </div>
    </div>
  );
}
