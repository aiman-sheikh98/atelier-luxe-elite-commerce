
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, UserRound, Menu, X, Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import NotificationDropdown from '@/components/notification/NotificationDropdown';
import SupportDialog from '@/components/support/SupportDialog';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { totalItems } = useCart();
  const { isAuthenticated, user, profile } = useAuth();
  
  const categories = [
    { name: 'Bags', path: '/category/bags' },
    { name: 'Wallets', path: '/category/wallets' },
    { name: 'Sneakers', path: '/category/sneakers' },
    { name: 'Clothing', path: '/category/clothing' }
  ];
  
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to search results - in a real app, this would filter products
    console.log('Search for:', searchQuery);
    setSearchOpen(false);
    setSearchQuery('');
  };
  
  return (
    <header className="bg-background border-b border-border">
      <div className="luxury-container py-3">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="text-foreground">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
          
          {/* Logo */}
          <div className="flex-1 flex justify-start lg:justify-center">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-serif tracking-wider font-semibold">LUXE</h1>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center space-x-8 mx-8">
            {categories.map(category => (
              <Link key={category.path} to={category.path} className="font-sans text-sm uppercase tracking-wide hover:text-luxury">
                {category.name}
              </Link>
            ))}
          </nav>
          
          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={toggleSearch} className="text-foreground">
              <Search size={20} />
            </Button>
            
            {/* Theme toggle */}
            <ThemeToggle />
            
            {/* Support dialog */}
            <SupportDialog />
            
            {/* Notification dropdown */}
            <NotificationDropdown />
            
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="text-foreground relative">
                <Heart size={20} />
              </Button>
            </Link>
            
            <Link to={isAuthenticated ? "/profile" : "/login"}>
              <Button variant="ghost" size="icon" className="text-foreground relative rounded-full hover:bg-luxury/10">
                {isAuthenticated && profile?.avatar ? (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile.avatar} alt={profile.name || ''} />
                    <AvatarFallback className="bg-luxury/20 text-luxury text-xs">
                      {profile.name ? profile.name.split(' ').map(n => n[0]).join('') : user?.email?.[0].toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <UserRound size={20} />
                )}
              </Button>
            </Link>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="text-foreground relative">
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-luxury text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-background z-50 flex flex-col pt-16">
          <Button variant="ghost" size="icon" className="absolute top-3 right-4" onClick={toggleMobileMenu}>
            <X size={24} />
          </Button>
          
          <nav className="flex flex-col items-center space-y-8 mt-16">
            {categories.map(category => (
              <Link 
                key={category.path} 
                to={category.path} 
                className="font-sans text-lg uppercase tracking-wide" 
                onClick={toggleMobileMenu}
              >
                {category.name}
              </Link>
            ))}
            
            <div className="border-t border-border w-24 my-4"></div>
            
            <Link 
              to="/wishlist" 
              className="font-sans text-lg uppercase tracking-wide flex items-center gap-2" 
              onClick={toggleMobileMenu}
            >
              <Heart size={18} /> Wishlist
            </Link>
            
            <Link 
              to={isAuthenticated ? "/profile" : "/login"} 
              className="font-sans text-lg uppercase tracking-wide flex items-center gap-2" 
              onClick={toggleMobileMenu}
            >
              <UserRound size={18} /> {isAuthenticated ? 'My Account' : 'Login'}
            </Link>
            
            <Link 
              to="/fashion-shows" 
              className="font-sans text-lg uppercase tracking-wide" 
              onClick={toggleMobileMenu}
            >
              Fashion Shows
            </Link>
          </nav>
        </div>
      )}
      
      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-background bg-opacity-95 z-50 flex justify-center pt-24">
          <div className="w-full max-w-2xl px-4">
            <Button variant="ghost" size="icon" className="absolute top-3 right-4" onClick={toggleSearch}>
              <X size={24} />
            </Button>
            
            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex items-center border-b border-foreground pb-2">
                <input 
                  type="text" 
                  placeholder="Search for products..." 
                  className="flex-1 bg-transparent outline-none text-foreground text-lg" 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)} 
                  autoFocus 
                />
                <Button variant="ghost" size="icon" type="submit">
                  <Search size={20} />
                </Button>
              </div>
            </form>
            
            <div className="text-sm text-muted-foreground">
              <p>Popular searches:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {['Bags', 'Wallets', 'Leather', 'New Arrivals'].map(term => (
                  <button 
                    key={term} 
                    className="px-3 py-1 border border-border rounded-full hover:bg-muted transition-colors" 
                    onClick={() => {
                      setSearchQuery(term);
                      handleSearch(new Event('submit') as any);
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
