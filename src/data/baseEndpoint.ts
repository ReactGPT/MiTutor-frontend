const isDevelopment = import.meta.env.NODE_ENV === 'development';

export const API_BASE_URL = isDevelopment
    ? 'https://localhost:44369'
    : 'http://54.235.188.31';