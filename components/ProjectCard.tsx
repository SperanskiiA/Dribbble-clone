import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type ProjectCardProps = {
    id: string
    image: string
    title: string
    description?: string
    name: string
    avatarUrl: string
    userId: string
}
const ProjectCard = ({
    id,
    image,
    title,
    description,
    name,
    avatarUrl,
    userId,
}: ProjectCardProps) => {
    return (
        <div className="flexCenter flex-col rounded-2xl drop-shadow-card">
            <Link
                href={`/project/${id}`}
                className="flexCenter relative group w-full h-full"
            >
                <Image
                    src={image}
                    alt={title}
                    width={414}
                    height={314}
                    className="w-full h-full object-contain rounded-2xl"
                />

                <div className="hidden group-hover:flex profile_card-title">
                    <p className="w-full">{title}</p>
                </div>
            </Link>

            <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
                <Link href={`/profile/${userId}`}>
                    <div className="flexCenter gap-2">
                        <Image
                            src={avatarUrl}
                            alt={`${name}'s profile`}
                            width={24}
                            height={24}
                            className="rounded-full"
                        />
                        <p className="font-semibold">{name}</p>
                    </div>
                </Link>

                <div className="flexCenter gap-3">
                    <div className="flexCenter gap-2">
                        <Image
                            src={'/hearth.svg'}
                            width={13}
                            height={12}
                            alt="hearth"
                        />
                        <p className="text-sm">525</p>
                    </div>
                    <div className="flexCenter gap-2">
                        <Image
                            src={'/eye.svg'}
                            width={13}
                            height={12}
                            alt="views"
                        />
                        <p className="text-sm">613</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard
