import React from 'react';
import PortalIKR from './PortalIKR';
import OfflineLearning from './OfflineLearning';
import { LanguageProvider } from './LanguageContext'; // Pastikan path ini betul mengikut folder bro

function App() {
  return (
    <LanguageProvider>
      <PortalIKR />
      <OfflineLearning />
    </LanguageProvider>
  );
}

export default App;