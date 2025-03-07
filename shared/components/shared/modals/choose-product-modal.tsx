'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/shared/lib/utils';

import { DialogContent, Dialog } from '@/shared/components/ui/dialog';
import { ChooseProductForm } from '../choose-product-form';
import { ProductWithRelations } from '@/@types/prisma';
import { ChoosePizzaForm } from '../choose-pizza-form';
import { useCartStore } from '@/shared/store';
import { useShallow } from 'zustand/react/shallow'
import toast from 'react-hot-toast';
import { DialogDescription } from '@radix-ui/react-dialog';
interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter();
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
            router.back();
        } catch (err) {
            console.error(err);
            toast.error('Не удалось добавить продукт в корзину!')
        }
    }

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden', className)}>
                <DialogDescription className='hidden'></DialogDescription>
                { isPizzaForm ? 
                    (
                        <ChoosePizzaForm
                            loading={loading}
                            onSubmit={onSubmit}
                            imageUrl={product.imageUrl} 
                            name={product.name} 
                            ingredients={product.ingredients}
                            variations={product.variations}/>
                        )
                        : (
                            <ChooseProductForm
                                loading={loading}
                                onSubmit={onSubmit}
                                imageUrl={product.imageUrl}
                                price={firstItem.price} 
                                name={product.name} />
                    )
                }
            </DialogContent>
        </Dialog>
    );
};