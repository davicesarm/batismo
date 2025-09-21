import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secretaria - Batismo",
  description: "Secretaria - Batismo",
  icons: {
    icon: "/logo.png",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
