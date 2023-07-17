import React from 'react';
import { StyleSheetManager } from 'styled-components';

import ReactDOM from 'react-dom/client';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyleSheetManager shouldForwardProp={(prop) => prop !== 'variation'}>
      <App />
    </StyleSheetManager>
  </React.StrictMode>
);
