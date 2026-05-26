import { Metadata } from "next";
import CategoryProductsClient from "./CategoryProductsClient";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${title} Collection`,
    description: `Shop our exclusive ${title} collection of luxury Indian apparel at VenusFashion. Handcrafted designer clothing.`,
    openGraph: {
      title: `${title} Collection | VenusFashion`,
      description: `Shop our exclusive ${title} collection of luxury Indian apparel at VenusFashion.`,
    },
  };
}

export default function Page({ params }: Props) {
  return <CategoryProductsClient params={params} />;
}
