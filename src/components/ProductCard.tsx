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
//       className="
//         group block bg-white rounded-xs shadow-md overflow-hidden
//         hover:shadow-xl hover:-translate-y-1 transition-all duration-300
//       "
//     >
//       {/* Product Image */}
//       <div className="relative w-full h-60 sm:h-72 md:h-64 overflow-hidden">
//         <Image
//           src={product.images?.[0] || "/placeholder.jpg"}
//           alt={product.name}
//           fill
//           sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
//           className="object-cover group-hover:scale-105 transition-transform duration-500"
//         />
//       </div>

//       {/* Product Info */}
//       <div className="p-2 text-start">
//         <h2 className="text-xs sm:text-lg font-semibold text-gray-800 line-clamp-2">
//           {product.name}
//         </h2>

//         <p className="text-pink-600 font-bold mt-2 text-sm sm:text-base">
//           ₹{product.price}
//         </p>
//       </div>
//     </Link>
//   );
// }
"use client";
import Image from "next/image";
import Link from "next/link";
import API from "@/src/lib/api";
import { setCachedProduct } from "@/src/lib/productCache";
interface ProductProps {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    discount?: number;
    finalPrice?: number;
    images?: string[];
    occasion?: string[];
  };
}
export default function ProductCard({ product }: ProductProps) {
  const handleMouseEnter = async () => {
    try {
      const res = await API.get(`/products/${product._id}`);
      setCachedProduct(product._id, res.data);
    } catch (err) {
      console.error("Prefetch product failed");
    }
  };
  const isNew = product.occasion?.includes("NEW IN");

  return (
    <Link
      href={`/products/${product._id}`}
      onMouseEnter={handleMouseEnter}
      prefetch
      className="
  group flex flex-col h-full
  bg-white rounded-xs overflow-hidden
  hover:shadow-xl hover:-translate-y-1 transition-all duration-300
"
    >
      {/* Product Image */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
        <Image
          src={product.images?.[0] || "/placeholder.jpg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {isNew && (
          <div className="absolute top-1.5 left-1.5 bg-white/50 backdrop-blur-sm text-purple-700 text-[10px] px-2 py-[2px] rounded-full font-semibold shadow-sm">
            NEW IN
          </div>
        )}

        {product.discount && product.discount > 0 && (
          <div
            className="absolute top-1.5 right-1.5 
bg-white/50 backdrop-blur-sm 
text-pink-600 
text-[10px] 
px-1.5 py-[2px] 
rounded-full 
font-medium 
shadow-sm"
          >
            {product.discount}% OFF
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3 flex flex-col h-[90px]">
        {/* Product Name */}
        <h2 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2 leading-tight">
          {product.name}
        </h2>

        <div className="flex items-center gap-2 mt-auto">
          <p className="text-pink-600 font-semibold text-base tracking-wide ">
            ₹{(product.finalPrice ?? product.price).toFixed(2)}
          </p>

          {product.discount && product.discount > 0 && (
            <p className="text-gray-400 line-through text-sm">
              ₹{product.price}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
