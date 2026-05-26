import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Review VenusFashion's storefront usage parameters, intellectual property rights, and commercial policies.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
