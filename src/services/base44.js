// Base44 SDK stub — replace with real SDK when available
const PROJECT_ID = import.meta.env.VITE_BASE44_PROJECT_ID;
const API_KEY = import.meta.env.VITE_BASE44_API_KEY;

export const b44 = {
    projectId: PROJECT_ID,
    apiKey: API_KEY,
    auth: {
        getUser: async () => null,
        signInWithGoogle: async () => {},
        signOut: async () => {},
    },
    collection: () => ({
        find: async () => [],
        findOne: async () => null,
        create: async () => ({}),
        update: async () => ({}),
        delete: async () => {},
    }),
};

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
