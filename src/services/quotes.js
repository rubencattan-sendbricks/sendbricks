import { b44, SCHEMAS } from './base44';

// Mock data for initial development if Base44 is not configured
const MOCK_QUOTES = [
    { id: '1', ref: 'DEV-2401-012', client: 'Mme. Durand', amount: '389.00 €', status: 'Signé', date: '30 Jan 2024' },
    { id: '2', ref: 'DEV-2401-009', client: 'SARL TechFlow', amount: '1,250.00 €', status: 'Envoyé', date: '28 Jan 2024' },
    { id: '3', ref: 'DEV-2401-005', client: 'Jean Dupont', amount: '210.00 €', status: 'Brouillon', date: '15 Jan 2024' },
];

export const quotesService = {
    async getAll() {
        try {
            // Real Base44 call
            // const result = await b44.collection(SCHEMAS.QUOTES).find();
            // return result;

            // Simulating network delay
            await new Promise(resolve => setTimeout(resolve, 500));
            return MOCK_QUOTES;
        } catch (error) {
            console.error('Failed to fetch quotes:', error);
            return MOCK_QUOTES;
        }
    },

    async getById(id) {
        await new Promise(resolve => setTimeout(resolve, 300));
        return MOCK_QUOTES.find(q => q.id === id) || MOCK_QUOTES[0];
    },

    async create(data) {
        console.log('Creating quote with data:', data);
        await new Promise(resolve => setTimeout(resolve, 800));
        return { id: Math.random().toString(36).substr(2, 9), ...data };
    }
};
