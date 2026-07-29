import { login } from './actions'
import Link from 'next/link'
import { LogIn, Mail, Lock, UserPlus, Shield } from 'lucide-react'
import Notice from '../../components/Notice'

export default async function LoginPage(props: {
    searchParams: Promise<{ message?: string; error?: string }>
}) {
    const searchParams = await props.searchParams

    return (
        <div className="flex min-h-[65vh] items-center justify-center px-4 py-8">
            <div className="w-full max-w-md bg-[#121318]/90 backdrop-blur-xl p-8 rounded-2xl border border-[#232631] shadow-[0_10px_40px_rgba(0,0,0,0.5)] space-y-6 text-zinc-100 relative overflow-hidden">

                {/* Effet dorée en fond */}
                <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Header de la carte */}
                <div className="text-center space-y-2 relative z-10">
                    <div className="inline-flex p-3.5 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/5 border border-amber-400/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)] mb-1">
                        <LogIn className="w-7 h-7" />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500">
                        Espace Joueur
                    </h2>
                    <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                        Connecte-toi pour accéder à tes informations et fonctionnalités du serveur.
                    </p>
                </div>

                {/* Notice d'erreur ou d'information */}
                {searchParams.error && (
                    <Notice type="error" title="Erreur d'authentification" message={searchParams.error} />
                )}
                {searchParams.message && (
                    <Notice type="info" title="Information" message={searchParams.message} />
                )}

                {/* Formulaire */}
                <form className="space-y-4 relative z-10">
                    <div className="space-y-3.5">
                        <div>
                            <label htmlFor="email" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5 text-amber-400" />
                                Adresse Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full rounded-xl bg-[#0d0e12] border border-[#232631] px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-sm transition duration-200 shadow-inner"
                                placeholder="steve@creeper.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                                <Lock className="w-3.5 h-3.5 text-amber-400" />
                                Mot de passe
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="w-full rounded-xl bg-[#0d0e12] border border-[#232631] px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-sm transition duration-200 shadow-inner"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        formAction={login}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 py-3 px-4 text-sm font-black text-zinc-950 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition transform hover:-translate-y-0.5 cursor-pointer mt-2"
                    >
                        <LogIn className="w-4 h-4" />
                        <span>Se connecter</span>
                    </button>
                </form>

                {/* Redirection vers Inscription */}
                <div className="text-center text-xs text-zinc-400 border-t border-[#232631] pt-5 flex items-center justify-center gap-1 relative z-10">
                    <span>Pas encore de compte ?</span>
                    <Link
                        href="/login/signup"
                        className="text-amber-400 hover:text-amber-300 font-bold inline-flex items-center gap-1 transition ml-1 underline decoration-amber-400/40"
                    >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Créer un compte</span>
                    </Link>
                </div>

            </div>
        </div>
    )
}