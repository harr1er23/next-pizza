'use client';

import React from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/shared/components/ui/sheet";
import { Button } from "../ui";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import Image from "next/image";
import { Title } from "./title";
import { cn } from "@/shared/lib/utils";
import { useCart } from "@/shared/hooks";


export const CartDrawer: React.FC<React.PropsWithChildren> = ({
    children
}) => {
    const { totalAmount, items, removeCartItem, updateItemQuantity} = useCart();
    const [redirecting, setRedirecting] = React.useState(false);

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        
        updateItemQuantity(id, newQuantity);
    }

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
                <SheetHeader>
                    <SheetTitle>
                        Корзина
                    </SheetTitle>
                </SheetHeader>

                <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>

                {!totalAmount &&  
                        (
                            <div className="flex flex-col items-center justify-center w-72 mx-auto">
                                <Image  src="/assets/empty-box.png" alt="Empty cart" width={120} height={120}/>
                                <Title size="md" text="Коризна пуста" className="text-center font-bold my-2"/>
                                <p className="text-center text-neutral-500 mb-5">Добавьте хотя бы один товар, чтобы оформить заказ</p>
                            
                                <SheetClose asChild>
                                    <Button className="w-56 h-12 text-base" size="lg">
                                        <ArrowLeft className="w-5 mr-2"/>
                                        Вернуться назад
                                    </Button>
                                </SheetClose>
                            </div>
                        )
                }

                    <SheetDescription className="hidden"></SheetDescription>
                    
                    {totalAmount > 0 && 
                        <>
                            <div className="-mx-3 mt-5 overflow-auto flex-1 scrollbar">
                                {items.map(item => (
                                    <div className="mb-2" 
                                    key={item.id}>
                                        <CartDrawerItem
                                            id={item.id}
                                            imageUrl={item.imageUrl}
                                            details={item.pizzaSize && item.pizzaType ? 
                                                getCartItemDetails(
                                                    item.ingredients, 
                                                    item.pizzaType as PizzaType, 
                                                    item.pizzaSize as PizzaSize) : ''}
                                            name={item.name}
                                            disabled={item.disabled}
                                            price={item.price}
                                            quantity={item.quantity}
                                            onClickRemove={() => removeCartItem(item.id)}
                                            onClickCountButton={type => onClickCountButton(item.id, item.quantity, type)}
                                        />
                                    </div>
                                ))}
                            </div>

                            <SheetFooter className="-mx-6 bg-white p-8">
                                <div className="w-full">
                                    <div className="flex mb-4">
                                        <span className="flex flex-1 text-lg text-neutral-500">
                                            Итого
                                            <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></div>
                                        </span>
                                        
                                        <span className="font-bold text-lg">{totalAmount} ₽</span>
                                    </div>

                                    <Link href="/checkout">
                                        <Button
                                            type="submit"
                                            onClick={() => setRedirecting(true)}
                                            loading={redirecting}
                                            className="w-full h-12 text-base"
                                            >
                                            Оформить заказ
                                            <ArrowRight className="w-5 ml-2"/>
                                        </Button>
                                    </Link>
                                </div>
                            </SheetFooter> 
                        </>
                    }
                </div>
            </SheetContent>
        </Sheet>
    )
}