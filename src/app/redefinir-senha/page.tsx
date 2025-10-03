"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash, FaSignOutAlt } from "react-icons/fa";
import { apiFetch } from "@/lib/utils";
import Image from "next/image";
import Cookies from "js-cookie";

export default function RedefinirSenha() {
  const [senhaNova, setSenhaNova] = useState("");
  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [senhaVisible, setSenhaVisible] = useState(false);
  const [confirmarSenhaVisible, setConfirmarSenhaVisible] = useState(false);
  const [senhaAntigaVisible, setSenhaAntigaVisible] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validações
    if (!senhaNova.trim()) {
      setError("A nova senha é obrigatória");
      return;
    }

    if (senhaNova.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (senhaNova !== confirmarSenha) {
      setError("As senhas não coincidem");
      return;
    }

    setLoading(true);

    type LoginResponse = {
      accessToken: string;
      expiresIn: number;
    };

    try {
      const res = await apiFetch("/redefinir-senha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senhaAntiga: senhaAntiga,
          senhaNova: senhaNova,
        }),
      });

      if (res.ok) {
        const data: LoginResponse = await res.json();

        Cookies.set("accessToken", data.accessToken, {
          expires: data.expiresIn / 86400,
        });
        setSuccess(true);
        setSenhaNova("");
        setConfirmarSenha("");
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Erro ao redefinir senha");
      }
    } catch (err) {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Image
        src="/transparent-logo.png"
        alt="Logo"
        width={180}
        height={180}
        className="mt-4 mb-6"
      />
      <div className="bg-neutral-50 border border-neutral-300 p-2 px-4 rounded-xl shadow-md w-full max-w-[350px] flex flex-col">
        <h1 className="text-neutral-600 text-center text-3xl mt-8">
          Redefinir Senha
        </h1>

        {success && (
          <div className="text-xs mx-4 mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            Senha redefinida com sucesso! Redirecionando...
          </div>
        )}

        {error && (
          <div className="text-xs mx-4 mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="text-sm flex flex-col gap-4 mx-4 my-8">
          <div className="mb-4 relative">
            <input
              className="w-full text-neutral-600 font-semibold border px-3 border-neutral-400 placeholder-shown:border-neutral-300 p-2 rounded"
              type={senhaAntigaVisible ? "text" : "password"}
              value={senhaAntiga}
              onChange={(e) => setSenhaAntiga(e.target.value)}
              placeholder="Senha antiga"
              required
              disabled={loading || success}
            />
            <button
              type="button"
              onClick={() => setSenhaAntigaVisible(!senhaAntigaVisible)}
              className="cursor-pointer absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500 hover:text-neutral-600"
              disabled={loading || success}>
              {senhaAntigaVisible ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <div className="relative">
            <input
              className="w-full text-neutral-600 font-semibold border px-3 border-neutral-400 placeholder-shown:border-neutral-300 p-2 rounded"
              type={senhaVisible ? "text" : "password"}
              value={senhaNova}
              onChange={(e) => setSenhaNova(e.target.value)}
              placeholder="Nova senha"
              required
              disabled={loading || success}
            />
            <button
              type="button"
              onClick={() => setSenhaVisible(!senhaVisible)}
              className="cursor-pointer absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500 hover:text-neutral-600"
              disabled={loading || success}>
              {senhaVisible ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          <div className="relative">
            <input
              className="w-full text-neutral-600 font-semibold border px-3 border-neutral-400 placeholder-shown:border-neutral-300 p-2 rounded"
              type={confirmarSenhaVisible ? "text" : "password"}
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Confirmar nova senha"
              required
              disabled={loading || success}
            />
            <button
              type="button"
              onClick={() => setConfirmarSenhaVisible(!confirmarSenhaVisible)}
              className="cursor-pointer absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500 hover:text-neutral-600"
              disabled={loading || success}>
              {confirmarSenhaVisible ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          <button
            className="mt-4 bg-blue-500 text-white text-center border border-blue-600 hover:border-blue-700 hover:bg-blue-600 cursor-pointer p-2 font-bold rounded disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading || success}>
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </form>
      </div>
      <button
        onClick={() => {
          Cookies.remove("accessToken");
          window.location.href = "/login";
        }}
        className="px-8 flex items-center gap-1 text-sm mt-4 bg-red-400 text-white text-center border border-red-500 hover:border-red-600 hover:bg-red-500 cursor-pointer p-2 font-bold rounded disabled:opacity-50 disabled:cursor-not-allowed">
        <FaSignOutAlt />
        Sair
      </button>
    </div>
  );
}
