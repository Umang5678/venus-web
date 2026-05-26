import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy",
  description: "Read VenusFashion's strict policies regarding cancellation of orders and refund processes.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
