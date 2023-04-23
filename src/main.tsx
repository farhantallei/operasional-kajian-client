import { setupStore } from '@app/store';
import { router } from '@app/router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

//theme
import 'primereact/resources/themes/lara-light-indigo/theme.css';

//icons
import 'primeicons/primeicons.css';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
