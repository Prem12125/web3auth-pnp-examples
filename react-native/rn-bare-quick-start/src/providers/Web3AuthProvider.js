import React, { createContext, useContext, useState } from 'react';

const Web3AuthContext = createContext();

export const Web3AuthProvider = ({ children }) => {
  const [web3auth, setWeb3Auth] = useState(null);

  return (
    <Web3AuthContext.Provider value={{ web3auth, setWeb3Auth }}>
      {children}
    </Web3AuthContext.Provider>
  );
};

export const useWeb3Auth = () => useContext(Web3AuthContext);
