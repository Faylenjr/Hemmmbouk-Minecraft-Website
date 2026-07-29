'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '../../../utils/supabase/server'

function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
}

export async function createWikiArticle(formData: FormData) {
    const supabase = await createClient()

    // Check de l'authentification
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        redirect('/login?error=' + encodeURIComponent('Connexion requise.'))
    }

    // Check du RÔLE ADMIN dans la table `profil`
    const { data: profil } = await supabase
        .from('profil')
        .select('role')
        .eq('id', user.id)
        .single()

    if (!profil || profil.role !== 'admin') {
        redirect('/?error=' + encodeURIComponent('Accès refusé : Réservé aux administrateurs.'))
    }

    // Traitement des données du formulaire
    const title = formData.get('title') as string
    const category_id = formData.get('category_id') as string
    const content = formData.get('content') as string
    const image_url = (formData.get('image_url') as string) || null

    if (!title || !category_id || !content) {
        redirect('/staff/wiki/create?error=' + encodeURIComponent('Veuillez remplir tous les champs obligatoires.'))
    }

    const slug = slugify(title)

    // Insertion dans la table `wiki`
    const { error } = await supabase.from('wiki').insert({
        title,
        slug,
        content,
        category_id,
        author_id: user.id,
        image_url,
    })

    if (error) {
        console.error('Erreur Supabase Wiki:', error)
        redirect('/staff/wiki/create?error=' + encodeURIComponent('Erreur lors de la création : ' + error.message))
    }

    revalidatePath('/wiki')
    redirect('/wiki/' + slug)
}

export async function createWikiCategory(formData: FormData) {
    const supabase = await createClient()

    // Check session & rôle admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: profil } = await supabase
        .from('profil')
        .select('role')
        .eq('id', user.id)
        .single()

    if (!profil || profil.role !== 'admin') {
        redirect('/?error=' + encodeURIComponent('Accès refusé.'))
    }

    const name = formData.get('name') as string
    if (!name) return

    const slug = slugify(name)

    const { error } = await supabase.from('wiki_categories').insert({
        name,
        slug,
    })

    if (error) {
        console.error('Erreur création catégorie:', error)
    }

    revalidatePath('/staff/wiki/create')
}