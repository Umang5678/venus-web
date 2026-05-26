import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a VenusFashion account to get access to exclusive styles, member rewards, and order details.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
