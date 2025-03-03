'use client'

import React from 'react';
import { Product } from '@prisma/client';

import { cn } from '@/lib/utils';

import { DialogContent, Dialog, DialogTitle } from '@/components/ui/dialog';
interface Props {
    product: Product;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    console.log("Client received product:", product);

    return (
        <Dialog open={true}>
            <DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden', className)}>
                <DialogTitle>{product.name}</DialogTitle>
            </DialogContent>
        </Dialog>
    );
};