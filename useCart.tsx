import { useContext } from "react";
import CartContext from "../context/CartContext";
import Offre from "../models/Offre";

const useCart = () => {
  const { carts, setCarts } = useContext(CartContext);

  const addToCart = (offre: Offre) => {
    let exist = carts.find((cart) => cart.id === offre.id) ? true : false;
    
    if (!exist) {
      let newCarts = [...carts, offre];
      setCarts(newCarts);
    }
  };

  const deleteToCart = (id: number) => {
    let newCarts = carts.filter((cart) => cart.id !== id);
    setCarts(newCarts);
  };

  return {
    carts,
    addToCart,
    deleteToCart,
  };
};

export default useCart;
