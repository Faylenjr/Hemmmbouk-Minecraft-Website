import { AlertCircle, CheckCircle2, Info } from 'lucide-react'

interface NoticeProps {
    type?: 'error' | 'success' | 'info'
    title?: string
    message: string
}

export default function Notice({ type = 'error', title, message }: NoticeProps) {
    const styles = {
        error: {
            bg: 'bg-red-500/10 border-red-500/20 text-red-400',
            icon: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />,
        },
        success: {
            bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
            icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
        },
        info: {
            bg: 'bg-amber-400/10 border-amber-400/20 text-amber-400',
            icon: <Info className="w-5 h-5 text-amber-400 shrink-0" />,
        },
    }

    const currentStyle = styles[type]

    return (
        <div className={`flex items-center gap-3 p-4 rounded-xl border backdrop-blur-md ${currentStyle.bg} shadow-lg text-sm transition`}>
            {currentStyle.icon}
            <div>
                {title && <h4 className="font-bold text-xs uppercase tracking-wider mb-0.5">{title}</h4>}
                <p className="text-xs text-zinc-300">{message}</p>
            </div>
        </div>
    )
}