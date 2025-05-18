
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';
import { useAuth } from '@/context/AuthContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product
}) => {
  const {
    isAuthenticated,
    addToWishlist,
    removeFromWishlist,
    checkInWishlist
  } = useAuth();
  
  const isInWishlist = isAuthenticated && checkInWishlist(product.id);
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
      return;
    }
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  // Format price to currency
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(product.price);
  
  // Ensure product has at least one image
  const productImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1780&auto=format&fit=crop';

  return (
    <div className="group relative">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          {/* Product image */}
          <img 
            src={productImage} 
            alt={product.name} 
            className="w-full h-80 object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              // Fallback image if the primary one fails to load
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loop
              if (product.category === 'watches') {
                target.src = 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1742&auto=format&fit=crop';
              } else if (product.category === 'clothing') {
                target.src = 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1011&auto=format&fit=crop';
              } else if (product.category === 'perfumes') {
                target.src = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1780&auto=format&fit=crop';
              } else {
                target.src = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1035&auto=format&fit=crop';
              }
            }}
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.new && <span className="bg-luxury-light text-white px-3 py-1 text-xs font-medium">
                New
              </span>}
            {product.bestseller && <span className="bg-luxury-dark text-white px-3 py-1 text-xs font-medium">
                Bestseller
              </span>}
          </div>
          
          {/* Wishlist button */}
          <Button onClick={handleWishlistToggle} variant="ghost" size="icon" className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 text-foreground shadow-sm transition-all z-10">
            <Heart size={18} className={isInWishlist ? "fill-luxury text-luxury" : ""} />
          </Button>
        </div>
        
        {/* Product info */}
        <div className="mt-4 space-y-1">
          <h3 className="font-medium text-foreground">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground capitalize">
            {product.category}
          </p>
          <p className="font-medium text-luxury">
            {formattedPrice}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
