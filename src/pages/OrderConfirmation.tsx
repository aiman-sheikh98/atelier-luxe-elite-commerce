
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();
  
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      
      <main className="luxury-container py-12 min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex justify-center items-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          
          <h1 className="text-3xl font-serif mb-4">Thank You for Your Order!</h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Your order has been confirmed and is now being processed.
          </p>
          
          <div className="bg-muted p-6 mb-8 rounded-md">
            <p className="font-medium text-lg mb-2">Order #{orderId}</p>
            <p className="text-muted-foreground">
              A confirmation email has been sent to your registered email address.
            </p>
          </div>
          
          <p className="text-muted-foreground mb-4">
            Your order will be shipped within 1-2 business days. You can track your order status in your account.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              asChild
              className="bg-luxury hover:bg-luxury-dark text-white"
            >
              <Link to="/profile">View Order Details</Link>
            </Button>
            
            <Button 
              asChild
              variant="outline"
            >
              <Link to="/">
                <ShoppingBag size={18} className="mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default OrderConfirmation;
