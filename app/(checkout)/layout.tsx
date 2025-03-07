import { Container, Header } from "@/shared/components/shared";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Next Pizza | Оформление заказа",
    description: ""
};

export default function CheckoutLayout({ children }: {children: React.ReactNode}) {
    return (
        <main className="min-h-screen bg-[#f4f1ee]">
            <Container>
                <Header isCheckout={true} className="border-b-gray-200"/>
                {children}
            </Container>
        </main>
    )
}

