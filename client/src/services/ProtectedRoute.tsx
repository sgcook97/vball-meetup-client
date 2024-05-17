import React, { useContext, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const authContext = useContext(AuthContext);

    if (!authContext || !authContext.currentUser) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;