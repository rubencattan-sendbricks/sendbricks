import { b44, SCHEMAS } from './base44';

const MOCK_INVOICES = [
    { id: '1', ref: 'FAC-2401-012', client: 'Mme. Durand', amount: '840.00 €', status: 'Payée', date: '30 Jan 2024', dueDate: 'Payée' },
    { id: '2', ref: 'FAC-2401-009', client: 'SARL TechFlow', amount: '1,250.00 €', status: 'Envoyé', date: '28 Jan 2024', dueDate: '15 Fév 2024' },
    { id: '3', ref: 'FAC-2401-005', client: 'Jean Dupont', amount: '210.00 €', status: 'En retard', date: '15 Jan 2024', dueDate: '30 Jan 2024' },
];

export const invoicesService = {
    async getAll() {
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_INVOICES;
    },

    async getById(id) {
        await new Promise(resolve => setTimeout(resolve, 300));
        return MOCK_INVOICES.find(i => i.id === id) || MOCK_INVOICES[0];
    },

    async create(data) {
        console.log('Creating invoice from quote:', data);
        await new Promise(resolve => setTimeout(resolve, 800));
        return { id: Math.random().toString(36).substr(2, 9), ...data, status: 'Envoyé' };
    }
};
