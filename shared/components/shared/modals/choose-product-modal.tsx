'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/shared/lib/utils';

import { DialogContent, Dialog } from '@/shared/components/ui/dialog';
import { ProductWithRelations } from '@/@types/prisma';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { Product } from '../product';
interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter();

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden', className)}>
                <DialogDescription className='hidden'></DialogDescription>
                <DialogTitle className='hidden'></DialogTitle>
                <Product product={product} closeModal={() => router.back()}/>
            </DialogContent>
        </Dialog>
    );
};