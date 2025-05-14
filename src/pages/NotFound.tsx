
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const NotFound = () => {
  return (
    <>
      <Header />
      
      <main className="luxury-container py-12 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-xl">
          <h1 className="text-6xl font-serif mb-4">404</h1>
          <h2 className="text-2xl font-medium mb-6">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            We're sorry, the page you requested could not be found. Please check the URL and try again.
          </p>
          <Button 
            asChild
            className="bg-luxury hover:bg-luxury-dark text-white"
          >
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default NotFound;
