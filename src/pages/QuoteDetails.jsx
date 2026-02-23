import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import {
    History,
    Eye,
    RotateCcw,
    ExternalLink,
    Download,
    Mail,
    Clock,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    ArrowLeft,
    FileText,
    User
} from 'lucide-react';
import { cn } from '../utils/cn';
import DocumentPreview from '../components/DocumentPreview';
import { useQuote } from '../hooks/useQuotes';
import { useInvoices } from '../hooks/useInvoices';

const QuoteDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: quote, isLoading } = useQuote(id);
    const { createInvoice, isCreating } = useInvoices();

    const handleCreateInvoice = async () => {
        try {
            await createInvoice({
                quoteId: id,
                client: quote.client,
                amount: quote.amount,
                date: new Date().toLocaleDateString('fr-FR')
            });
            navigate('/admin/invoices');
        } catch (error) {
            console.error('Failed to create invoice:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
            </div>
        );
    }

    // Mock History Data
    const versions = [
        { id: 'v3', date: 'Aujourd\'hui, 10:15', author: 'Sam (Artisan)', total: '389.00 €', status: 'Dernière', active: true },
        { id: 'v2', date: '30 Janv. 2024, 14:20', author: 'Sam (Artisan)', total: '314.00 €', status: 'Modifié', active: false },
        { id: 'v1', date: '30 Janv. 2024, 09:05', author: 'Sam (Artisan)', total: '209.00 €', status: 'Initial', active: false },
    ];

    const events = [
        { title: 'Deivs signé', date: '31 Janv. 2024, 18:30', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' },
        { title: 'Devis consulté par le client', date: '31 Janv. 2024, 18:15', icon: Eye, color: 'text-blue-500', bg: 'bg-blue-50' },
        { title: 'Lien envoyé par Email', date: '30 Janv. 2024, 09:10', icon: Mail, color: 'text-slate-500', bg: 'bg-slate-50' },
    ];

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/admin/quotes')} className="hover:bg-white">
                        <ArrowLeft size={20} />
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold font-clash tracking-tight">Devis #{id || 'DEV-24A-082'}</h1>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0">Signé</Badge>
                        </div>
                        <p className="text-slate-400 text-sm mt-1">Client: **Jean Dupont** • Créé le 30 Janvier 2024</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2 rounded-xl">
                        <Download size={18} />
                        PDF
                    </Button>
                    <Button className="bg-slate-900 text-white gap-2 hover:bg-slate-800 rounded-xl px-6">
                        <ExternalLink size={18} />
                        Voir comme le client
                    </Button>
                    <Button
                        onClick={handleCreateInvoice}
                        disabled={isCreating}
                        className="bg-blue-600 text-white gap-2 hover:bg-blue-700 rounded-xl px-6 shadow-lg shadow-blue-100"
                    >
                        {isCreating ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                            <FileText size={18} />
                        )}
                        {isCreating ? 'Génération...' : 'Facturer ce devis'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main: History & Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Versions Card */}
                    <Card className="border-slate-200">
                        <CardHeader className="flex flex-row items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-slate-900 text-white rounded-lg">
                                    <History size={18} />
                                </div>
                                <div>
                                    <CardTitle className="text-lg">Historique des versions</CardTitle>
                                    <CardDescription>Le client voit toujours la version active.</CardDescription>
                                </div>
                            </div>
                            <Button size="sm" onClick={() => navigate(`/admin/quotes/new?edit=${id}`)} className="rounded-lg gap-2">
                                <RotateCcw size={14} />
                                Modifier / Nouvelle version
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-slate-100">
                                {versions.map((v) => (
                                    <div
                                        key={v.id}
                                        className={cn(
                                            "flex items-center justify-between p-6 transition-colors hover:bg-slate-50/50",
                                            v.active && "bg-blue-50/30 border-l-4 border-l-blue-600"
                                        )}
                                    >
                                        <div className="flex gap-4 items-center">
                                            <div className={cn(
                                                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs",
                                                v.active ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                                            )}>
                                                {v.id.toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-bold font-clash">{v.total}</p>
                                                    <Badge variant="outline" className="text-[9px] uppercase tracking-tighter py-0">
                                                        {v.status}
                                                    </Badge>
                                                </div>
                                                <p className="text-xs text-slate-400 font-mono mt-0.5">{v.date} par {v.author}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="sm" className="gap-2 text-slate-500 rounded-lg">
                                                <Eye size={14} />
                                                Visionner
                                            </Button>
                                            {!v.active && (
                                                <Button variant="ghost" size="sm" className="gap-2 text-blue-600 hover:text-blue-700 rounded-lg">
                                                    <RotateCcw size={14} />
                                                    Rétablir
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* High Fidelity Preview */}
                    <Card className="border-slate-200 overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between bg-slate-50/50 border-b border-slate-100">
                            <CardTitle className="text-sm uppercase tracking-widest text-slate-400 font-bold">Rendu Client (Version Active)</CardTitle>
                            <Button variant="ghost" size="sm" className="gap-2 text-[10px] font-bold uppercase tracking-widest">
                                <ExternalLink size={14} />
                                Plein écran
                            </Button>
                        </CardHeader>
                        <CardContent className="p-12 bg-slate-100 flex items-center justify-center">
                            <div className="w-full max-w-[600px] transform hover:scale-[1.02] transition-transform duration-500">
                                <DocumentPreview
                                    document={{
                                        type: 'DEVIS',
                                        totalHT: 353.64,
                                        montantTVA: 35.36,
                                        totalTTC: 389.00,
                                        lignes: [
                                            { description: 'Cylindre de haute sécurité', qty: 1, price: 89.00 },
                                            { description: 'Forfait pose serrure', qty: 1, price: 120.00 },
                                            { description: 'Clés supplémentaires', qty: 2, price: 30.00 }
                                        ]
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar: Status & Info */}
                <div className="space-y-6">
                    {/* Activity Log */}
                    <Card className="border-0 bg-slate-50 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <Clock size={18} className="text-slate-400" />
                                Journal d'activité
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {events.map((event, i) => (
                                <div key={i} className="flex gap-4 relative">
                                    {i !== events.length - 1 && (
                                        <div className="absolute left-[18px] top-8 bottom-[-24px] w-px bg-slate-200" />
                                    )}
                                    <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm", event.bg)}>
                                        <event.icon size={18} className={event.color} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold font-clash">{event.title}</p>
                                        <p className="text-[10px] text-slate-400 font-mono italic">{event.date}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Client Snapshot */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <User size={18} className="text-slate-400" />
                                Infos Client
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 bg-slate-50 rounded-xl space-y-3">
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Contact</p>
                                    <p className="text-sm font-bold">Jean Dupont</p>
                                    <p className="text-xs text-slate-500">jean.dupont@email.com</p>
                                    <p className="text-xs text-slate-500">06 12 34 56 78</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Adresse</p>
                                    <p className="text-xs text-slate-600">12 Rue de la Paix, 75002 Paris</p>
                                    <div className="flex gap-2 mt-1">
                                        <Badge variant="outline" className="text-[9px]">4ème Étage</Badge>
                                        <Badge variant="outline" className="text-[9px]">Code: 1234</Badge>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Button variant="ghost" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 gap-2 font-bold text-xs uppercase tracking-widest">
                        <AlertCircle size={14} />
                        Annuler ce devis
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default QuoteDetails;
