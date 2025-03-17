import React from 'react'
import { WhiteBlock } from '../white-block'
import { FormInput } from '../form'
import { cn } from '@/shared/lib/utils';

interface Props {
  className?: string;
}

export const CheckoutPersonalIinfo: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. Персональные данные" className={cn(className, '')}>
        <div className="grid grid-cols-2 gap-5">
            <FormInput className='text-base' name="firstName" placeholder="Иван" label="Имя" required/>
            <FormInput className='text-base' name="lastName" placeholder="Иванов" label="Фамилия" required/>
            <FormInput className='text-base' name="email" placeholder="example@gmail.com" label="Почта" required/>
            <FormInput className='text-base' name="phone" placeholder="+79291458229" label="Телефон" required/>
        </div>
    </WhiteBlock>
  )
}