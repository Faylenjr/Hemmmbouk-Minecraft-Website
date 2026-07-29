import { createClient } from '../../../../utils/supabase/server'
import { createElectionWithLaw } from '../actions'
import Link from 'next/link'
import Notice from '../../../../components/Notice'
import { Vote, ArrowLeft, Calendar, FileText, Scale } from 'lucide-react'

export default async function CreateElectionPage(props: {
    searchParams: Promise<{ error?: string }>
}) {
    const searchParams = await props.searchParams
    const supabase = await createClient()

    // Check session + rôle admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return <Notice type="error" message="Veuillez vous connecter." />
    }

    const { data: profil } = await supabase
        .from('profil')
        .select('role')
        .eq('id', user.id)
        .single()

    if (!profil || profil.role !== 'admin') {
        return <Notice type="error" message="Accès refusé : Réservé aux administrateurs." />
    }

    return (
        <div className="space-y-6 text-zinc-100 py-4 max-w-3xl mx-auto">
            <Link
                href="/staff"
                className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-amber-400 transition"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour au Dashboard Staff</span>
            </Link>

            <div className="bg-[#121318]/90 backdrop-blur-md p-8 rounded-2xl border border-[#232631] shadow-2xl space-y-6">
                <div className="space-y-2 border-b border-[#232631] pb-4">
                    <div className="inline-flex p-3 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400">
                        <Vote className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-extrabold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-amber-300 to-amber-500">
                        Nouvelle Élection & Décret
                    </h1>
                    <p className="text-xs text-zinc-400">
                        Lancez un nouveau vote citoyen pour la communauté.
                    </p>
                </div>

                {searchParams.error && (
                    <Notice type="error" title="Erreur" message={searchParams.error} />
                )}

                <form action={createElectionWithLaw} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-amber-400" />
                            Titre de l'élection *
                        </label>
                        <input
                            type="text"
                            name="title"
                            required
                            placeholder="Ex: Réforme du système d'économie de la Saison 5"
                            className="w-full bg-[#0d0e12] border border-[#232631] text-zinc-100 placeholder-zinc-600 rounded-xl px-4 py-3 text-sm focus:border-amber-400 focus:outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-amber-400" />
                            Durée du vote (en jours)
                        </label>
                        <input
                            type="number"
                            name="end_days"
                            defaultValue={7}
                            min={1}
                            max={30}
                            className="w-full bg-[#0d0e12] border border-[#232631] text-zinc-100 rounded-xl px-4 py-3 text-sm focus:border-amber-400 focus:outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                            Description / Présentation du Vote
                        </label>
                        <textarea
                            name="description"
                            rows={3}
                            placeholder="Expliquez brièvement l'enjeu du vote..."
                            className="w-full bg-[#0d0e12] border border-[#232631] text-zinc-100 placeholder-zinc-600 rounded-xl px-4 py-3 text-sm focus:border-amber-400 focus:outline-none transition"
                        />
                    </div>

                    {/* Section Loi associée (Optionnelle) */}
                    <div className="pt-4 border-t border-[#232631] space-y-4">
                        <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Scale className="w-4 h-4" /> Projet de Loi associé (Optionnel)
                        </h3>

                        <div>
                            <label className="block text-xs font-semibold text-zinc-400 mb-1">
                                Titre de la Loi
                            </label>
                            <input
                                type="text"
                                name="law_title"
                                placeholder="Ex: Loi N°12 - Régulation des claims"
                                className="w-full bg-[#0d0e12] border border-[#232631] text-zinc-100 placeholder-zinc-600 rounded-xl px-4 py-2.5 text-sm focus:border-amber-400 focus:outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-zinc-400 mb-1">
                                Contenu de la Loi
                            </label>
                            <textarea
                                name="law_content"
                                rows={5}
                                placeholder="Détail des articles de la loi..."
                                className="w-full bg-[#0d0e12] border border-[#232631] text-zinc-100 placeholder-zinc-600 rounded-xl px-4 py-2.5 text-sm focus:border-amber-400 focus:outline-none transition"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 py-3.5 px-4 text-sm font-black text-zinc-950 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition transform hover:-translate-y-0.5 cursor-pointer mt-4"
                    >
                        <Vote className="w-4 h-4" />
                        <span>Lancer l'Élection</span>
                    </button>
                </form>
            </div>
        </div>
    )
}