"use client";

import { useState } from "react";
import Link from "next/link";
import { MdMenu, MdClose } from "react-icons/md";
import Cookies from "js-cookie";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <aside
        className={`
          shadow absolute h-screen border-r p-4 bg-neutral-50 z-50 transition-all duration-300 ease-in-out flex flex-col
          ${isOpen ? "left-0" : "-left-64"}
        `}>
        <div className="flex justify-start items-center mb-4">
          <button
            onClick={toggleSidebar}
            className="cursor-pointer text-xl p-2 rounded hover:bg-neutral-300">
            {isOpen && <MdClose />}
          </button>
        </div>

        <div className="flex flex-col justify-between h-full">
          <ul className="overflow-hidden">
            <li className="mb-2">
              <Link
                href="/"
                className="flex items-center gap-2 text-blue-500 hover:underline">
                🏠
                {isOpen && <span>Home</span>}
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/admin"
                className="flex items-center gap-2 text-blue-500 hover:underline">
                👤
                {isOpen && <span>Admin</span>}
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/login"
                className="flex items-center gap-2 text-blue-500 hover:underline">
                🔐
                {isOpen && <span>Login</span>}
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  Cookies.remove("accessToken");
                  window.location.href = "/login";
                }}
                className="cursor-pointer mt-8 flex items-center gap-2 text-red-500 hover:underline">
                🚪
                {isOpen && <span>Sair</span>}
              </button>
            </li>
          </ul>

          <div>
            <ul className="mt-4">
              <li className="text-xs text-neutral-500">
                {isOpen && "© 2025 Batismo"}
              </li>
              <li className="text-xs text-neutral-500">
                {isOpen && "Versão 1.0.0"}
              </li>
              <li className="text-xs text-neutral-500">
                {isOpen && (
                  <p>
                    Desenvolvido por{" "}
                    <Link
                      className="text-blue-500 hover:underline"
                      href="https://linkedin.com/in/davicesar/"
                      target="_blank"
                      rel="noopener noreferrer">
                      Davi César
                    </Link>
                  </p>
                )}
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <button
        onClick={toggleSidebar}
        className={`text-neutral-100 cursor-pointer fixed top-4 left-4 z-50 transition-all duration-300 ease-in-out text-xl p-2 rounded-full hover:bg-neutral-200/50 ${
          isOpen ? "hidden" : "block"
        }`}>
        <MdMenu className="text-3xl" />
      </button>
    </>
  );
}
