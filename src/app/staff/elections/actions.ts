// src/app/staff/elections/actions.ts
'use server'

import { createClient } from '../../../utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createElectionWithLaw(formData: FormData) {
    const supabase = await createClient()

    // 1. Vérification session Admin
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: profil } = await supabase
        .from('profil')
        .select('role')
        .eq('id', user.id)
        .single()

    if (!profil || profil.role !== 'admin') {
        redirect('/?error=' + encodeURIComponent('Accès refusé.'))
    }

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const end_days = parseInt(formData.get('end_days') as string || '7', 10)

    const law_title = formData.get('law_title') as string
    const law_content = formData.get('law_content') as string

    if (!title) {
        redirect('/staff/elections/create?error=' + encodeURIComponent('Le titre est obligatoire.'))
    }

    // Calcul des dates
    const now = new Date()
    const endDate = new Date(now.getTime() + end_days * 24 * 60 * 60 * 1000)

    // 2. Création de l'Élection
    const { data: election, error: electionError } = await supabase
        .from('election')
        .insert({
            title,
            description,
            start_date: now.toISOString(),
            end_date: endDate.toISOString(),
            votes_for: 0,
            votes_against: 0,
        })
        .select()
        .single()

    if (electionError || !election) {
        console.error('Erreur élection:', electionError)
        redirect('/staff/elections/create?error=' + encodeURIComponent('Erreur lors de la création de l\'élection.'))
    }

    // 3. Création optionnelle du Projet de Loi lié
    if (law_title && law_content) {
        await supabase.from('law').insert({
            title: law_title,
            content: law_content,
            election_id: election.id,
            status: 'pending',
        })
    }

    revalidatePath('/vote')
    redirect('/vote?success=' + encodeURIComponent('L\'élection a été lancée avec succès !'))
}