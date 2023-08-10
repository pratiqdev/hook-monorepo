export const isDev = process?.env?.VERCEL_ENV !== 'production' 
    && process?.env?.VERCEL_ENV !== 'preview'
    && process?.env?.MODE_ENV !== 'production'
    && process?.env?.MODE_ENV !== 'preview'
