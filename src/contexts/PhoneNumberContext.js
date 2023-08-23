import { createContext, useState } from 'react';

const PhoneNumberContext = createContext();

const PhoneNumberProvider = ({ children }) => {
  const [phoneNumber] = useState('07 70 XX XX XX');
  const [address] = useState('5 rue des balenos,\n83340 Flassans-sur-Issole');

  return (
    <PhoneNumberContext.Provider value={{ phoneNumber, address }}>
      {children}
    </PhoneNumberContext.Provider>
  );
};

export { PhoneNumberContext, PhoneNumberProvider };
