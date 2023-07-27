'use client'
import { SessionInterface } from '@/common.types'
import React, { useState } from 'react'
import Image from 'next/image'
import FormField from './FormField'
import { categoryFilters } from '@/constants'
import CustomMenu from './CustomMenu'
import Button from './Button'
import { createNewProject, fetchToken } from '@/lib/actions'
import { useRouter } from 'next/navigation'

type ProjectFormProps = {
    type: string
    session: SessionInterface
}

const ProjectForm = ({ type, session }: ProjectFormProps) => {
    const [isSubmitting, setSubmitting] = useState(false)
    const [form, setForm] = useState({
        image: '',
        title: '',
        description: '',
        liveSiteUrl: '',
        githubUrl: '',
        linkedinUrl: '',
        category: '',
    })

    const router = useRouter()

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setSubmitting(true)

        const { token } = await fetchToken()

        try {
            if (type === 'create') {
                await createNewProject(form, session?.user?.id, token)

                router.push('/')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const file = e.target.files?.[0]

        if (!file) return

        if (!file.type.includes('image'))
            return alert('Please upload an image file')

        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = () => {
            const result = reader.result as string

            handleStateChange('image', result)
        }
    }

    const handleStateChange = (fieldName: string, value: string) => {
        setForm((prev) => ({ ...prev, [fieldName]: value }))
    }

    return (
        <form onSubmit={handleFormSubmit} className="flexStart form">
            <div className="flexStart form_image-container">
                <label htmlFor="poster" className="flexCenter form_image-label">
                    choose a poster
                </label>
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    required={type === 'create'}
                    className="form_image-input"
                    onChange={handleChangeInput}
                />
                {form.image && (
                    <Image
                        src={form?.image}
                        alt="image"
                        className="sm:p-10 object-contain z-20"
                        fill
                    />
                )}
            </div>
            <FormField
                title="Title"
                state={form.title}
                placeholder="Dribbble"
                setState={(val: string) => handleStateChange('title', val)}
            />

            <FormField
                title="Description"
                state={form.description}
                placeholder="Describe your project!"
                setState={(val: string) =>
                    handleStateChange('description', val)
                }
            />

            <FormField
                type="url"
                title="Website URL"
                state={form.liveSiteUrl}
                placeholder="https://random-site-name.rnd"
                setState={(val: string) =>
                    handleStateChange('liveSiteUrl', val)
                }
            />

            <FormField
                type="url"
                title="Github URL"
                state={form.githubUrl}
                placeholder="https://github.com/user-name"
                setState={(val: string) => handleStateChange('githubUrl', val)}
            />

            <FormField
                type="url"
                title="LinkedIn Url"
                state={form.linkedinUrl}
                placeholder="https://linkedin.com/user-name"
                setState={(val: string) =>
                    handleStateChange('linkedinUrl', val)
                }
            />

            {/* custom input will be here soon */}
            <CustomMenu
                title="Category"
                state={form.category}
                filters={categoryFilters}
                setState={(val) => handleStateChange('category', val)}
            />

            <div className="flexStart w-full">
                <Button
                    title={
                        isSubmitting
                            ? `${type === 'create' ? 'Creating' : 'Editing'}`
                            : `${type === 'create' ? 'Create' : 'Edit'}`
                    }
                    type="submit"
                    leftIcon={isSubmitting ? '' : '/plus.svg'}
                    isSubmitting={isSubmitting}
                />
            </div>
        </form>
    )
}

export default ProjectForm
