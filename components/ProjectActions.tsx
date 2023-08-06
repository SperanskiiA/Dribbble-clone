'use client'
import { deleteUserProject, fetchToken } from '@/lib/actions'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const ProjectActions = ({ projectId }: { projectId: string }) => {
    const [isDeleting, setDeleting] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        setDeleting(true)

        const { token } = await fetchToken()

        try {
            await deleteUserProject(projectId, token)
            router.push('/')
        } catch (error) {
            console.log(`error from project actions: ${error}`)
        } finally {
            setDeleting(false)
        }
    }

    return (
        <>
            <Link
                href={`/edit-project/${projectId}`}
                className="flexCenter edit-action_btn"
            >
                <Image
                    src="/pencile.svg"
                    width={15}
                    height={15}
                    alt="edit-post"
                />
            </Link>
            <button
                type="button"
                className={`flexCenter delete-action_btn ${
                    isDeleting ? 'bg-gray' : 'bg-primary-purple'
                }`}
                onClick={handleDelete}
            >
                <Image
                    src="/trash.svg"
                    width={15}
                    height={15}
                    alt="delete-post"
                />
            </button>
        </>
    )
}

export default ProjectActions
