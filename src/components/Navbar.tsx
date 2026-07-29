import Link from 'next/link'
import { Home, BookOpen, HelpCircle, Users, Scale, Vote, LogIn } from 'lucide-react'
import { createClient } from '../utils/supabase/server'

export default async function Navbar() {
    const supabase = await createClient()

    // Récupération de la session utilisateur
    const { data: { user } } = await supabase.auth.getUser()

    let username = null
    if (user) {
        const { data: profil } = await supabase
            .from('profil')
            .select('username')
            .eq('id', user.id)
            .single()

        username = profil?.username || user.email?.split('@')[0] || 'Mon Compte'
    }

    return (
        <nav className="w-full sticky top-0 z-50 bg-[#121318]/95 backdrop-blur-md border-y border-[#232631] shadow-xl">
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">

                {/* Liens principaux */}
                <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-amber-400 font-semibold text-sm bg-amber-400/10 border border-amber-400/20 transition hover:bg-amber-400/20"
                    >
                        <Home className="w-4 h-4" />
                        <span>Accueil</span>
                    </Link>

                    <Link
                        href="/reglement"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-zinc-300 font-medium text-sm hover:text-white hover:bg-zinc-800/60 transition"
                    >
                        <BookOpen className="w-4 h-4 text-zinc-400" />
                        <span>Règlement</span>
                    </Link>

                    <Link
                        href="/wiki"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-zinc-300 font-medium text-sm hover:text-white hover:bg-zinc-800/60 transition"
                    >
                        <HelpCircle className="w-4 h-4 text-zinc-400" />
                        <span>Wiki</span>
                    </Link>

                    <Link
                        href="/vote"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-zinc-300 font-medium text-sm hover:text-white hover:bg-zinc-800/60 transition"
                    >
                        <Vote className="w-4 h-4 text-zinc-400" />
                        <span>Vote</span>
                    </Link>

                    <Link
                        href="/staff"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-zinc-300 font-medium text-sm hover:text-white hover:bg-zinc-800/60 transition"
                    >
                        <Users className="w-4 h-4 text-zinc-400" />
                        <span>Staff</span>
                    </Link>

                    <Link
                        href="/mentions-legales"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-zinc-300 font-medium text-sm hover:text-white hover:bg-zinc-800/60 transition"
                    >
                        <Scale className="w-4 h-4 text-zinc-400" />
                        <span>Mentions légales</span>
                    </Link>
                </div>

                {/* Espace Compte / Auth & Réseaux sociaux */}
                <div className="flex items-center gap-3 ml-auto">
                    {user ? (
                        <Link
                            href="/compte"
                            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 text-xs font-bold transition shadow-sm"
                        >
                            <div className="w-5 h-5 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center font-black text-[10px]">
                                {username.charAt(0).toUpperCase()}
                            </div>
                            <span>{username}</span>
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white hover:bg-zinc-700 text-xs font-semibold transition"
                        >
                            <LogIn className="w-3.5 h-3.5 text-amber-400" />
                            <span>Connexion / Inscription</span>
                        </Link>
                    )}

                    {/* Réseaux sociaux */}
                    <div className="flex items-center gap-1.5 pl-2 border-l border-[#232631]">
                        <a
                            href="https://discord.gg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-[#5865F2]/10 border border-[#5865F2]/20 text-[#5865F2] hover:bg-[#5865F2]/20 transition"
                            title="Discord"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028z" />
                            </svg>
                        </a>
                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition"
                            title="YouTube"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </a>
                    </div>
                </div>

            </div>
        </nav>
    )
}