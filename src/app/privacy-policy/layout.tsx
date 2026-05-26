import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how VenusFashion collects, uses, and protects your personal data and checkout transaction information.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
