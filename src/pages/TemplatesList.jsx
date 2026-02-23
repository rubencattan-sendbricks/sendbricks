import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Plus, Search, FileStack, Layout, Copy, MoreHorizontal, Settings } from 'lucide-react';
import { Input } from '../components/Input';

const TemplateCard = ({ template }) => (
    <Card className="group hover:border-slate-300 transition-all border-dashed">
        <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
                <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center",
                    template.type === 'document' ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                )}>
                    {template.type === 'document' ? <Layout size={24} /> : <FileStack size={24} />}
                </div>
                <Button variant="ghost" size="icon" className="text-slate-400">
                    <MoreHorizontal size={18} />
                </Button>
            </div>
            <div>
                <h3 className="font-bold font-clash text-lg mb-1">{template.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-4">{template.description}</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <Badge variant="outline" className="text-[9px] uppercase tracking-widest font-mono">
                    {template.itemsCount} éléments
                </Badge>
                <Button variant="ghost" size="sm" className="gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900">
                    <Copy size={14} />
                    Utiliser
                </Button>
            </div>
        </CardContent>
    </Card>
);

const TemplatesList = () => {
    const [templates] = useState([
        { id: 1, name: 'Serrurerie Standard', description: 'Template complet pour remplacement de serrure standard avec main d\'oeuvre.', type: 'document', itemsCount: 3 },
        { id: 2, name: 'Forfait Urgence', description: 'Ligne pré-configurée pour les interventions de nuit et week-end.', type: 'item', itemsCount: 1 },
        { id: 3, name: 'Blindage A2P', description: 'Configuration haut de gamme pour blindage de porte certifié.', type: 'document', itemsCount: 5 },
        { id: 4, name: 'Kit Entretien', description: 'Ensemble de produits pour l\'entretien annuel des serrures.', type: 'item', itemsCount: 4 },
    ]);

    return (
        <div className="space-y-8 pb-20">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-4xl font-bold font-clash tracking-tight">Modèles</h1>
                    <p className="text-slate-500 mt-2">Gagnez du temps en réutilisant vos configurations fréquentes.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2 rounded-xl">
                        <Settings size={18} />
                        Réglages par défaut
                    </Button>
                    <Button className="bg-slate-900 text-white gap-2 rounded-xl">
                        <Plus size={18} />
                        Nouveau Modèle
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader className="border-b border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <Input placeholder="Rechercher un modèle..." className="pl-10" />
                        </div>
                        <div className="flex bg-slate-100 p-1 rounded-lg">
                            <Button size="sm" variant="ghost" className="bg-white shadow-sm text-xs font-bold py-1 px-3 rounded-md">Tous</Button>
                            <Button size="sm" variant="ghost" className="text-xs font-bold py-1 px-3 rounded-md text-slate-500">Documents</Button>
                            <Button size="sm" variant="ghost" className="text-xs font-bold py-1 px-3 rounded-md text-slate-500">Forfaits</Button>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map(t => (
                    <TemplateCard key={t.id} template={t} />
                ))}
                <button className="border-2 border-dashed border-slate-200 rounded-[2rem] p-8 flex flex-col items-center justify-center gap-4 hover:border-slate-300 hover:bg-slate-50 transition-all text-slate-400">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                        <Plus size={24} />
                    </div>
                    <span className="font-bold text-sm uppercase tracking-widest">Créer un modèle</span>
                </button>
            </div>
        </div>
    );
};

import { cn } from '../utils/cn';
export default TemplatesList;
