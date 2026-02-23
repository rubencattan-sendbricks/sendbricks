import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import {
    Download,
    Mail,
    ArrowLeft,
    FileText,
    Calendar,
    CheckCircle2,
    CreditCard,
    ExternalLink
} from 'lucide-react';
import { cn } from '../utils/cn';
import DocumentPreview from '../components/DocumentPreview';

const InvoiceDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/admin/invoices')} className="hover:bg-white text-slate-400">
                        <ArrowLeft size={20} />
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold font-clash tracking-tight">Facture #{id || 'FAC-24A-012'}</h1>
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0">Envoyée</Badge>
                        </div>
                        <p className="text-slate-400 text-sm mt-1">Client: **Mme. Durand** • Émise le 30 Janvier 2024</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2 rounded-xl">
                        <Download size={18} />
                        Télécharger PDF
                    </Button>
                    <Button className="bg-slate-900 text-white gap-2 hover:bg-slate-800 rounded-xl px-6">
                        <Mail size={18} />
                        Renvoyer par email
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Status Tracker */}
                    <Card className="border-slate-200">
                        <CardHeader>
                            <CardTitle className="text-lg">Suivi du paiement</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600">
                                        <Calendar size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Échéance</p>
                                        <p className="text-xl font-bold font-clash">15 Février 2024</p>
                                    </div>
                                </div>
                                <div className="h-10 w-px bg-slate-200" />
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-600">
                                        <CreditCard size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Reste à payer</p>
                                        <p className="text-xl font-bold font-clash">840.00 €</p>
                                    </div>
                                </div>
                                <Button className="bg-emerald-600 text-white gap-2 hover:bg-emerald-700 rounded-xl px-6">
                                    <CheckCircle2 size={18} />
                                    Marquer comme payée
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* High Fidelity Preview */}
                    <Card className="border-slate-200 overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between bg-slate-50/50 border-b border-slate-100">
                            <CardTitle className="text-sm uppercase tracking-widest text-slate-400 font-bold">Aperçu du document</CardTitle>
                            <Button variant="ghost" size="sm" className="gap-2 text-[10px] font-bold uppercase tracking-widest">
                                <ExternalLink size={14} />
                                Plein écran
                            </Button>
                        </CardHeader>
                        <CardContent className="p-12 bg-slate-100 flex items-center justify-center">
                            <div className="w-full max-w-[600px] transform hover:scale-[1.02] transition-transform duration-500">
                                <DocumentPreview
                                    document={{
                                        type: 'FACTURE',
                                        numero: 'FAC-2024-012',
                                        totalHT: 763.64,
                                        montantTVA: 76.36,
                                        totalTTC: 840.00,
                                        lignes: [
                                            { description: 'Installation volet roulant', qty: 1, price: 650.00 },
                                            { description: 'Forfait déplacement', qty: 1, price: 113.64 }
                                        ]
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Informations Client</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 bg-slate-50 rounded-xl space-y-3">
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Client</p>
                                    <p className="text-sm font-bold">Mme. Durand</p>
                                    <p className="text-xs text-slate-500">durand@email.com</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Adresse</p>
                                    <p className="text-xs text-slate-600">45 Avenue des Champs-Élysées, 75008 Paris</p>
                                </div>
                            </div>
                            <Button variant="ghost" className="w-full text-blue-600 hover:bg-blue-50 font-bold text-xs uppercase tracking-widest">
                                Modifier le client
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default InvoiceDetails;
