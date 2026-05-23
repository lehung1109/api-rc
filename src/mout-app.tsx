import ReactDOM from 'react-dom/client';
import App from '@/components/App';

const app = document.getElementById('app');

if (app) {
  ReactDOM.createRoot(app).render(<App />);
}