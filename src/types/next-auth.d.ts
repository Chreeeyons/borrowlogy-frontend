import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: number;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      user_type?: string;
    };
  }

  interface JWT {
    user_type?: string;
  }
}
