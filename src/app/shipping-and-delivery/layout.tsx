import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy",
  description: "Read VenusFashion's delivery guidelines, tracking options, and dispatch schedules.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
