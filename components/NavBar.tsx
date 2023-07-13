import { NavLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { AuthProviders } from '.'

export const NavBar = () => {
    const session = null

    return (
        <nav className="flexBetween navbar">
            <div className="flex-1 flexStart gap-10">
                <Link href={'/'}>
                    <Image alt="Home" src="/logo.svg" width={115} height={43} />
                </Link>
                <ul className="xl:flex hidden text-small gap-7">
                    {NavLinks.map((link) => {
                        return (
                            <Link href={link.href} key={link.key}>
                                {link.text}
                            </Link>
                        )
                    })}
                </ul>
            </div>
            <div className="flexCenter gap-4">
                {session ? (
                    <>
                        <Image
                            src={'/'}
                            alt="profile-photo"
                            width={43}
                            height={43}
                        />
                        <Link href={'/create-project'}>Share Work!</Link>
                    </>
                ) : (
                    <AuthProviders />
                )}
            </div>
        </nav>
    )
}
