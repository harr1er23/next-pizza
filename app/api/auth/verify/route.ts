import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        
        const code = req.nextUrl.searchParams.get("code");

        if(!code) {
            return NextResponse.json({ error: 'Неверный код!', code }, { status: 400 })
        }

        const verificationCode = await prisma.verificationCode.findFirst({
            where: {
                code
            }
        });

        if(!verificationCode) {
            return NextResponse.json({ error: 'Код не найден!', code }, { status: 400 })
        }

        await prisma.user.update({
            where: {
                id: verificationCode.userId
            },
            data: {
                verified: new Date(),
            }
        });

        await prisma.verificationCode.delete({
            where: {
                id: verificationCode.id
            }
        });

        return NextResponse.json(true);
    } catch (err) {
        console.error(err);
        console.log('[VERIFY_GET] Server error', err);
    }
}