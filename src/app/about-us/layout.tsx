import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Teachify | About us",
  description: "Generated by create next app",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
