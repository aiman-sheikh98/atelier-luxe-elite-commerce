
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import { getProductsByCollection } from '@/data/products';

const Collection = () => {
  const { collectionType } = useParams<{ collectionType: 'featured' | 'new-arrivals' | 'bestsellers' }>();
  
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
  
  const products = getProductsByCollection(getCollectionType() as any);

  return (
    <>
      <Header />
      
      <main className="min-h-screen">
        <div className="luxury-container py-16">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-serif">{getTitle()}</h1>
            <div className="w-20 h-0.5 bg-luxury mx-auto mt-4"></div>
          </div>
          
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
