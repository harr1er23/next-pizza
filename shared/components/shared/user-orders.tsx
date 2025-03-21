import { cn } from '@/shared/lib/utils';
import React from 'react'
import { Title } from './title';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { Check, CircleDashed } from 'lucide-react';
import { Button } from '../ui';

interface Props {
    className?: string;
    orders: any;
}

export const UserOrders: React.FC<Props> = ({ className, orders}) => {
  return (
    <div className={cn('flex flex-col gap-2 mt-10', className)}>
        <Title text='Ваши заказы' className='font-extrabold' size='lg'/>
       {orders.map((order: any) => (
         <div key={order.id} className='flex flex-col gap-2'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-3'>
                  <Title text={`Заказ № ${order.id}`} className='font-bold'/>

                  {order.status === 'PENDING' ? <CircleDashed className='text-primary'/> : order.status === 'SUCCEEDED' && <Check className='text-green-500'/>}
              </div>

              <div className='flex flex-col gap-3'>
                <span className='text-lg font-bold'>Сумма: {order.totalAmount} ₽</span>
                {order.status === 'PENDING' && <Button className='ml-auto' variant='default'>Оплатить заказ</Button>}
              </div>
            </div>

            {JSON.parse(order.items).map((item: any) => (
                <CartDrawerItem
                    key={item.productVariations.id} 
                    id={item.productVariations.id} 
                    details={item.productVariations.size && item.productVariations.pizzaType ? 
                            getCartItemDetails(
                                item.ingredients, 
                                item.productVariations.pizzaType as PizzaType, 
                                item.productVariations.size as PizzaSize) : ''}
                    name={item.productVariations.product.name} 
                    price={item.productVariations.price} 
                    imageUrl={item.productVariations.product.imageUrl} 
                    quantity={item.productVariations.quantity} />
            ))}
         </div>
       ))
       }
    </div>
  )
}