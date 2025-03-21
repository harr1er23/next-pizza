'use client';


import { cn } from '@/shared/lib/utils';
import Image from '@/node_modules/next/image';
import React from 'react';
import { Container } from './container';
import { SearchInput } from './search-input';
import Link from 'next/link';
import { CartButton } from './cart-button';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProfileButton } from './profile-button';
import { AuthModal } from './modals';

interface Props {
    isCheckout?: boolean;
    className?: string;
}

export const Header: React.FC<Props> = ({ className, isCheckout }) => {
    const [openAuthModal, setOpenAuthModal] = React.useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();

    React.useEffect(() => {
        if(searchParams.has('paid')) {
            toast.success('Заказ успешно оплачен! Информация отправлена на почту.');
            const newParams = new URLSearchParams(searchParams.toString());
            newParams.delete("paid");
            router.replace(`?${newParams.toString()}`, { scroll: false });
        }

        if(searchParams.has('verified')) {
            toast.success('Почта успешно подтверждена!');
            const newParams = new URLSearchParams(searchParams.toString());
            newParams.delete("verified");
            router.replace(`?${newParams.toString()}`, { scroll: false });
        }
    }, [searchParams])

    return (
        <header
            className={cn('border-b', className)}>
            <Container
                className='flex items-center justify-between py-8'>

                <Link href="/" className='flex items-center gap-2'>
                    <Image src="/logo.png" alt="Logo" width={35} height={35} />
                    <div>
                        <h1 className='text-2xl uppercase font-black'>Next Pizza</h1>
                        <p className='text-sm text-gray-400 leading-3'>вкусней уже некуда</p>
                    </div>
                </Link>

                { !isCheckout && <div className='mx-10 flex-1'>
                        <SearchInput />
                    </div>
                }

                <div className='flex items-center gap-3'>
                    <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)}/>

                    <ProfileButton onClickSignIn={() => setOpenAuthModal(true)}/>

                    { !isCheckout && <CartButton /> }
                </div>

            </Container>
        </header>
    );
};