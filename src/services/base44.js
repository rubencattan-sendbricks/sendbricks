import { Base44 } from 'base44';

// These would normally come from .env
const PROJECT_ID = import.meta.env.VITE_BASE44_PROJECT_ID;
const API_KEY = import.meta.env.VITE_BASE44_API_KEY;

export const b44 = new Base44({
    projectId: PROJECT_ID,
    apiKey: API_KEY,
});

/**
 * Proposed Schemas (Entities)
 */

export const SCHEMAS = {
    COMPANIES: 'Company',
    PRODUCTS: 'Product',
    OPTIONS: 'Option',
    QUOTES: 'Quote',
    CLIENTS: 'Client',
    CGV: 'CGV',
};

// Placeholder for auth check
export const isAdmin = async () => {
    try {
        const user = await b44.auth.getUser();
        return !!user;
    } catch (e) {
        return false;
    }
};
