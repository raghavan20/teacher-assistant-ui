import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// import './assets/logo.png';
// import './assets/analyze.gif';
// import './assets/fb.png';
// import './assets/wa.png';
// import './assets/insta.png';
// import './assets/email.png';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
