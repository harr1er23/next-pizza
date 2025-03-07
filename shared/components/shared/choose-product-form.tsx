import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { DialogTitle } from '@radix-ui/react-dialog';
interface Props {
    imageUrl: string;
    loading?: boolean;
    name: string;
    price: number;
    className?: string;
    onSubmit?: VoidFunction;
}

export const ChooseProductForm: React.FC<React.PropsWithChildren<Props>> = (
    { 
        name,
        loading,
        imageUrl,
        price,
        onSubmit, 
        className 
    }) => {

        return <div className={cn("flex flex-1", className)}>
            <div className="flex items-center justify-center flex-1 relative w-full">
                <img 
                    src={imageUrl}
                    alt={name}
                    className='relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]'    
                />
            </div>

            <div className='w-[490px] bg-[#f7f6f5] p-7'>
                <DialogTitle className='font-extrabold text-2xl mb-1'>{name}</DialogTitle>

                <Button
                    loading={loading}
                    onClick={() => onSubmit?.()}
                    className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'>
                        Добавить в корзину за {price} ₽
                    </Button>
            </div>
        </div>
};
