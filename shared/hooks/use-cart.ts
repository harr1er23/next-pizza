import React from "react";
import { useShallow } from "zustand/react/shallow";
import { useCartStore } from "../store";
import { CreateCartItemValues } from "../services/dto/cart.dto";
import { CartStateItem } from "../lib/get-cart-details";

type ReturnProps = {
    totalAmount: number;
    loading: boolean;
    items: CartStateItem[];
    addCartItem: (values: CreateCartItemValues) => void;
    removeCartItem: (id: number) => void;
    updateItemQuantity: (id: number, quantity: number) => void;
}

export const useCart = (): ReturnProps => {
    const cartState= useCartStore(useShallow(state => state));

    React.useEffect(() => {
        cartState.fetchCartItems();
    }, []);

    return cartState;
}