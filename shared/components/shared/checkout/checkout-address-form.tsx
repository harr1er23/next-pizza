import React from 'react'
import { WhiteBlock } from '../white-block'
import { Input, Textarea } from '../../ui'

export const CheckoutAddressForm = () => {
  return (
    <WhiteBlock title="3. Адрес доставки">
        <div className="flex flex-col gap-5">
            <Input name="adres" className="text-base" placeholder="Введите адрес..."/>
            <Textarea
                className="text-base"
                rows={5}
                placeholder="Укажите комментарий к заказу"
            />
        </div>
    </WhiteBlock>
  )
}