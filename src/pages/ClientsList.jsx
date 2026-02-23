import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Badge } from '../components/Badge';
import {
    Users,
    Search,
    Filter,
    Mail,
    Phone,
    MapPin,
    ArrowUpRight,
    Plus
} from 'lucide-react';

const ClientRow = ({ client }) => (
    <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group rounded-xl">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold font-clash text-lg border-2 border-white shadow-sm transition-transform group-hover:scale-110">
                {client.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
                <h3 className="font-bold font-clash text-lg">{client.name}</h3>
                <div className="flex items-center gap-3 mt-0.5">
                    <span className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                        <Mail size={10} /> {client.email}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                        <Phone size={10} /> {client.phone}
                    </span>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-10">
            <div className="text-right hidden md:block">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Dernier Devis</p>
                <Badge variant="success" className="font-mono">{client.lastQuote}</Badge>
            </div>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900 group-hover:bg-white shadow-sm border-transparent hover:border-slate-100 transition-all">
                <ArrowUpRight size={20} />
            </Button>
        </div>
    </div>
);

const ClientsList = () => {
    const [clients, setClients] = useState([
        { id: 1, name: 'Jean Dupont', email: 'jean.dupont@gmail.com', phone: '06 12 34 56 78', lastQuote: 'DEV-2401-001' },
        { id: 2, name: 'Marie Martin', email: 'marie.martin@pros.fr', phone: '07 88 99 00 11', lastQuote: 'DEV-2401-002' },
        { id: 3, name: 'Thomas Bernard', email: 't.bernard@gmail.com', phone: '06 00 00 00 01', lastQuote: 'DEV-2312-045' },
        { id: 4, name: 'SARL TechFlow', email: 'contact@techflow.com', phone: '01 44 55 66 77', lastQuote: 'DEV-2401-003' },
    ]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newClient, setNewClient] = useState({ name: '', email: '', phone: '' });

    const handleAddClient = () => {
        setClients([...clients, { ...newClient, id: Date.now(), lastQuote: 'Nouveau' }]);
        setIsAddModalOpen(false);
        setNewClient({ name: '', email: '', phone: '' });
    };

    return (
        <div className="space-y-8 pb-20 relative">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold font-clash tracking-tight">Base Clients</h1>
                    <p className="text-slate-500 mt-2">Historique et coordonnées de vos clients.</p>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)} className="gap-2 bg-slate-900 shadow-xl shadow-slate-200 py-6 px-8 rounded-2xl">
                    <Plus size={20} />
                    Fiche Client
                </Button>
            </div>

            <Card>
                <CardHeader className="border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <Input placeholder="Rechercher par nom, email, téléphone..." className="pl-10" />
                        </div>
                        <Button variant="outline" size="icon">
                            <Filter size={18} />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-2">
                    <div className="divide-y divide-slate-100">
                        {clients.map((c) => (
                            <ClientRow key={c.id || c.email} client={c} />
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="bg-slate-900 rounded-2xl p-6 text-white flex items-center justify-between shadow-2xl overflow-hidden relative group">
                <div className="relative z-10">
                    <h3 className="text-xl font-bold font-clash">Synchronisation Automatique</h3>
                    <p className="text-slate-400 text-sm mt-1">Vos clients sont ajoutés automatiquement lors de la signature d'un devis.</p>
                </div>
                <Users size={80} className="absolute -right-4 -bottom-4 text-white/5 group-hover:scale-110 transition-transform" />
                <Button className="bg-white text-slate-900 hover:bg-slate-100 relative z-10">En savoir plus</Button>
            </div>

            {/* Modal Mockup */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
                    <Card className="w-full max-w-lg shadow-2xl border-0 animate-in zoom-in-95 duration-200">
                        <CardHeader>
                            <CardTitle>Nouveau Client</CardTitle>
                            <CardDescription>Ajoutez manuellement un client à votre base.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Nom du client</label>
                                <Input
                                    placeholder="Ex: Jean Dupont"
                                    value={newClient.name}
                                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Email</label>
                                <Input
                                    type="email"
                                    placeholder="jean@example.com"
                                    value={newClient.email}
                                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Téléphone</label>
                                <Input
                                    placeholder="06 00 00 00 00"
                                    value={newClient.phone}
                                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-6">
                                <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>Annuler</Button>
                                <Button onClick={handleAddClient} className="bg-slate-900">Créer la fiche</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default ClientsList;
