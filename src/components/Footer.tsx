import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="w-full bg-[#090a0d] border-t border-[#232631] text-zinc-400 py-10 mt-auto">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Branding du serveur */}
                <div className="flex items-center gap-4 text-center md:text-left">
                    <div>
                        <h3 className="text-lg font-black tracking-wider uppercase text-amber-400">
                            Mon Serveur Minecraft
                        </h3>
                        <p className="text-xs text-zinc-500 mt-1">
                            Copyright © 2026 Mon Serveur Minecraft. Tous droits réservés.
                        </p>
                    </div>
                </div>

                {/* Mentions de non-affiliation Mojang / Crédits */}
                <div className="text-center md:text-right text-xs text-zinc-500 space-y-1 max-w-md">
                    <p>
                        Nous ne sommes en aucun cas affiliés ou approuvés par <strong className="text-zinc-400">Mojang Studios</strong> ou <strong className="text-zinc-400">Microsoft Corporation</strong>.
                    </p>
                    <p>
                        Propulsé par <Link href="/mentions-legales" className="text-amber-400 hover:underline">Mentions Légales & CGU</Link>.
                    </p>
                </div>

            </div>
        </footer>
    )
}