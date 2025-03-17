'use client';

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCart } from "@/shared/hooks";

import { CheckoutAddressForm, CheckoutCart, CheckoutPersonalIinfo, CheckoutSidebar, Container, Title } from "@/shared/components";

import { checkoutFormSchema, CheckoutFormValues } from "@/shared/constants/checkout-form-schema";
import { cn } from "@/shared/lib/utils";

export default function CheckoutPage() {
    const { totalAmount, loading } = useCart();

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            comment: ''
        }
    })

    const onSubmit = (data: CheckoutFormValues) => {
        console.log(data);
    }

    return (
        <Container className="mt-10">
            <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]"/>

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10">
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <CheckoutCart />

                            <CheckoutPersonalIinfo className={loading ? 'opacity-30 pointer-events-none' : ''}/>

                            <CheckoutAddressForm className={loading ? 'opacity-30 pointer-events-none' : ''}/>
                        </div>
                        <div className="w-[450px]">
                            <CheckoutSidebar totalAmount={totalAmount} loading={loading}/>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    )
}