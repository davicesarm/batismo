"use client";

import { useEffect, useState } from "react";
import CalendarioTab from "./CalendarioTab";
import { BatizadoType } from "@/types/batizado";
import { apiFetch } from "@/lib/utils";
import CardsTab from "./CardsTab";
import CadastrarBatizado from "./CadastrarBatizado";
import { useModal } from "@/context/ModalContext";
import { getScope } from "@/lib/utils";
import { FaCopy, FaDove } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";

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

export default function Tabs() {
  const [batizados, setBatizados] = useState<BatizadoType[]>([]);
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const [active, setActive] = useState(0);
  const tabs = ["Cards", "Calendário"];

  const { openModal } = useModal();
  const [scope, setScope] = useState<string | null>(null);

  const handleCopyToClipboard = () => {
    const escalaText =
      "*-=-=-=-= { Batizados } =-=-=-=-*\n\n" +
      batizados
        .map((b) => {
          const data = new Date(b.data);

          const DATA = data.toLocaleDateString("pt-BR", {
            day: "numeric",
            month: "long",
          });
          const HORA = data.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          });
          const SEMANA = data.toLocaleDateString("pt-BR", {
            weekday: "long",
          });

          return (
            `📅 *${DATA} - ${HORA}*\n` +
            `📌 ${SEMANA}\n` +
            `👥 *Catecumenos:*\n` +
            `${b.catecumenos.map((c) => `- ${c.nome}`).join("\n")}\n` +
            `💍 *Casal:* ${b.casal.marido} e ${b.casal.mulher}\n` +
            `✝️ *Celebrante:* ${b.celebrante ?? "A definir"}\n` +
            "───────────────────────────────"
          );
        })
        .join("\n\n") +
      "\n\n*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*";

    navigator.clipboard
      .writeText(escalaText)
      .then(() => {
        alert("Escala copiada para a área de transferência!");
      })
      .catch((err) => {
        console.error("Erro ao copiar para a área de transferência: ", err);
      });
  };

  useEffect(() => {
    setScope(getScope());
  }, []);

  useEffect(() => {
    setLoading(true);
    apiFetch(`/batizados?mes=${month + 1}&ano=${year}`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((batizados) => {
        setBatizados(batizados);
      })
      .finally(() => setLoading(false));
  }, [month, year]);

  return (
    <>
      <div className="flex gap-4">
        {(scope === "secretaria" || scope === "admin") && (
          <button
            className="cursor-pointer flex items-center gap-1 w-fit text-sm px-2 py-1 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
            onClick={() => openModal(<CadastrarBatizado />)}>
            <FaDove />
            <span>Criar Batizado</span>
          </button>
        )}
        <button
          onClick={handleCopyToClipboard}
          className="flex items-center gap-2 text-sm rounded-full border border-blue-500 px-2 py-1 hover:bg-blue-500 text-blue-500 hover:text-white cursor-pointer">
          <FaCopy />
          Copiar escala
        </button>
      </div>

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

        <div className="flex justify-between items-center mt-4 mx-2 gap-2">
          <Select
            value={months[month]}
            onValueChange={(value) => setMonth(months.indexOf(value))}>
            <SelectTrigger className="w-1/2 cursor-pointer rounded border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-700">
              <SelectValue placeholder="Meses" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month, i) => (
                <SelectItem key={i} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <input
            type="number"
            className="w-1/2 focus:outline-none rounded border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-sm text-neutral-700"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />
        </div>

        <div className="overflow-hidden">
          {loading ? (
            <p className="text-center text-neutral-500 mt-4">Carregando...</p>
          ) : (
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${active * 100}%)` }}>
              <div className="overflow-hidden w-full flex-shrink-0">
                <CardsTab batizados={batizados} />
              </div>
              <div className="overflow-hidden w-full flex-shrink-0">
                <CalendarioTab
                  batizados={batizados}
                  month={month}
                  year={year}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
