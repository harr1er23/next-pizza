import { Container, Header } from "@/shared/components/shared";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Next Pizza | Оформление заказа",
    description: ""
};

export default function CheckoutLayout({ children }: {children: React.ReactNode}) {
    return (
        <>
            <Suspense>
                <Header isCheckout={true} className="border-b-gray-200"/>
            </Suspense>
            <main className="min-h-screen bg-[#f4f1ee]">
                <Container>
                    {children}
                </Container>
            </main>
        </>
    )
}

