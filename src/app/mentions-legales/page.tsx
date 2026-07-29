import { ShieldCheck, Server, Lock, AlertTriangle } from 'lucide-react'

export default function MentionsLegalesPage() {
    return (
        <div className="space-y-8 text-zinc-100 py-4">
            {/* En-tête de page */}
            <div className="bg-[#121318]/90 backdrop-blur-md p-8 rounded-xl border border-[#232631] shadow-2xl space-y-3">
                <div className="inline-flex p-3 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400">
                    <ShieldCheck className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-extrabold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-amber-300 to-amber-500">
                    Mentions Légales & CGU
                </h1>
                <p className="text-sm text-zinc-400">
                    Dernière mise à jour : Juillet 2026. Veuillez lire attentivement les conditions régissant l'utilisation de notre plateforme et de nos services.
                </p>
            </div>

            {/* Sections d'informations légales */}
            <div className="space-y-6">
                {/* Éditeur du site */}
                <section className="bg-[#121318]/90 backdrop-blur-md p-6 rounded-xl border border-[#232631] space-y-3">
                    <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                        <Server className="w-5 h-5 text-amber-400" />
                        1. Édition et Hébergement
                    </h2>
                    <div className="text-sm text-zinc-300 leading-relaxed space-y-2">
                        <p>
                            Le présent site web est édité par l'équipe de gestion du serveur <strong>Mon Serveur Minecraft</strong>.
                        </p>
                        <p>
                            <strong>Hébergeur du site web :</strong> Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723.
                        </p>
                        <p>
                            <strong>Hébergeur du serveur de jeu :</strong> OVH SAS, 2 rue Kellermann, 59100 Roubaix, France.
                        </p>
                    </div>
                </section>

                {/* Clause Mojang Studios / Minecraft */}
                <section className="bg-[#121318]/90 backdrop-blur-md p-6 rounded-xl border border-[#232631] space-y-3">
                    <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-amber-400" />
                        2. Avertissement concernant Minecraft & Mojang AB
                    </h2>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                        Notre serveur et notre site web ne sont en aucun cas affiliés, associés ou approuvés par <strong>Mojang Studios</strong> ou <strong>Microsoft Corporation</strong>.
                        Minecraft est une marque déposée de Mojang Synergies AB. Tous les achats effectués sur notre boutique en ligne constituent un soutien au développement indépendant de notre serveur de jeu.
                    </p>
                </section>

                {/* Protection des données personnelles (RGPD) */}
                <section className="bg-[#121318]/90 backdrop-blur-md p-6 rounded-xl border border-[#232631] space-y-3">
                    <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-amber-400" />
                        3. Protection des Données Personnelles (RGPD)
                    </h2>
                    <div className="text-sm text-zinc-300 leading-relaxed space-y-2">
                        <p>
                            Conformément au Règlement Général sur la Protection des Données (RGPD), les informations recueillies lors de votre inscription (adresse email, pseudo, adresse IP) sont nécessaires à l'accès et à la gestion de votre compte joueur.
                        </p>
                        <p>
                            Ces données ne sont en aucun cas cédées ou vendues à des tiers. Vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles sur simple demande auprès de notre support Discord ou par email.
                        </p>
                    </div>
                </section>

                {/* Propriété intellectuelle */}
                <section className="bg-[#121318]/90 backdrop-blur-md p-6 rounded-xl border border-[#232631] space-y-3">
                    <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-amber-400" />
                        4. Propriété Intellectuelle
                    </h2>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                        L'ensemble des contenus présents sur le site (logos, graphismes, éléments visuels, textes et configurations de jeu) sont la propriété exclusive du serveur, sauf mention contraire ou éléments appartenant à Mojang Studios. Toute reproduction non autorisée est strictement interdite.
                    </p>
                </section>
            </div>
        </div>
    )
}