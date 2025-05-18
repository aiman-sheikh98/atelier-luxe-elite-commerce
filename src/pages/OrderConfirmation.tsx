
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ShoppingBag, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { verifyPaymentSession } from '@/services/StripeService';
import { useCart } from '@/context/CartContext';
import { useNotifications } from '@/context/NotificationContext';
import { showOrderConfirmation } from '@/components/notification/OrderConfirmation';

const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [isVerifying, setIsVerifying] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [notificationSent, setNotificationSent] = useState(false);
  const { clearCart } = useCart();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Clear cart on successful order
    clearCart();
    
    const verifyPayment = async () => {
      if (!orderId) return;
      
      try {
        const result = await verifyPaymentSession(orderId);
        
        if (result?.success && result.payment_status) {
          setPaymentStatus(result.payment_status);
          
          // If payment is successful and notification not yet sent, show notification
          if (result.payment_status === 'paid' && !notificationSent) {
            // Show order confirmation notification
            showOrderConfirmation(orderId.substring(0, 8));
            setNotificationSent(true);
          }
        } else {
          console.error("Payment verification failed:", result?.error);
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
      } finally {
        setIsVerifying(false);
      }
    };
    
    verifyPayment();
  }, [orderId, clearCart, notificationSent]);
  
  // If no order ID is provided, redirect to home
  if (!orderId && !isVerifying) {
    navigate('/');
    return null;
  }

  return (
    <>
      <Header />
      
      <main className="luxury-container py-12 min-h-screen">
        {isVerifying ? (
          <div className="max-w-2xl mx-auto text-center">
            <Loader2 size={48} className="mx-auto animate-spin text-luxury mb-6" />
            <h1 className="text-3xl font-serif mb-4">Verifying Your Order</h1>
            <p className="text-lg text-muted-foreground">
              Please wait while we confirm your payment...
            </p>
          </div>
        ) : (
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
              {paymentStatus && (
                <p className="mt-2 font-medium">
                  Payment Status: <span className="capitalize">{paymentStatus}</span>
                </p>
              )}
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
        )}
      </main>
      
      <Footer />
    </>
  );
};

export default OrderConfirmation;
