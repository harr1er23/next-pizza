'use server';

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/constants/checkout-form-schema";
import { createPayment, sendMail } from "@/shared/lib";
import { getUserSession } from "@/shared/lib/get-user-session";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormValues) {
    try {
        const cookieStore = await cookies();
        const cartToken = cookieStore.get('cartToken')?.value; 
    
        if(!cartToken) {
            throw new Error('Cart token not found');
        }

        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productVariations: {
                            include: {
                                product: true
                            },
                        },
                    },
                },
            },
            where: {
                token: cartToken,
            }
        });

        if(!userCart) {
            throw new Error('Cart not found!')
        }

        if(userCart?.totalAmount === 0) {
            throw new Error('Cart is empty!')
        }

        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullName: data.firstName + ' ' + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items)

            }
        })

        await prisma.cart.update({
            where: {
                id: userCart.id,
            },
            data: {
                totalAmount: 0,
            }
        });

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id,
            }
        })

        //TODO: Сделать создание ссылки оплаты
        const paymentData = await createPayment({
            amount: order.totalAmount,
            orderId: order.id,
            description: 'Оплата заказа №' + order.id
        });

        if(!paymentData) {
            throw new Error('Payment data not found!');
        }

        await prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                paymentId: paymentData.id
            }
        })

        const paymentUrl = paymentData.confirmation.confirmation_url;

        //TODO: Фикс отпрвки письма
        // sendEmail(
        //     data.email, 
        //     'Next Pizza / Оплатите заказ №' + order.id, 
        //     PayOrderTemaplate({
        //         fullName: data.firstName + ' ' + data.lastName,
        //         orderId: order.id,
        //         totalAmount: order.totalAmount,
        //         paymentUrl
        //     }));

        return paymentUrl;
    } catch (err) {
        throw err;
    }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {
        const currentUser = await getUserSession();

        if(!currentUser) {
            throw new Error('Пользователь не найден');
        }

        const foundUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id)
            }
        })

        await prisma.user.update({
            where: {
                id: Number(currentUser.id)
            },
            data: {
                fullName: body.fullName,
                email: body.email,
                password: body.password ? hashSync(body.password as string, 10) : foundUser?.password
            }
        })

    } catch (err) {
        console.error('Error [UPDATE_USER]', err);
        throw err;
    }
}

export async function registerUser(body: Prisma.UserCreateInput) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            },
        });

        if(user) {
            if(!user.verified) {
                throw new Error('Почта не подтверждена!');
            }

            throw new Error('Пользователь уже сущесвтует!');
        };

        const createUser = await prisma.user.create({
            data: {
                fullName: body.fullName,
                email: body.email,
                password: hashSync(body.password, 10),
            },
        });

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.verificationCode.create({
            data: {
                code,
                userId: createUser.id,
            }
        });

        //TODO: отправака письма, пофиксить баг с письмами
        // await sendMail({
        //     sendTo: body.email,
        //     subject: 'Код подтверждения для завершения регистрации',
        //     text: 'test'
        // });

        return code;
    } catch(err) {
        console.log('Error [CREATE_USER]', err);
        throw err;
    }
}