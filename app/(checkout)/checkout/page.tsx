'use client';

import { CheckoutSidebar, Container, Title } from "@/shared/components/shared";

import { useCart } from "@/shared/hooks";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutAddressForm, CheckoutCart, CheckoutPersonalIinfo } from "@/shared/components/shared/checkout";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/components/shared/checkout/checkout-form-schema";

export default function CheckoutPage() {
    const { totalAmount } = useCart();

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

    return (
        <Container className="mt-10">
            <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]"/>

            <FormProvider {...form}>
                <div className="flex gap-10">
                    <div className="flex flex-col gap-10 flex-1 mb-20">
                        <CheckoutCart />

                        <CheckoutPersonalIinfo />

                        <CheckoutAddressForm />
                    </div>
                    <div className="w-[450px]">
                        <CheckoutSidebar totalAmount={totalAmount}/>
                    </div>
                </div>
            </FormProvider>
        </Container>
    )
}