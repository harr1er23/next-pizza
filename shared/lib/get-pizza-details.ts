import { Ingredient, Product, ProductVariation } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";

export const getPizzaDetails = (
    type: PizzaType,
    size: PizzaSize,
    variations: ProductVariation[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>) => {
    const textDetails = `${size} см, ${mapPizzaType[type].toLowerCase()} тесто`;
    const totalPrice = calcTotalPizzaPrice(
        type,
        size,
        variations,
        ingredients,
        selectedIngredients,
    );

    return {
        textDetails,
        totalPrice
    }
}