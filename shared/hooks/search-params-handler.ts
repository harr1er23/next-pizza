'use client';

import { useSearchParams } from "next/navigation"
import React from "react";
import toast from "react-hot-toast";

export const SearchParamsHandler = () => {
    const searchParams = useSearchParams();

    React.useEffect(() => {
        if(searchParams.has('paid')) {
            toast.success('Заказ успешно оплачен! Информация отправлена на почту.')
        }
    }, [searchParams])

    return null;
}