import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import {
    FileText,
    Users,
    TrendingUp,
    Clock,
    Plus,
    ArrowRight
} from 'lucide-react';

const StatCard = ({ title, value, description, icon: Icon, trend }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 font-mono">{title}</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600">
                <Icon size={18} />
            </div>
        </CardHeader>
        <CardContent>
            <div className="text-3xl font-bold font-clash">{value}</div>
            <div className="flex items-center gap-1 mt-1 text-xs text-green-600 font-semibold">
                <TrendingUp size={12} />
                <span>{trend}</span>
                <span className="text-slate-400 font-normal">vs mois dernier</span>
            </div>
        </CardContent>
    </Card>
);

const Home = () => {
    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold font-clash tracking-tight">Tableau de bord</h1>
                    <p className="text-slate-500 mt-1">Gérez vos devis et suivez votre activité en temps réel.</p>
                </div>
                <Button className="gap-2">
                    <Plus size={20} />
                    <span>Nouveau Devis</span>
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Devis émis"
                    value="24"
                    icon={FileText}
                    trend="+12%"
                />
                <StatCard
                    title="Chiffre d'Affaires"
                    value="12,450 €"
                    icon={TrendingUp}
                    trend="+8.5%"
                />
                <StatCard
                    title="Nouveaux Clients"
                    value="18"
                    icon={Users}
                    trend="+15%"
                />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Devis récents</CardTitle>
                        <CardDescription>Les derniers devis envoyés à vos clients.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="divide-y divide-slate-100">
                            {[
                                { ref: 'DEV-2401-001', client: 'Jean Dupont', total: '450.00 €', status: 'signed', date: 'Il y a 2h' },
                                { ref: 'DEV-2401-002', client: 'Marie Martin', total: '1,200.00 €', status: 'sent', date: 'Il y a 5h' },
                                { ref: 'DEV-2401-003', client: 'SARL TechFlow', total: '890.00 €', status: 'draft', date: 'Hier' },
                            ].map((quote, i) => (
                                <div key={i} className="py-4 flex items-center justify-between group cursor-pointer">
                                    <div className="space-y-1">
                                        <p className="font-bold font-clash">{quote.client}</p>
                                        <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">{quote.ref} • {quote.date}</p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="font-bold font-mono">{quote.total}</p>
                                            <Badge variant={quote.status === 'signed' ? 'success' : quote.status === 'sent' ? 'warning' : 'secondary'}>
                                                {quote.status === 'signed' ? 'Signé' : quote.status === 'sent' ? 'Envoyé' : 'Brouillon'}
                                            </Badge>
                                        </div>
                                        <ArrowRight size={18} className="text-slate-300 group-hover:text-slate-900 transition-colors translate-x-0 group-hover:translate-x-1" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="link" className="mt-4 px-0 flex items-center gap-2">
                            Voir tous les devis <ArrowRight size={14} />
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Répartitions</CardTitle>
                        <CardDescription>Par statut de devis.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-semibold">
                                <span>Signés</span>
                                <span>65%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[65%]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-semibold">
                                <span>En attente</span>
                                <span>25%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 w-[25%]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-semibold">
                                <span>Refusés</span>
                                <span>10%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-red-400 w-[10%]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Home;
