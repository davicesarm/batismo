import { BatizadoType } from "@/types/batizado";
import Batizado from "./BatizadoCard";

export default function CardsTab({ batizados }: { batizados: BatizadoType[] }) {
  return (
    <div className="max-w-lg mx-auto p-2 gap-4 flex flex-col">
      <div className="flex flex-col gap-4">
        {batizados && batizados.length > 0 ? (
          batizados.map((batizado: BatizadoType) => (
            <Batizado key={batizado.id} batizado={batizado} />
          ))
        ) : (
          <p className="text-center text-neutral-500">
            Nenhum batizado encontrado para esta data.
          </p>
        )}
      </div>
    </div>
  );
}
