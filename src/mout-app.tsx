import ReactDOM from 'react-dom/client';
import App from '@/components/App';
import './styles.css';

const app = document.getElementById('app');

if (app) {
  ReactDOM.createRoot(app).render(<App />);
}