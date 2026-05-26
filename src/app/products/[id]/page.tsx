import { Metadata } from "next";
import ProductDetailsClient from "./ProductDetailsClient";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const res = await fetch(`${apiUrl}/api/products/${id}`, {
      next: { revalidate: 3600 } // Cache metadata for 1 hour
    });
    
    if (!res.ok) {
      return {
        title: "Product Details",
        description: "Exquisite luxury Indian apparel at VenusFashion.",
      };
    }
    
    const product = await res.json();
    const name = product?.name || "Product Details";
    const description = product?.description || `Explore ${name} at VenusFashion.`;
    const images = Array.isArray(product?.images) 
      ? product.images.flat(Infinity) 
      : (product?.images ? [product.images] : []);

    return {
      title: name,
      description: description,
      openGraph: {
        title: `${name} | VenusFashion`,
        description: description,
        images: images.length > 0 ? [{ url: images[0] }] : [],
      },
    };
  } catch (error) {
    console.error("Error generating product metadata:", error);
    return {
      title: "Product Details",
      description: "Exquisite luxury Indian apparel at VenusFashion.",
    };
  }
}

export default function Page() {
  return <ProductDetailsClient />;
}
