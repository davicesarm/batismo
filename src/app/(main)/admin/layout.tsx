import type { Metadata } from "next";
import { ModalProvider } from "@/context/ModalContext";

export const metadata: Metadata = {
  title: "Admin - Batismo",
  description: "Admin - Batismo",
  icons: {
    icon: "/logo.png",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ModalProvider>{children}</ModalProvider>;
}
