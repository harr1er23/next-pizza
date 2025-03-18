import NextAuth from "next-auth";
import GitHUubProvider from 'next-auth/providers/github'; 

export const authOptions = {
    providers: [
        GitHUubProvider({
         clientId: process.env.GITHUB_ID || '',
         clientSecret: process.env.GITHUB_SECRET || ''
        })
    ]
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };