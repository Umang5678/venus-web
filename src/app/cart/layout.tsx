import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Bag",
  description: "View the items in your shopping bag and proceed to checkout at VenusFashion.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
