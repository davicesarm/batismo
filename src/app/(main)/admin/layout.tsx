import type { Metadata } from "next";

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
  return <>{children}</>;
}
