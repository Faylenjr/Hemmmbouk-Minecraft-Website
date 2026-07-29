import { createClient } from '../../utils/supabase/server'
import Link from 'next/link'
import { BookOpen, Folder, ChevronRight, FileText } from 'lucide-react'
import WikiSearch from '../../components/WikiSearch'

export const revalidate = 0

export default async function WikiMainPage(props: {
    searchParams: Promise<{ q?: string }>
}) {
    const searchParams = await props.searchParams
    const searchQuery = searchParams.q || ''

    const supabase = await createClient()

    // Récupération des catégories
    const { data: categories } = await supabase
        .from('wiki_categories')
        .select('*')
        .is('deleted_at', null)
        .order('name')

    // Récupération des articles
    let articlesQuery = supabase
        .from('wiki')
        .select('*, wiki_categories(name)')
        .is('deleted_at', null)
        .order('created_at', { ascending: false })

    if (searchQuery) {
        articlesQuery = articlesQuery.ilike('title', `%${searchQuery}%`)
    } else {
        articlesQuery = articlesQuery.limit(6)
    }

    const { data: articles } = await articlesQuery

    return (
        <div className="space-y-8 text-zinc-100 py-4">
            {/* Banner En-tête */}
            <div className="bg-[#121318]/90 backdrop-blur-md p-8 rounded-xl border border-[#232631] shadow-2xl space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <div className="inline-flex p-3 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <h1 className="text-3xl font-extrabold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-amber-300 to-amber-500">
                            Wiki du Serveur
                        </h1>
                        <p className="text-sm text-zinc-400">
                            Guides, tutoriels et informations essentielles sur le serveur.
                        </p>
                    </div>

                    <WikiSearch />
                </div>
            </div>

            {/* Grille des Catégories */}
            {!searchQuery && (
                <section className="space-y-4">
                    <h2 className="text-xl font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                        <Folder className="w-5 h-5 text-amber-400" />
                        Catégories
                    </h2>

                    {!categories || categories.length === 0 ? (
                        <div className="p-6 bg-[#121318]/90 border border-[#232631] rounded-xl text-center text-zinc-500 text-sm">
                            Aucune catégorie disponible.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {categories.map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`/wiki/category/${cat.slug}`}
                                    className="group bg-[#121318]/90 border border-[#232631] p-5 rounded-xl hover:border-amber-400/50 transition shadow-lg flex flex-col justify-between"
                                >
                                    <div>
                                        <h3 className="text-lg font-bold text-zinc-100 group-hover:text-amber-400 transition">
                                            {cat.name}
                                        </h3>
                                        <p className="text-xs text-zinc-500 mt-1">
                                            Explore les guides de cette catégorie.
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-[#232631] flex items-center justify-between text-xs font-semibold text-amber-400">
                                        <span>Voir la catégorie</span>
                                        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            )}

            {/* Liste des Articles */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-amber-400" />
                        {searchQuery ? `Résultats pour "${searchQuery}"` : 'Articles Récents'}
                    </h2>
                    {searchQuery && articles && (
                        <span className="text-xs text-zinc-400">
              {articles.length} article(s) trouvé(s)
            </span>
                    )}
                </div>

                {!articles || articles.length === 0 ? (
                    <div className="p-8 bg-[#121318]/90 border border-[#232631] rounded-xl text-center text-zinc-400 text-sm">
                        {searchQuery
                            ? `Aucun article ne correspond à la recherche "${searchQuery}".`
                            : 'Aucun article rédigé pour le moment.'}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {articles.map((art) => (
                            <Link
                                key={art.id}
                                href={`/wiki/${art.slug}`}
                                className="group bg-[#121318]/90 border border-[#232631] p-5 rounded-xl hover:border-amber-400/50 transition flex flex-col justify-between"
                            >
                                <div className="space-y-2">
                                    <div className="inline-block px-2.5 py-0.5 text-[10px] uppercase font-extrabold bg-amber-400/10 text-amber-400 border border-amber-400/20 rounded">
                                        {art.wiki_categories?.name || 'Général'}
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
            </section>
        </div>
    )
}