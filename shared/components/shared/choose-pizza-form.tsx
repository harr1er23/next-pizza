'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';

import { PizzaImage } from './pizza-image';
import { Button } from '../ui';
import { DialogTitle } from '../ui/dialog';
import { GroupVariants } from './group-variants';
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { IngredientItem } from './ingredient-item';

import { Ingredient, ProductVariation } from '@prisma/client';

import { usePizzaOptions } from '@/shared/hooks';
import { getPizzaDetails } from '@/shared/lib';
import { Title } from './title';

interface Props {
    imageUrl: string;
    loading?: boolean;
    name: string;
    className?: string;
    ingredients: Ingredient[];
    variations: ProductVariation[];
    onSubmit: (variantId: number, ingredients: number[]) => void;
}

export const ChoosePizzaForm: React.FC<React.PropsWithChildren<Props>> = (
    { 
        name,
        loading,
        variations, 
        imageUrl, 
        ingredients, 
        onSubmit, 
        className 
    }) => {
        const { selectedIngredients, availableSizes, size, type, currentVariantId, setSize, setType, addIngredient } = usePizzaOptions(variations);
        
        const { textDetails, totalPrice } = getPizzaDetails(type, size, variations, ingredients, selectedIngredients);

        const handleClickAdd = () => {
            if(!currentVariantId) return;
            onSubmit(currentVariantId, Array.from(selectedIngredients));
        }

        return <div className={cn("flex flex-1", className)}>
            <PizzaImage imageUrl={imageUrl} size={size} altName={name} />

            <div className='w-[490px] bg-[#f7f6f5] p-7'>
                <Title text={name} className='font-extrabold text-2xl mb-1'></Title>

                <p className='text-gray-400'>{textDetails}</p>

                <div className='flex flex-col gap-2 mt-5'>
                    <GroupVariants 
                        items={availableSizes}
                        value={String(size)}
                        onClick={value => setSize(Number(value) as PizzaSize)}
                    />

                    <GroupVariants 
                        items={pizzaTypes}
                        value={String(type)}
                        onClick={value => setType(Number(value) as PizzaType)}
                    />
                </div>

                <div className='bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5'>
                    <div className='grid grid-cols-3 gap-3'>
                        {ingredients?.map((ingredient) => (
                            <IngredientItem 
                                key={ingredient.id}
                                name={ingredient.name}
                                price={ingredient.price}
                                imageUrl={ingredient.imageUrl}
                                onClick={() => addIngredient(ingredient.id)}
                                active={selectedIngredients.has(ingredient.id)}
                            />
                        ))

                        }
                    </div>
                </div>

                <Button
                    loading={loading}
                    onClick={handleClickAdd}
                    className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'>
                        Добавить в корзину за {totalPrice} ₽
                    </Button>
            </div>
        </div>
};
