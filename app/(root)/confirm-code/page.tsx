'use client';

import { Button, Form, FormControl, FormField, FormItem, FormLabel, InfoBlock, InputOTP, Title } from "@/shared/components";
import { InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/shared/components/ui/input-otp";
import { verifyCodeSchema, VerifyCodeValues } from "@/shared/constants/verify-code-schema";
import { Api } from "@/shared/services/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ConfirmCode() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const form = useForm<VerifyCodeValues>({
        resolver: zodResolver(verifyCodeSchema),
        defaultValues: {
            pin: ''
        }
    });
    
    
    async function onSumbit() {
        try {
            const code = searchParams.get("code");
            const resp = await Api.verifyCode.checkVerify(code ?? '');
            
            if(resp.status === 200) {
                toast.success('Вы успешно подтвердили почту!');
                router.push(`/`);
            }
        } catch (err) {
            console.error(err);
            toast.error('Не верный код!')
        }
    }
    return (
        <div className="flex items-center justify-center mt-40">
            <Form {...form}>
                <form className="flex flex-col gap-2 items-center" onSubmit={form.handleSubmit(onSumbit)}>
                    <FormField 
                        control={form.control}
                        name="pin"
                        render={({ field }) => (
                            <FormItem>
                                <Title text="Введите код подтверждения:" className="font-bold text-center text-primary"></Title>
                                <FormControl>
                                    <InputOTP maxLength={6} {...field}>
                                        <InputOTPGroup className="mx-auto">
                                            <InputOTPSlot index={0} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup className="mx-auto">
                                            <InputOTPSlot index={1} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup className="mx-auto">
                                            <InputOTPSlot index={2} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup className="mx-auto">
                                            <InputOTPSlot index={3} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup className="mx-auto">
                                            <InputOTPSlot index={4} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup className="mx-auto">
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button loading={form.formState.isSubmitting} type="submit" variant="outline">Подтвердить</Button>
                </form>
            </Form>
        </div>
    )
}