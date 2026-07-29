'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function Header() {
    const [copied, setCopied] = useState(false)
    const serverIP = 'IP.DU.SERVEUR.DE.KK'

    const copyIP = () => {
        navigator.clipboard.writeText(serverIP)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <header className="relative w-full h-[420px] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-zinc-950">
            {/* Background Image avec superposition sombre */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 filter blur-[1px]"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=1920&auto=format&fit=crop')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0e12]/60 to-[#0d0e12]" />

            {/* Contenu principal du Header */}
            <div className="relative z-10 flex flex-col items-center space-y-4">
                {/* Titre / Logo du serveur */}
                <h1 className="text-4xl sm:text-6xl font-black tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 drop-shadow-[0_4px_10px_rgba(245,158,11,0.3)]">
                    MineBouk
                </h1>

                {/* Bouton de copie de l'IP du serveur */}
                <button
                    onClick={copyIP}
                    className="group flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold text-sm sm:text-base px-6 py-3 rounded-lg shadow-[0_0_20px_rgba(245,158,11,0.4)] transition transform hover:-translate-y-0.5 cursor-pointer"
                >
                    <span>{serverIP}</span>
                    {copied ? <Check className="w-5 h-5 text-emerald-950" /> : <Copy className="w-5 h-5 group-hover:scale-110 transition" />}
                </button>

                {/* Badge Joueurs en ligne */}
                <div className="inline-flex items-center gap-2 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 px-3 py-1 rounded-full text-xs font-semibold text-zinc-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Actuellement <strong className="text-emerald-400">...</strong> joueurs en ligne !</span>
                </div>
            </div>
        </header>
    )
}