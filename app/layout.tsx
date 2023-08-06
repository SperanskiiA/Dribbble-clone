import { Footer, NavBar } from '@/components'
import './globals.css'

export const metadata = {
    title: 'Flexibble',
    description: 'Like Dribbble but even better!:)',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <NavBar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    )
}
