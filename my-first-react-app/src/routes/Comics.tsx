import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar';

export default function Comics() {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [hasSession, setHasSession] = React.useState(false);

    React.useEffect(() => {
        if (!isLoaded) {
            const tokenSesion =
                localStorage.getItem('tokenSesion');
            
            if (tokenSesion) {
                setHasSession(true);
            }

            setIsLoaded(true);
        }
    }, [isLoaded]);

    if (!isLoaded) {
        return <p>Loading...</p>;
    }

    if (isLoaded && !hasSession) {
        return <Navigate to="/inicioSesion" />;
    }

    return (
        <>
            <AppNavbar />
            <Outlet />
        </>
    );
}
