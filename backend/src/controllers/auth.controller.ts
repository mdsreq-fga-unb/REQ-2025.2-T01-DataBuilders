// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import * as githubAuthService from '../services/github-auth.service';
import { GITHUB_CLIENT_ID, GITHUB_CALLBACK_URL } from '../config';

// ========== AUTENTICAÇÃO TRADICIONAL ==========

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password, role } = req.body;
    
    // Validações básicas
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: 'Name, email and password are required' 
      });
    }

    const user = await authService.registerUser(name, email, password, role);
    res.status(201).json({ 
      id: user.id, 
      email: user.email, 
      name: user.name,
      role: user.role 
    });
  } catch (error) {
    console.error('Register error:', error);
    
    // Erro de email duplicado do Prisma
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    
    res.status(500).json({ 
      message: 'Registration failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required' 
      });
    }

    const auth = await authService.authenticate(email, password);
    
    if (!auth) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    res.json(auth);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Login failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// ========== AUTENTICAÇÃO GITHUB OAUTH ==========

export function initiateGitHubAuth(req: Request, res: Response) {
  const scope = 'user:email read:user';
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(GITHUB_CALLBACK_URL)}&scope=${encodeURIComponent(scope)}`;
  
  res.json({ 
    authUrl: githubAuthUrl,
    message: 'Redirect user to this URL to authenticate with GitHub'
  });
}

export async function githubCallback(req: Request, res: Response) {
  const { code } = req.query;

  if (!code || typeof code !== 'string') {
    return res.status(400).json({ 
      message: 'Authorization code is required' 
    });
  }

  try {
    const result = await githubAuthService.authenticateWithGitHub(code);
    res.json(result);
  } catch (error) {
    console.error('GitHub auth error:', error);
    res.status(500).json({ 
      message: 'Authentication failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}