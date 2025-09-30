"use client";

import { apiFetch } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Casal } from "@/types/usuario";

export default function OrdemCasais() {
  const [casais, setCasais] = useState<Casal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiFetch(`/casais`)
      .then((res) => res.json())
      .then((data) =>
        setCasais(
          data.sort((a: Casal, b: Casal) => a.ordem - b.ordem) // já vem ordenado
        )
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <ul className="text-sm">
      {loading ? (
        <p className="text-center text-neutral-500 my-1">Carregando...</p>
      ) : casais.length > 0 ? (
        casais.map((casal, index) => (
          <li
            key={casal.idCasal}
            className="text-neutral-700 flex my-1 gap-2 items-center border border-neutral-300 px-3 py-2 rounded">
            <span className="font-bold text-base text-neutral-500 w-4 text-right">
              {index + 1}.
            </span>
            {casal.marido} e {casal.mulher}
          </li>
        ))
      ) : (
        <p className="text-center text-neutral-500 my-1">
          Nenhum casal encontrado...
        </p>
      )}
    </ul>
  );
}
