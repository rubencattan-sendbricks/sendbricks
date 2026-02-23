import { useState, useEffect } from 'react';
import { b44 } from '../services/base44';

export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // This will connect to Base44 Auth later
        // For now, it's a shell
        const checkUser = async () => {
            try {
                // const currentUser = await b44.auth.getUser();
                // setUser(currentUser);
            } catch (e) {
                console.error("Auth check failed", e);
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, []);

    const loginWithGoogle = async () => {
        // await b44.auth.signInWithGoogle();
        console.log("Redirecting to Google Auth...");
    };

    const logout = async () => {
        // await b44.auth.signOut();
        setUser(null);
    };

    return { user, loading, loginWithGoogle, logout };
}
