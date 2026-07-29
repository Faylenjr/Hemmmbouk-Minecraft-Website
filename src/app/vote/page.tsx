import { createClient } from '../../utils/supabase/server'
import { submitVote } from './actions'
import Notice from '../../components/Notice'
import { Vote, CheckCircle2, XCircle, Clock, ShieldCheck, Scale } from 'lucide-react'

export const revalidate = 0

export default async function VotePage(props: {
    searchParams: Promise<{ error?: string; success?: string }>
}) {
    const searchParams = await props.searchParams
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    // Récupération des élections avec la loi associée
    const { data: elections } = await supabase
        .from('election')
        .select('*, law(*)')
        .is('deleted_at', null)
        .order('created_at', { ascending: false })

    // Si le joueur est connecté on récupére la liste de ses votes effectués
    // Possiilité d'écrire en dur dans son navigateur je crois mais pas sur
    let userVotes: Record<number, string> = {}
    if (user && elections) {
        const { data: votes } = await supabase
            .from('vote')
            .select('election_id, choice')
            .eq('profil_id', user.id)

        if (votes) {
            votes.forEach((v) => {
                userVotes[v.election_id] = v.choice
            })
        }
    }

    return (
        <div className="space-y-8 text-zinc-100 py-4 max-w-4xl mx-auto">
            {/* En-tête */}
            <div className="bg-[#121318]/90 backdrop-blur-md p-8 rounded-2xl border border-[#232631] shadow-2xl space-y-3">
                <div className="inline-flex p-3 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400">
                    <Vote className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-extrabold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-amber-300 to-amber-500">
                    Espace Citoyen : Votes & Lois
                </h1>
                <p className="text-sm text-zinc-400">
                    Prenez part à la vie politique du serveur. Votez Pour ou Contre les décrets et réformes proposées.
                </p>
            </div>

            {/* Notice d'erreur ou de succès */}
            {searchParams.error && (
                <Notice type="error" title="Vote refusé" message={searchParams.error} />
            )}
            {searchParams.success && (
                <Notice type="success" title="Vote confirmé" message={searchParams.success} />
            )}

            {/* Liste des Élections */}
            <div className="space-y-6">
                {!elections || elections.length === 0 ? (
                    <div className="p-8 bg-[#121318]/90 border border-[#232631] rounded-2xl text-center text-zinc-400 text-sm">
                        Aucune élection ou vote en cours pour le moment.
                    </div>
                ) : (
                    elections.map((elec) => {
                        const totalVotes = elec.votes_for + elec.votes_against
                        const percentFor = totalVotes > 0 ? Math.round((elec.votes_for / totalVotes) * 100) : 0
                        const percentAgainst = totalVotes > 0 ? Math.round((elec.votes_against / totalVotes) * 100) : 0

                        const isExpired = new Date(elec.end_date) < new Date()
                        const hasVoted = userVotes[elec.id] !== undefined
                        const userChoice = userVotes[elec.id]

                        const associatedLaw = elec.law && elec.law.length > 0 ? elec.law[0] : null

                        return (
                            <div
                                key={elec.id}
                                className="bg-[#121318]/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-[#232631] shadow-xl space-y-6"
                            >
                                {/* En-tête de l'élection */}
                                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#232631] pb-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">
                                                Élection #{elec.id}
                                            </span>
                                            {isExpired ? (
                                                <span className="px-2 py-0.5 text-[10px] font-extrabold bg-red-500/10 text-red-400 border border-red-500/20 rounded">
                                                    Terminée
                                                </span>
                                            ) : (
                                                <span className="px-2 py-0.5 text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded animate-pulse">
                                                    En cours
                                                </span>
                                            )}
                                        </div>
                                        <h2 className="text-xl font-bold text-zinc-100">{elec.title}</h2>
                                    </div>

                                    <div className="text-xs text-zinc-500 flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                                        <span>Fin le {new Date(elec.end_date).toLocaleDateString('fr-FR')}</span>
                                    </div>
                                </div>

                                {/* Description de l'élection / Décret de Loi */}
                                {elec.description && (
                                    <p className="text-xs text-zinc-300 leading-relaxed bg-[#0d0e12] p-4 rounded-xl border border-[#232631]">
                                        {elec.description}
                                    </p>
                                )}

                                {/* Affichage de la loi si associée */}
                                {associatedLaw && (
                                    <div className="bg-[#0d0e12] p-4 rounded-xl border border-[#232631] space-y-2">
                                        <span className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1">
                                            <Scale className="w-3.5 h-3.5" /> Projet de Loi associé : {associatedLaw.title}
                                        </span>
                                        <p className="text-xs text-zinc-400 whitespace-pre-wrap leading-relaxed">
                                            {associatedLaw.content}
                                        </p>
                                    </div>
                                )}

                                {/* Barre de progression des votes */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold">
                                        <span className="text-emerald-400 flex items-center gap-1">
                                            <CheckCircle2 className="w-3.5 h-3.5" /> Pour : {elec.votes_for} ({percentFor}%)
                                        </span>
                                        <span className="text-red-400 flex items-center gap-1">
                                            <XCircle className="w-3.5 h-3.5" /> Contre : {elec.votes_against} ({percentAgainst}%)
                                        </span>
                                    </div>

                                    <div className="w-full h-3 bg-[#0d0e12] rounded-full overflow-hidden flex border border-[#232631]">
                                        <div
                                            style={{ width: `${percentFor}%` }}
                                            className="bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500"
                                        />
                                        <div
                                            style={{ width: `${percentAgainst}%` }}
                                            className="bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500"
                                        />
                                    </div>
                                    <p className="text-[10px] text-zinc-500 text-right">Total : {totalVotes} vote(s)</p>
                                </div>

                                {/* Zone de Vote */}
                                <div className="pt-2 border-t border-[#232631]">
                                    {!user ? (
                                        <div className="text-center p-3 rounded-xl bg-[#0d0e12] text-xs text-zinc-400">
                                            Connectez-vous pour pouvoir voter.
                                        </div>
                                    ) : hasVoted ? (
                                        <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-400">
                                            <ShieldCheck className="w-4 h-4" />
                                            <span>
                                                Vous avez voté : {userChoice === 'for' ? 'POUR 🟢' : 'CONTRE 🔴'}
                                            </span>
                                        </div>
                                    ) : isExpired ? (
                                        <div className="text-center p-3 rounded-xl bg-[#0d0e12] text-xs text-zinc-500">
                                            Les votes pour cette élection sont clos.
                                        </div>
                                    ) : (
                                        /* Formulaire de vote */
                                        <form action={submitVote} className="grid grid-cols-2 gap-3">
                                            <input type="hidden" name="election_id" value={elec.id} />

                                            <button
                                                type="submit"
                                                name="choice"
                                                value="for"
                                                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 font-bold text-xs transition cursor-pointer"
                                            >
                                                <CheckCircle2 className="w-4 h-4" />
                                                <span>Voter POUR</span>
                                            </button>

                                            <button
                                                type="submit"
                                                name="choice"
                                                value="against"
                                                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 font-bold text-xs transition cursor-pointer"
                                            >
                                                <XCircle className="w-4 h-4" />
                                                <span>Voter CONTRE</span>
                                            </button>
                                        </form>
                                    )}
                                </div>

                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}