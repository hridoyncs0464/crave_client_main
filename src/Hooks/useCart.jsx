
import { use } from "react";
import { CartContext } from "../ContextAPI/CartContext";

const useCart = () => {
  const cartInfo = use(CartContext);
  return cartInfo;
};

export default useCart;   