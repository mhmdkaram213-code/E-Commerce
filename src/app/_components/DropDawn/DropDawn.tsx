import Image from 'next/image'
import userImage from '../../../assets/user.png'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'

export function DropdownMenuBasic({ logOut }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Image src={userImage} alt='user' width={30} height={30} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href={'/profile'}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuLabel>
                        <span className='cursor-pointer text-red-500' onClick={logOut}>Logout</span>
                    </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
