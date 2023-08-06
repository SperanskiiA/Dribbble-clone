import React from 'react'

const FooterLinkPage = ({
    params: { link },
}: {
    params: {
        link: string
    }
}) => {
    const Link = link.replaceAll('%20', ' ')

    return (
        <div className="py-12 px-12">
            <h3>
                here might be <span className="font-bold"> {Link} page</span>,
                but nobody paid me for that
            </h3>
        </div>
    )
}

export default FooterLinkPage
