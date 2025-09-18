"use client";

import { useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";

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

    type LoginResponse = {
      accessToken: string;
      expiresIn: number;
    };

    if (res.ok) {
      const data: LoginResponse = await res.json();
      Cookies.set("accessToken", data.accessToken, {
        expires: data.expiresIn / 86400,
      }); // 1 hour

      console.log("Login correto ✅");
      document.location.href = "/";
    } else {
      console.error("Erro no login ❌");
    }
  };

  return (
    <div className="px-4">
      <Image
        src="/transparent-logo.png"
        alt="Logo"
        width={180}
        height={180}
        className="mx-auto mt-4 mb-6"
      />
      <div className="bg-neutral-50 border border-neutral-300 p-2 px-4 rounded-xl shadow-md max-w-[350px] mx-auto flex flex-col">
        <h1 className="text-neutral-600 text-center text-4xl mt-8">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="text-sm flex flex-col gap-4 mx-4 my-12">
          <input
            className="inset-shadow-sm text-neutral-600 font-semibold border px-3 border-neutral-400 placeholder-shown:border-neutral-300 p-2 rounded"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <div className="flex flex-col">
            <input
              className="inset-shadow-sm text-neutral-600 font-semibold border px-3 border-neutral-400 placeholder-shown:border-neutral-300 p-2 rounded"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Password"
            />
            <a
              className="text-right text-xs text-blue-500 hover:text-blue-600 underline mt-2 font-bold"
              href="#">
              Esqueci a senha...
            </a>
          </div>
          <button
            className="mt-4 bg-blue-500 text-white text-center border border-blue-600 hover:border-blue-700 hover:bg-blue-600 cursor-pointer p-2 font-bold rounded"
            type="submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
