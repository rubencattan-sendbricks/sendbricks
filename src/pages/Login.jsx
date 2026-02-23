import React from 'react';
import { Button } from '../components/Button';
import { ShieldCheck, ArrowRight } from 'lucide-react';

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 font-mono">
            <div className="w-full max-w-md space-y-8">
                {/* Logo Section */}
                <div className="text-center space-y-4">
                    <div className="inline-flex w-16 h-16 bg-slate-900 rounded-2xl items-center justify-center shadow-2xl shadow-slate-200 animate-in zoom-in duration-500">
                        <span className="text-white font-clash font-bold text-4xl">S</span>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold font-clash tracking-tight">Accès Artisan</h1>
                        <p className="text-slate-500 text-sm">Connectez-vous pour gérer vos devis et entreprises.</p>
                    </div>
                </div>

                {/* Login Card */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.06)] border border-slate-100 space-y-6">
                    <div className="space-y-4">
                        <button className="w-full py-4 px-6 bg-white border border-slate-200 rounded-2xl flex items-center justify-center gap-4 hover:bg-slate-50 hover:border-slate-300 transition-all group relative overflow-hidden">
                            <div className="absolute inset-0 bg-slate-900 opacity-0 group-active:opacity-5 transition-opacity" />
                            <img src="https://www.google.com/favicon.ico" className="w-6 h-6 grayscale group-hover:grayscale-0 transition-all" alt="Google" />
                            <span className="font-bold text-slate-700">Continuer avec Google</span>
                            <ArrowRight size={18} className="text-slate-300 ml-auto group-hover:translate-x-1 group-hover:text-slate-900 transition-all" />
                        </button>

                        <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t border-slate-100"></div>
                            <span className="flex-shrink mx-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">ou</span>
                            <div className="flex-grow border-t border-slate-100"></div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Email professionnel</label>
                            <input
                                type="email"
                                placeholder="votre@email.fr"
                                className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50/30 px-6 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all"
                            />
                        </div>

                        <Button className="w-full h-14 rounded-2xl text-lg shadow-xl shadow-slate-200 bg-slate-900 group">
                            <span>Recevoir un lien magique</span>
                            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>

                    <div className="pt-4 flex items-center gap-3 justify-center text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                        <ShieldCheck size={14} className="text-green-500" />
                        Accès sécurisé par Base44 Auth
                    </div>
                </div>

                {/* Footer info */}
                <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                    SendBricks &copy; 2024 • Solution SaaS pour Artisans
                </p>
            </div>
        </div>
    );
};

export default Login;
