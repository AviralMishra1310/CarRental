import React, { useEffect } from 'react';
import NavBarOwner from "../../components/owner/NavbarOwner";
import Sidebar from '../../components/owner/Sidebar';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {
    const { isOwner, navigate } = useAppContext();

    // Redirect if not owner
    useEffect(() => {
        if (!isOwner) {
            navigate('/');
        }
    }, [isOwner, navigate]);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Top Navbar */}
            <NavBarOwner />

            {/* Main Section: Sidebar + Content */}
            <div className="flex flex-1">
                <Sidebar />
                <div className="flex-1 p-4 md:p-6 bg-light">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
