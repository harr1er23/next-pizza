'use client';

import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";

interface Props {
    product: ProductWithRelations;
    closeModal?: VoidFunction;
}

export const Product: React.FC<Props> = ({ product, closeModal }) => {
    const firstItem = product.variations[0];
    const isPizzaForm = Boolean(firstItem.pizzaType);

    const [
        addCartItem, 
        loading] = useCartStore(useShallow(state => [state.addCartItem, state.loading]));

    const onSubmit = async (productVariantId?: number, ingredients?: number[]) => {
        try {
            const variantId = productVariantId ?? firstItem.id;

            await addCartItem({
                productVariantId: variantId,
                ingredients
            });

            toast.success('Товар успешно добавлен в корзину!');
            closeModal?.();
        } catch (err) {
            console.error(err);
            toast.error('Не удалось добавить продукт в корзину!')
        }
    }

    if(isPizzaForm) {
        return (
            <ChoosePizzaForm
                loading={loading}
                onSubmit={onSubmit}
                imageUrl={product.imageUrl} 
                name={product.name} 
                ingredients={product.ingredients}
                variations={product.variations}
            />
        );
    }

    return (
        <ChooseProductForm
            loading={loading}
            onSubmit={onSubmit}
            imageUrl={product.imageUrl}
            price={firstItem.price} 
            name={product.name} 
        />
    );
}