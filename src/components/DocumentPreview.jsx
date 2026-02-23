import React from 'react';
import { cn } from '../utils/cn';
import { useCompany } from '../hooks/useCompany';

const DocumentPreview = ({ document = {} }) => {
    const { activeCompany } = useCompany();

    // Default mock data if none provided
    const data = {
        type: document.type || 'DEVIS',
        numero: document.numero || 'DEV-2024-001',
        date: document.date || new Date().toLocaleDateString('fr-FR'),
        client: document.client || { nom: 'NOM CLIENT', adresse: 'Adresse du client' },
        entreprise: {
            nom: activeCompany.name,
            adresse: '12 rue de la Paix, 75002 Paris',
            siret: activeCompany.siret,
            ...document.entreprise
        },
        lignes: document.lignes || [
            { description: 'Exemple de prestation', quantite: 1, prixUnitaire: 0 }
        ],
        totalHT: document.totalHT || 0,
        montantTVA: document.montantTVA || 0,
        totalTTC: document.totalTTC || 0,
        ...document
    };

    return (
        <div className="bg-white shadow-2xl mx-auto rounded-sm p-[10%] aspect-[1/1.414] text-slate-900 text-[12px] font-sans flex flex-col h-full overflow-hidden select-none">
            {/* Header */}
            <div className="flex justify-between items-start mb-12">
                <div className="space-y-1">
                    <p className="font-clash font-bold text-xl uppercase tracking-tight">{data.entreprise.nom}</p>
                    <p className="text-slate-500 text-[10px] w-48 leading-relaxed whitespace-pre-wrap">{data.entreprise.adresse}</p>
                </div>
                <div className="text-right">
                    <h2 className="text-3xl font-black text-slate-900 uppercase leading-none mb-1">{data.type}</h2>
                    <p className="text-slate-500 font-mono text-[9px]">N° {data.numero}</p>
                    <p className="text-slate-500 text-[9px]">Date : {data.date}</p>
                </div>
            </div>

            {/* Client Info */}
            <div className="mb-12 flex justify-end">
                <div className="w-1/2 p-6 bg-slate-50/50 rounded-xl border border-slate-100">
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-2">Destinataire</p>
                    <p className="font-bold text-sm mb-1">{data.client.nom}</p>
                    <p className="text-slate-600 text-[10px] whitespace-pre-wrap leading-normal">{data.client.adresse}</p>
                </div>
            </div>

            {/* Table */}
            <div className="flex-1">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b-2 border-slate-900">
                            <th className="py-3 font-bold uppercase tracking-widest text-[8px]">Description</th>
                            <th className="py-3 font-bold uppercase tracking-widest text-[8px] text-center w-16">Qté</th>
                            <th className="py-3 font-bold uppercase tracking-widest text-[8px] text-right w-24">P.U HT</th>
                            <th className="py-3 font-bold uppercase tracking-widest text-[8px] text-right w-24">Total HT</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.lignes.map((ligne, idx) => (
                            <tr key={idx}>
                                <td className="py-4">
                                    <p className="font-bold">{ligne.description || ligne.name}</p>
                                    <p className="text-[10px] text-slate-500 mt-0.5">{ligne.details}</p>
                                </td>
                                <td className="py-4 text-center font-mono">{ligne.quantite || ligne.qty}</td>
                                <td className="py-4 text-right font-mono">{(ligne.prixUnitaire || ligne.price || 0).toFixed(2)} €</td>
                                <td className="py-4 text-right font-bold font-mono">{((ligne.quantite || ligne.qty || 1) * (ligne.prixUnitaire || ligne.price || 0)).toFixed(2)} €</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Totals */}
            <div className="mt-8 border-t-2 border-slate-900 pt-6">
                <div className="flex justify-end">
                    <div className="w-1/3 space-y-2">
                        <div className="flex justify-between text-slate-500">
                            <span>Total HT</span>
                            <span className="font-mono">{data.totalHT.toFixed(2)} €</span>
                        </div>
                        <div className="flex justify-between text-slate-500">
                            <span>TVA (10%)</span>
                            <span className="font-mono">{data.montantTVA.toFixed(2)} €</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-slate-100 text-lg font-black font-clash">
                            <span>TOTAL TTC</span>
                            <span>{data.totalTTC.toFixed(2)} €</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-12 border-t border-slate-50 text-center">
                <p className="text-[8px] text-slate-400 leading-normal">
                    {data.entreprise.nom} - SIRET {data.entreprise.siret} - {data.entreprise.adresse}
                    <br />
                    TVA non applicable, art. 293 B du CGI - En cas de retard de paiement, une indemnité forfaitaire de 40€ est due.
                </p>
            </div>
        </div>
    );
};

export default DocumentPreview;
