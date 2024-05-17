import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext';

const Logout = () => {
    const navigate = useNavigate();
    const { logout } : any = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <button className="text-onBackground hover:text-secondary transition" onClick={handleLogout}>Logout</button>
    );
};

export default Logout;