import { createClient } from '../../../utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Folder } from 'lucide-react'

export default async function WikiArticlePage(props: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await props.params
    const supabase = await createClient()

    // Récupération de l'article avec sa catégorie et l'auteur
    const { data: article } = await supabase
        .from('wiki')
        .select('*, wiki_categories(name), profil(username)')
        .eq('slug', slug)
        .is('deleted_at', null)
        .single()

    if (!article) {
        notFound() // Renvoie une page 404 propre si le slug n'existe pas
    }

    return (
        <div className="space-y-6 text-zinc-100 py-4 max-w-4xl mx-auto">
            {/* Bouton retour */}
            <Link
                href="/wiki"
                className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-amber-400 transition"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour au Wiki</span>
            </Link>

            {/* Carte Article */}
            <article className="bg-[#121318]/90 backdrop-blur-md p-8 rounded-xl border border-[#232631] shadow-2xl space-y-6">

                {/* Métadonnées de l'article */}
                <div className="space-y-3 border-b border-[#232631] pb-6">
                    <div className="inline-block px-3 py-1 text-xs uppercase font-extrabold bg-amber-400/10 text-amber-400 border border-amber-400/20 rounded-md">
                        {article.wiki_categories?.name || 'Général'}
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-500">
                        {article.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-2">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
                {article.profil?.username || 'Équipe Staff'}
            </span>
                        <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                            {new Date(article.created_at).toLocaleDateString('fr-FR')}
            </span>
                    </div>
                </div>

                {/* Image de couverture si présente */}
                {article.image_url && (
                    <div className="aspect-video w-full rounded-xl overflow-hidden border border-[#232631]">
                        <img
                            src={article.image_url}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Contenu textuel de l'article */}
                <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-4 whitespace-pre-wrap">
                    {article.content}
                </div>
            </article>
        </div>
    )
}