import axios from 'axios';
import { initCsrf } from './utils/csrf';

// Configure axios defaults
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true;

// Initialize CSRF handling when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await initCsrf();
        console.log('CSRF protection initialized');
    } catch (err) {
        console.error('Failed to initialize CSRF protection:', err);
    }
});
