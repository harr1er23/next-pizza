import { notFound } from "next/navigation";

import { prisma } from "@/prisma/prisma-client";

import { ChooseProductModal } from "@/shared/components/shared";

export type paramsType = Promise<{ id: string }>;

export default async function ProductModalPage(props: { params: paramsType }) {
    const { id } = await props.params;

    const product = await prisma.product.findFirst({
        where: {
            id: Number(id)
        },
        include: {
            ingredients: true,
            variations: true
        }
    });

    if (!product) {
        return notFound();
    }

    return <ChooseProductModal product={product} />
}