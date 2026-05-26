import { Suspense } from "react";
import ProductsPage from "./productpage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Styles",
  description: "Browse the full collection of exquisite Indian luxury apparel, kurtas, sarees, and contemporary designer clothing at VenusFashion.",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <ProductsPage />
    </Suspense>
  );
}
