import { BookOpen, ShieldAlert, MessageSquare, Gavel, UserCheck, HeartHandshake, AlertTriangle } from 'lucide-react'

export default function ReglementPage() {
    return (
        <div className="space-y-8 text-zinc-100 py-4 max-w-4xl mx-auto">
            {/* En-tête */}
            <div className="bg-[#121318]/90 backdrop-blur-md p-8 rounded-xl border border-[#232631] shadow-2xl space-y-3">
                <div className="inline-flex p-3 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400">
                    <BookOpen className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-extrabold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-amber-300 to-amber-500">
                    Règlement du Serveur
                </h1>
                <p className="text-sm text-zinc-400">
                    En vous connectant sur le serveur ou le Discord, vous acceptez l'ensemble des règles ci-dessous. Nul n'est censé ignorer le règlement.
                </p>
            </div>

            {/* Sommaire des règles */}
            <div className="space-y-6">
                {/* Article 1 : Respect & Vivre-ensemble */}
                <section className="bg-[#121318]/90 backdrop-blur-md p-6 rounded-xl border border-[#232631] space-y-3 shadow-lg">
                    <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                        <HeartHandshake className="w-5 h-5 text-amber-400" />
                        1. Respect et Comportement
                    </h2>
                    <ul className="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
                        <li>
                            <strong>Harcèlement & Propos haineux :</strong> Tout propos raciste, sexiste, homophobe, religieux ou incitant à la haine est strictement interdit sous peine de bannissement définitif.
                        </li>
                        <li>
                            <strong>Respect d'autrui :</strong> Les insultes, le dénigrement et l'agressivité envers les autres joueurs ou l'équipe du staff ne seront pas tolérés.
                        </li>
                        <li>
                            <strong>Provocation :</strong> La provocation abusive dans le chat de jeu ou sur Discord est sanctionnée. Gardez un esprit sportif !
                        </li>
                    </ul>
                </section>

                {/* Article 2 : Chat et Discord */}
                <section className="bg-[#121318]/90 backdrop-blur-md p-6 rounded-xl border border-[#232631] space-y-3 shadow-lg">
                    <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-amber-400" />
                        2. Communication (Chat & Vocaux)
                    </h2>
                    <ul className="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
                        <li>
                            <strong>Spam & Majuscules :</strong> Le spam, le flood et l'abus de majuscules dans le chat général sont interdits.
                        </li>
                        <li>
                            <strong>Publicité :</strong> Toute publicité pour un autre serveur Minecraft, un serveur Discord ou un lien externe non autorisé entraînera un bannissement immédiat.
                        </li>
                        <li>
                            <strong>Informations personnelles :</strong> La divulgation d'informations privées (Doxxing) d'un tiers est sévèrement punie par la loi et par nos services.
                        </li>
                    </ul>
                </section>

                {/* Article 3 : Triche et Exploits */}
                <section className="bg-[#121318]/90 backdrop-blur-md p-6 rounded-xl border border-[#232631] space-y-3 shadow-lg">
                    <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-amber-400" />
                        3. Anti-Jeu et Triche
                    </h2>
                    <ul className="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
                        <li>
                            <strong>Mods & Client de triche :</strong> Tous les mods procurant un avantage déloyal (X-Ray, Fly, KillAura, AutoClicker, etc.) sont strictement interdits.
                        </li>
                        <li>
                            <strong>Exploitation de Bugs :</strong> L'utilisation ou le partage d'un bug du jeu ou d'un plugin pour s'enrichir ou nuire au serveur est interdit. Signalez tout bug au Staff.
                        </li>
                        <li>
                            <strong>Double compte (Multi-account) :</strong> L'utilisation de multiples comptes pour contourner une sanction ou abuser du système de jeu est interdite.
                        </li>
                    </ul>
                </section>

                {/* Article 4 : Comptes & Responsabilité */}
                <section className="bg-[#121318]/90 backdrop-blur-md p-6 rounded-xl border border-[#232631] space-y-3 shadow-lg">
                    <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                        <UserCheck className="w-5 h-5 text-amber-400" />
                        4. Sécurité de votre compte
                    </h2>
                    <ul className="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
                        <li>
                            <strong>Responsabilité :</strong> Vous êtes l'unique responsable de votre compte (mot de passe, actions en jeu). Prétexter qu'un ami ou un frère utilisait votre compte ne vous exonère pas d'une sanction.
                        </li>
                        <li>
                            <strong>Vente et Échanges :</strong> Le commerce d'items ou de monnaie virtuelle contre de l'argent réel (EUR/USD) est strictement interdit hors de la boutique officielle.
                        </li>
                    </ul>
                </section>

                {/* Avertissement final du Staff */}
                <section className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-xl space-y-2">
                    <h2 className="text-base font-bold text-amber-400 flex items-center gap-2 uppercase tracking-wide">
                        <Gavel className="w-5 h-5 text-amber-400" />
                        Application des sanctions
                    </h2>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                        L'équipe de modération se réserve le droit d'appliquer la sanction (Mute, Kick, Tempban, Ban définitif) qu'elle juge la plus adaptée en fonction de la gravité de l'infraction. En cas de litige, vous pouvez effectuer un appel de ban sur notre Discord.
                    </p>
                </section>
            </div>
        </div>
    )
}