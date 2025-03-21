'use client';

import React, { Suspense } from "react";
import { Button, Form, FormControl, FormField, FormItem, Title, InputOTP } from "@/shared/components";
import { InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/shared/components/ui/input-otp";
import { verifyCodeSchema, VerifyCodeValues } from "@/shared/constants/verify-code-schema";
import { Api } from "@/shared/services/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function ConfirmCodeForm() {
    const router = useRouter();
    const searchParams = useSearchParams(); // 🔥 Теперь внутри <Suspense>

    const form = useForm<VerifyCodeValues>({
        resolver: zodResolver(verifyCodeSchema),
        defaultValues: { pin: '' }
    });

    async function onSubmit() {
        try {
            const code = searchParams.get("code");
            const resp = await Api.verifyCode.checkVerify(code ?? '');

            if (resp.status === 200) {
                toast.success('Вы успешно подтвердили почту!');
                router.push(`/`);
            }
        } catch (err) {
            console.error(err);
            toast.error('Неверный код!');
        }
    }

    return (
        <Form {...form}>
            <form className="flex flex-col gap-2 items-center" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                        <FormItem>
                            <Title text="Введите код подтверждения:" className="font-bold text-center text-primary" />
                            <FormControl>
                                <InputOTP maxLength={6} {...field}>
                                    {[...Array(6)].map((_, index) => (
                                        <React.Fragment key={index}>
                                            <InputOTPGroup className="mx-auto">
                                                <InputOTPSlot index={index} />
                                            </InputOTPGroup>
                                            {index < 5 && <InputOTPSeparator />}
                                        </React.Fragment>
                                    ))}
                                </InputOTP>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button loading={form.formState.isSubmitting} type="submit" variant="outline">
                    Подтвердить
                </Button>
            </form>
        </Form>
    );
}

export default function ConfirmCode() {
    return (
        <div className="flex items-center justify-center mt-40">
            <Suspense fallback={<div>Загрузка...</div>}>
                <ConfirmCodeForm />
            </Suspense>
        </div>
    );
}