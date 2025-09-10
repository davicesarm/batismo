import { BatizadoType } from "@/types/batizado";
import Batizado from "./Batizado";

export default async function Batizados() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API_URL}/batizados`, {
    cache: "no-store",
  });
  const batizados = await res.json();

  return (
    <div className="border border-neutral-300 flex flex-col gap-8 bg-neutral-200 max-w-sm mx-auto mt-8 p-8 rounded-xl">
      {batizados.map((batizado: BatizadoType) => (
        <Batizado key={batizado.id} batizado={batizado} />
      ))}
    </div>
  );
}
