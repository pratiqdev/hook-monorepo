const IS_DEV = process?.env?.VERCEL_ENV !== 'production' && process?.env?.VERCEL_ENV !== 'preview'
module.exports = IS_DEV