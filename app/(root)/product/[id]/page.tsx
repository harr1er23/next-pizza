import { notFound } from "next/navigation";

import { prisma } from "@/prisma/prisma-client";

import { Container, GroupVariants, PizzaImage, Title } from "@/shared/components/shared";

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
    const product = await prisma.product.findFirst({ where: { id: Number(id) } });

    if (!product) {
        return notFound();
    }

    return <Container className="flex flex-col my-10">
        <div className="flex flex-1">
            <PizzaImage imageUrl={product.imageUrl} altName={product.name} size={40} />

            <div className="w-[490px] bg-[#FCFCFC] p-6">
                <Title text={product.name} size="md" className="font-extrabold mb-1" />

                <p className="text-gray-400">asdasdadas</p>

                <GroupVariants
                    selectedValue="2"
                    items={[
                        {
                            name: "Маленькая",
                            value: '1'
                        },
                        {
                            name: "Средня",
                            value: '2'
                        },
                        {
                            name: "Большая",
                            value: '3'
                        }
                    ]}
                />
            </div>
        </div>
    </Container>
}