import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreateQuote from './pages/CreateQuote';
import QuotesList from './pages/QuotesList';
import QuoteDetails from './pages/QuoteDetails';
import ProductsList from './pages/ProductsList';
import ClientsList from './pages/ClientsList';
import Settings from './pages/Settings';
import CompanySelection from './pages/CompanySelection';
import ClientQuote from './pages/ClientQuote';
import Login from './pages/Login';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import SuperAdminUsers from './pages/SuperAdminUsers';
import SuperAdminCompanies from './pages/SuperAdminCompanies';
import InvoicesList from './pages/InvoicesList';
import InvoiceDetails from './pages/InvoiceDetails';
import TemplatesList from './pages/TemplatesList';
import AdminLayout from './components/AdminLayout';
import { useCompany } from './hooks/useCompany';
import Home from './pages/Home'; // Added back as it's used in the dashboard route

const AdminIndex = () => {
    const { companies, hasSelectedCompany } = useCompany();

    if (!hasSelectedCompany) {
        if (companies.length > 1) return <Navigate to="/admin/select-company" />;
        return <Navigate to="/admin/quotes/new" />;
    }

    return <Navigate to="/admin/quotes/new" />;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Client Routes */}
                <Route path="/quote/:id" element={<ClientQuote />} />

                {/* Admin Routes (Wrapped in AdminLayout) */}
                <Route path="/admin/*" element={
                    <AdminLayout>
                        <Routes>
                            <Route index element={<AdminIndex />} />
                            <Route path="select-company" element={<CompanySelection />} />
                            <Route path="dashboard" element={<Home />} />
                            <Route path="quotes" element={<QuotesList />} />
                            <Route path="quotes/:id" element={<QuoteDetails />} />
                            <Route path="quotes/new" element={<CreateQuote />} />
                            <Route path="invoices" element={<InvoicesList />} />
                            <Route path="invoices/:id" element={<InvoiceDetails />} />
                            <Route path="templates" element={<TemplatesList />} />
                            <Route path="products" element={<ProductsList />} />
                            <Route path="clients" element={<ClientsList />} />
                            <Route path="settings" element={<Settings />} />

                            {/* Super Admin Routes */}
                            <Route path="super/dashboard" element={<SuperAdminDashboard />} />
                            <Route path="super/users" element={<SuperAdminUsers />} />
                            <Route path="super/companies" element={<SuperAdminCompanies />} />
                        </Routes>
                    </AdminLayout>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/admin" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
