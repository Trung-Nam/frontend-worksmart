
let apiRoot = '';
if (import.meta.env.MODE === 'development') {
    apiRoot = 'http://localhost:8017';
}
if (import.meta.env.MODE === 'production') {
    apiRoot = 'https://backend-worksmart.onrender.com';
}

export const API_ROOT = apiRoot;