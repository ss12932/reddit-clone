import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
};
