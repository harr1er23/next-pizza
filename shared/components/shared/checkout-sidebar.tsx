import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { CheckoutDetails } from "./checkout-details";
import { WhiteBlock } from "./white-block";
import { Button } from "../ui";
import { cn } from "@/shared/lib/utils";

interface Props {
    totalAmount: number;
    className?: string;
}

const DISCOUNT_PERCENT = 7;
const DELIVERY_PRICE = 250;

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, className }) => {
    
    const totalSumOrder = (): number => {
        const totalPercent = Number(((totalAmount / 100) * DISCOUNT_PERCENT).toFixed(2));
        
        return Number((totalAmount + totalPercent + DELIVERY_PRICE).toFixed(2));
    }

    return (
        <WhiteBlock className={cn('p-6 sticky top-4', className)}>
            <div className="flex flex-col gap-1">
                <span className="text-xl">Итого:</span>
                <span className="text-3xl font-extrabold">{totalSumOrder()} ₽</span>
            </div>

            <CheckoutDetails title={
                <div className="flex items-center">
                    <Package size={20} className="mr-1 text-gray-300"/>
                    Стоимость товаров:
                </div>
            } value={totalAmount + ' ₽'} />
            <CheckoutDetails title={
                <div className="flex items-center">
                    <Truck size={20} className="mr-1 text-gray-300"/>
                    Доставка:
                </div>
            } value={DELIVERY_PRICE + ' ₽'} />
            <CheckoutDetails title={
                <div className="flex items-center">
                    <Percent size={20} className="mr-1 text-gray-300"/>
                    Скидка:
                </div>
            } value={DISCOUNT_PERCENT + ' %'} />

            <Button type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
                Перейти к оплате <ArrowRight/>
            </Button>
        </WhiteBlock>
    )
}