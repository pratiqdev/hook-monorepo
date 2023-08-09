const IS_DEV = process?.env?.VERCEL_ENV !== 'production' 
    && process?.env?.VERCEL_ENV !== 'preview' 
    && process?.env?.NODE_ENV !== 'production'
    && process?.env?.NODE_ENV !== 'preview' 
module.exports = IS_DEV