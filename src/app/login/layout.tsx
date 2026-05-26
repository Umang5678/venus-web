import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your VenusFashion account to manage your profile and track orders.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
