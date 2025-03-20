import React from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { formRegisterSchema, TFormRegisterValues } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '../../../form';
import { Button } from '@/shared/components/ui';
import toast from 'react-hot-toast';
import { registerUser } from '@/app/actions';
import { useRouter } from 'next/navigation';

interface Props {
    onClose?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
    const router = useRouter();

    const form = useForm<TFormRegisterValues>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit = async (data: TFormRegisterValues) => {
        try {
            const code = await registerUser({
              email: data.email,
              fullName: data.fullName,
              password: data.password
            })
            
            toast.success('Регистрация успешна! На вашу почту отправлено письмо с кодом подтверждения.');
            
            onClose?.();

            router.push(`/confirm-code?code=${code}`);
        } catch(err) {
            console.error('Error [REGISTER]', err);
            toast.error('Не удалось зарегистрировать аккаунт');
        }
    } 
    
    return <FormProvider {...form}>
        <form className='flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput name="email" label="Почта" type='email' placeholder='example@gmail.com' required />
            <FormInput name="fullName" label="Полное имя" type='text' required />

            <FormInput name="password" label="Пароль" type='password' required />
            <FormInput name="confirmPassword" label="Повторите пароль" type='password' required />

            <Button
                loading={form.formState.isSubmitting} 
                className='h-12 text-base'
            >
                Зарегистрировать
            </Button>
        </form>
    </FormProvider>
}