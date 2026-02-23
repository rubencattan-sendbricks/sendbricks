import React from 'react';
import { Card } from '../components/Card';
import { Users, Building2, FileText, TrendingUp, AlertCircle, Shield } from 'lucide-react';

const SuperAdminDashboard = () => {
    const stats = [
        { label: 'Artisans Actifs', value: '124', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Entreprises', value: '89', icon: Building2, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Devis Générés', value: '1,432', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Volume d\'Affaires', value: '452k€', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    const alerts = [
        { id: 1, type: 'warning', message: '3 nouveaux comptes en attente de vérification SIRET.', time: 'Il y a 2h' },
        { id: 2, type: 'info', message: 'Mise à jour système prévue ce soir à 23h.', time: 'Il y a 5h' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Shield size={18} className="text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Console Super Admin</span>
                    </div>
                    <h1 className="text-3xl font-bold font-clash">Vue d'ensemble du système</h1>
                </div>
                <div className="flex gap-2 text-[10px] font-bold uppercase tracking-widest">
                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        Système Opérationnel
                    </span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="p-6 group hover:border-slate-300 transition-all border-dashed">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shrink-0`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                <p className="text-2xl font-bold font-clash mt-0.5">{stat.value}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Alerts/Notifications */}
                <div className="lg:col-span-1 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <AlertCircle size={16} />
                        Alertes Système
                    </h3>
                    <div className="space-y-3">
                        {alerts.map(alert => (
                            <div key={alert.id} className="p-4 bg-white border border-slate-100 rounded-2xl space-y-1 shadow-sm">
                                <p className="text-sm text-slate-700 font-medium">{alert.message}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{alert.time}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Placeholder for Graphic/Activity */}
                <div className="lg:col-span-2">
                    <Card className="h-full min-h-[300px] flex flex-col items-center justify-center border-dashed bg-slate-50/50 p-8 text-center space-y-4">
                        <div className="w-16 h-16 bg-slate-200 rounded-3xl flex items-center justify-center text-slate-400">
                            <TrendingUp size={32} />
                        </div>
                        <div className="max-w-xs">
                            <h3 className="text-lg font-bold">Activité Réseaux</h3>
                            <p className="text-sm text-slate-500">Le graphique détaillé de croissance sera disponible dès que les premières transactions réelles seront enregistrées.</p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
