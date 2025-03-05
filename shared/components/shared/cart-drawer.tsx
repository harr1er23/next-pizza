'use client';

import React from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/shared/components/ui/sheet";
import { Button } from "../ui";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib";

interface Props {
    className?: string;
    children: any;
}


export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
    className,
    children
}) => {
    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
                <SheetHeader>
                    <SheetTitle>
                        Корзина
                    </SheetTitle>
                </SheetHeader>

                <div className="-mx-3 mt-5 overflow-auto flex-1 scrollbar">
                    <div className="mb-2">
                        <CartDrawerItem 
                            id={1}
                            imageUrl={"https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp"}
                            details={getCartItemDetails(2, 30, [{name: 'Томаты', name: 'Сыр'}])}
                            name={'Сырная'}
                            price={500}
                            quantity={2}
                        />
                    </div>
                </div>

                <SheetFooter className="-mx-6 bg-white p-8">
                    <div className="w-full">
                        <div className="flex mb-4">
                            <span className="flex flex-1 text-lg text-neutral-500">
                                Итого
                                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></div>
                            </span>
                            
                            <span className="font-bold text-lg">{0} ₽</span>
                        </div>

                        <Link href="/cart">
                            <Button
                                type="submit"
                                className="w-full h-12 text-base"
                                >
                                Оформить заказ
                                <ArrowRight className="w-5 ml-2"/>
                            </Button>
                        </Link>
                    </div>
                </SheetFooter> 
            </SheetContent>
        </Sheet>
    )
}