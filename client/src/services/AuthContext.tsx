import axios from "axios";
import { createContext, useEffect, useState, useCallback, useMemo, ReactNode } from "react";


interface User {
    userId: string,
    username: string,
    email: string,
    skillLevel: string,
    favoritePlaces: Array<string>,
    accessToken: string,
    refreshToken: string,
}
  
// Define the shape of your authentication context
interface AuthContextType {
    currentUser: User | null;
    login: (inputs: any) => Promise<void>;
    logout: () => Promise<void>;
    refreshToken: () => Promise<void>;
}
  
// Create the authentication context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
// Define the props for the AuthContextProvider component
interface AuthContextProviderProps {
    children: ReactNode;
}
  
const BLOCKPARTY_API_URL: string = import.meta.env.VITE_BLOCKPARTY_API_URL as string;

// Create the authentication context provider component
export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Define the login function
    const login = useCallback(async (inputs: any) => {
        try {
            const res = await axios.post(`${BLOCKPARTY_API_URL}/auth/login`, inputs);
            if (res.status === 200) {
                setCurrentUser(res.data);
            } else {
                throw new Error(res.data.message || 'Login failed');
            }
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }, []);
  
    // Define the logout function
    const logout = useCallback(async () => {
        try {
            await axios.post(`${BLOCKPARTY_API_URL}/auth/logout`);
            setCurrentUser(null);
        } catch (error) {
            console.error("Logout error:", error);
        }
    }, []);

    const refreshToken = useCallback(async () => {
        try {
            const storedUser = localStorage.getItem("user");
            if (!storedUser) {
                throw new Error("No user available");
            }

            const user = JSON.parse(storedUser) as User;
            const res = await axios.post(`${BLOCKPARTY_API_URL}/auth/refresh-token`, { refreshToken: user.refreshToken });
            if (res.status === 200) {
                const { accessToken: newAccessToken } = res.data;
                const updatedUser = { ...user, accessToken: newAccessToken };
                setCurrentUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
            } else {
                throw new Error("Failed to refresh token");
            }
        } catch (error) {
            console.error("Refresh token error:", error);
            logout();
        }
    }, [logout]);
  
    
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("user", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("user");
        }
    }, [currentUser]);
  
    // Memoize the authentication context value
    const authContextValue = useMemo<AuthContextType>(() => ({ currentUser, login, logout, refreshToken }), [
        currentUser,
        login,
        logout,
    ]);
  
    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};