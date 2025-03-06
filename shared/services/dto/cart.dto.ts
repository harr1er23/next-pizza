import { Cart, CartItem, Ingredient, Product, ProductVariation } from "@prisma/client";

export type CartItemDTO = CartItem & {
    productVariations: ProductVariation & {
        product: Product;
    };
    ingredients: Ingredient[]

}

export interface CartDTO extends Cart {
    items: CartItemDTO[];
}

export interface CreateCartItemValues {
    productVariantId: number;
    ingredients?: number[];
}