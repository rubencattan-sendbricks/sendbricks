import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompany } from '../hooks/useCompany';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Building2, ArrowRight, Plus } from 'lucide-react';
import { cn } from '../utils/cn';

const CompanySelection = () => {
    const { companies, switchCompany } = useCompany();
    const navigate = useNavigate();

    const handleSelect = (id) => {
        switchCompany(id);
        navigate('/admin/quotes/new');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-mono">
            <div className="w-full max-w-2xl space-y-8">
                <div className="text-center space-y-4">
                    <div className="inline-flex w-16 h-16 bg-slate-900 rounded-2xl items-center justify-center shadow-2xl shadow-slate-200 animate-in zoom-in duration-500">
                        <span className="text-white font-clash font-bold text-4xl">S</span>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold font-clash tracking-tight">Mes Sociétés</h1>
                        <p className="text-slate-500 text-sm">Avec laquelle souhaitez-vous travailler aujourd'hui ?</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {companies.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => handleSelect(c.id)}
                            className="group text-left"
                        >
                            <Card className="hover:border-slate-900 transition-all hover:shadow-xl hover:shadow-slate-200/50 bg-white border-slate-200">
                                <CardContent className="p-6">
                                    <div className="flex flex-col gap-4">
                                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                                            <Building2 size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold font-clash text-lg leading-tight group-hover:text-slate-900">{c.name}</h3>
                                            <p className="text-xs text-slate-400 mt-1 font-mono uppercase tracking-tighter">SIRET : {c.siret}</p>
                                        </div>
                                        <div className="pt-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-900">
                                            <span>Sélectionner</span>
                                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </button>
                    ))}

                    <button className="text-left">
                        <Card className="border-dashed border-2 hover:border-slate-400 hover:bg-slate-50 transition-all h-full bg-transparent">
                            <CardContent className="p-6 h-full flex flex-col items-center justify-center text-slate-400 gap-3 min-h-[180px]">
                                <div className="w-12 h-12 rounded-xl border-dashed border-2 flex items-center justify-center">
                                    <Plus size={24} />
                                </div>
                                <p className="font-bold text-xs uppercase tracking-widest">Nouvelle Société</p>
                            </CardContent>
                        </Card>
                    </button>
                </div>

                <p className="text-center text-[10px] text-slate-300 uppercase tracking-widest font-bold">
                    SendBricks &copy; 2024 • Accès Rapide
                </p>
            </div>
        </div>
    );
};

export default CompanySelection;
