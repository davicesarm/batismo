"use client";

import { useState } from "react";
import Link from "next/link";
import { MdMenu, MdMenuOpen } from "react-icons/md";
import { FaHome, FaUser, FaSignOutAlt } from "react-icons/fa";
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
          shadow h-screen p-4 bg-neutral-700 z-50 flex flex-col
          ${
            isOpen
              ? "left-0 absolute sm:relative"
              : "-left-64 absolute transition-all duration-300 ease-in-out"
          }
        `}>
        <div className="flex justify-between items-center mb-4 text-neutral-50">
          <h1 className="text-xl font-bold">Batismo</h1>
          <button
            onClick={toggleSidebar}
            className="cursor-pointer text-2xl p-2 rounded hover:bg-neutral-300/50">
            <MdMenuOpen />
          </button>
        </div>

        <div className="flex flex-col justify-between h-full">
          <ul className="overflow-hidden">
            <li className="mb-2">
              <Link
                href="/"
                className="text-sm font-semibold border-b border-neutral-500 p-2 flex items-center gap-4 text-neutral-200 hover:bg-neutral-400/50 hover:rounded">
                <FaHome />
                Batizados
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/admin"
                className="text-sm font-semibold border-b border-neutral-500 p-2 flex items-center gap-4 text-neutral-200 hover:bg-neutral-400/50 hover:rounded">
                <FaUser />
                Administração
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  Cookies.remove("accessToken");
                  window.location.href = "/login";
                }}
                className="w-full cursor-pointer mt-8 text-sm font-semibold border-b border-red-400 p-2 flex items-center gap-4 text-red-400 hover:bg-red-400/30 hover:rounded">
                <FaSignOutAlt />
                Sair
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
        className={`text-neutral-100 cursor-pointer fixed top-4 left-4 z-40 transition-all duration-300 ease-in-out text-xl p-2 rounded-full hover:bg-neutral-200/50 ${
          isOpen ? "hidden" : "block"
        }`}>
        <MdMenu className="text-3xl" />
      </button>
    </>
  );
}
