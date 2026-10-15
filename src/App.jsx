import React from 'react';
import PortalIKR from './PortalIKR';
import { LanguageProvider } from './LanguageContext'; // Pastikan path ini betul mengikut folder bro

function App() {
  return (
    <LanguageProvider>
      <PortalIKR />
    </LanguageProvider>
  );
}

export default App;