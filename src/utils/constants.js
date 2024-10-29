let apiRoot = '';
if (import.meta.env.DEV) {
    apiRoot = 'http://localhost:8017';
}
if (import.meta.env.PROD) {
    apiRoot = 'https://backend-worksmart.onrender.com';
}

export const API_ROOT = apiRoot;