import { useContext, useEffect, useState } from "react";
import CartContext from "../context/CartContext";
import CartService from "../services/cart.service";
import { ResponseSubscriptionList } from "../types/response-request";
import { toast } from "react-toastify";

const useCart = () => {
  const { carts, setCarts } = useContext(CartContext);
  const isSameItem = (subscription: ResponseSubscriptionList) => {
    return !!carts.find(
      (cart) => cart.simulateur_id === subscription.simulateur_id
    );
  };
  const addToCart = (subscription: ResponseSubscriptionList) => {
    let conditionOne = carts.find((cart) => cart.id === subscription.id)
      ? true
      : false;
    let conditionTwho = false;

    if (isSameItem(subscription)) {
      if (subscription.is_demo) {
        if (carts.filter((cart) => cart.is_demo).length < 1)
          conditionTwho = true;
      } else {
        if (carts.filter((cart) => !cart.is_demo).length < 1)
          conditionTwho = true;
      }
    } else {
      conditionTwho = true;
    }

    if (!conditionOne && conditionTwho) {
      let newCarts = [...carts, subscription];
      setCarts(newCarts);
      // save to localstorage
      CartService.addCart(subscription);
      toast.info("L'element a bien ete ajouter dans le panier");
    } else {
      toast.warning("Cet element existe deja dans le panier");
    }
  };

  const setInitStoreCarts = () => {
    let old_carts = CartService.getCart();
    setCarts([...old_carts]);
  };

  const deleteToCart = (id: number) => {
    let newCarts = carts.filter((cart) => cart.id !== id);
    setCarts(newCarts);
    // delete to localStorage
    CartService.deleteToCart(id);
  };

  const getCarts = () => {
    return CartService.getCart();
  };

  const clearCarts = () => {
    setCarts([]);
    CartService.clearCart();
  };

  useEffect(() => {
    setInitStoreCarts();
  }, [CartService.getCart]);

  return {
    carts,
    addToCart,
    deleteToCart,
    getCarts,
    setInitStoreCarts,
    clearCarts,
  };
};

export default useCart;
