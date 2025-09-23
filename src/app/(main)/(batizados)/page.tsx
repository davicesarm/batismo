"use client";

import { FaDove, FaHome } from "react-icons/fa";
import Tabs from "./components/Tabs";
import { useEffect, useState } from "react";
import { JwtPayload } from "@/types/jwtpayload";
import Cookies from "js-cookie";
import * as jose from "jose";
import CadastrarBatizado from "./components/CadastrarBatizado";

export default function Home() {
  const [isCadastrarModalOpen, setIsCadastrarModalOpen] = useState(false);
  const [scope, setScope] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    const payload = token ? (jose.decodeJwt(token) as JwtPayload) : null;
    setScope(payload?.scope ?? "");
  }, []);

  const handleCloseModal = () => {
    setIsCadastrarModalOpen(false);
  };
  return (
    <>
      <header className="flex flex-col items-center bg-blue-900 pt-6 mx-auto text-white">
        <h1 className="text-2xl font-bold">Batizados</h1>
        <h2 className="w-fit flex items-center gap-1 text-sm text-neutral-100">
          <FaHome />
          <span>Página principal</span>
        </h2>
        <span className="border-t-3 border-blue-500 bg-neutral-100 h-8 w-full mt-6 rounded-t-xl"></span>
      </header>

      <main className="flex flex-col items-center gap-4">
        {(scope === "secretaria" || scope === "admin") && (
          <button
            className="cursor-pointer flex items-center gap-1 w-fit text-sm px-2 py-1 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
            onClick={() => setIsCadastrarModalOpen(true)}>
            <FaDove />
            <span>Criar Batizado</span>
          </button>
        )}

        <Tabs />
      </main>
      {isCadastrarModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={handleCloseModal}>
          <div
            className="border border-neutral-300 border-l-blue-500 border-l-3 bg-neutral-50 rounded-lg p-6 max-w-lg w-full m-4 relative"
            onClick={(e) => e.stopPropagation()}>
            <button
              className="cursor-pointer absolute top-0 right-2 text-gray-500 hover:text-red-700 text-2xl"
              onClick={handleCloseModal}>
              &times;
            </button>
            <CadastrarBatizado />
          </div>
        </div>
      )}
    </>
  );
}
