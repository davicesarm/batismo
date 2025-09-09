"use client";

import { useState } from "react";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // evita reload da página

    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    if (res.ok) {
      console.log("Login correto ✅");
    } else {
      console.error("Erro no login ❌");
    }
  };

  return (
    <div className="px-4">
      <Image
        src="/logo.png"
        alt="Logo"
        width={250}
        height={250}
        className="mx-auto"
      />
      <div className="border border-neutral-300 p-4 rounded-xl shadow max-w-sm mx-auto flex flex-col">
        <h1 className="text-neutral-500 text-center text-4xl mt-8">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mx-4 my-12">
          <input
            className=" text-sm text-neutral-600 font-semibold border px-3 border-neutral-400 placeholder-shown:border-neutral-300 p-2 rounded-lg"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <div className="flex flex-col">
            <input
              className="text-sm text-neutral-600 font-semibold border px-3 border-neutral-400 placeholder-shown:border-neutral-300 p-2 rounded-lg"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Password"
            />
            <a
              className="text-right text-xs text-blue-400 hover:text-blue-500 underline mt-2 font-bold"
              href="#">
              Esqueci a senha...
            </a>
          </div>
          <button
            className="mt-4 bg-blue-400 text-white text-center border border-blue-500 hover:border-blue-600 hover:bg-blue-500 cursor-pointer text-sm p-2 font-bold rounded-lg"
            type="submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
