"use client";

import { FaUserGroup } from "react-icons/fa6";
import SortableOrdemCasais from "./components/SortableOrdemCasais";
import { getScope } from "@/lib/utils";
import OrdemCasais from "./components/OrdemCasais";
import { useEffect, useState } from "react";

export default function CasaisPage() {
  const [scope, setScope] = useState<string | null>(null);

  useEffect(() => {
    setScope(getScope());
  }, []);

  return (
    <>
      <header className="flex flex-col items-center bg-indigo-900 pt-6 mx-auto text-white">
        <h1 className="text-2xl font-bold">Casais</h1>
        <h2 className="w-fit flex items-center gap-1 text-sm text-neutral-300">
          <FaUserGroup />
          <span>Ordem de casais</span>
        </h2>
        <span className="border-t-3 border-indigo-500 bg-neutral-100 h-8 w-full mt-6 rounded-t-xl"></span>
      </header>

      <main className="mx-2">
        <div className="shadow-md bg-neutral-50 flex flex-col gap-4 border-l-blue-500 border-l-3 mx-auto mt-4 border border-neutral-300 p-2 sm:p-4 rounded-lg max-w-4xl">
          {scope === "admin" || scope === "coordenador" ? (
            <SortableOrdemCasais />
          ) : (
            <OrdemCasais />
          )}
        </div>
      </main>
    </>
  );
}
