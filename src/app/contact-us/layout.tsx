import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with VenusFashion. Reach out to our customer service, view our store location on the map, or send us a query message.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
