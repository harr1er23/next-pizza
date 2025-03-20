import { prisma } from '@/prisma/prisma-client';
import { Container, ProfileForm, UserOrders } from '@/shared/components'
import { getUserSession } from '@/shared/lib/get-user-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function ProfilePage () {
    const cookieStore = await cookies();
    const cartToken = cookieStore.get('cartToken')?.value; 

    const orders = await prisma.order.findMany({
        where: {
            token: cartToken
        },
        select: {
            items: true,
            id: true,
            status: true,
            totalAmount: true
        }
    })

    const session = await getUserSession();
    
    if(!session) {
        return redirect('/not-auth');
    }

    const user = await prisma.user.findFirst({ where: { id: Number(session?.id)} });

    if(!user) {
        return redirect('/not-auth');
    }

    return (
        <Container>
            <ProfileForm data={user}/>

            <UserOrders orders={orders}/>
        </Container>
  )
}