
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract redirect path from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect') || '/';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isLoginForm) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      
      // Redirect after successful login/register
      navigate(redirectTo === 'checkout' ? '/checkout' : `/${redirectTo}`);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <Header />
      
      <main className="luxury-container py-12 min-h-screen">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-serif mb-8 text-center">
            {isLoginForm ? 'Sign In' : 'Create Account'}
          </h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLoginForm && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-border focus:border-luxury outline-none"
                  required={!isLoginForm}
                />
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-border focus:border-luxury outline-none"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-border focus:border-luxury outline-none"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-luxury hover:bg-luxury-dark text-white py-6"
            >
              {loading 
                ? 'Please wait...' 
                : isLoginForm 
                  ? 'Sign In' 
                  : 'Create Account'}
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              {isLoginForm ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLoginForm(!isLoginForm)}
                className="text-luxury hover:underline ml-2"
              >
                {isLoginForm ? 'Create one' : 'Sign in'}
              </button>
            </p>
          </div>
          
          {isLoginForm && (
            <div className="mt-4 text-center">
              <Link to="/forgot-password" className="text-sm text-luxury hover:underline">
                Forgot your password?
              </Link>
            </div>
          )}
          
          <div className="mt-10 pt-8 border-t border-border">
            <p className="text-sm text-center text-muted-foreground mb-4">
              For demo purposes, use:
            </p>
            <div className="bg-muted p-3 rounded text-sm">
              <p><strong>Email:</strong> demo@example.com</p>
              <p><strong>Password:</strong> password</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Login;
