import React from 'react'
import { WhiteBlock } from '../white-block';
import { useCart } from '@/shared/hooks';
import { CheckoutItem } from '../checkout-item';
import { getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { CheckoutItemSkeleton } from '../checkout-item-skeleton';

interface Props {
    className?: string;
}

export const CheckoutCart: React.FC<Props> = ({ className }) => {
    const { loading, items, updateItemQuantity, removeCartItem} = useCart();

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        
        updateItemQuantity(id, newQuantity);
    }

  return (
    <WhiteBlock title="1. Корзина">
        <div className="flex flex-col gap-5">
            {!loading && items.length > 0 ? items.map(item => (
                <CheckoutItem 
                    key={item.id} 
                    id={item.id}
                    imageUrl={item.imageUrl}
                    details={ 
                        getCartItemDetails(
                            item.ingredients, 
                            item.pizzaType as PizzaType, 
                            item.pizzaSize as PizzaSize)}
                    name={item.name}
                    disabled={item.disabled}
                    price={item.price}
                    quantity={item.quantity}
                    onClickRemove={() => removeCartItem(item.id)}
                    onClickCountButton={type => onClickCountButton(item.id, item.quantity, type)} 
                />
            )) : Array(3).fill(null).map((_, index) => <CheckoutItemSkeleton key={index} /> )}
        </div>
    </WhiteBlock>
  )
}