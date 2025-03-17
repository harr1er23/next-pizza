import React from 'react';
import { WhiteBlock } from '../white-block'
import { FormInput, FormTextarea } from '../form'
import { cn } from '@/shared/lib/utils';

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Адрес доставки" className={cn(className, '')}>
        <div className="flex flex-col gap-5">
            <FormInput 
              className="text-base" 
              name="address" 
              placeholder="г. Москва, ул. Пушкина, д. 2"
              label="Адрес" 
              required/>

            <FormTextarea name='comment' className="text-base" label='' rows={5} placeholder="Укажите комментарий к заказу"/>
        </div>
    </WhiteBlock>
  )
}