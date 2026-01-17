import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            id: "kakao-backend",
            name: "Kakao Backend",
            credentials: {
                accessToken: { label: "Access Token", type: "text" },
                refreshToken: { label: "Refresh Token", type: "text" },
                userId: { label: "User ID", type: "text" },
                nickname: { label: "Nickname", type: "text" },
                profileImage: { label: "Profile Image", type: "text" },
            },
            async authorize(credentials) {
                if (!credentials?.accessToken) return null;
                return {
                    id: credentials.userId as string,
                    accessToken: credentials.accessToken as string,
                    refreshToken: credentials.refreshToken as string,
                    nickname: credentials.nickname as string,
                    profileImage: credentials.profileImage as string,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.userId = user.id;
                token.nickname = user.nickname;
                token.profileImage = user.profileImage;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string;
            session.refreshToken = token.refreshToken as string;
            session.user = {
                ...session.user,
                id: token.userId as string,
                nickname: token.nickname as string,
                profileImage: token.profileImage as string,
            };
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24,
    },
});
