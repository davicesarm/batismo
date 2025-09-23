import { ModalProvider } from "@/context/ModalContext";

export default function BatizadoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ModalProvider>{children}</ModalProvider>;
}
