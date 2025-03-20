import {z} from 'zod';

export const verifyCodeSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})

export type VerifyCodeValues = z.infer<typeof verifyCodeSchema>;