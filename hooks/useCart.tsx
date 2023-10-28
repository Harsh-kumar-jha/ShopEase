import { CartProductType } from "@/app/components/ProductDetails/ProductDetails";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );
  useEffect(() => {
    const cartItems: any = localStorage.getItem("shopEaseProduct");
    const crtProducts: CartProductType[] | null = JSON.parse(cartItems);
    setCartProducts(crtProducts);
  }, []);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prevState) => {
      let updatedCart;
      if (prevState) {
        updatedCart = [...prevState, product];
      } else {
        updatedCart = [product];
      }
      toast.success("Product add to cart...");
      localStorage.setItem("shopEaseProduct", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);
  const value = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
