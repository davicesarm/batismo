"use client";

import { useEffect, useState } from "react";
import CardsTab from "./CardsTab";
import CalendarioTab from "./CalendarioTab";
import { BatizadoType } from "@/types/batizado";
import { apiFetch } from "@/lib/utils";

export default function Tabs() {
  const [batizados, setBatizados] = useState<BatizadoType[]>([]);
  const [active, setActive] = useState(0);
  const tabs = ["Cards", "Calendário"];

  useEffect(() => {
    apiFetch(`/batizados`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((batizados) => {
        setBatizados(batizados);
      });
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative flex border-b border-gray-200">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`cursor-pointer relative z-10 w-1/2 px-4 py-2 text-sm font-medium focus:outline-none ${
              active === i
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}>
            {tab}
          </button>
        ))}

        <span
          className="absolute bottom-0 left-0 h-0.5 w-1/2 bg-blue-600 transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(${active * 100}%)` }}
        />
      </div>

      <div className="mt-4 overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${active * 100}%)` }}>
          <div className="overflow-hidden w-full flex-shrink-0">
            <CardsTab batizados={batizados} />
          </div>
          <div className="overflow-hidden w-full flex-shrink-0">
            <CalendarioTab batizados={batizados} />
          </div>
        </div>
      </div>
    </div>
  );
}
