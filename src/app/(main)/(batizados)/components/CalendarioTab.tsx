import { BatizadoType } from "@/types/batizado";
import { useModal } from "@/context/ModalContext";
import BatizadoCard from "./BatizadoCard";

interface CalendarioTabProps {
  batizados: BatizadoType[];
  month: number;
  year: number;
}

export default function CalendarioTab({
  batizados,
  month,
  year,
}: CalendarioTabProps) {
  const { openModal } = useModal();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const batizadoDays = new Set(
    batizados
      .map((b) => new Date(b.data))
      .filter((d) => d.getMonth() === month && d.getFullYear() === year)
      .map((d) => d.getDate())
  );

  const calendarDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // Cria as linhas para a tabela
  const rows: (number | null)[][] = [];
  let cells: (number | null)[] = [];

  calendarDays.forEach((day, index) => {
    cells.push(day);
    if ((index + 1) % 7 === 0 || index === calendarDays.length - 1) {
      rows.push(cells);
      cells = [];
    }
  });

  return (
    <div className="mx-2 mt-2">
      <div className="flex justify-center pb-8 pt-2 bg-neutral-50 border-l-3 border border-neutral-300 border-l-blue-400 text-sm text-neutral-700 relative rounded-xl shadow-md">
        <table className="w-11/12 table-fixed border-collapse">
          <thead>
            <tr className="">
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(
                (day, i) => (
                  <th
                    key={i}
                    className="py-4 text-center font-medium text-gray-500">
                    {day}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((day, cellIndex) => (
                  <td key={cellIndex} className="">
                    {day ? (
                      <button
                        onClick={() => {
                          const batizadosFiltered: BatizadoType[] =
                            batizados.filter((b) => {
                              const d = new Date(b.data);
                              return (
                                d.getDate() === day &&
                                d.getMonth() === month &&
                                d.getFullYear() === year
                              );
                            })!;
                          if (batizadosFiltered.length >= 1) {
                            openModal(
                              <div className="flex flex-col gap-4">
                                {batizadosFiltered.map((batizado) => (
                                  <BatizadoCard
                                    key={batizado.id}
                                    batizado={batizado}
                                  />
                                ))}
                              </div>
                            );
                          }
                        }}
                        className={`h-10 w-full border mx-auto flex items-center justify-center transition-colors ${
                          batizadoDays.has(day)
                            ? "cursor-pointer bg-blue-500 hover:bg-blue-600 text-white"
                            : "bg-neutral-100/70 cursor-not-allowed"
                        }`}>
                        {day}
                      </button>
                    ) : (
                      <div className="" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
