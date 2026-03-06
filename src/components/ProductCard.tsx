// "use client";
// import Image from "next/image";
// import Link from "next/link";

// interface ProductProps {
//   product: {
//     _id: string;
//     name: string;
//     description: string;
//     price: number;
//     images?: string[];
//   };
// }

// export default function ProductCard({ product }: ProductProps) {
//   return (
//     <Link
//       href={`/products/${product._id}`}
//       className="block border rounded-lg shadow-md p-4 hover:shadow-lg transition"
//     >
//       <Image
//         src={product.images?.[0] || "/placeholder.jpg"}
//         alt={product.name}
//         width={300}
//         height={300}
//         className="rounded-lg w-full h-64 object-cover"
//       />
//       <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
//       <p className="text-gray-600">{product.description}</p>
//       <p className="text-pink-600 font-bold mt-1">₹{product.price}</p>
//     </Link>
//   );
// }

"use client";
import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    images?: string[];
  };
}

export default function ProductCard({ product }: ProductProps) {
  return (
    <Link
      href={`/products/${product._id}`}
      className="
        group block bg-white rounded-2xl shadow-md overflow-hidden
        hover:shadow-xl hover:-translate-y-1 transition-all duration-300
      "
    >
      {/* Product Image */}
      <div className="relative w-full h-60 sm:h-72 md:h-64 overflow-hidden">
        <Image
          src={product.images?.[0] || "/placeholder.jpg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h2>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>
        <p className="text-pink-600 font-bold mt-2 text-sm sm:text-base">
          ₹{product.price}
        </p>
      </div>
    </Link>
  );
}
