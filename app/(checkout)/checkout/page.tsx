'use client';

import { CheckoutDetails, CheckoutItem, Container, Title } from "@/shared/components/shared";
import { WhiteBlock } from "@/shared/components/shared/white-block";
import { Button, Input, Textarea } from "@/shared/components/ui";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useCart } from "@/shared/hooks";
import { getCartItemDetails } from "@/shared/lib";
import { removeCartItem, updateItemQuantity } from "@/shared/services/cart";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";

export default function CheckoutPage() {
    const { totalAmount, items } = useCart();

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        
        updateItemQuantity(id, newQuantity);
    }

    return (
        <Container className="mt-10">
            <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]"/>

            <div className="flex gap-10">
                <div className="flex flex-col gap-10 flex-1 mb-20">
                    <WhiteBlock title="1. Корзина">
                        <div className="flex flex-col gap-5">
                            {items.map(item => (
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
                            ))}
                        </div>
                    </WhiteBlock>

                    <WhiteBlock title="2. Персональные данные">
                        <div className="grid grid-cols-2 gap-5">
                            <Input name="firstName" className="text-base" placeholder="Имя"/>
                            <Input name="lastName" className="text-base" placeholder="Фамилия"/>
                            <Input name="email" className="text-base" placeholder="E-mail"/>
                            <Input name="phone" className="text-base" placeholder=" Телефон"/>
                        </div>
                    </WhiteBlock>

                    <WhiteBlock title="3. Адрес доставки">
                        <div className="flex flex-col gap-5">
                            <Input name="adres" className="text-base" placeholder="Введите адрес..."/>
                            <Textarea
                                className="text-base"
                                rows={5}
                                placeholder="Укажите комментарий к заказу"
                            />
                        </div>
                    </WhiteBlock>
                </div>
                <div className="w-[450px]">
                    <WhiteBlock className="p-6 sticky top-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-xl">Итого:</span>
                            <span className="text-3xl font-extrabold">3506 ₽</span>
                        </div>

                        <CheckoutDetails title={
                            <div className="flex items-center">
                                <Package size={20} className="mr-1 text-gray-300"/>
                                Стоимость товаров:
                            </div>
                        } price={totalAmount} />
                        <CheckoutDetails title={
                            <div className="flex items-center">
                                <Truck size={20} className="mr-1 text-gray-300"/>
                                Доставка:
                            </div>
                        } price={250} />
                        <CheckoutDetails title={
                            <div className="flex items-center">
                                <Percent size={20} className="mr-1 text-gray-300"/>
                                Скидка:
                            </div>
                        } price={250} />

                        <Button type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
                            Перейти к оплате <ArrowRight/>
                        </Button>
                    </WhiteBlock>
                </div>
            </div>
        </Container>
    )
}