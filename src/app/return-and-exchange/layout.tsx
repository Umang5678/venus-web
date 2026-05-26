import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Exchange Policy",
  description: "Read VenusFashion's policy details confirming all sales are final, with no returns or exchanges.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
