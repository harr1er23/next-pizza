import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/shared/lib";

export async function GET(req: NextRequest) {
    try{
        const token = req.cookies.get('cartToken')?.value;

        if(!token){
            return NextResponse.json({ totalAmount: 0, items: []});
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                OR: [
                    {
                        token
                    }
                ]
            },
            include: {
                items: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    include: {
                        productVariations: {
                            include: {
                                product: true,
                            }
                        },
                        ingredients: true,
                    },
                },
            },
        });

        return NextResponse.json(userCart);
    }catch(err) {
        console.log(err);
    }
}

export async function POST(req: NextRequest) {
    try {
        let token = req.cookies.get('cartToken')?.value;

        if(!token) {
            token = crypto.randomUUID();
        }

        const userCart = await findOrCreateCart(token);

        const data = (await req.json()) as CreateCartItemValues;

        const foundCartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: userCart.id,
                productVariationId: data.productVariantId,
                ingredients: { 
                    every: { 
                        id: { in: data.ingredients } 
                    }
                }
            }
        })

        if(foundCartItem) {
            await prisma.cartItem.update({
                where: {
                    id: foundCartItem.id
                },
                data: {
                    quantity: foundCartItem.quantity + 1
                }
            })
        }else {
            await prisma.cartItem.create({
                data: {
                    cartId: userCart.id,
                    productVariationId: data.productVariantId,
                    quantity: 1,
                    ingredients: { connect: data.ingredients?.map(id => ({id}))}
                }
            })
        }

        const updatedUserCart = await updateCartTotalAmount(token);

        const resp = NextResponse.json(updatedUserCart);

        resp.cookies.set('cartToken', token);

        return resp;
    } catch(err) {
        console.error('[CART_POST] Server error', err);
        return NextResponse.json({ message: 'Не удалось создать корзину'}, { status: 500 })
    }
}