import { UsuarioType } from "@/types/usuario";
import { FaEdit } from "react-icons/fa";

export default function UsuarioTable({
  usuarios,
  casal,
}: {
  usuarios: UsuarioType[];
  casal?: boolean;
}) {
  return (
    <div className="border border-neutral-300 relative overflow-x-auto rounded-lg">
      <table className="w-full text-xs sm:text-sm text-left rtl:text-right text-neutral-700">
        <thead className="text-xs text-neutral-800 uppercase bg-neutral-200">
          <tr>
            <th scope="col" className="p-2 sm:px-4 sm:py-3">
              <span className="sr-only">Editar</span>
            </th>
            {casal ? (
              <>
                <th scope="col" className="p-2 sm:px-4 sm:py-3">
                  Marido
                </th>
                <th scope="col" className="p-2 sm:px-4 sm:py-3">
                  Mulher
                </th>
              </>
            ) : (
              <th scope="col" className="p-2 sm:px-4 sm:py-3">
                Nome
              </th>
            )}
            <th scope="col" className="p-2 sm:px-4 sm:py-3">
              Email
            </th>
            <th scope="col" className="p-2 sm:px-4 sm:py-3">
              Cargo
            </th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr
              key={index}
              className="bg-white not-last:border-b border-neutral-200 hover:bg-neutral-100">
              <td className="p-2 sm:p-4">
                <a
                  title="Editar"
                  href="#"
                  className="text-blue-600 px-2 py-1 rounded-full w-fit hover:bg-neutral-200 flex items-center gap-2">
                  <FaEdit />
                </a>
              </td>
              {casal ? (
                <>
                  <td title="Marido" className="p-2 sm:p-4">
                    {usuario.marido}
                  </td>
                  <td title="Mulher" className="p-2 sm:p-4">
                    {usuario.mulher}
                  </td>
                </>
              ) : (
                <td title="Nome" className="p-2 sm:p-4">
                  {usuario.nome}
                </td>
              )}
              <td title="Email" className="p-2 sm:p-4">
                {usuario.email}
              </td>
              <td title="Cargo" className="p-2 sm:p-4 capitalize">
                {usuario.cargo}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
