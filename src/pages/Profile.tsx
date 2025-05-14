
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { User, Package, CreditCard, Heart, Home, LogOut } from 'lucide-react';

const Profile = () => {
  const { user, isAuthenticated, logout, profile } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  const [activeTab, setActiveTab] = useState('account');
  
  if (!isAuthenticated || !user || !profile) {
    return null; // Will redirect to login page
  }
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  // Format price to currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <>
      <Header />
      
      <main className="luxury-container py-12 min-h-screen">
        <h1 className="text-3xl font-serif mb-8">My Account</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 shrink-0">
              <TabsList className="flex flex-col w-full h-auto bg-transparent space-y-1">
                <TabsTrigger 
                  value="account" 
                  className="justify-start px-4 py-3 data-[state=active]:bg-muted data-[state=active]:text-luxury"
                >
                  <User size={18} className="mr-2" />
                  Account Information
                </TabsTrigger>
                <TabsTrigger 
                  value="orders" 
                  className="justify-start px-4 py-3 data-[state=active]:bg-muted data-[state=active]:text-luxury"
                >
                  <Package size={18} className="mr-2" />
                  Orders
                </TabsTrigger>
                <TabsTrigger 
                  value="addresses" 
                  className="justify-start px-4 py-3 data-[state=active]:bg-muted data-[state=active]:text-luxury"
                >
                  <Home size={18} className="mr-2" />
                  Addresses
                </TabsTrigger>
                <TabsTrigger 
                  value="payment" 
                  className="justify-start px-4 py-3 data-[state=active]:bg-muted data-[state=active]:text-luxury"
                >
                  <CreditCard size={18} className="mr-2" />
                  Payment Methods
                </TabsTrigger>
                <TabsTrigger 
                  value="wishlist" 
                  className="justify-start px-4 py-3 data-[state=active]:bg-muted data-[state=active]:text-luxury"
                >
                  <Heart size={18} className="mr-2" />
                  Wishlist
                </TabsTrigger>
                <Button 
                  variant="ghost" 
                  className="justify-start px-4 py-3 text-destructive hover:bg-destructive/10"
                  onClick={handleLogout}
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </Button>
              </TabsList>
            </div>
            
            {/* Content */}
            <div className="flex-1 border border-border rounded-md p-6">
              <TabsContent value="account" className="space-y-8 mt-0">
                <h2 className="text-xl font-medium">Account Information</h2>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-20 h-20 rounded-full bg-muted overflow-hidden">
                    <img 
                      src={user.avatar || '/placeholder.svg'} 
                      alt={user.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        defaultValue={user.name}
                        className="w-full p-3 border border-border focus:border-luxury outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        defaultValue={user.email}
                        className="w-full p-3 border border-border focus:border-luxury outline-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium mb-2">
                      Current Password
                    </label>
                    <input
                      id="current-password"
                      type="password"
                      className="w-full p-3 border border-border focus:border-luxury outline-none"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="new-password" className="block text-sm font-medium mb-2">
                        New Password
                      </label>
                      <input
                        id="new-password"
                        type="password"
                        className="w-full p-3 border border-border focus:border-luxury outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium mb-2">
                        Confirm New Password
                      </label>
                      <input
                        id="confirm-password"
                        type="password"
                        className="w-full p-3 border border-border focus:border-luxury outline-none"
                      />
                    </div>
                  </div>
                  
                  <Button className="bg-luxury hover:bg-luxury-dark text-white">
                    Save Changes
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="orders" className="space-y-8 mt-0">
                <h2 className="text-xl font-medium">Order History</h2>
                
                {profile.orders.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="inline-flex justify-center items-center w-16 h-16 bg-muted rounded-full">
                      <Package size={24} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mt-4">No orders yet</h3>
                    <p className="text-muted-foreground mt-2">
                      You haven't placed any orders yet.
                    </p>
                    <Button 
                      asChild
                      className="mt-4 bg-luxury hover:bg-luxury-dark text-white"
                    >
                      <a href="/">Start Shopping</a>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {profile.orders.map((order) => (
                      <div key={order.id} className="border border-border rounded-md overflow-hidden">
                        <div className="bg-muted p-4 flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Order #{order.id}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatPrice(order.total)}</p>
                            <p className="text-sm uppercase text-luxury">
                              {order.status}
                            </p>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <div className="space-y-4">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex gap-4">
                                <div className="w-16 h-16 bg-muted shrink-0">
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium">{item.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Quantity: {item.quantity}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">
                                    {formatPrice(item.price * item.quantity)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="addresses" className="space-y-8 mt-0">
                <h2 className="text-xl font-medium">Addresses</h2>
                
                {profile.addresses.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="inline-flex justify-center items-center w-16 h-16 bg-muted rounded-full">
                      <Home size={24} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mt-4">No addresses yet</h3>
                    <p className="text-muted-foreground mt-2">
                      You haven't added any addresses yet.
                    </p>
                    <Button 
                      className="mt-4 bg-luxury hover:bg-luxury-dark text-white"
                    >
                      Add Address
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {profile.addresses.map((address, index) => (
                      <div key={index} className="border border-border rounded-md p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">Address {index + 1}</h4>
                            <div className="text-sm text-muted-foreground mt-2 space-y-1">
                              <p>{address.street}</p>
                              <p>{address.city}, {address.state} {address.zip}</p>
                              <p>{address.country}</p>
                            </div>
                          </div>
                          <div className="space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm" className="text-destructive border-destructive">
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button className="bg-luxury hover:bg-luxury-dark text-white mt-4">
                      Add New Address
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="payment" className="space-y-8 mt-0">
                <h2 className="text-xl font-medium">Payment Methods</h2>
                
                <div className="text-center py-16">
                  <div className="inline-flex justify-center items-center w-16 h-16 bg-muted rounded-full">
                    <CreditCard size={24} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mt-4">No payment methods yet</h3>
                  <p className="text-muted-foreground mt-2">
                    You haven't added any payment methods yet.
                  </p>
                  <Button 
                    className="mt-4 bg-luxury hover:bg-luxury-dark text-white"
                  >
                    Add Payment Method
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="wishlist" className="space-y-8 mt-0">
                <h2 className="text-xl font-medium">Wishlist</h2>
                
                {profile.wishlist.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="inline-flex justify-center items-center w-16 h-16 bg-muted rounded-full">
                      <Heart size={24} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mt-4">Your wishlist is empty</h3>
                    <p className="text-muted-foreground mt-2">
                      Add items to your wishlist to save them for later.
                    </p>
                    <Button 
                      asChild
                      className="mt-4 bg-luxury hover:bg-luxury-dark text-white"
                    >
                      <a href="/">Start Shopping</a>
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Wishlist items would go here - requires integration with data layer */}
                    <div className="border border-border rounded-md p-4 flex gap-4">
                      <div className="w-24 h-24 bg-muted shrink-0">
                        <img src="/placeholder.svg" alt="Product" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-medium">Product Name</h4>
                          <p className="text-sm text-muted-foreground">$XXX.XX</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Add to Cart</Button>
                          <Button variant="outline" size="sm" className="text-destructive border-destructive">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </main>
      
      <Footer />
    </>
  );
};

export default Profile;
