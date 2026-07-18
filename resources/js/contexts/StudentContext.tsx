// resources/js/Contexts/StudentContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface StudentContextType {
  anon: boolean;
  setAnon: React.Dispatch<React.SetStateAction<boolean>>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export function StudentProvider({ children }: { children: ReactNode }) {
  const [anon, setAnon] = useState<boolean>(false);

  return (
    <StudentContext.Provider value={{ anon, setAnon }}>
      {children}
    </StudentContext.Provider>
  );
}

// Custom hook for clean child page consumption
export function useStudent() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
}
