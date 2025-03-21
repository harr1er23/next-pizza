'use client'
import { useIntersection } from 'react-use';
import React from "react";

import { cn } from '@/shared/lib/utils';

import { Title } from './title';
import { ProductCard } from './product-card';
import { useCategoryStore } from '@/shared/store/category';
import { ProductWithRelations } from '@/@types/prisma';


interface Props {
    title: string;
    categoryId: number;
    items: ProductWithRelations[];
    className?: string;
    listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = (
    {
        title,
        categoryId,
        items,
        className,
        listClassName
    }) => {
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
    const intersectionRef = React.useRef<HTMLDivElement>(null);
    const intersection = useIntersection(intersectionRef as unknown as React.RefObject<HTMLElement>, {
        threshold: 0.4,
    });

    React.useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId);
        }
    }, [categoryId, title, intersection?.isIntersecting])

    return (
        <div className={className} id={title} ref={intersectionRef}>
            <Title text={title} size="lg" className='font-extrabold mb-5' />

            <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
                {items.map((item, idx) => (
                    <ProductCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        imageUrl={item.imageUrl}
                        price={item.variations[0].price}
                        ingredients={item.ingredients}
                    />
                ))}
            </div>
        </div>
    );
};