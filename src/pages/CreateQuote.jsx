import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Badge } from '../components/Badge';
import {
    Plus,
    Trash2,
    GripVertical,
    Search,
    ChevronDown,
    Info,
    Save,
    Send,
    Building2,
    Check,
    User,
    Building,
    Home
} from 'lucide-react';
import { cn } from '../utils/cn';
import { useQuotes } from '../hooks/useQuotes';
import { useCompany } from '../hooks/useCompany';

const QuoteLineItem = ({ item, index, onRemove, onPriceChange, onQuantityChange, onNameChange, onDescriptionChange, calcMode, vatRate }) => {
    const displayPrice = calcMode === 'TTC'
        ? (item.price * (1 + vatRate / 100))
        : item.price;

    // Local state to avoid input jitter while typing decimals
    const [localPrice, setLocalPrice] = React.useState(displayPrice.toFixed(2));
    const isInteracting = React.useRef(false);

    // Sync local state ONLY when calcMode or external item.price changes significantly
    // but not while current input is being edited.
    React.useEffect(() => {
        if (!isInteracting.current) {
            setLocalPrice(displayPrice.toFixed(2));
        }
    }, [displayPrice, calcMode]);

    const handleLocalPriceChange = (val) => {
        isInteracting.current = true;
        setLocalPrice(val);
        const parsed = parseFloat(val);
        if (!isNaN(parsed)) {
            onPriceChange(index, val);
        }
    };

    const handleBlur = () => {
        isInteracting.current = false;
        setLocalPrice(displayPrice.toFixed(2));
    };

    return (
        <div className="flex items-start gap-4 p-4 bg-white border border-slate-100 rounded-xl group hover:border-slate-300 transition-all">
            <div className="mt-2 text-slate-300 shrink-0">
                <GripVertical size={20} />
            </div>
            <div className="flex-1 grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6 space-y-2">
                    <Input
                        value={item.name}
                        placeholder="Nom du produit/forfait"
                        onChange={(e) => onNameChange(index, e.target.value)}
                        className="h-9 px-2 font-bold font-clash border-transparent bg-transparent hover:bg-slate-50 focus:bg-white focus:border-slate-200"
                    />
                    <Input
                        value={item.description}
                        placeholder="Description détaillée..."
                        onChange={(e) => onDescriptionChange(index, e.target.value)}
                        className="h-8 px-2 text-xs text-slate-500 border-transparent bg-transparent hover:bg-slate-50 focus:bg-white focus:border-slate-200"
                    />
                </div>
                <div className="col-span-4 md:col-span-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 block">Qté</label>
                    <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => onQuantityChange(index, e.target.value)}
                        className="h-9 px-2 text-center"
                    />
                </div>
                <div className="col-span-4 md:col-span-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 block">
                        Prix U. {calcMode}
                    </label>
                    <Input
                        type="number"
                        step="0.01"
                        value={localPrice}
                        onChange={(e) => handleLocalPriceChange(e.target.value)}
                        onBlur={handleBlur}
                        className="h-9 px-2 text-center"
                    />
                </div>
                <div className="col-span-4 md:col-span-2 text-right">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 block">Total {calcMode}</label>
                    <p className="h-9 flex items-center justify-end font-mono font-bold">
                        {(item.quantity * displayPrice).toFixed(2)} €
                    </p>
                </div>
            </div>
            <Button variant="ghost" size="icon" className="text-slate-300 hover:text-red-500 shrink-0" onClick={onRemove}>
                <Trash2 size={18} />
            </Button>
        </div>
    );
};

const MOCK_CATALOG = [
    { id: 1, name: 'Cylindre de haute sécurité', description: '6 goupilles, anti-perçage', price: 89.00 },
    { id: 2, name: 'Forfait pose serrure', description: 'Main d\'oeuvre incluse', price: 120.00 },
    { id: 3, name: 'Ouverture de porte simple', description: 'Serrure non verrouillée', price: 75.00 },
    { id: 4, name: 'Blindage de porte', description: 'Acier 2mm, certifié A2P', price: 1200.00 },
];

const CreateQuote = () => {
    const { companies, activeCompany, switchCompany } = useCompany();
    const [calcMode, setCalcMode] = useState('HT'); // 'HT' or 'TTC'
    const [vatRate, setVatRate] = useState(10);
    const [clientType, setClientType] = useState('particulier'); // 'particulier', 'syndic', 'societe'

    const [items, setItems] = useState([]);
    const [showCompanySelector, setShowCompanySelector] = useState(false);

    // Search & Modal State
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [showNewProductModal, setShowNewProductModal] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });

    const navigate = useNavigate();
    const { createQuote, isCreating } = useQuotes();

    const handleSubmit = async () => {
        try {
            const totals = calculateTotals();
            await createQuote({
                clientType,
                vatRate,
                calcMode,
                items,
                totalHT: totals.ht,
                totalTTC: totals.ttc,
                date: new Date().toLocaleDateString('fr-FR'),
                status: 'Brouillon'
            });
            navigate('/admin/quotes');
        } catch (error) {
            console.error('Failed to create quote:', error);
        }
    };

    const filteredCatalog = MOCK_CATALOG.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculation Logic
    const calculateTotals = () => {
        const totalHT = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        const totalTVA = totalHT * (vatRate / 100);
        const totalTTC = totalHT + totalTVA;
        const deposit = totalTTC * 0.3;

        return {
            ht: totalHT.toFixed(2),
            tva: totalTVA.toFixed(2),
            ttc: totalTTC.toFixed(2),
            deposit: deposit.toFixed(2)
        };
    };

    const totals = calculateTotals();

    const handlePriceChange = (index, value) => {
        const newItems = [...items];
        let price = parseFloat(value) || 0;
        if (calcMode === 'TTC') price = price / (1 + vatRate / 100);
        newItems[index].price = price;
        setItems(newItems);
    };

    const handleQuantityChange = (index, value) => {
        const newItems = [...items];
        newItems[index].quantity = parseInt(value) || 0;
        setItems(newItems);
    };

    const handleNameChange = (index, value) => {
        const newItems = [...items];
        newItems[index].name = value;
        setItems(newItems);
    };

    const handleDescriptionChange = (index, value) => {
        const newItems = [...items];
        newItems[index].description = value;
        setItems(newItems);
    };

    const toggleCalcMode = (mode) => {
        setCalcMode(mode);
    };

    const selectFromCatalog = (product) => {
        setItems([...items, { ...product, quantity: 1 }]);
        setSearchQuery('');
        setShowDropdown(false);
    };

    const handleCreateNewProduct = (e) => {
        e.preventDefault();
        const productToAdd = {
            ...newProduct,
            price: parseFloat(newProduct.price) || 0,
            quantity: 1
        };
        setItems([...items, productToAdd]);
        setShowNewProductModal(false);
        setNewProduct({ name: '', description: '', price: '' });
        setSearchQuery('');
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold font-clash tracking-tight">Nouveau Devis</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                            Réf : DEV-{Date.now().toString(36).toUpperCase()}
                        </Badge>
                        <div className="h-1 w-1 rounded-full bg-slate-300" />
                        <p className="text-[10px] text-slate-400 uppercase font-bold font-mono tracking-tighter">Éditeur de devis intelligent</p>
                    </div>
                </div>

                {/* Company Selector - CRITICAL ADDITION */}
                <div className="relative">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block px-1">Émetteur du devis</label>
                    <button
                        onClick={() => setShowCompanySelector(!showCompanySelector)}
                        className="flex items-center gap-3 px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:border-slate-400 transition-all shadow-sm"
                    >
                        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white shrink-0">
                            <Building2 size={16} />
                        </div>
                        <div className="text-left pr-4">
                            <p className="text-xs font-bold font-clash leading-none">{activeCompany.name}</p>
                            <p className="text-[9px] text-slate-400 mt-1 font-mono">{activeCompany.siret}</p>
                        </div>
                        <ChevronDown size={16} className={cn("text-slate-400 transition-transform", showCompanySelector && "rotate-180")} />
                    </button>

                    {showCompanySelector && (
                        <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                            <div className="p-3 border-b border-slate-100 bg-slate-50">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Mes Entreprises</p>
                            </div>
                            <div className="p-2 space-y-1">
                                {companies.map(c => (
                                    <button
                                        key={c.id}
                                        onClick={() => {
                                            switchCompany(c.id);
                                            setShowCompanySelector(false);
                                        }}
                                        className={cn(
                                            "w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left",
                                            activeCompany.id === c.id ? "bg-slate-900 text-white" : "hover:bg-slate-50 text-slate-700"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                            activeCompany.id === c.id ? "bg-white/10" : "bg-slate-100"
                                        )}>
                                            <Building2 size={16} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold font-clash truncate">{c.name}</p>
                                            <p className={cn("text-[9px] font-mono", activeCompany.id === c.id ? "text-slate-400" : "text-slate-400")}>{c.siret}</p>
                                        </div>
                                        {activeCompany.id === c.id && <Check size={14} className="text-white" />}
                                    </button>
                                ))}
                            </div>
                            <div className="p-3 bg-slate-50 border-t border-slate-100">
                                <Button variant="ghost" size="sm" className="w-full justify-start text-xs gap-2 font-bold text-slate-500 hover:text-slate-900">
                                    <Plus size={14} />
                                    Nouvelle Entreprise
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Client Type Selection - From Prototype */}
            <Card className="border-slate-200 shadow-sm overflow-hidden">
                <div className="p-1 bg-slate-50 border-b border-slate-100 flex items-center justify-between px-6">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Étape 1 : Type de Client</p>
                    <Badge variant="outline" className="text-[9px] bg-white">Obligatoire</Badge>
                </div>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { id: 'particulier', icon: User, label: 'Particulier', desc: 'Client individuel', color: 'blue', vat: 10 },
                            { id: 'syndic', icon: Home, label: 'Syndic', desc: 'Gestionnaire / Syndic', color: 'purple', vat: 10 },
                            { id: 'societe', icon: Building, label: 'Société', desc: 'Entreprise / Pro', color: 'emerald', vat: 20 }
                        ].map((type) => (
                            <button
                                key={type.id}
                                onClick={() => {
                                    setClientType(type.id);
                                    setVatRate(type.vat);
                                }}
                                className={cn(
                                    "relative p-6 rounded-2xl border-2 transition-all text-left flex flex-col gap-3 group",
                                    clientType === type.id
                                        ? `border-${type.color}-500 bg-${type.color}-50/50 ring-4 ring-${type.color}-500/10`
                                        : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
                                )}
                            >
                                <div className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                                    clientType === type.id
                                        ? `bg-${type.color}-500 text-white shadow-lg shadow-${type.color}-500/20`
                                        : "bg-slate-100 text-slate-400"
                                )}>
                                    <type.icon size={24} />
                                </div>
                                <div>
                                    <p className={cn(
                                        "font-bold font-clash text-lg",
                                        clientType === type.id ? `text-${type.color}-900` : "text-slate-900"
                                    )}>{type.label}</p>
                                    <p className="text-xs text-slate-500 font-medium">{type.desc}</p>
                                </div>
                                {clientType === type.id && (
                                    <div className={cn(`absolute top-4 right-4 w-6 h-6 rounded-full bg-${type.color}-500 text-white flex items-center justify-center shadow-sm`)}>
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Editor */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Composants du devis</CardTitle>
                                <CardDescription>Sélectionnez les produits et forfaits partagés.</CardDescription>
                            </div>
                            <Button size="sm" variant="secondary" className="gap-2">
                                <Search size={16} />
                                Catalogue partagé
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {items.map((item, i) => (
                                <QuoteLineItem
                                    key={i}
                                    index={i}
                                    item={item}
                                    calcMode={calcMode}
                                    vatRate={vatRate}
                                    onPriceChange={handlePriceChange}
                                    onQuantityChange={handleQuantityChange}
                                    onNameChange={handleNameChange}
                                    onDescriptionChange={handleDescriptionChange}
                                    onRemove={() => setItems(items.filter((_, idx) => idx !== i))}
                                />
                            ))}
                            <div className="relative">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <Input
                                        placeholder="Commencer à taper un produit..."
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            setShowDropdown(true);
                                        }}
                                        onFocus={() => setShowDropdown(true)}
                                        className="h-16 pl-12 rounded-2xl border-slate-200 focus:ring-slate-900 focus:border-slate-900 text-lg shadow-sm"
                                    />
                                </div>

                                {showDropdown && (searchQuery || filteredCatalog.length > 0) && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                                        <div className="max-h-64 overflow-y-auto">
                                            {filteredCatalog.length > 0 ? (
                                                filteredCatalog.map(p => (
                                                    <button
                                                        key={p.id}
                                                        onClick={() => selectFromCatalog(p)}
                                                        className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0"
                                                    >
                                                        <div className="text-left">
                                                            <p className="font-bold font-clash text-sm">{p.name}</p>
                                                            <p className="text-xs text-slate-400">{p.description}</p>
                                                        </div>
                                                        <p className="font-mono font-bold text-sm text-slate-900">{p.price.toFixed(2)} €</p>
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="p-4 text-center text-slate-400 text-sm italic">
                                                    Aucun produit trouvé...
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-2 bg-slate-50 border-t border-slate-100">
                                            <Button
                                                onClick={() => {
                                                    setShowNewProductModal(true);
                                                    setShowDropdown(false);
                                                }}
                                                className="w-full justify-center gap-2 bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 rounded-xl py-6 font-bold"
                                            >
                                                <Plus size={18} />
                                                Ajouter un nouveau produit
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Détails du Client</CardTitle>
                            <CardDescription>Informations de contact et facturation.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Nom / Raison Sociale</label>
                                    <Input placeholder="ex: Jean Dupont" className="h-10 rounded-xl" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Email</label>
                                    <Input placeholder="client@email.com" className="h-10 rounded-xl" />
                                </div>

                                {clientType === 'societe' && (
                                    <div className="space-y-1.5 col-span-2 md:col-span-1 animate-in slide-in-from-left duration-300">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">N° SIRET & Code NAF</label>
                                        <Input placeholder="123 456 789 00012" className="h-10 rounded-xl" />
                                    </div>
                                )}

                                {clientType === 'syndic' && (
                                    <>
                                        <div className="space-y-1.5 col-span-2 md:col-span-1 animate-in slide-in-from-left duration-300">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Copropriété / Immeuble</label>
                                            <Input placeholder="Résidence Le Parc" className="h-10 rounded-xl" />
                                        </div>
                                        <div className="space-y-1.5 col-span-2 md:col-span-1 animate-in slide-in-from-left duration-300">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">N° de Bon de Commande</label>
                                            <Input placeholder="BC-2024-001" className="h-10 rounded-xl" />
                                        </div>
                                    </>
                                )}

                                <div className="space-y-1.5 col-span-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Adresse de facturation</label>
                                    <Input placeholder="123 Rue de la Paix, 75002 Paris" className="h-10 rounded-xl" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Options proposées au client</CardTitle>
                            <CardDescription>Options héritées de votre catalogue professionnel.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { label: 'Urgence Nuit/Week-end', price: '+45 €' },
                                    { label: 'Garantie étendue 2 ans', price: '+29 €' },
                                    { label: 'Nettoyage de chantier', price: '+15 €' },
                                ].map((opt, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-all cursor-pointer bg-slate-50/50">
                                        <span className="font-semibold text-sm">{opt.label}</span>
                                        <Badge variant="secondary">{opt.price}</Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <div className="flex gap-3">
                        <Button variant="outline" className="flex-1 gap-2 shadow-sm rounded-xl py-6">
                            <Save size={18} />
                            Brouillon
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={isCreating}
                            className="flex-1 bg-slate-900 text-white font-bold h-12 rounded-xl shadow-lg shadow-slate-200 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                        >
                            {isCreating ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                <FileText size={18} />
                            )}
                            {isCreating ? 'Enregistrement...' : 'Enregistrer le devis'}
                        </Button>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Paramètres Financiers</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Calcul du Devis</label>
                                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                                    <button
                                        onClick={() => toggleCalcMode('HT')}
                                        className={cn(
                                            "py-2 px-3 rounded-lg text-xs font-bold transition-all",
                                            calcMode === 'HT' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                                        )}
                                    >
                                        Saisir HT
                                    </button>
                                    <button
                                        onClick={() => toggleCalcMode('TTC')}
                                        className={cn(
                                            "py-2 px-3 rounded-lg text-xs font-bold transition-all",
                                            calcMode === 'TTC' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                                        )}
                                    >
                                        Saisir TTC
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-700">Taux de TVA</label>
                                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl relative">
                                    <button
                                        onClick={() => setVatRate(10)}
                                        className={cn(
                                            "py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex flex-col items-center gap-1",
                                            vatRate === 10 ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                                        )}
                                    >
                                        <span>TVA Réduite</span>
                                        <span className="text-[9px] opacity-60 font-mono text-blue-600">10%</span>
                                    </button>
                                    <button
                                        onClick={() => setVatRate(20)}
                                        className={cn(
                                            "py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex flex-col items-center gap-1",
                                            vatRate === 20 ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                                        )}
                                    >
                                        <span>TVA Standard</span>
                                        <span className="text-[9px] opacity-60 font-mono text-emerald-600">20%</span>
                                    </button>
                                </div>
                                <div className="flex items-center gap-2 px-1">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Mosaïque / Autre taux</span>
                                    <select
                                        value={vatRate}
                                        onChange={(e) => setVatRate(parseFloat(e.target.value))}
                                        className="bg-transparent text-[10px] font-bold text-slate-600 focus:outline-none cursor-pointer font-mono"
                                    >
                                        <option value={5.5}>5.5 % (Réno Énergie)</option>
                                        <option value={0}>Exonéré (Auto-entrep.)</option>
                                        {vatRate !== 10 && vatRate !== 20 && vatRate !== 5.5 && vatRate !== 0 && (
                                            <option value={vatRate}>{vatRate} %</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900 text-white border-0 shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Building2 size={80} />
                        </div>
                        <CardHeader>
                            <CardTitle className="text-lg text-slate-300 font-mono uppercase tracking-widest">Récapitulatif</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 relative z-10">
                            <div className="flex justify-between text-sm text-slate-400">
                                <span>Total HT</span>
                                <span className="font-mono">{totals.ht} €</span>
                            </div>
                            <div className="flex justify-between text-sm text-slate-400">
                                <span>Montant TVA</span>
                                <span className="font-mono">{totals.tva} €</span>
                            </div>
                            <div className="h-px bg-slate-800 my-2" />
                            <div className="flex justify-between text-2xl font-bold font-clash">
                                <span>Total TTC</span>
                                <span>{totals.ttc} €</span>
                            </div>
                            <div className="pt-4">
                                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 w-full justify-center py-3 text-xs uppercase tracking-tighter">
                                    Accompte (30%) : {totals.deposit} €
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Quick Create Product Modal */}
            {showNewProductModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <Card className="w-full max-w-md shadow-2xl border-0 rounded-[2rem] overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-8 bg-slate-900 text-white relative">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                    <Plus size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold font-clash">Nouveau Produit</h2>
                                    <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">Ajout au catalogue</p>
                                </div>
                            </div>
                        </div>

                        <CardContent className="p-8 space-y-6">
                            <form onSubmit={handleCreateNewProduct} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Nom de la prestation</label>
                                    <Input
                                        required
                                        placeholder="ex: Remplacement serrure carénée"
                                        value={newProduct.name}
                                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                        className="h-12 border-slate-100 bg-slate-50/50 rounded-xl focus:bg-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Description (optionnel)</label>
                                    <Input
                                        placeholder="ex: Fourniture et pose..."
                                        value={newProduct.description}
                                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                        className="h-12 border-slate-100 bg-slate-50/50 rounded-xl focus:bg-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Prix Unitaire {calcMode}</label>
                                    <div className="relative">
                                        <Input
                                            required
                                            type="number"
                                            step="0.01"
                                            placeholder="0.00"
                                            value={newProduct.price}
                                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                            className="h-12 border-slate-100 bg-slate-50/50 rounded-xl focus:bg-white pr-12 font-mono"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">€</span>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => setShowNewProductModal(false)}
                                        className="flex-1 h-12 rounded-xl text-slate-500 font-bold"
                                    >
                                        Annuler
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-[2] h-12 bg-slate-900 text-white rounded-xl shadow-lg hover:bg-slate-800 font-bold"
                                    >
                                        Ajouter au devis
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default CreateQuote;
