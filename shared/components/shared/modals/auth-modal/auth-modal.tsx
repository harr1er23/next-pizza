import { Button, Dialog } from '@/shared/components/ui';
import { DialogContent, DialogTitle } from '@/shared/components/ui/dialog';
import { signIn } from 'next-auth/react';
import React from 'react'
import { LoginForm } from './forms/login-form';
import { RegisterForm } from './forms/register-form';

interface Props {
    open: boolean;
    onClose: () => void;
    className?: string;
}

export const AuthModal: React.FC<Props> = ({ open, onClose, className }) => {
    const [type, setType] = React.useState<'login' | 'register'>('login');

    const onSwitchType = () => {
        setType(type === 'login' ? 'register' : 'login');
    }

    const handleClose = () => {
        onClose();
    }

    return (
    <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className='w-[450px] bg-white p-10'>
            <DialogTitle className='hidden'>Авторизация</DialogTitle>
            
            {type === "login" ? <LoginForm onClose={handleClose} /> : <RegisterForm />}

            <hr/>

            <div className='flex gap-2'>
                <Button
                    variant='secondary'
                    onClick={() => 
                        signIn('github', {
                            callbackUrl: "/",
                            redirect: true
                        })
                    }
                    type='button'
                    className='gap-2 h-12 p-2 flex-1'
                >
                    <img className='w-6 h-6' src="https://github.githubassets.com/favicons/favicon.svg" />
                    GitHub
                </Button>

                <Button
                    variant='secondary'
                    onClick={() => 
                        signIn('google', {
                            callbackUrl: "/",
                            redirect: true
                        })
                    }
                    type='button'
                    className='gap-2 h-12 p-2 flex-1'
                >
                    <img className='w-6 h-6' src="https://images.icon-icons.com/729/PNG/96/google_icon-icons.com_62736.png" />
                    Google
                </Button>
            </div>
            <Button 
                variant='outline' 
                onClick={onSwitchType} 
                type='button' 
                className='h-12'
            >{type === 'login' ? 'Авторизация' : 'Регистрация'}</Button>
        </DialogContent>
    </Dialog>    
  )
}