
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';

// Form validation schemas
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState('');
  
  const { login, register: registerUser, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract redirect path from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect') || '/';
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // Fix: Ensure redirectTo is properly formatted as a valid path
      const redirectPath = redirectTo === 'checkout' ? '/checkout' : 
                          (redirectTo.startsWith('/') ? redirectTo : `/${redirectTo}`);
      
      // Ensure we don't navigate to an empty or invalid path
      navigate(redirectPath || '/');
    }
  }, [isAuthenticated, navigate, redirectTo]);
  
  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  // Register form
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  
  const handleLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      setError('');
      await login(values.email, values.password);
      // Auth state change will handle navigation
    } catch (err: any) {
      // Error is handled in the login function
      setError(err.message || 'Login failed');
    }
  };
  
  const handleRegisterSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      setError('');
      await registerUser(values.name, values.email, values.password);
      // Auth state change will handle navigation
    } catch (err: any) {
      // Error is handled in the register function 
      setError(err.message || 'Registration failed');
    }
  };
  
  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
    setError('');
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
          
          {isLoginForm ? (
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-6">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium mb-2">Email</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="email" 
                          className="w-full p-3 border border-border focus:border-luxury outline-none" 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium mb-2">Password</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="password" 
                          className="w-full p-3 border border-border focus:border-luxury outline-none" 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-luxury hover:bg-luxury-dark text-white py-6"
                >
                  {isLoading ? 'Please wait...' : 'Sign In'}
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(handleRegisterSubmit)} className="space-y-6">
                <FormField
                  control={registerForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium mb-2">Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="w-full p-3 border border-border focus:border-luxury outline-none" 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium mb-2">Email</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="email" 
                          className="w-full p-3 border border-border focus:border-luxury outline-none" 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium mb-2">Password</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="password" 
                          className="w-full p-3 border border-border focus:border-luxury outline-none" 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-luxury hover:bg-luxury-dark text-white py-6"
                >
                  {isLoading ? 'Please wait...' : 'Create Account'}
                </Button>
              </form>
            </Form>
          )}
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              {isLoginForm ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={toggleForm}
                type="button"
                className="text-luxury hover:underline ml-2"
                disabled={isLoading}
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
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Login;
