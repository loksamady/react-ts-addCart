import { createContext, useState, type ReactNode } from "react";

// Define types
interface User {
  name: string;
}

interface GlobalContextType {
  user: User | null;
  signOut: () => void;
}

interface ContextProps {
  children: ReactNode;
}

// Create context with default value
export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

const Context = ({ children }: ContextProps) => {
  const [user, setUser] = useState<User | null>({ name: "Seyha" });

  function signOut() {
    setUser(null);
  }

  return (
    <GlobalContext.Provider value={{ user, signOut }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default Context;
