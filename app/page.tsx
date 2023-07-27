import { ProjectInterface } from '@/common.types'
import ProjectCard from '@/components/ProjectCard'
import { fetchAllProjects } from '@/lib/actions'

type ProjectSearch = {
    projectSearch: {
        edges: { node: ProjectInterface }[]
        pageInfo: {
            hasPreviousPage: boolean
            hasNextPage: boolean
            startCursor: string
            endCursor: string
        }
    }
}

const Home = async () => {
    const projects = (await fetchAllProjects()) as ProjectSearch

    const projectsToRender = projects?.projectSearch?.edges || []

    if (projectsToRender.length === 0) {
        return (
            <section className="flexStart flex-col paddings">
                Caregories
                <p className="no-result-text text-center">
                    No projects found, why don't you be first?
                </p>
            </section>
        )
    }

    return (
        <section className="flex-start flex-col paddings mb-16">
            <h1> Categories</h1>

            <section className="projects-grid">
                {projectsToRender.map(
                    ({ node }: { node: ProjectInterface }) => (
                        <ProjectCard
                            key={node?.id}
                            id={node?.id}
                            image={node?.image}
                            title={node?.title}
                            description={node?.description}
                            name={node?.createdBy?.name}
                            avatarUrl={node?.createdBy?.avatarUrl}
                            userId={node?.createdBy?.id}
                        />
                    )
                )}
            </section>

            <h1> LoadMore</h1>
        </section>
    )
}

export default Home
