import { ProjectInterface } from '@/common.types'
import Categories from '@/components/Categories'
import Pagination from '@/components/Pagination'
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

type SearchParams = {
    category?: string
    endcursor?: string
}

type Props = {
    searchParams: SearchParams
}

export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0

const Home = async ({ searchParams: { category, endcursor } }: Props) => {
    // const Category = category ? category : ' '
    const projects = (await fetchAllProjects(
        category,
        endcursor
    )) as ProjectSearch

    const projectsToRender = projects?.projectSearch?.edges || []

    if (projectsToRender.length === 0) {
        return (
            <section className="flexStart flex-col paddings">
                <Categories />
                <p className="no-result-text text-center">
                    No projects found, why don't you be first?
                </p>
            </section>
        )
    }

    return (
        <section className="flex-start flex-col paddings mb-16">
            <Categories />

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

            <Pagination
                startCursor={projects?.projectSearch?.pageInfo?.startCursor}
                endCursor={projects?.projectSearch?.pageInfo?.endCursor}
                hasPreviousPage={
                    projects?.projectSearch?.pageInfo?.hasPreviousPage
                }
                hasNextPage={projects?.projectSearch?.pageInfo?.hasNextPage}
            />
        </section>
    )
}

export default Home
