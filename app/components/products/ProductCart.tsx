"use client";

import { formatPrice } from "@/utils/formatPrice";
import { truncateName } from "@/utils/truncateName";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCartProps {
  data: any;
}

const ProductCart: React.FC<ProductCartProps> = ({ data }) => {
  const router = useRouter();
  const productRating =
    data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    data.reviews.length;

  return (
    <div
      className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm"
      onClick={() => router.push(`/product/${data.id}`)}
    >
      <div className="flex flex-col items-center w-full gap-1">
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            fill
            src={data.images[0].image}
            alt={data.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mt-8">{truncateName(data.name)}</div>
        <div className="">
          <Rating value={productRating} readOnly />
        </div>
        <div className="">{data.reviews.length} review</div>
        <div className="font-semibold">{formatPrice(data.price)}</div>
      </div>
    </div>
  );
};

export default ProductCart;
