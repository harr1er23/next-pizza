import { cn } from '@/shared/lib/utils';
import React from 'react';
import { PizzaImage } from './pizza-image';
import { Button } from '../ui';
import { GroupVariants } from './group-variants';
import { mapPizzaType, PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { Ingredient, ProductVariation } from '@prisma/client';
import { IngredientItem } from './ingredient-item';
import { useSet } from 'react-use';
import { DialogTitle } from '../ui/dialog';
import { calcTotalPizzaPrice } from '@/shared/lib';

interface Props {
    imageUrl: string;
    name: string;
    className?: string;
    ingredients: Ingredient[];
    variations: ProductVariation[];
    onClickAddCart?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<React.PropsWithChildren<Props>> = (
    { 
        name, 
        variations, 
        imageUrl, 
        ingredients, 
        onClickAddCart, 
        className 
    }) => {
        const [size, setSize] = React.useState<PizzaSize>(20);
        const [type, setType] = React.useState<PizzaType>(1);

        const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

        const textDetails = `${size} см, ${mapPizzaType[type].toLowerCase()} тесто`;

        const totalPrice = calcTotalPizzaPrice(
            type,
            size,
            variations,
            ingredients,
            selectedIngredients,
        );

        const filteredPizzasByType = variations.filter((variant) => variant.pizzaType === type);
        const availablePizzaSizes = pizzaSizes.map(item => ({
            name: item.name,
            value: item.value,
            disabled: !filteredPizzasByType.some(pizza => Number(pizza.size) === Number(item.value))
        }))

        React.useEffect(() => {
            const isAvailableSize = availablePizzaSizes?.find(item => Number(item.value) === size && !item.disabled);
            const availableSize = availablePizzaSizes?.find(item => !item.disabled)

            if(availableSize && !isAvailableSize) {
                setSize(Number(availableSize.value) as PizzaSize);
            }
        }, [type])

        const handleClickAdd = () => {
            onClickAddCart?.();
            console.log({
                size,
                type,
                ingredients: selectedIngredients
            })
        }

        return <div className={cn("flex flex-1", className)}>
            <PizzaImage imageUrl={imageUrl} size={size} altName={name} />

            <div className='w-[490px] bg-[#f7f6f5] p-7'>
                <DialogTitle className='font-extrabold mb-1'>{name}</DialogTitle>

                <p className='text-gray-400'>{textDetails}</p>

                <div className='flex flex-col gap-2 mt-5'>
                    <GroupVariants 
                        items={availablePizzaSizes}
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
                    onClick={handleClickAdd}
                    className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'>
                        Добавить в корзину за {totalPrice} ₽
                    </Button>
            </div>
        </div>
};
