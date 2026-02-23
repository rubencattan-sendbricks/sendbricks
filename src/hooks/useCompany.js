import { useState, useCallback } from 'react';

// Mock data initially, will be replaced by Base44 queries
const MOCK_COMPANIES = [
    { id: 'sam-fils', name: 'Serrurerie Sam & Fils', siret: '123 456 789 00012', logo: 'S' },
    { id: 'paris-depannage', name: 'Paris Dépannage BTP', siret: '987 654 321 00034', logo: 'P' },
];

export function useCompany() {
    const [activeCompanyId, setActiveCompanyId] = useState(MOCK_COMPANIES[0].id);
    const [hasSelectedCompany, setHasSelectedCompany] = useState(false);

    const activeCompany = MOCK_COMPANIES.find(c => c.id === activeCompanyId) || MOCK_COMPANIES[0];

    const switchCompany = useCallback((id) => {
        setActiveCompanyId(id);
        setHasSelectedCompany(true);
    }, []);

    return {
        companies: MOCK_COMPANIES,
        activeCompany,
        hasSelectedCompany,
        switchCompany,
        isLoading: false
    };
}
