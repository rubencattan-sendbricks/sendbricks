import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Input } from '../components/Input';
import {
    Check,
    ChevronRight,
    MapPin,
    Lock,
    Plus,
    Minus,
    Download,
    Share2,
    PenTool,
    CheckCircle2,
    CreditCard
} from 'lucide-react';
import { cn } from '../utils/cn';

const ClientQuote = () => {
    const { id } = useParams();
    const [step, setStep] = useState('landing'); // 'landing' | 'quote'
    const [keyCount, setKeyCount] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isSigned, setIsSigned] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [clientInfo, setClientInfo] = useState({
        firstName: '',
        lastName: '',
        address: ''
    });

    const depositAmount = (finalTotal * 0.3).toFixed(2);

    const handlePayment = () => {
        // Simulation d'un redirect Stripe Checkout
        setIsPaid(true);
    };

    const toggleOption = (id) => {
        if (selectedOptions.includes(id)) {
            setSelectedOptions(selectedOptions.filter(optId => optId !== id));
        } else {
            setSelectedOptions([...selectedOptions, id]);
        }
    };

    const handleOnboardingSubmit = (e) => {
        e.preventDefault();
        setStep('quote');
    };

    const options = [
        { id: 1, label: 'Urgence Nuit/Week-end', price: 45 },
        { id: 2, label: 'Garantie étendue 2 ans', price: 29 },
    ];

    const baseTotal = 209;
    const keyPrice = 15;
    const optionsTotal = selectedOptions.reduce((acc, optId) => {
        const opt = options.find(o => o.id === optId);
        return acc + (opt ? opt.price : 0);
    }, 0);
    const finalTotal = baseTotal + (keyCount * keyPrice) + optionsTotal;

    // View: Landing Gate
    if (step === 'landing') {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-mono overflow-hidden">
                <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <div className="text-center space-y-4">
                        <div className="inline-flex w-20 h-20 bg-slate-900 rounded-[2rem] items-center justify-center shadow-2xl shadow-slate-200 mb-2 rotate-3 hover:rotate-0 transition-transform cursor-default">
                            <span className="text-white font-clash font-bold text-5xl">S</span>
                        </div>
                        <h1 className="text-3xl font-bold font-clash tracking-tight leading-tight">
                            Générez votre devis <br /> en <span className="text-blue-600">3 secondes.</span>
                        </h1>
                        <p className="text-slate-400 text-sm">Complétez vos infos pour découvrir votre proposition personnalisée.</p>
                    </div>

                    <Card className="border-0 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden">
                        <CardContent className="p-8">
                            <form onSubmit={handleOnboardingSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Prénom</label>
                                        <Input
                                            required
                                            placeholder="Jean"
                                            value={clientInfo.firstName}
                                            onChange={(e) => setClientInfo({ ...clientInfo, firstName: e.target.value })}
                                            className="h-14 border-slate-100 bg-slate-50/50 rounded-2xl focus:bg-white transition-all text-lg font-bold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Nom</label>
                                        <Input
                                            required
                                            placeholder="Dupont"
                                            value={clientInfo.lastName}
                                            onChange={(e) => setClientInfo({ ...clientInfo, lastName: e.target.value })}
                                            className="h-14 border-slate-100 bg-slate-50/50 rounded-2xl focus:bg-white transition-all text-lg font-bold"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Adresse d'intervention</label>
                                    <div className="relative group">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={20} />
                                        <Input
                                            required
                                            placeholder="Tapez votre adresse..."
                                            value={clientInfo.address}
                                            onChange={(e) => setClientInfo({ ...clientInfo, address: e.target.value })}
                                            className="h-14 pl-12 border-slate-100 bg-slate-50/50 rounded-2xl focus:bg-white transition-all text-base"
                                        />
                                    </div>
                                    <p className="text-[9px] text-slate-400 italic ml-1">* Saisie auto désactivée dans cette démo</p>
                                </div>

                                <Button className="w-full h-16 bg-slate-900 text-white rounded-[1.5rem] shadow-xl shadow-slate-200 mt-4 group overflow-hidden relative">
                                    <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    <span className="relative z-10 text-xl font-bold flex items-center justify-center gap-2">
                                        Voir mon devis <ChevronRight size={24} />
                                    </span>
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <p className="text-center text-[10px] text-slate-300 uppercase tracking-widest font-bold">
                        Paiement sécurisé par Stripe &copy; 2024
                    </p>
                </div>
            </div>
        );
    }

    // View: Actual Quote
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-mono pb-24">
            {/* Header Mobile */}
            <div className="p-8 bg-slate-900 text-white rounded-b-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-10">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
                            <span className="text-slate-900 font-clash font-bold text-2xl">S</span>
                        </div>
                        <Badge variant="outline" className="border-white/20 text-white/80 bg-white/5 backdrop-blur-sm px-4 py-1">
                            Réf: {id || 'DEV-2401-082'}
                        </Badge>
                    </div>
                    <div className="space-y-2">
                        <p className="text-blue-400 text-[10px] uppercase font-bold tracking-[0.2em]">Devis personnalisé pour</p>
                        <h1 className="text-4xl font-bold font-clash leading-none tracking-tight">
                            {clientInfo.firstName} {clientInfo.lastName}
                        </h1>
                        <div className="flex items-center gap-2 text-slate-400 text-sm mt-4">
                            <MapPin size={14} />
                            <span className="truncate">{clientInfo.address}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-6 -mt-8 space-y-8 relative z-20">
                {/* Product List */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between ml-2">
                        <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">Prestations</h2>
                        <Badge className="bg-slate-200 text-slate-600 border-0 text-[9px]">Serrurerie</Badge>
                    </div>
                    <div className="space-y-3">
                        {[
                            { name: 'Cylindre de haute sécurité', price: '89.00 €', detail: '6 goupilles, anti-perçage' },
                            { name: 'Forfait pose serrure', price: '120.00 €', detail: 'Main d\'oeuvre incluse' },
                        ].map((p, i) => (
                            <div key={i} className="flex justify-between items-center p-5 rounded-3xl border border-white bg-white/60 backdrop-blur-sm shadow-sm">
                                <div>
                                    <p className="font-bold text-base font-clash">{p.name}</p>
                                    <p className="text-[10px] text-slate-400">{p.detail}</p>
                                </div>
                                <p className="font-bold font-mono text-lg">{p.price}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Customizer */}
                <section className="space-y-4">
                    <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400 ml-2">Options & Clés</h2>
                    <Card className="border-0 bg-white rounded-[2.5rem] shadow-sm">
                        <CardContent className="p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                        <Lock size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-base font-clash">Clés supplémentaires</p>
                                        <p className="text-xs text-blue-600 font-bold">+15.00 € / unité</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                                    <button onClick={() => setKeyCount(Math.max(0, keyCount - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all shadow-sm">
                                        <Minus size={20} />
                                    </button>
                                    <span className="font-bold font-mono text-xl w-6 text-center">{keyCount}</span>
                                    <button onClick={() => setKeyCount(keyCount + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all shadow-sm">
                                        <Plus size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="h-px bg-slate-50" />

                            <div className="space-y-3">
                                {options.map((opt) => (
                                    <div
                                        key={opt.id}
                                        onClick={() => toggleOption(opt.id)}
                                        className={cn(
                                            "flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer",
                                            selectedOptions.includes(opt.id)
                                                ? "bg-slate-900 border-slate-900 text-white"
                                                : "bg-slate-50 border-transparent text-slate-600 hover:border-slate-200"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors",
                                                selectedOptions.includes(opt.id) ? "bg-white border-white text-slate-900" : "border-slate-200"
                                            )}>
                                                {selectedOptions.includes(opt.id) && <Check size={14} />}
                                            </div>
                                            <p className="font-bold text-sm font-clash">{opt.label}</p>
                                        </div>
                                        <p className={cn("font-bold font-mono text-sm", selectedOptions.includes(opt.id) ? "text-slate-400" : "text-slate-900")}>
                                            +{opt.price}€
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Summary */}
                <div className="pt-8 border-t border-slate-200 space-y-6">
                    <div className="flex justify-between items-end px-2">
                        <div>
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Net à payer</p>
                            <h3 className="text-5xl font-bold font-clash tracking-tight text-slate-900">{finalTotal.toFixed(2)}<span className="text-2xl ml-1 text-slate-400">€</span></h3>
                        </div>
                        <div className="text-right pb-1">
                            <p className="text-[10px] text-slate-400 font-mono">TVA 10% inc.</p>
                            <p className="text-[10px] text-green-600 font-bold uppercase tracking-tighter">Acompte 30% : {depositAmount}€</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        {!isSigned ? (
                            <Button
                                className="w-full h-18 rounded-[1.5rem] shadow-2xl gap-3 bg-blue-600 hover:bg-blue-700 text-xl font-bold"
                                onClick={() => setIsSigned(true)}
                            >
                                <PenTool size={24} /> Signer le devis
                            </Button>
                        ) : !isPaid ? (
                            <div className="space-y-4 animate-in zoom-in-95 duration-300">
                                <div className="flex items-center gap-2 text-green-600 font-bold justify-center text-sm mb-2">
                                    <CheckCircle2 size={16} /> Devis signé avec succès
                                </div>
                                <Button
                                    className="w-full h-18 rounded-[1.5rem] shadow-2xl gap-3 bg-slate-900 hover:bg-slate-800 text-xl font-bold"
                                    onClick={handlePayment}
                                >
                                    <CreditCard size={24} /> Payer l'acompte ({depositAmount}€)
                                </Button>
                                <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest font-bold">
                                    Paiement sécurisé par Stripe
                                </p>
                            </div>
                        ) : (
                            <div className="p-8 bg-green-50 rounded-[2rem] border border-green-100 text-center space-y-3 animate-in fade-in duration-500">
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto shadow-lg shadow-green-100 mb-2">
                                    <Check size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-green-900 font-clash">Acompte réglé !</h3>
                                <p className="text-sm text-green-700">Merci. Votre artisan est prévenu et l'intervention est confirmée.</p>
                                <Button variant="ghost" className="text-green-600 font-bold text-[10px] uppercase tracking-widest mt-2">
                                    <Download size={14} className="mr-2" /> Télécharger mon reçu
                                </Button>
                            </div>
                        )}
                        {!isPaid && (
                            <Button variant="ghost" className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">
                                Consulter les CGV
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer Mockup */}
            <div className="fixed bottom-0 inset-x-0 h-2 bg-slate-900" />
        </div>
    );
};

export default ClientQuote;
