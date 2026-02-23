import React from 'react';
import { Card } from '../components/Card';
import { Search, Building2, ExternalLink, MoreVertical, Shield, Globe } from 'lucide-react';
import { Badge } from '../components/Badge';

const SuperAdminCompanies = () => {
    const companies = [
        { id: 1, name: 'Serrurerie Sam & Fils', siret: '123 456 789 00012', location: 'Paris, France', users: 3, quotes: 145, status: 'Vérifié' },
        { id: 2, name: 'Paris Dépannage BTP', siret: '987 654 321 00034', location: 'Lyon, France', users: 8, quotes: 432, status: 'Vérifié' },
        { id: 3, name: 'Petit BTP Services', siret: '456 789 123 00056', location: 'Marseille, France', users: 1, quotes: 12, status: 'En attente' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Shield size={18} className="text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Console Super Admin</span>
                    </div>
                    <h1 className="text-3xl font-bold font-clash">Gestion des Entreprises</h1>
                </div>
            </div>

            <Card className="overflow-hidden border-slate-100">
                <div className="p-4 border-b border-slate-50 flex items-center gap-4 bg-slate-50/30">
                    <div className="relative flex-grow max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Rechercher par nom, SIRET ou ville..."
                            className="w-full h-11 pl-12 pr-4 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-50">
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Entreprise</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Localisation</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stats</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Statut</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {companies.map((company) => (
                                <tr key={company.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                                                <Building2 size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{company.name}</p>
                                                <p className="text-xs text-slate-500">SIRET: {company.siret}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-slate-600">
                                            <Globe size={14} className="text-slate-400" />
                                            <span className="text-sm">{company.location}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-0.5">
                                            <p className="text-xs text-slate-600 font-bold">{company.users} Utilisateurs</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{company.quotes} Devis</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant={company.status === 'Vérifié' ? 'success' : 'warning'}>
                                            {company.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 text-slate-400">
                                            <button className="p-2 hover:text-slate-900 transition-colors">
                                                <ExternalLink size={18} />
                                            </button>
                                            <button className="p-2 hover:text-slate-900 transition-colors">
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default SuperAdminCompanies;
