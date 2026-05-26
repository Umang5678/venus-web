import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout",
  description: "Securely complete your luxury fashion order at VenusFashion.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
