import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Noticia } from './components/noticia.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Noticia />
  </StrictMode>,
)
