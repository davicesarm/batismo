import { FaDove } from "react-icons/fa";

export default function AdminPage() {
  return (
    <>
      <header className="flex flex-col items-center bg-indigo-900 pt-6 mx-auto text-white">
        <h1 className="text-2xl font-bold">Secretaria</h1>
        <h2 className="w-fit flex items-center gap-1 text-sm text-neutral-300">
          <FaDove />
          <span>Cadastro de batizados</span>
        </h2>
        <span className="border-t-3 border-blue-700 bg-neutral-100 h-8 w-full mt-6 rounded-t-xl"></span>
      </header>

      <main className="mx-2"></main>
    </>
  );
}
