import { Metadata } from "next";
import OccasionProductsClient from "./OccasionProductsClient";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${title} Edit`,
    description: `Shop curated luxury wear for the ${title} occasion at VenusFashion. Exquisite styles and Indian designer apparel.`,
    openGraph: {
      title: `${title} Edit | VenusFashion`,
      description: `Shop curated luxury wear for the ${title} occasion at VenusFashion.`,
    },
  };
}

export default function Page({ params }: Props) {
  return <OccasionProductsClient params={params} />;
}
