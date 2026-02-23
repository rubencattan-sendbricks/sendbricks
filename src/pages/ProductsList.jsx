import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Badge } from '../components/Badge';
import {
    Plus,
    Search,
    MoreVertical,
    Package,
    Tag,
    Edit2,
    Trash2,
    Filter
} from 'lucide-react';

const ProductRow = ({ product }) => (
    <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group rounded-xl">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-slate-900 group-hover:text-white transition-all">
                <Package size={24} />
            </div>
            <div>
                <h3 className="font-bold font-clash">{product.name}</h3>
                <p className="text-xs text-slate-400 font-mono tracking-tight">{product.description}</p>
            </div>
        </div>
        <div className="flex items-center gap-8">
            <div className="text-right">
                <p className="font-bold font-mono">
                    {typeof product.price === 'number' ? `${product.price.toFixed(2)} €` : product.price}
                </p>
                <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-tighter">
                    {product.category}
                </Badge>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900">
                    <Edit2 size={18} />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500">
                    <Trash2 size={18} />
                </Button>
            </div>
        </div>
    </div>
);

const ProductsList = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'Cylindre de haute sécurité', category: 'Serrurerie', price: '89.00 €', stock: '12', status: 'En Stock' },
        { id: 2, name: 'Forfait pose serrure', category: 'Service', price: '120.00 €', stock: '-', status: 'Actif' },
        { id: 3, name: 'Clé brevetée extra', category: 'Copiage', price: '45.00 €', stock: '45', status: 'En Stock' },
        { id: 4, name: 'Serrure 3 points A2P', category: 'Serrurerie', price: '240.00 €', stock: '5', status: 'Rupture' },
    ]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', category: 'Serrurerie', price: '', stock: '' });

    const handleAddProduct = () => {
        setProducts([...products, { ...newProduct, id: Date.now(), status: 'En Stock', price: `${newProduct.price} €` }]);
        setIsAddModalOpen(false);
        setNewProduct({ name: '', category: 'Serrurerie', price: '', stock: '' });
    };

    return (
        <div className="space-y-8 pb-20 relative">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold font-clash tracking-tight">Catalogue Produits</h1>
                    <p className="text-slate-500 mt-2">Gérez vos articles et forfaits partagés entre toutes vos sociétés.</p>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)} className="gap-2 bg-slate-900 shadow-xl shadow-slate-200 py-6 px-8 rounded-2xl">
                    <Plus size={20} />
                    Nouveau Produit
                </Button>
            </div>

            <Card>
                <CardHeader className="border-b border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <Input placeholder="Rechercher un produit, une référence..." className="pl-10" />
                        </div>
                        <Button variant="outline" className="gap-2">
                            <Filter size={18} />
                            Filtrer
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-2">
                    <div className="divide-y divide-slate-100">
                        {products.map((p, i) => (
                            <ProductRow key={p.id} product={p} />
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-center pt-4">
                <Button variant="ghost" className="text-slate-400 hover:text-slate-900 font-bold text-xs uppercase tracking-widest">
                    Afficher plus de produits
                </Button>
            </div>

            {/* Modal Mockup */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
                    <Card className="w-full max-w-lg shadow-2xl border-0 animate-in zoom-in-95 duration-200">
                        <CardHeader>
                            <CardTitle>Nouveau Produit</CardTitle>
                            <CardDescription>Ajoutez un article ou un service au catalogue.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Nom du produit</label>
                                <Input
                                    placeholder="Ex: Cylindre de sécurité"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Prix HT (€)</label>
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        value={newProduct.price}
                                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Stock (Optionnel)</label>
                                    <Input
                                        placeholder="Quantité"
                                        value={newProduct.stock}
                                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-6">
                                <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>Annuler</Button>
                                <Button onClick={handleAddProduct} className="bg-slate-900">Créer le produit</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default ProductsList;
