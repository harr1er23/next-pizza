'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { formRegisterSchema, TFormRegisterValues } from './modals/auth-modal/forms/schema';
import { FormProvider, useForm } from 'react-hook-form';
import { User } from '@prisma/client';
import toast from 'react-hot-toast';
import { Database } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { Container } from './container';
import { Title } from './title';
import { FormInput } from './form';
import { Button } from '../ui';
import { updateUserInfo } from '@/app/actions';

interface Props {
    data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
    const form = useForm({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
          fullName: data.fullName,
          email: data.email,
          password: '',
          confirmPassword: '',
        },
      });

    const onSubmit = async (data: TFormRegisterValues) => {
        try {
            await updateUserInfo({
                fullName: data.fullName,
                email: data.email,
                password: data.password
            });

            toast.success('Данные успешно обнавлены!')
        } catch(err) {
            console.error(err);
            return toast.error('Ошибка при обновлении данных!')
        }
    }

    const onClickSignOut = () => {
        signOut({
            callbackUrl: '/'
        });
    };

  return (
    <Container className='mt-10'>
        <Title text="Личные данные" size="md" className="font-bold" />
    
        <FormProvider {...form}>
            <form className='flex flex-col gap-5 w-96 mt-10' onSubmit={form.handleSubmit(onSubmit)}>
                <FormInput name="email" type="email" label="Почта" required placeholder='example@email.com'/>
                <FormInput name="fullName" type="text" label="Полное имя" required placeholder='Иван Иванов'/>

                <FormInput name="password" label="Новый пароль" type="password" required placeholder='example@email.com'/>
                <FormInput name="confirmPassword" label="Повторите пароль" type="password" required placeholder='example@email.com'/>

                <Button 
                    className='text-base mt-10' 
                    disabled={form.formState.isSubmitting} 
                    type="submit"
                >
                    Сохранить
                </Button>

                <Button
                    onClick={onClickSignOut}
                    variant="secondary"
                    disabled={form.formState.isSubmitting}
                    className='text-base'
                    type="button" 
                >
                    Выйти
                </Button>
            </form>
        </FormProvider>
    </Container>
  )
}