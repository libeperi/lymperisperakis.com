const isProd = process.env.NODE_ENV === 'production';
export const BASE_PATH = isProd ? "/lymperisperakis.com" : "";
