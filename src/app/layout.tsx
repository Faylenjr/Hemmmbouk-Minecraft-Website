import type { Metadata } from 'next'
import './globals.css'

import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata: Metadata = {
    title: 'Mon Serveur Minecraft',
    description: 'Rejoins notre serveur Minecraft dès maintenant !',
}

export default function RootLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr" className="dark">
        <body className="bg-[#0d0e12] text-zinc-100 min-h-screen flex flex-col antialiased">
        <Header />
        <Navbar />
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
            {children}
        </main>
        <Footer />
        </body>
        </html>
    )
}