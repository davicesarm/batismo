// src/contexts/ModalContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// 1. Defina a interface para o estado e as funções do Contexto
interface ModalContextType {
  isOpen: boolean;
  content: ReactNode | null;
  openModal: (modalContent: ReactNode) => void;
  closeModal: () => void;
}

// 2. Crie o Contexto com um valor padrão
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// 3. Crie o Provedor do Contexto
interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<ReactNode | null>(null);

  const openModal = (modalContent: ReactNode) => {
    setContent(modalContent);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setContent(null); // Limpa o conteúdo ao fechar
  };

  const value: ModalContextType = {
    isOpen,
    content,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}

      {/* 4. O Componente do Modal que renderiza o conteúdo condicionalmente */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={closeModal}>
          <div
            className="max-h-[600px] overflow-y-scroll border border-neutral-300 border-l-blue-500 border-l-3 bg-neutral-50 rounded-lg p-6 max-w-lg w-full m-4 relative"
            onClick={(e) => e.stopPropagation()}>
            <button
              className="cursor-pointer absolute top-0 right-2 text-gray-500 hover:text-red-700 text-2xl"
              onClick={closeModal}>
              &times;
            </button>
            {content}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

// 5. Crie um Hook Customizado para usar o Contexto de forma segura
export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
