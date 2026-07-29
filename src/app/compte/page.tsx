import { createClient } from '../../utils/supabase/server'
import { logout } from './actions'
import Link from 'next/link'
import { User, Mail, Shield, Calendar, LogOut, Gamepad2 } from 'lucide-react'
import Notice from '../../components/Notice'

export default async function ComptePage() {
    const supabase = await createClient()

    // Check session
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return (
            <div className="py-8 max-w-xl mx-auto space-y-4">
                <Notice
                    type="info"
                    title="Connexion Requise"
                    message="Vous devez vous connecter pour afficher les détails de votre profil."
                />
                <div className="text-center pt-2">
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 font-extrabold text-zinc-950 text-sm transition"
                    >
                        Se connecter
                    </Link>
                </div>
            </div>
        )
    }

    // Récupération des infos du profil
    const { data: profil } = await supabase
        .from('profil')
        .select('*')
        .eq('id', user.id)
        .single()

    const username = profil?.username || 'Joueur'
    const role = profil?.role || 'Joueur'

    return (
        <div className="max-w-2xl mx-auto space-y-6 text-zinc-100 py-4">
            {/* Carte Profil */}
            <div className="bg-[#121318]/90 backdrop-blur-md p-8 rounded-xl border border-[#232631] shadow-2xl space-y-6">

                {/* En-tête avec avatar Minecraft */}
                <div className="flex flex-col sm:flex-row items-center gap-5 border-b border-[#232631] pb-6">
                    <div className="relative w-20 h-20 rounded-xl bg-zinc-900 border-2 border-amber-400/40 p-1 flex items-center justify-center overflow-hidden shadow-xl">
                        {/* Skin Minecraft dynamiquement généré via Visage/Crafatar */}
                        <img
                            src={`https://mc-heads.net/avatar/${username}/80`}
                            alt={username}
                            className="w-full h-full object-cover rounded"
                        />
                    </div>

                    <div className="text-center sm:text-left space-y-1">
                        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-amber-300 to-amber-500">
                            {username}
                        </h1>
                        <div className="inline-block px-2.5 py-0.5 text-[10px] uppercase font-extrabold bg-amber-400/10 text-amber-400 border border-amber-400/20 rounded">
                            Rôle : {role}
                        </div>
                    </div>
                </div>

                {/* Informations détaillées du compte */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-[#0d0e12] p-4 rounded-lg border border-[#232631] space-y-1">
                        <span className="text-xs text-zinc-500 uppercase font-bold flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-amber-400" /> Adresse Email
                        </span>
                        <p className="text-sm font-medium text-zinc-200 truncate">{user.email}</p>
                    </div>

                    <div className="bg-[#0d0e12] p-4 rounded-lg border border-[#232631] space-y-1">
                        <span className="text-xs text-zinc-500 uppercase font-bold flex items-center gap-1.5">
                            <Shield className="w-3.5 h-3.5 text-amber-400" /> Rôle sur le site
                        </span>
                        <p className="text-sm font-medium text-zinc-200 capitalize">{role}</p>
                    </div>

                    <div className="bg-[#0d0e12] p-4 rounded-lg border border-[#232631] space-y-1">
                        <span className="text-xs text-zinc-500 uppercase font-bold flex items-center gap-1.5">
                            <Gamepad2 className="w-3.5 h-3.5 text-amber-400" /> Pseudo Minecraft
                        </span>
                        <p className="text-sm font-medium text-zinc-200">{username}</p>
                    </div>

                    <div className="bg-[#0d0e12] p-4 rounded-lg border border-[#232631] space-y-1">
                        <span className="text-xs text-zinc-500 uppercase font-bold flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-zinc-500" /> Date d'inscription
                        </span>
                        <p className="text-sm font-medium text-zinc-200">
                            {new Date(user.created_at).toLocaleDateString('fr-FR')}
                        </p>
                    </div>
                </div>

                {/* Bouton de Déconnexion */}
                <div className="pt-4 border-t border-[#232631]">
                    <form action={logout}>
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 py-2.5 px-4 text-xs font-bold text-red-400 transition cursor-pointer"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Se déconnecter</span>
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}