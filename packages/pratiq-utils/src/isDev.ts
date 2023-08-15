export const checkCurrentDevEnv = ():boolean => !!(
    typeof process !== 'undefined' 
    && process?.env?.VERCEL_ENV !== 'production' 
    && process?.env?.VERCEL_ENV !== 'preview'
    && process?.env?.NODE_ENV !== 'production'
    && process?.env?.NODE_ENV !== 'preview'
)

export const compileTimeDevEnv: boolean = !!(
    typeof process !== 'undefined' 
    && process?.env?.VERCEL_ENV !== 'production'
    && process?.env?.VERCEL_ENV !== 'preview'
    && process?.env?.NODE_ENV !== 'production'
    && process?.env?.NODE_ENV !== 'preview'
)