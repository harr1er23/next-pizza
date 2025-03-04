import { cn } from '@/shared/lib/utils';
import React from 'react';
import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { Button } from '../ui';

interface Props {
    imageUrl: string;
    name: string;
    className?: string;
    ingredients?: any[];
    variants?: any[];
    onClickAdd?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<React.PropsWithChildren<Props>> = (
    { 
        name, 
        variants, 
        imageUrl, 
        ingredients, 
        onClickAdd, 
        className 
    }) => {
        const textDetails = '30 см, традиционное тесто 30, 590 г';
        const totalPrice = 350;
        const size = 30;

        return <div className={cn("flex flex-1", className)}>
            <PizzaImage imageUrl={imageUrl} size={size} altName={name} />

            <div className='w-[490px] bg-[#f7f6f5] p-7'>
                <Title text={name} size="md" className='font-extrabold mb-1'/>

                <p className='text-gray-400'>{textDetails}</p>

                <Button
                    className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'>
                        Добавить в корзину за {totalPrice} ₽
                    </Button>
            </div>
        </div>
};
