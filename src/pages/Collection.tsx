
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import { getProductsByCollection } from '@/data/products';

const Collection = () => {
  const { collectionType } = useParams<{ collectionType: string }>();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Handle direct navigation to /featured, /new-arrivals, or /bestsellers routes
    if (!collectionType) {
      const pathSegments = window.location.pathname.split('/');
      const directPath = pathSegments[pathSegments.length - 1];
      
      if (['featured', 'new-arrivals', 'bestsellers'].includes(directPath)) {
        navigate(`/collection/${directPath}`, { replace: true });
      }
    }
  }, [collectionType, navigate]);
  
  const getTitle = () => {
    switch (collectionType) {
      case 'featured':
        return 'Featured Products';
      case 'new-arrivals':
        return 'New Arrivals';
      case 'bestsellers':
        return 'Bestsellers';
      default:
        return 'Collection';
    }
  };
  
  const getCollectionType = () => {
    switch (collectionType) {
      case 'featured':
        return 'featured';
      case 'new-arrivals':
        return 'new';
      case 'bestsellers':
        return 'bestseller';
      default:
        return 'featured';
    }
  };
  
  const getBannerImage = () => {
    switch (collectionType) {
      case 'featured':
        return 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop';
      case 'new-arrivals':
        return 'https://images.unsplash.com/photo-1469353680598-5dc830efef7c?q=80&w=2071&auto=format&fit=crop';
      case 'bestsellers':
        return 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop';
      default:
        return 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop';
    }
  };
  
  const products = getProductsByCollection(getCollectionType() as any);

  return (
    <>
      <Header />
      
      <main className="min-h-screen">
        {/* Banner Image */}
        <div className="relative h-80 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={getBannerImage()} 
              alt={getTitle()} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-serif">{getTitle()}</h1>
              <div className="w-20 h-0.5 bg-white mx-auto mt-4"></div>
            </div>
          </div>
        </div>
        
        <div className="luxury-container py-16">
          <div className="mb-8">
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              {collectionType === 'featured' && 'Our curated selection of exceptional products, chosen for their outstanding craftsmanship and design.'}
              {collectionType === 'new-arrivals' && 'The latest additions to our collection, representing the pinnacle of contemporary luxury.'}
              {collectionType === 'bestsellers' && 'Our most coveted items, cherished by discerning customers worldwide for their timeless appeal.'}
            </p>
          </div>
          
          <ProductGrid products={products} />
          
          {products.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">No products found in this collection.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Collection;
