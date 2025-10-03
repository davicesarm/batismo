"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdMenu, MdMenuOpen } from "react-icons/md";
import { FaHome, FaUser, FaSignOutAlt, FaLock } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { getScope } from "@/lib/utils";
import Cookies from "js-cookie";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [scope, setScope] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setScope(getScope());
  }, []);

  // Detectar se é dispositivo móvel
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // 640px é o breakpoint sm: do Tailwind
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fechar sidebar quando a rota mudar (apenas em dispositivos móveis)
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [pathname, isMobile]);

  if (scope === null) return null;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <aside
        className={`
          text-neutral-300 shrink-0 overflow-hidden fixed sm:sticky top-0 h-screen py-8 bg-neutral-900/80 sm:bg-neutral-800 shadow backdrop-blur-xl z-50 flex flex-col transition-all duration-300 ease-in-out sm:rounded-none rounded-r-xl
          ${isOpen ? "w-72 px-6" : "w-0"}
        `}>
        <div className="flex justify-between items-center mb-6 pb-2 border-b border-neutral-400 ">
          <Link href="/" className="text-2xl font-bold">
            Batismo
          </Link>
          <button
            onClick={toggleSidebar}
            className="cursor-pointer text-3xl p-2 rounded hover:bg-neutral-300/50">
            <MdMenuOpen />
          </button>
        </div>

        <div className="flex flex-col justify-between h-full">
          <ul className="overflow-hidden">
            <li className="mb-2">
              <Link
                href="/"
                className="font-semibold p-2 flex items-center gap-4 hover:bg-neutral-300/50 hover:rounded">
                <FaHome />
                Batizados
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/casais"
                className="font-semibold p-2 flex items-center gap-4 hover:bg-neutral-300/50 hover:rounded">
                <FaUserGroup />
                Ordem dos Casais
              </Link>
            </li>
            {scope === "admin" && (
              <li className="mb-2">
                <Link
                  href="/admin"
                  className="font-semibold p-2 flex items-center gap-4 hover:bg-neutral-300/50 hover:rounded">
                  <FaUser />
                  Administração
                </Link>
              </li>
            )}
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
            <ul className="my-8">
              <li className="text-xs text-neutral-500">
                {isOpen && "© 2025 Batismo"}
              </li>
              <li className="text-xs text-neutral-500">
                {isOpen && "Versão beta-0.5.0"}
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
        className={`bg-blue-950 text-neutral-100 cursor-pointer fixed top-4 z-40 transition-all duration-300 ease-in-out text-xl p-2 rounded-full hover:bg-neutral-300/50 hover:text-blue-950 ${
          isOpen ? "-left-12" : "left-4"
        }`}>
        <MdMenu className="text-3xl" />
      </button>
    </>
  );
}
