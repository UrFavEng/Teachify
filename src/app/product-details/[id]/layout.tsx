import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dynamic | Product details",
  description: "Generated by create next app",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
