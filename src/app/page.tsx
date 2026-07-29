export default function HomePage() {
    return (
        <div className="space-y-8 text-white">
            <section className="bg-[#121318]/90 backdrop-blur-md p-8 rounded-xl border border-[#232631] shadow-2xl">
                <h2 className="text-3xl font-extrabold text-amber-400 mb-2 uppercase tracking-wide">
                    MineBouk - TRAILER
                </h2>
                <p className="text-sm text-zinc-400 mb-6">
                    Découvre l'univers du serveur en vidéo !
                </p>

                {/* Lecteur Vidéo YouTube */}
                <div className="aspect-video w-full rounded-xl overflow-hidden border border-[#232631] shadow-2xl">
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/YhEeSpB3g40"
                        title="La Rvfleuze - Lewis Hamilton"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </section>
        </div>
    )
}