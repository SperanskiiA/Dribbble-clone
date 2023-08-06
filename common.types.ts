import { User, Session } from 'next-auth'

export type FormState = {
    title: string
    description: string
    image: string
    liveSiteUrl: string
    githubUrl: string
    category: string
}

export interface ProjectInterface {
    title: string
    description: string
    image: string
    liveSiteUrl: string
    githubUrl: string
    category: string
    id: string
    createdBy: {
        name: string
        email: string
        avararUrl: string
        id: string
    }
}

export interface UserProfile {
    id: string
    name: string
    email: string
    description: string | null
    avararUrl: string
    githubUrl: string | null
    linkedinUrl: string | null
    projects: {
        edges: { node: ProjectInterface }[]
        pageInfo: {
            hasPreviousPage: boolean
            hasNextPage: boolean
            startCursor: string
            endCursor: string
        }
    }
}

export interface SessionInterface extends Session {
    user: User & {
        id: string
        name: string
        email: string
        avararUrl: string
    }
}

export interface ProjectForm {
    title: string
    description: string
    image: string
    liveSiteUrl: string
    githubUrl: string
    category: string
}
