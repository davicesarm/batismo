export default function CadastrarUsuario() {
  return (
    <div>
      <form className="flex flex-col gap-4 border-l-blue-400 border-l-3 mx-auto mt-4 border border-neutral-300 p-2 sm:p-4 rounded-lg max-w-4xl">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col flex-1">
            <label
              htmlFor="nome"
              className="text-sm font-medium text-neutral-700 mb-1">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              className="border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col flex-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-neutral-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col flex-1">
            <label
              htmlFor="cargo"
              className="text-sm font-medium text-neutral-700 mb-1">
              Cargo
            </label>
            <select
              id="cargo"
              name="cargo"
              className="border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required>
              <option value="">Selecione um cargo</option>
              <option value="admin">Administrador</option>
              <option value="editor">Editor</option>
              <option value="casal">Casal</option>
            </select>
          </div>
          <div className="flex flex-col flex-1">
            <label
              htmlFor="senha"
              className="text-sm font-medium text-neutral-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              className="border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="self-start bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
          Cadastrar Usuário
        </button>
      </form>
    </div>
  );
}
