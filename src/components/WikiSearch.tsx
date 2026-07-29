'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { useState, useTransition } from 'react'

export default function WikiSearch() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()

    const initialQuery = searchParams.get('q') || ''
    const [query, setQuery] = useState(initialQuery)

    const handleSearch = (term: string) => {
        setQuery(term)
        const params = new URLSearchParams(searchParams.toString())

        if (term) {
            params.set('q', term)
        } else {
            params.delete('q')
        }

        startTransition(() => {
            router.push(`/wiki?${params.toString()}`)
        })
    }

    const clearSearch = () => {
        setQuery('')
        router.push('/wiki')
    }

    return (
        <div className="relative w-full max-w-md">
            <div className="relative flex items-center">
                <Search className="absolute left-3.5 w-4 h-4 text-zinc-400" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Rechercher un article du wiki..."
                    className="w-full bg-[#0d0e12] border border-[#232631] text-zinc-100 placeholder-zinc-500 text-sm rounded-lg pl-10 pr-10 py-2.5 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition"
                />
                {query && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-3 p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
            {isPending && (
                <span className="absolute right-12 top-3 text-[10px] text-amber-400 font-semibold animate-pulse">
                    Recherche...
                </span>
            )}
        </div>
    )
}