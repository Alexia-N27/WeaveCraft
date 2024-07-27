import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import SessionProvider from "./contexts/SessionContextProvider.jsx";

import App from './App.jsx';
import "./assets/styles/scss/main.scss";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SessionProvider>
      <App />
    </SessionProvider>
  </BrowserRouter>
);
