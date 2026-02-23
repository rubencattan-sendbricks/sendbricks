import React from 'react';
import { Card } from '../components/Card';
import { Search, UserPlus, Filter, MoreVertical, Shield, User } from 'lucide-react';
import { Badge } from '../components/Badge';

const SuperAdminUsers = () => {
    const users = [
        { id: 1, name: 'Samuel Martin', email: 'sam@serrurerie-sam.fr', company: 'Serrurerie Sam & Fils', role: 'Artisan', status: 'Actif', lastActive: 'Il y a 10 min' },
        { id: 2, name: 'Julie Dubois', email: 'j.dubois@paris-btp.com', company: 'Paris Dépannage BTP', role: 'Artisan', status: 'Actif', lastActive: 'Il y a 1h' },
        { id: 3, name: 'Alexandre Petit', email: 'alex@petit-btp.fr', company: 'Petit BTP Services', role: 'Artisan', status: 'Vérification', lastActive: 'Il y a 2 jours' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Shield size={18} className="text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Console Super Admin</span>
                    </div>
                    <h1 className="text-3xl font-bold font-clash">Gestion des Utilisateurs</h1>
                </div>
                <button className="h-12 px-6 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                    <UserPlus size={18} />
                    Nouvel Artisan
                </button>
            </div>

            <Card className="overflow-hidden border-slate-100">
                <div className="p-4 border-b border-slate-50 flex items-center gap-4 bg-slate-50/30">
                    <div className="relative flex-grow max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Rechercher par nom, email ou entreprise..."
                            className="w-full h-11 pl-12 pr-4 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all"
                        />
                    </div>
                    <button className="h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm font-bold flex items-center gap-2 text-slate-600 hover:bg-slate-50 transition-all">
                        <Filter size={16} />
                        Filtres
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-50">
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Utilisateur</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Entreprise</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Statut</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Activité</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{user.name}</p>
                                                <p className="text-xs text-slate-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-600">{user.company}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant={user.status === 'Actif' ? 'success' : 'warning'}>
                                            {user.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs text-slate-400 font-medium">{user.lastActive}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                                            <MoreVertical size={18} />
                                        </button>
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

export default SuperAdminUsers;
