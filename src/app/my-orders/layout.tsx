import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders",
  description: "View and track your previous and current orders at VenusFashion.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
