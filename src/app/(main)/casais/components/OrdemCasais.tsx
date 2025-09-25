"use client";

import { apiFetch } from "@/lib/utils";
import { useEffect, useState } from "react";

type Casal = {
  idCasal: number;
  marido: string;
  mulher: string;
  ordem: number;
};

export default function OrdemCasais() {
  const [casais, setCasais] = useState<Casal[]>([]);

  useEffect(() => {
    apiFetch(`/casais`)
      .then((res) => res.json())
      .then((data) =>
        setCasais(
          data.sort((a: Casal, b: Casal) => a.ordem - b.ordem) // já vem ordenado
        )
      );
  }, []);

  return (
    <ul className="text-sm">
      {casais.length > 0 ? (
        casais.map((casal, index) => (
          <li
            key={casal.idCasal}
            className="text-neutral-700 font-medium flex my-1 gap-2 items-center border border-neutral-300 px-3 py-2 rounded">
            <span className="font-bold text-base text-neutral-500 w-4 text-right">
              {index + 1}.
            </span>
            {casal.marido} e {casal.mulher}
          </li>
        ))
      ) : (
        <div>Carregando...</div>
      )}
    </ul>
  );
}
