import NextAuth, { type NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/server/db";
import * as bcryptjs from "bcryptjs";
import { type User } from "@prisma/client";

type UserWithoutPassword = Omit<User, "password">;

const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  try {
    const match = await bcryptjs.compare(plainPassword, hashedPassword);
    return match;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Password comparison error:", error.message);
    } else {
      console.error("An unknown error occurred during password comparison.");
    }
    return false;
  }
};

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Partial<Record<"email" | "password", unknown>>,
      ): Promise<UserWithoutPassword | null> {
        try {
          if (
            !credentials?.email ||
            !credentials?.password ||
            typeof credentials.email !== "string" ||
            typeof credentials.password !== "string"
          ) {
            return null;
          }

          const user = await db.user.findUnique({
            where: {
              email: credentials.email,
            },
            select: {
              id: true,
              email: true,
              password: true,
              name: true,
              image: true,
              createdAt: true,
              updatedAt: true,
            },
          });

          if (!user || typeof user.password !== "string") {
            return null;
          }

          const isPasswordValid = await verifyPassword(
            credentials.password,
            user.password,
          );

          if (!isPasswordValid) {
            return null;
          }

          const { password: _, ...userWithoutPassword } = user;
          return userWithoutPassword as UserWithoutPassword;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub ?? "";
        session.user.email = token.email ?? "";
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
