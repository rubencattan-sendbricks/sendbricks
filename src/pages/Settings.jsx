import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Badge } from '../components/Badge';
import {
    Building2,
    MapPin,
    Globe,
    ShieldCheck,
    FileText,
    RefreshCcw,
    AlertCircle,
    CreditCard,
    ExternalLink,
    CheckCircle2
} from 'lucide-react';

const Settings = () => {
    return (
        <div className="space-y-8 pb-20">
            <div>
                <h1 className="text-4xl font-bold font-clash tracking-tight">Paramètres</h1>
                <p className="text-slate-500 mt-1">Gérez votre entreprise et vos documents légaux.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Company Info */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-900">
                                <Building2 size={24} />
                            </div>
                            <div>
                                <CardTitle>Profil Entreprise</CardTitle>
                                <CardDescription>Informations apparaissant sur vos devis et factures.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nom Commercial</label>
                                <Input defaultValue="Serrurerie Sam & Fils" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">SIRET</label>
                                <Input defaultValue="123 456 789 00012" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Code APE</label>
                                <Input defaultValue="43.32B" />
                            </div>
                            <div className="col-span-2 space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Adresse Siège</label>
                                <Input defaultValue="12 rue de la Paix, 75002 Paris" />
                            </div>
                        </div>
                        <Button className="w-full mt-4">Enregistrer les modifications</Button>
                    </CardContent>
                </Card>

                {/* CGV Generator */}
                <Card className="border-blue-100 bg-blue-50/10">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <CardTitle>Conditions Générales (CGV)</CardTitle>
                                <CardDescription>Génération automatique basée sur votre profil.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-4 bg-white border border-blue-100 rounded-xl space-y-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <Badge variant="success" className="mb-2">Généré le 30/01/24</Badge>
                                    <p className="text-sm font-bold font-clash">Version 1.2 (Standard BTP)</p>
                                </div>
                                <Button variant="ghost" size="icon" className="text-blue-600">
                                    <RefreshCcw size={18} />
                                </Button>
                            </div>
                            <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                                Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre la société Serrurerie Sam & Fils et son client...
                            </p>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
                            <AlertCircle className="text-amber-600 mt-1 flex-shrink-0" size={18} />
                            <div>
                                <p className="text-xs font-bold text-amber-900">Validation requise</p>
                                <p className="text-[10px] text-amber-700 leading-tight mt-1">
                                    Vous devez valider manuellement ces CGV pour qu'elles soient jointes à vos prochains devis PDF.
                                </p>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 gap-2">
                            <FileText size={18} />
                            Éditer et Valider les CGV
                        </Button>
                    </CardContent>
                </Card>

                {/* Subscription Plan */}
                <Card className="border-slate-200">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                                <CreditCard size={24} />
                            </div>
                            <div>
                                <CardTitle>Ton Abonnement SendBricks</CardTitle>
                                <CardDescription>Gérez votre forfait et vos factures.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            <div>
                                <Badge className="bg-blue-600 mb-2 font-mono">Plan PRO</Badge>
                                <p className="text-2xl font-bold font-clash">29.00 € <span className="text-sm font-normal text-slate-400">/ mois</span></p>
                                <p className="text-xs text-slate-500 mt-1 font-bold">Prochain renouvellement le 28 Fév. 2024</p>
                            </div>
                            <Button variant="outline" className="gap-2 rounded-xl bg-white shadow-sm border-slate-200 font-bold text-xs uppercase tracking-widest">
                                <ExternalLink size={16} />
                                Gérer
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
                                <ShieldCheck size={14} className="text-slate-300" />
                                Paiements Clients (Stripe Connect)
                            </div>
                            <div className="p-4 border border-green-100 bg-green-50/30 rounded-2xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white">
                                        <CheckCircle2 size={16} />
                                    </div>
                                    <p className="text-sm font-bold text-green-700">Compte Stripe lié & actif</p>
                                </div>
                                <Button variant="ghost" size="sm" className="text-green-600 font-bold hover:bg-green-50 uppercase text-[10px] tracking-widest">Modifier</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Settings;
