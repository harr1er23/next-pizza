import { notFound } from "next/navigation";

import { prisma } from "@/prisma/prisma-client";

import { Container, Product} from "@/shared/components/shared";

interface ProductPageProps {
    params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const id = params.id;
     
    const product = await prisma.product.findFirst({ where: { id: Number(id) }, include: {
        ingredients: true,
        category: {
            include: {
                products: {
                    include: {
                        variations: true,
                    }
                }
            }
        },
        variations: true
    } });

    if (!product) {
        return notFound();
    }

    return <Container className="flex flex-col my-10">
       <Product product={product}/>
    </Container>
}