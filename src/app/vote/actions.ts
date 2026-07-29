'use server'

import { createClient } from '../../utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function submitVote(formData: FormData) {
    const supabase = await createClient()

    // Check session du joueur
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login?error=' + encodeURIComponent('Vous devez être connecté pour voter.'))
    }

    const election_id = parseInt(formData.get('election_id') as string, 10)
    const choice = formData.get('choice') as string // 'for' ou 'against'

    if (!election_id || !choice) {
        redirect('/vote?error=' + encodeURIComponent('Données de vote invalides.'))
    }

    // Check de si l'élection existe
    const { data: election } = await supabase
        .from('election')
        .select('*')
        .eq('id', election_id)
        .is('deleted_at', null)
        .single()

    if (!election) {
        redirect('/vote?error=' + encodeURIComponent('Élection introuvable.'))
    }

    // Check de la date de fin
    const now = new Date()
    if (new Date(election.end_date) < now) {
        redirect('/vote?error=' + encodeURIComponent('Cette élection est déjà terminée.'))
    }

    // Check de si le joueur a déjà voté
    const { data: existingVote } = await supabase
        .from('vote')
        .select('id')
        .eq('election_id', election_id)
        .eq('profil_id', user.id)
        .maybeSingle()

    if (existingVote) {
        redirect('/vote?error=' + encodeURIComponent('Vous avez déjà voté pour cette élection !'))
    }

    // Enregistrement du vote
    const { error: voteError } = await supabase.from('vote').insert({
        election_id,
        profil_id: user.id,
        choice,
    })

    if (voteError) {
        console.error('Erreur enregistrement vote:', voteError)
        redirect('/vote?error=' + encodeURIComponent('Erreur lors de l\'enregistrement de votre vote.'))
    }

    // Update du compteur dans l'élection
    const newVotesFor = choice === 'for' ? election.votes_for + 1 : election.votes_for
    const newVotesAgainst = choice === 'against' ? election.votes_against + 1 : election.votes_against

    await supabase
        .from('election')
        .update({
            votes_for: newVotesFor,
            votes_against: newVotesAgainst,
            updated_at: new Date().toISOString(),
        })
        .eq('id', election_id)

    revalidatePath('/vote')
    redirect('/vote?success=' + encodeURIComponent('Votre vote a bien été pris en compte.'))
}