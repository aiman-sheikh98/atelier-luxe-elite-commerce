
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { showOrderConfirmation } from '@/components/notification/OrderConfirmation';
import { useAuth } from '@/context/AuthContext';
import { createCheckoutSession } from '@/services/StripeService';
import { toast } from 'sonner';

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Format price to currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=checkout');
      return;
    }
    
    try {
      setIsProcessing(true);
      
      // Create Stripe checkout session
      const result = await createCheckoutSession(items, totalPrice * 1.07); // Including tax
      
      if (!result || !result.url) {
        toast.error("Failed to initiate checkout. Please try again.");
        setIsProcessing(false);
        return;
      }
      
      // Redirect to Stripe checkout
      window.location.href = result.url;
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("An error occurred during checkout. Please try again later.");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Header />
      
      <main className="luxury-container py-12 min-h-screen">
        <h1 className="text-3xl font-serif mb-8">Shopping Bag</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <div className="inline-flex justify-center items-center w-16 h-16 bg-muted rounded-full">
              <ShoppingBag size={24} className="text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium">Your bag is empty</h2>
            <p className="text-muted-foreground">Add products to your bag to see them here.</p>
            <Button 
              asChild
              className="mt-4 bg-luxury hover:bg-luxury-dark text-white"
            >
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-8">
              {items.map((item) => (
                <div key={item.id} className="flex gap-6 pb-8 border-b border-border">
                  {/* Product image */}
                  <Link to={`/product/${item.id}`} className="w-24 h-24 bg-muted shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  
                  {/* Product details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link to={`/product/${item.id}`} className="hover:text-luxury">
                        <h3 className="font-medium">{item.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground capitalize mt-1">
                        {item.category}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-border w-24">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-8 flex items-center justify-center border-r border-border"
                          disabled={isProcessing}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="flex-1 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-8 flex items-center justify-center border-l border-border"
                          disabled={isProcessing}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive"
                        disabled={isProcessing}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="text-right">
                    <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                    {item.quantity > 1 && (
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(item.price)} each
                      </p>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Continue shopping */}
              <div className="text-center pt-4">
                <Link to="/" className="text-sm text-luxury hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-muted p-6 space-y-6">
                <h2 className="text-xl font-serif">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>{formatPrice(totalPrice * 0.07)}</span>
                  </div>
                </div>
                
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatPrice(totalPrice * 1.07)}</span>
                  </div>
                </div>
                
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-luxury hover:bg-luxury-dark text-white py-6"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>Checkout</>
                  )}
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  Shipping and taxes calculated at checkout.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </>
  );
};

export default Cart;
