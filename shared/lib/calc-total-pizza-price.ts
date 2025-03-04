import { Ingredient, ProductVariation } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

/**
 * Функция для подсчета общей стоимости пиццы
 * @param type - тип выбранного теста
 * @param size - размер выбранной пиццы
 * @param variations - список вариаций
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 * 
 * @returns number общая стоимость
 */
export const calcTotalPizzaPrice = (
    type: PizzaType, 
    size: PizzaSize,
    variations: ProductVariation[], 
    ingredients: Ingredient[],
    selectedIngredients: Set<number>
) => {
    const pizzaPrice = variations.find((variant) => variant.pizzaType === type && variant.size === size)?.price || 0;
        const totalIngredientsPrice = ingredients
            .filter((indredient) => selectedIngredients.has(indredient.id))
            .reduce((acc, ingredient) => acc + ingredient.price, 0);
        
            return pizzaPrice + totalIngredientsPrice;
}