'use client'
import React from 'react'
import {SessionProvider} from 'next-auth/react'
export default function NextAuthProviders({Children} : {Children : React.ReactNode}) {
  return (
    <SessionProvider>
        {Children}
    </SessionProvider>
  )
}
