import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true,
    providers: [
        Credentials({
            id: "kakao-backend",
            name: "Kakao Backend",
            credentials: {
                accessToken: { label: "Access Token", type: "text" },
            },
            async authorize(credentials) {
                if (!credentials?.accessToken) return null;

                return {
                    id: "kakao-user",
                    accessToken: credentials.accessToken as string,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string;
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24, // 24시간
    },
});
