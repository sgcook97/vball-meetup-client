import axios from "axios";
import { createContext, useEffect, useState, useCallback, useMemo, ReactNode } from "react";


interface User {
    userId: string,
    username: string,
    email: string,
    skillLevel: string,
    favoritePlaces: Array<string>,
    token: string,
}
  
// Define the shape of your authentication context
interface AuthContextType {
    currentUser: User | null;
    login: (inputs: any) => Promise<void>;
    logout: () => Promise<void>;
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
            setCurrentUser(res.data);
        } catch (error) {
            console.error("Login error:", error);
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
  
    // Update local storage when currentUser changes
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("user", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("user");
        }
    }, [currentUser]);
  
    // Memoize the authentication context value
    const authContextValue = useMemo<AuthContextType>(() => ({ currentUser, login, logout }), [
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