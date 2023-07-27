'use client'
import { useState, useEffect } from 'react'
import { getProviders, signIn } from 'next-auth/react'
import Button from './Button'

type Provider = {
    id: string
    name: string
    type: string
    signinUrl: string
    callbackUrl: string
    signinUrlParams?: Record<string, string> | null
}

type Providers = Record<string, Provider>

export const AuthProviders = () => {
    const [providers, setProviders] = useState<Providers | null>(null)

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const res = await getProviders()

                setProviders(res)
            } catch (error) {
                console.log(error)
            }
        }

        fetchProviders()
    }, [])

    if (providers) {
        return (
            <div>
                {Object.values(providers).map((provider, index) => (
                    <Button
                        title={'Sign In'}
                        handleClick={() => signIn(provider?.id)}
                        key={index}
                    />
                ))}
            </div>
        )
    }
}