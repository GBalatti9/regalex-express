import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppTheme } from './theme/AppTheme.jsx';
import { BrowserRouter } from 'react-router-dom';
// import { AppRouter } from './router/AppRouter.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppTheme />
    </BrowserRouter>
  </React.StrictMode>,
)
