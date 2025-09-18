import Batizados from "@/components/Batizados";

export default function Home() {
  return (
    <>
      <header className="bg-blue-400 p-6 mx-auto text-white">
        <h1 className="text-2xl font-bold text-center">Batizados</h1>
      </header>

      <main>
        <Batizados />
      </main>
    </>
  );
}
