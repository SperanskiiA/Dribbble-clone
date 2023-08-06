'use client'

import { useRouter } from 'next/navigation'
import Button from './Button'

type PaginationProps = {
    hasPreviousPage: boolean
    hasNextPage: boolean
    startCursor: string
    endCursor: string
}

const Pagination = ({
    startCursor,
    endCursor,
    hasNextPage,
    hasPreviousPage,
}: PaginationProps) => {
    const router = useRouter()
    const handleNavigation = (direction: string) => {
        const currentParams = new URLSearchParams(window.location.search)

        if (direction === 'last' && hasNextPage) {
            currentParams.delete('startcursor')
            currentParams.set('endcursor', endCursor)
        } else if (direction === 'first' && hasPreviousPage) {
            currentParams.delete('endcursor')
            currentParams.set('startcursor', startCursor)
        }

        const newSearchParams = currentParams.toString()

        const newPathname = `${window.location.pathname}?${newSearchParams}`

        router.push(newPathname)
    }

    return (
        <div className="w-full flexCenter gap-5 mt-10">
            {hasPreviousPage && (
                <Button
                    title="first page"
                    handleClick={() => handleNavigation('first')}
                />
            )}

            {hasNextPage && (
                <Button
                    title="last page"
                    handleClick={() => handleNavigation('last')}
                />
            )}
        </div>
    )
}

export default Pagination
