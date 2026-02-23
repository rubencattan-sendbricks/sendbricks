import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    FileText,
    Settings,
    Package,
    Users,
    LayoutDashboard,
    ChevronRight,
    LogOut,
    Building2,
    Plus,
    Shield,
    FileStack
} from 'lucide-react';
import { cn } from '../utils/cn';
import { Button } from './Button';
import { useCompany } from '../hooks/useCompany';

const SidebarItem = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) => cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
            isActive
                ? "bg-slate-900 text-slate-50 shadow-lg shadow-slate-200"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
        )}
    >
        <Icon size={20} className={cn("transition-transform group-hover:scale-110")} />
        <span className="font-semibold text-sm">{label}</span>
        <ChevronRight size={14} className={cn("ml-auto opacity-0 -translate-x-2 transition-all", "group-hover:opacity-100 group-hover:translate-x-0")} />
    </NavLink>
);

const AdminLayout = ({ children }) => {
    const { activeCompany } = useCompany();
    const location = useLocation();
    const isSuperAdminPath = location.pathname.startsWith('/admin/super');

    return (
        <div className="flex min-h-screen bg-slate-50 font-mono text-slate-900">
            {/* Sidebar */}
            <aside className="w-72 border-r border-slate-200 bg-white flex flex-col fixed inset-y-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
                <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-10 px-2 group cursor-pointer">
                        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-200 transition-transform group-hover:scale-110">
                            <span className="text-white font-clash font-bold text-2xl leading-none">S</span>
                        </div>
                        <span className="font-clash font-bold text-2xl tracking-tight">SendBricks</span>
                    </div>

                    {/* Active Company Badge - Only show for regular artisans */}
                    {!isSuperAdminPath && (
                        <div className="mb-8 px-2">
                            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                                <div className="w-8 h-8 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-slate-400">
                                    <Building2 size={16} />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest leading-none mb-1">Entreprise active</p>
                                    <p className="text-xs font-bold font-clash truncate">{activeCompany.name}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <nav className="flex-1 space-y-1.5">
                        {!isSuperAdminPath ? (
                            <>
                                <SidebarItem to="/admin/quotes/new" icon={Plus} label="Nouveau Devis" />
                                <SidebarItem to="/admin/quotes" icon={FileText} label="Historique Devis" />
                                <SidebarItem to="/admin/invoices" icon={FileText} label="Factures" />
                                <SidebarItem to="/admin/templates" icon={FileStack} label="Modèles" />
                                <SidebarItem to="/admin/products" icon={Package} label="Catalogue" />
                                <SidebarItem to="/admin/clients" icon={Users} label="Base Clients" />
                                <div className="h-px bg-slate-100 my-4 mx-2" />
                                <SidebarItem to="/admin/dashboard" icon={LayoutDashboard} label="Tableau de bord" />
                                <SidebarItem to="/admin/settings" icon={Settings} label="Paramètres" />
                            </>
                        ) : (
                            <div className="animate-in slide-in-from-left duration-300">
                                <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Super Admin</p>
                                <SidebarItem to="/admin/super/dashboard" icon={Shield} label="Système" />
                                <SidebarItem to="/admin/super/users" icon={Users} label="Artisans" />
                                <SidebarItem to="/admin/super/companies" icon={Building2} label="Entreprises" />
                            </div>
                        )}
                    </nav>

                    <div className="pt-6 mt-6 border-t border-slate-100">
                        <Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                            <LogOut size={20} />
                            <span className="font-bold text-sm">Déconnexion</span>
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-72 p-10 min-h-screen">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
