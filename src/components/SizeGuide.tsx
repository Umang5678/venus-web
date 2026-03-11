// "use client";

// import Image from "next/image";
// import { useState } from "react";

// export default function SizeGuide() {
//   const [unit, setUnit] = useState("inch");

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       {/* ===== Measurement Guide ===== */}
//       <div className="grid md:grid-cols-2 gap-10 items-center">
//         {/* Image */}
//         <div className="flex justify-center">
//           <Image
//             src="images/Size.png"
//             alt="Size Guide"
//             width={400}
//             height={600}
//             className="object-contain"
//           />
//         </div>
//       </div>

//       {/* ===== Unit Toggle ===== */}
//       <div className="flex justify-center mt-10">
//         <div className="flex items-center gap-4 bg-pink-100 px-6 py-2 rounded-full">
//           <span className="font-medium text-gray-700">Body Measurement</span>

//           <div className="flex gap-3">
//             <button
//               onClick={() => setUnit("inch")}
//               className={`px-3 py-1 rounded-full text-sm ${
//                 unit === "inch" ? "bg-pink-600 text-white" : "text-gray-600"
//               }`}
//             >
//               inch
//             </button>

//             <button
//               onClick={() => setUnit("cm")}
//               className={`px-3 py-1 rounded-full text-sm ${
//                 unit === "cm" ? "bg-pink-600 text-white" : "text-gray-600"
//               }`}
//             >
//               cm
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ===== Size Table ===== */}
//       <div className="mt-10 overflow-x-auto">
//         <table className="w-full border border-pink-200 rounded-xl overflow-hidden text-black">
//           <thead className="bg-pink-100 text-black text-sm">
//             <tr>
//               <th className="p-3 text-left">Size</th>
//               <th className="p-3">XS</th>
//               <th className="p-3">S</th>
//               <th className="p-3">M</th>
//               <th className="p-3">L</th>
//               <th className="p-3">XL</th>
//               <th className="p-3">XXL</th>
//             </tr>
//           </thead>

//           <tbody className="text-center text-sm text-black">
//             <tr className="border-t">
//               <td className="p-3 text-left font-medium">Across Shoulder</td>
//               <td>{unit === "inch" ? "13.5" : "34.3"}</td>
//               <td>{unit === "inch" ? "14" : "35.6"}</td>
//               <td>{unit === "inch" ? "14.5" : "36.8"}</td>
//               <td>{unit === "inch" ? "15" : "38.1"}</td>
//               <td>{unit === "inch" ? "15.5" : "39.4"}</td>
//               <td>{unit === "inch" ? "16" : "40.6"}</td>
//             </tr>

//             <tr className="border-t">
//               <td className="p-3 text-left font-medium">Bust</td>
//               <td>{unit === "inch" ? "34" : "86.4"}</td>
//               <td>{unit === "inch" ? "36" : "91.4"}</td>
//               <td>{unit === "inch" ? "38" : "96.5"}</td>
//               <td>{unit === "inch" ? "40" : "101.6"}</td>
//               <td>{unit === "inch" ? "42" : "106.7"}</td>
//               <td>{unit === "inch" ? "44" : "111.8"}</td>
//             </tr>

//             <tr className="border-t">
//               <td className="p-3 text-left font-medium">Hips</td>
//               <td>{unit === "inch" ? "36" : "91.4"}</td>
//               <td>{unit === "inch" ? "38" : "96.5"}</td>
//               <td>{unit === "inch" ? "40" : "101.6"}</td>
//               <td>{unit === "inch" ? "42" : "106.7"}</td>
//               <td>{unit === "inch" ? "44" : "111.8"}</td>
//               <td>{unit === "inch" ? "46" : "116.8"}</td>
//             </tr>

//             <tr className="border-t">
//               <td className="p-3 text-left font-medium">Waist</td>
//               <td>{unit === "inch" ? "30" : "76.2"}</td>
//               <td>{unit === "inch" ? "32" : "81.3"}</td>
//               <td>{unit === "inch" ? "34" : "86.4"}</td>
//               <td>{unit === "inch" ? "36" : "91.4"}</td>
//               <td>{unit === "inch" ? "38" : "96.5"}</td>
//               <td>{unit === "inch" ? "40" : "101.6"}</td>
//             </tr>

//             <tr className="border-t">
//               <td className="p-3 text-left font-medium">Front Length</td>
//               <td>{unit === "inch" ? "28" : "71.1"}</td>
//               <td>{unit === "inch" ? "28" : "71.1"}</td>
//               <td>{unit === "inch" ? "28" : "71.1"}</td>
//               <td>{unit === "inch" ? "28" : "71.1"}</td>
//               <td>{unit === "inch" ? "28" : "71.1"}</td>
//               <td>{unit === "inch" ? "28" : "71.1"}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
"use client";

import Image from "next/image";
import { useState } from "react";

export default function SizeGuide() {
  const [unit, setUnit] = useState("inch");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* ===== Measurement Guide Image ===== */}
      <div className="flex justify-center">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
          <Image
            src="/images/Size.png"
            alt="Size Guide"
            width={500}
            height={700}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* ===== Unit Toggle ===== */}
      <div className="flex justify-center mt-6 sm:mt-10 px-2">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-pink-100 px-4 sm:px-6 py-3 rounded-full shadow-sm">
          {/* Label */}
          <span className="font-medium text-gray-700 text-sm sm:text-base whitespace-nowrap">
            Body Measurement
          </span>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setUnit("inch")}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition ${
                unit === "inch"
                  ? "bg-pink-600 text-white shadow"
                  : "text-gray-600 hover:text-black hover:bg-white"
              }`}
            >
              Inch
            </button>

            <button
              onClick={() => setUnit("cm")}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition ${
                unit === "cm"
                  ? "bg-pink-600 text-white shadow"
                  : "text-gray-600 hover:text-black hover:bg-white"
              }`}
            >
              CM
            </button>
          </div>
        </div>
      </div>
      {/* ===== Size Table ===== */}
      <div className="mt-8 sm:mt-10 overflow-x-auto">
        <div className="min-w-[520px]">
          <table className="w-full border border-pink-200 rounded-xl overflow-hidden text-black">
            <thead className="bg-pink-100 text-xs sm:text-sm">
              <tr>
                <th className="p-3 text-left sticky left-0 bg-pink-100 z-10">
                  Size
                </th>
                <th className="p-3">XS</th>
                <th className="p-3">S</th>
                <th className="p-3">M</th>
                <th className="p-3">L</th>
                <th className="p-3">XL</th>
                <th className="p-3">XXL</th>
              </tr>
            </thead>

            <tbody className="text-center text-xs sm:text-sm">
              <tr className="border-t">
                <td className="p-3 text-left font-medium sticky left-0 bg-white">
                  Shoulder
                </td>
                <td>{unit === "inch" ? "13.5" : "34.3"}</td>
                <td>{unit === "inch" ? "14" : "35.6"}</td>
                <td>{unit === "inch" ? "14.5" : "36.8"}</td>
                <td>{unit === "inch" ? "15" : "38.1"}</td>
                <td>{unit === "inch" ? "15.5" : "39.4"}</td>
                <td>{unit === "inch" ? "16" : "40.6"}</td>
              </tr>

              <tr className="border-t">
                <td className="p-3 text-left font-medium sticky left-0 bg-white">
                  Bust
                </td>
                <td>{unit === "inch" ? "34" : "86.4"}</td>
                <td>{unit === "inch" ? "36" : "91.4"}</td>
                <td>{unit === "inch" ? "38" : "96.5"}</td>
                <td>{unit === "inch" ? "40" : "101.6"}</td>
                <td>{unit === "inch" ? "42" : "106.7"}</td>
                <td>{unit === "inch" ? "44" : "111.8"}</td>
              </tr>

              <tr className="border-t">
                <td className="p-3 text-left font-medium sticky left-0 bg-white">
                  Hips
                </td>
                <td>{unit === "inch" ? "36" : "91.4"}</td>
                <td>{unit === "inch" ? "38" : "96.5"}</td>
                <td>{unit === "inch" ? "40" : "101.6"}</td>
                <td>{unit === "inch" ? "42" : "106.7"}</td>
                <td>{unit === "inch" ? "44" : "111.8"}</td>
                <td>{unit === "inch" ? "46" : "116.8"}</td>
              </tr>

              <tr className="border-t">
                <td className="p-3 text-left font-medium sticky left-0 bg-white">
                  Waist
                </td>
                <td>{unit === "inch" ? "30" : "76.2"}</td>
                <td>{unit === "inch" ? "32" : "81.3"}</td>
                <td>{unit === "inch" ? "34" : "86.4"}</td>
                <td>{unit === "inch" ? "36" : "91.4"}</td>
                <td>{unit === "inch" ? "38" : "96.5"}</td>
                <td>{unit === "inch" ? "40" : "101.6"}</td>
              </tr>

              <tr className="border-t">
                <td className="p-3 text-left font-medium sticky left-0 bg-white">
                  Length
                </td>
                <td>{unit === "inch" ? "28" : "71.1"}</td>
                <td>{unit === "inch" ? "28" : "71.1"}</td>
                <td>{unit === "inch" ? "28" : "71.1"}</td>
                <td>{unit === "inch" ? "28" : "71.1"}</td>
                <td>{unit === "inch" ? "28" : "71.1"}</td>
                <td>{unit === "inch" ? "28" : "71.1"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
