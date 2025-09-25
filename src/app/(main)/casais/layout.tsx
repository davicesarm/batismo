import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Casais - Batismo",
  description: "Casais - Batismo",
  icons: {
    icon: "/logo.png",
  },
};

export default function CasaisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
