import Modal from '@/components/Modal'
import ProjectForm from '@/components/ProjectForm'
import { getCurrentUser } from '@/lib/session'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React from 'react'

const CreateProject = async () => {
    const session = await getCurrentUser()

    if (!session?.user) redirect('/')

    return (
        <Modal>
            <h3 className="modal-head-text">CreateProject</h3>
            <ProjectForm type="create" session={session} />
        </Modal>
    )
}

export default CreateProject
