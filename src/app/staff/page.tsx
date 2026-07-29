import { createClient } from '../../utils/supabase/server'
import Link from 'next/link'
import { ShieldCheck, PlusCircle, BookOpen, Users, Vote } from 'lucide-react'
import Notice from '../../components/Notice'

export default async function StaffPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    // Récupération du rôle du user
    let role = 'user'
    if (user) {
        const { data: profil } = await supabase
            .from('profil')
            .select('role')
            .eq('id', user.id)
            .single()
        if (profil) role = profil.role
    }

    // Si le user n'est pas admin, petite notice
    if (!user || role !== 'admin') {
        return (
            <div className="py-8 max-w-2xl mx-auto space-y-4">
                <Notice
                    type="error"
                    title="Accès Restreint"
                    message="Vous ne disposez pas des permissions nécessaires (Rôle Administrateur requit) pour accéder à l'espace Staff."
                />
            </div>
        )
    }

    return (
        <div className="space-y-8 text-zinc-100 py-4">
            <div className="bg-[#121318]/90 backdrop-blur-md p-8 rounded-xl border border-[#232631] shadow-2xl space-y-3">
                <div className="inline-flex p-3 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400">
                    <ShieldCheck className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-extrabold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-amber-300 to-amber-500">
                    Panneau d'Administration
                </h1>
                <p className="text-sm text-zinc-400">
                    Espace réservé aux Administrateurs du serveur.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#121318]/90 backdrop-blur-md p-6 rounded-xl border border-[#232631] space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                        <div className="inline-flex p-2.5 rounded-lg bg-amber-400/10 text-amber-400">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-zinc-100">Gestion du Wiki</h2>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                            Rédige et gère les guides du serveur réservés aux joueurs.
                        </p>
                    </div>

                    <Link
                        href="/staff/wiki/create"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 hover:bg-amber-400 py-2.5 px-4 text-xs font-extrabold text-zinc-950 shadow-[0_0_15px_rgba(245,158,11,0.25)] transition"
                    >
                        <PlusCircle className="w-4 h-4" />
                        <span>Créer un article Wiki</span>
                    </Link>
                </div>

                <div className="bg-[#121318]/90 backdrop-blur-md p-6 rounded-xl border border-[#232631] space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                        <div className="inline-flex p-2.5 rounded-lg bg-amber-400/10 text-amber-400">
                            <Users className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-zinc-100">Équipe d'Administration</h2>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                            Gestion de l'équipe et des permissions.
                        </p>
                    </div>

                    <div className="pt-2 text-xs text-emerald-400 font-semibold">
                        ✓ Session Administrateur active
                    </div>
                </div>
            </div>

            {/* Carte : Lancer une élection */}
            <div className="bg-[#121318]/90 backdrop-blur-md p-6 rounded-xl border border-[#232631] space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                    <div className="inline-flex p-2.5 rounded-lg bg-amber-400/10 text-amber-400">
                        <Vote className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-zinc-100">Votes & Lois</h2>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                        Crée de nouvelles élections et des décrets soumis au vote citoyen.
                    </p>
                </div>

                <Link
                    href="/staff/elections/create"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 hover:bg-amber-400 py-2.5 px-4 text-xs font-extrabold text-zinc-950 transition"
                >
                    <PlusCircle className="w-4 h-4" />
                    <span>Lancer une élection</span>
                </Link>
            </div>
        </div>
    )
}