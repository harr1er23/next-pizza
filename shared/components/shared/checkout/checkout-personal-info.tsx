import React from 'react'
import { WhiteBlock } from '../white-block'
import { FormInput } from '../form'

export const CheckoutPersonalIinfo = () => {
  return (
    <WhiteBlock title="2. Персональные данные">
        <div className="grid grid-cols-2 gap-5">
            <FormInput name="firstName" placeholder="Имя" label=""/>
            <FormInput name="lastName" placeholder="Фамилия" label=""/>
            <FormInput name="email" placeholder="E-mail" label="" />
            <FormInput name="phone" placeholder="Телефон" label=""/>
        </div>
    </WhiteBlock>
  )
}