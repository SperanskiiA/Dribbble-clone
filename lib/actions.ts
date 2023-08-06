import { ProjectForm } from '@/common.types'
import {
    createProjectMutation,
    createUserMutation,
    deleteProjectMutation,
    getProjectByIdQuery,
    getProjectsOfUserQuery,
    getUserQuery,
    projectsQuery,
    updateProjectMutation,
} from '@/graphql'
import { GraphQLClient } from 'graphql-request'

const isProduction = process.env.NODE_ENV === 'production'

const apiUrl = isProduction
    ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ''
    : 'http://127.0.0.1:4000/graphql'

const apiKey = isProduction
    ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ''
    : 'fuckyourself'

const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : 'http://localhost:3000'

const client = new GraphQLClient(apiUrl)

const makeGraphQLRequest = async (query: string, variables = {}) => {
    try {
        return await client.request(query, variables)
    } catch (error) {
        throw error
    }
}

export const getUser = (email: string) => {
    client.setHeader('x-api-key', apiKey)
    return makeGraphQLRequest(getUserQuery, { email })
}
export const createUser = (name: string, email: string, avararUrl: string) => {
    client.setHeader('x-api-key', apiKey)
    const variables = {
        input: {
            name,
            email,
            avararUrl,
        },
    }
    return makeGraphQLRequest(createUserMutation, variables)
}

export const fetchToken = async () => {
    try {
        const response = await fetch(`${serverUrl}/api/auth/token`)

        return response.json()
    } catch (error) {
        throw error
    }
}

export const uploadImage = async (imagePath: string) => {
    try {
        const response = await fetch(`${serverUrl}/api/upload`, {
            method: 'POST',
            body: JSON.stringify({ path: imagePath }),
        })

        return response.json()
    } catch (error) {
        throw error
    }
}

export const createNewProject = async (
    form: ProjectForm,
    creatorId: string,
    token: string
) => {
    const imageUrl = await uploadImage(form.image)

    if (imageUrl.url) {
        client.setHeader('Authorization', `Bearer ${token}`)

        const variables = {
            input: {
                ...form,
                image: imageUrl.url,
                createdBy: {
                    link: creatorId,
                },
            },
        }

        return makeGraphQLRequest(createProjectMutation, variables)
    }
}
export const fetchAllProjects = async (
    category?: string | null,
    endCursor?: string | null
) => {
    client.setHeader('x-api-key', apiKey)

    return makeGraphQLRequest(projectsQuery, { category, endCursor })
}

export const getProjectDetails = (id: string) => {
    client.setHeader('x-api-key', apiKey)
    return makeGraphQLRequest(getProjectByIdQuery, { id })
}

export const getUserProjects = (id: string, last?: number) => {
    client.setHeader('x-api-key', apiKey)
    return makeGraphQLRequest(getProjectsOfUserQuery, { id, last })
}

export const deleteUserProject = (id: string, token: string) => {
    client.setHeader('Authorization', `Bearer ${token}`)
    return makeGraphQLRequest(deleteProjectMutation, { id })
}

export const updateUserProject = async (
    form: ProjectForm,
    projectId: string,
    token: string
) => {
    function isBase64URL(s: string) {
        // Define the regular expression pattern for Base64 URL
        const pattern = /^data:image\/[a-z]+;base64,/

        // Use test method to check if the string matches the pattern
        return pattern.test(s)
    }

    let updatedForm = { ...form }

    const isUploadingNewImage = isBase64URL(form.image)

    if (isUploadingNewImage) {
        const imageUrl = await uploadImage(form.image)

        if (imageUrl.url) {
            updatedForm = {
                ...form,
                image: imageUrl.url,
            }
        }
    }

    const variables = {
        id: projectId,
        input: updatedForm,
    }

    client.setHeader('Authorization', `Bearer ${token}`)
    return makeGraphQLRequest(updateProjectMutation, variables)
}
