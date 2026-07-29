import { createClient } from '../../../../utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Folder, ChevronRight, FileText } from 'lucide-react'

export default async function CategoryWikiPage(props: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await props.params
    const supabase = await createClient()

    // Récupération de la catégorie par son slug
    const { data: category } = await supabase
        .from('wiki_categories')
        .select('*')
        .eq('slug', slug)
        .is('deleted_at', null)
        .single()

    if (!category) {
        notFound()
    }

    // Récupération de tous les articles reliés à cette catégorie
    const { data: articles } = await supabase
        .from('wiki')
        .select('*, wiki_categories(name)')
        .eq('category_id', category.id)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6 text-zinc-100 py-4 max-w-4xl mx-auto">
            {/* Bouton retour */}
            <Link
                href="/wiki"
                className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-amber-400 transition"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour à l'accueil du Wiki</span>
            </Link>

            {/* En-tête de la catégorie */}
            <div className="bg-[#121318]/90 backdrop-blur-md p-8 rounded-xl border border-[#232631] shadow-2xl space-y-3">
                <div className="inline-flex p-3 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400">
                    <Folder className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-extrabold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-amber-300 to-amber-500">
                    Catégorie : {category.name}
                </h1>
                <p className="text-sm text-zinc-400">
                    Retrouve tous les guides publiés dans cette catégorie ({articles?.length || 0} article(s)).
                </p>
            </div>

            {/* Liste des articles de cette catégorie */}
            <div className="space-y-4">
                {!articles || articles.length === 0 ? (
                    <div className="p-8 bg-[#121318]/90 border border-[#232631] rounded-xl text-center text-zinc-400 text-sm">
                        Aucun article n'a été rédigé dans cette catégorie pour le moment.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {articles.map((art) => (
                            <Link
                                key={art.id}
                                href={`/wiki/${art.slug}`}
                                className="group bg-[#121318]/90 border border-[#232631] p-5 rounded-xl hover:border-amber-400/50 transition flex flex-col justify-between shadow-lg"
                            >
                                <div className="space-y-2">
                                    <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                                        <FileText className="w-3.5 h-3.5 text-amber-400" />
                                        <span>{category.name}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-zinc-100 group-hover:text-amber-400 transition">
                                        {art.title}
                                    </h3>
                                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                                        {art.content.substring(0, 120)}...
                                    </p>
                                </div>

                                <div className="mt-4 pt-3 border-t border-[#232631] flex items-center justify-between text-xs text-zinc-500">
                                    <span>Publié le {new Date(art.created_at).toLocaleDateString('fr-FR')}</span>
                                    <span className="text-amber-400 font-semibold group-hover:underline flex items-center gap-1">
                                        Lire l'article <ChevronRight className="w-3.5 h-3.5" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}