import { redirect } from "next/navigation";

export default function OccasionPage({
  params,
}: {
  params: { slug?: string };
}) {

  if (!params?.slug) {
    redirect("/products");
  }

  const occasion = params.slug.replace(/-/g, " ").toUpperCase();

  redirect(`/products?occasion=${occasion}`);
}