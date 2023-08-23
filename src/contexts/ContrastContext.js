import { createContext, useState } from 'react';

const ContrastContext = createContext();

const ContrastProvider = ({ children }) => {
  const [contrast, setContrast] = useState('base');

  const toggleContrast = () => {
    setContrast(prevContrast => prevContrast === 'base' ? 'darker' : prevContrast === 'darker' ? 'darkest' : 'base');
  };

  return (
    <ContrastContext.Provider value={{ contrast, toggleContrast }}>
      {children}
    </ContrastContext.Provider>
  );
};

export { ContrastContext, ContrastProvider };
