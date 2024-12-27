import NextAuth, { type User } from "next-auth";
import Credential from "next-auth/providers/credentials";

import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDBAdapter } from "@auth/dynamodb-adapter";

import { LoginSchema } from "@/schemas";
import { getUser, getUserByEmail, updateUser } from "@/data/user";
import bcrypt from "bcryptjs";

export type UserRole = "ADMIN" | "USER";

export type ExtendedUser = {
  role: UserRole;
} & User;

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: ExtendedUser;
  }
}

const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.AUTH_DYNAMODB_ID as string,
    secretAccessKey: process.env.AUTH_DYNAMODB_SECRET as string,
  },
  region: process.env.AUTH_DYNAMODB_REGION,
};

const client = DynamoDBDocument.from(new DynamoDB(config), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/auth-error",
  },
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credential({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
  events: {
    async signIn({ user, account, isNewUser }) {
      if (isNewUser && user.id) {
        await updateUser(user?.id, {
          provider: account?.provider,
        });
      }
    },

    async linkAccount({ user }) {
      const existingUser = await getUser(user.id!);
      if (existingUser && !existingUser.role) {
        await updateUser(existingUser.id, {
          role: "USER",
          emailVerified: new Date().toISOString(),
          created_at: new Date().toISOString(),
        });
      }
    },
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUser(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
  adapter: DynamoDBAdapter(client, {
    tableName: process.env.AUTH_DYNAMODB_TABLE_NAME,
  }),
  session: { strategy: "jwt" },
});
