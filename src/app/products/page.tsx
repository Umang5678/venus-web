import { Suspense } from "react";
import ProductsPage from "./productpage";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <ProductsPage />
    </Suspense>
  );
}
