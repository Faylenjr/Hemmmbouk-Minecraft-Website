import { createClient } from '../../../../utils/supabase/server'
import { createWikiArticle, createWikiCategory } from '../actions'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { PlusCircle, ArrowLeft, Image as ImageIcon, Tag, FileText, Type } from 'lucide-react'

export default async function CreateWikiPage(props: {
    searchParams: Promise<{ error?: string }>
}) {
    const searchParams = await props.searchParams
    const supabase = await createClient()

    // Check session
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect('/login?error=' + encodeURIComponent('Veuillez vous connecter.'))
    }

    // Check rôle admin
    const { data: profil } = await supabase
        .from('profil')
        .select('role')
        .eq('id', user.id)
        .single()

    if (!profil || profil.role !== 'admin') {
        redirect('/?error=' + encodeURIComponent('Accès refusé : Vous n\'avez pas les permissions d\'administrateur.'))
    }

    // Récupération des catégories
    const { data: categories } = await supabase
        .from('wiki_categories')
        .select('*')
        .is('deleted_at', null)
        .order('name')

    return (
        <div className="space-y-6 text-zinc-100 py-4 max-w-3xl mx-auto">
            <Link
                href="/staff"
                className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-amber-400 transition"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour au Dashboard Staff</span>
            </Link>

            <div
                className="bg-[#121318]/90 backdrop-blur-md p-8 rounded-xl border border-[#232631] shadow-2xl space-y-6">
                <div className="space-y-2 border-b border-[#232631] pb-4">
                    <div
                        className="inline-flex p-3 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400">
                        <PlusCircle className="w-6 h-6"/>
                    </div>
                    <h1 className="text-2xl font-extrabold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-amber-300 to-amber-500">
                        Nouveau Guide Wiki (Admin)
                    </h1>
                    <p className="text-xs text-zinc-400">
                        Réservé à l'administration du serveur.
                    </p>
                </div>

                {searchParams.error && (
                    <div
                        className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-xs text-center font-medium">
                        {searchParams.error}
                    </div>
                )}

                <form action={createWikiCategory}
                      className="bg-[#0d0e12] p-4 rounded-xl border border-[#232631] space-y-3 mb-6">
                    <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        + Créer une nouvelle catégorie
                    </h3>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Nom de la catégorie (ex: Grade VIP)"
                            className="flex-1 bg-[#121318] border border-[#232631] text-zinc-100 rounded-lg px-3 py-2 text-xs focus:border-amber-400 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-amber-500 hover:bg-amber-400 text-zinc-950 px-4 py-2 rounded-lg font-bold text-xs transition cursor-pointer"
                        >
                            Ajouter
                        </button>
                    </div>
                </form>

                <form action={createWikiArticle} className="space-y-4">
                    <div>
                        <label
                            className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                            <Type className="w-3.5 h-3.5 text-amber-400"/>
                            Titre de l'article *
                        </label>
                        <input
                            type="text"
                            name="title"
                            required
                            placeholder="Ex: Guide des métiers du serveur"
                            className="w-full bg-[#0d0e12] border border-[#232631] text-zinc-100 placeholder-zinc-600 rounded-lg px-3.5 py-2.5 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition"
                        />
                    </div>

                    <div>
                        <label
                            className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5 text-amber-400"/>
                            Catégorie *
                        </label>
                        <select
                            name="category_id"
                            required
                            className="w-full bg-[#0d0e12] border border-[#232631] text-zinc-100 rounded-lg px-3.5 py-2.5 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition cursor-pointer"
                        >
                            <option value="">-- Sélectionner une catégorie --</option>
                            {categories?.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label
                            className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                            <ImageIcon className="w-3.5 h-3.5 text-zinc-500"/>
                            URL de l'image de couverture (Optionnel)
                        </label>
                        <input
                            type="url"
                            name="image_url"
                            placeholder="https://imgur.com/votre-image.png"
                            className="w-full bg-[#0d0e12] border border-[#232631] text-zinc-100 placeholder-zinc-600 rounded-lg px-3.5 py-2.5 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition"
                        />
                    </div>

                    <div>
                        <label
                            className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-amber-400"/>
                            Contenu de l'article *
                        </label>
                        <textarea
                            name="content"
                            required
                            rows={10}
                            placeholder="Rédigez le contenu..."
                            className="w-full bg-[#0d0e12] border border-[#232631] text-zinc-100 placeholder-zinc-600 rounded-lg px-3.5 py-2.5 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-500 hover:bg-amber-400 py-3 px-4 text-sm font-extrabold text-zinc-950 shadow-[0_0_15px_rgba(245,158,11,0.25)] transition transform hover:-translate-y-0.5 cursor-pointer mt-4"
                    >
                        <PlusCircle className="w-4 h-4"/>
                        <span>Publier l'article</span>
                    </button>
                </form>
            </div>
        </div>
    )
}