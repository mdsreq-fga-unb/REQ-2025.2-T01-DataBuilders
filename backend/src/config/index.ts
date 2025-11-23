import dotenv from 'dotenv';
dotenv.config();
export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
export const ALLOWED_ORGS = ['EDAII']; 