"use client";

import { Rating } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import SetColor from "../products/SetColor";
import SetQuantity from "../products/SetQuantity";
import { Button } from "..";
import ProductImage from "../products/ProductImage";
import { useCart } from "@/hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/router";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const HorizontalComp = () => {
  return <hr className="w-[30%] my-2" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product?.id,
    name: product?.name,
    description: product?.description,
    category: product?.category,
    brand: product?.brand,
    selectedImg: { ...product?.images[0] },
    quantity: 1,
    price: product?.price,
  });
  const router = useRouter();
  useEffect(() => {
    setIsProductInCart(false);
    if (cartProducts) {
      const existingProduct = cartProducts.findIndex(
        (item) => item.id === product.id
      );
      if (existingProduct > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);
  const productRating =
    product?.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product?.reviews.length;

  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) return;
    setCartProduct((prevState) => {
      return { ...prevState, quantity: --prevState.quantity };
    });
  }, [cartProduct]);
  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity === 5) return;
    setCartProduct((prevState) => {
      return { ...prevState, quantity: ++prevState.quantity };
    });
  }, [cartProduct]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h1 className="text-3xl font-medium text-slate-700">{product?.name}</h1>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product?.reviews.length} reviews</div>
        </div>
        <HorizontalComp />
        <div className="text-justify">{product?.details}</div>
        <HorizontalComp />
        <div>
          <span className="font-semibold">CATEGORY : </span>
          {product?.category}
        </div>
        <div>
          <span className="font-semibold">BRAND : </span>
          {product?.brand}
        </div>
        <div className={product?.inStock ? "text-teal-600" : "text-rose-600"}>
          {product?.inStock ? "In Stock" : "Out of Stock"}
        </div>
        <HorizontalComp />
        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-600 flex item-center gap-1">
              <MdCheckCircle className="text-teal-500" size={20} />
              <span>Product Added to cart</span>
            </p>
            <div className="max-w-[300px]">
              <Button
                label="view cart"
                outline
                onClick={() => router.push("/cart")}
              />
            </div>
          </>
        ) : (
          <>
            <SetColor
              images={product?.images}
              cartProduct={cartProduct}
              handleColorSelect={handleColorSelect}
            />
            <HorizontalComp />
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyDecrease={handleQtyDecrease}
              handleQtyIncrease={handleQtyIncrease}
            />
            <HorizontalComp />
            <div className="max-w-[300px]">
              <Button
                label="Add To Cart"
                onClick={() => handleAddProductToCart(cartProduct)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
