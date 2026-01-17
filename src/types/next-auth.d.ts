import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            nickname: string;
            profileImage?: string;
        };
    }

    interface User {
        id: string;
        accessToken: string;
        refreshToken: string;
        nickname: string;
        profileImage?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string;
        refreshToken: string;
        userId: string;
        nickname: string;
        profileImage?: string;
    }
}
