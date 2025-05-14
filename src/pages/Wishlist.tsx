
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { getProductById } from '@/data/products';

const Wishlist = () => {
  const { isAuthenticated, profile, removeFromWishlist } = useAuth();
  const { addItem } = useCart();
  
  // Format price to currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  // Get wishlist items with product details
  const wishlistItems = profile?.wishlist.map(id => {
    const product = getProductById(id);
    return product ? {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category
    } : null;
  }).filter(Boolean) || [];
  
  const handleAddToCart = (item: any) => {
    addItem({
      ...item,
      quantity: 1
    });
  };

  return (
    <>
      <Header />
      
      <main className="luxury-container py-12 min-h-screen">
        <h1 className="text-3xl font-serif mb-8">Your Wishlist</h1>
        
        {!isAuthenticated ? (
          <div className="text-center py-16 space-y-4">
            <div className="inline-flex justify-center items-center w-16 h-16 bg-muted rounded-full">
              <Heart size={24} className="text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium">Sign in to view your wishlist</h2>
            <p className="text-muted-foreground">Create an account or sign in to save items to your wishlist.</p>
            <Button 
              asChild
              className="mt-4 bg-luxury hover:bg-luxury-dark text-white"
            >
              <Link to="/login?redirect=wishlist">Sign In</Link>
            </Button>
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <div className="inline-flex justify-center items-center w-16 h-16 bg-muted rounded-full">
              <Heart size={24} className="text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium">Your wishlist is empty</h2>
            <p className="text-muted-foreground">Add items to your wishlist to save them for later.</p>
            <Button 
              asChild
              className="mt-4 bg-luxury hover:bg-luxury-dark text-white"
            >
              <Link to="/">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item: any) => (
              <div key={item.id} className="border border-border rounded-md overflow-hidden group">
                <div className="relative">
                  <Link to={`/product/${item.id}`}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-64 object-cover"
                    />
                  </Link>
                  
                  <Button
                    onClick={() => removeFromWishlist(item.id)}
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 text-foreground shadow-sm transition-all z-10"
                  >
                    <Trash2 size={18} className="text-destructive" />
                  </Button>
                </div>
                
                <div className="p-4">
                  <Link to={`/product/${item.id}`} className="hover:text-luxury">
                    <h3 className="font-medium">{item.name}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground capitalize mt-1">
                    {item.category}
                  </p>
                  <p className="font-medium text-luxury mt-2">
                    {formatPrice(item.price)}
                  </p>
                  
                  <div className="mt-4 flex gap-2">
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 bg-luxury hover:bg-luxury-dark text-white"
                    >
                      <ShoppingBag size={16} className="mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </>
  );
};

export default Wishlist;
