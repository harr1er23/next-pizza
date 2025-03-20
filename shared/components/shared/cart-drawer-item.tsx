import { cn } from "@/shared/lib/utils";
import React from "react";
import { CartItemDetailsImage } from "./cart-item-details/cart-item-details-image";
import * as CartItem from "./cart-item-details"
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { CountButton } from "./count-button";
import { Trash2Icon } from "lucide-react";

interface Props extends CartItemProps {
    onClickCountButton?: (type: 'plus' | 'minus') => void;
    onClickRemove?: () => void ;
    className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
    id,
    imageUrl,
    name,
    price,
    quantity,
    disabled,
    details,
    className,
    onClickCountButton,
    onClickRemove
}) => {
    return (
        <div className={cn("flex bg-white p-5 gap-6 rounded-xl", { 'opacity-50 pointer-events-none': disabled }, className)}>
            <CartItem.Image src={imageUrl}/>

            <div className="flex-1">
                <CartItem.Info name={name} details={details}/>
            
                <hr className="my-3"/>
            
                <div className="flex items-center justify-between">
                    {onClickCountButton && <CountButton onClick={onClickCountButton} value={quantity}/> }

                    <div className="flex items-center gap-3">
                        <CartItem.Price value={price}/>
                        {onClickRemove && <Trash2Icon onClick={onClickRemove} size={20} className="text-gray-400 cursor-pointer hover:text-gray-600"/>}
                    </div>
                </div>
            </div>
        </div>
    );
};