import { UserProfile } from '@/common.types'
import ProfilePage from '@/components/ProfilePage'
import { getUserProjects } from '@/lib/actions'

const Profile = async ({ params: { id } }: { params: { id: string } }) => {
    const result = (await getUserProjects(id, 100)) as { user: UserProfile }

    if (!result?.user) {
        return (
            <h1 className="py-8 px-4 no-result-text">
                Failed to fetch user info
            </h1>
        )
    }
    return <ProfilePage user={result?.user} />
}

export default Profile
