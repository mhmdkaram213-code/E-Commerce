import NextAuth, { DefaultSession } from "next-auth"
import { UserResponse } from "./authInterface"
import { JWT } from "next-auth/jwt"
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface User {
    user : UserResponse ,
    token:string
  }
  interface Session {
    user: UserResponse ,
    accessToken: string
  }
}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface JWT extends User {
    
    /** OpenID ID Token */
  }
}