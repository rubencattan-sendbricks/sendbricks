import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Badge } from '../components/Badge';
import {
    Plus, Search,
    Filter,
    FileText,
    Clock,
    CheckCircle2,
    AlertCircle,
    MoreHorizontal,
    ArrowUpRight,
    Download
} from 'lucide-react';
import { cn } from '../utils/cn';
import { useQuotes } from '../hooks/useQuotes';

const QuoteRow = ({ quote, onClick }) => (
    <div
        onClick={onClick}
        className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group rounded-xl border border-transparent hover:border-slate-100 cursor-pointer"
    >
        <div className="flex items-center gap-4">
            <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                quote.status === 'Signé' ? "bg-green-50 text-green-600" :
                    quote.status === 'En attente' ? "bg-blue-50 text-blue-600" :
                        "bg-slate-50 text-slate-400"
            )}>
                <FileText size={24} />
            </div>
            <div>
                <div className="flex items-center gap-2">
                    <h3 className="font-bold font-clash">{quote.ref}</h3>
                    <Badge variant="outline" className={cn(
                        "text-[9px] uppercase font-mono px-2 py-0",
                        quote.status === 'Signé' ? "text-green-600 border-green-200" :
                            quote.status === 'En attente' ? "text-blue-600 border-blue-200" :
                                "text-slate-400 border-slate-200"
                    )}>
                        {quote.status}
                    </Badge>
                </div>
                <p className="text-xs text-slate-500 mt-1 font-bold">{quote.client} • {quote.date}</p>
            </div>
        </div>
        <div className="flex items-center gap-10">
            <div className="text-right">
                <p className="font-bold font-mono text-lg">{quote.amount}</p>
                <div className="flex items-center justify-end gap-1 text-[9px] text-slate-400 font-bold uppercase">
                    <Clock size={10} />
                    <span>Modifié il y a {quote.lastModified}</span>
                </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-slate-400 hover:text-slate-900"
                    onClick={(e) => { e.stopPropagation(); /* Download logic */ }}
                >
                    <Download size={18} />
                </Button>
                <div className="h-9 w-9 flex items-center justify-center text-blue-600">
                    <ArrowUpRight size={18} />
                </div>
            </div>
        </div>
    </div>
);

const QuotesList = () => {
    const navigate = useNavigate();
    const { quotes, isLoading } = useQuotes();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold font-clash tracking-tight">Historique Devis</h1>
                <p className="text-slate-500 mt-2">Suivez et gérez l'ensemble de vos propositions commerciales.</p>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-blue-600 text-white border-0 shadow-lg shadow-blue-200">
                    <CardContent className="p-6">
                        <p className="text-blue-100 text-xs font-bold uppercase tracking-widest">En attente</p>
                        <div className="flex items-end justify-between mt-2">
                            <h3 className="text-3xl font-bold font-clash">12 Devis</h3>
                            <AlertCircle size={32} className="opacity-20" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-green-600 text-white border-0 shadow-lg shadow-green-200">
                    <CardContent className="p-6">
                        <p className="text-green-100 text-xs font-bold uppercase tracking-widest">Signés (Ce mois)</p>
                        <div className="flex items-end justify-between mt-2">
                            <h3 className="text-3xl font-bold font-clash">8 Devis</h3>
                            <CheckCircle2 size={32} className="opacity-20" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900 text-white border-0 shadow-lg shadow-slate-200">
                    <CardContent className="p-6">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Taux conversion</p>
                        <div className="flex items-end justify-between mt-2">
                            <h3 className="text-3xl font-bold font-clash">64%</h3>
                            <ArrowUpRight size={32} className="opacity-20" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="border-b border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <Input placeholder="Rechercher par référence, client..." className="pl-10" />
                        </div>
                        <Button variant="outline" className="gap-2">
                            <Filter size={18} />
                            Statut
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-2">
                    <div className="divide-y divide-slate-100">
                        {quotes.map((q, i) => (
                            <QuoteRow
                                key={i}
                                quote={q}
                                onClick={() => navigate(`/admin/quotes/${q.ref}`)}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default QuotesList;
