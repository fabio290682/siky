
'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

type UserData = {
  name: string;
  email: string;
};

type UserContextType = {
  user: UserData;
  setUser: (user: UserData) => void;
};

const defaultUser: UserData = {
    name: 'Jeferson.Ishikawa',
    email: 'Jeferson.Ishikawa@iiibrasil.com.br',
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData>(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
