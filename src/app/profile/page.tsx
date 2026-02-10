'use client'
import Image from 'next/image'
import userImage from '../../assets/user.png'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Profile() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession()
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-200 rounded-2xl shadow-xl py-5 px-16 text-center">
        <Image
          src={userImage}
          alt="User Profile"
          className="w-28 h-28 rounded-full mx-auto border-4 border-blue-500 object-cover"
          width={200}
          height={200}
        />
        {/* Name */}
        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          {typeof session?.user?.name === 'string'
            ? session.user.name.split(' ').slice(0, 2).join(' ')
            : 'User'}
        </h2>

        {/* Email */}
        <p className="text-gray-500 text-sm my-2">
          {session?.user?.email}
        </p>

        {/* Phone */}
        <p className="text-gray-500 text-sm my-2">
          {typeof session?.user?.phone === 'string'
            ? session.user.phone
            : ''}
        </p>

        <Link href={'/changePassword'}>
          <span className="block mt-4 text-blue-500 hover:underline cursor-pointer">
            Change Password
          </span>
        </Link>
      </div>
    </div>
  )
}
