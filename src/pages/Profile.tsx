import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { User, Package, CreditCard, Heart, Home, LogOut } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Profile form validation schema
const profileFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

const Profile = () => {
  const { user, isAuthenticated, logout, profile, userData, updateProfile, isLoading, cancelOrder, fetchOrders } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('account');
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate, isLoading]);
  
  // Fetch orders when the orders tab is selected
  useEffect(() => {
    if (activeTab === 'orders' && isAuthenticated) {
      fetchOrders();
    }
  }, [activeTab, isAuthenticated, fetchOrders]);
  
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: profile?.name || '',
    },
    values: {
      name: profile?.name || '',
    }
  });
  
  // Update form values when profile changes
  useEffect(() => {
    if (profile) {
      profileForm.reset({
        name: profile.name || '',
      });
    }
  }, [profile, profileForm]);
  
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };
  
  const handleProfileSubmit = async (values: z.infer<typeof profileFormSchema>) => {
    await updateProfile({
      name: values.name,
    });
  };
  
  const handleCancelOrder = async (orderId: string) => {
    await cancelOrder(orderId);
  };
  
  // Format price to currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  // Get cancelled orders
  const cancelledOrders = userData?.orders.filter(order => order.status === 'cancelled') || [];
  
  // Get active orders (not cancelled)
  const activeOrders = userData?.orders.filter(order => order.status !== 'cancelled') || [];
  
  if (isLoading) {
    return (
      <>
        <Header />
        <main className="luxury-container py-12 min-h-screen">
          <div className="text-center py-16">Loading...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!isAuthenticated || !user || !profile) {
    return null; // Will redirect to login page
  }
  
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
                  <Avatar className="w-20 h-20">
                    <AvatarImage 
                      src={profile.avatar || '/placeholder.svg'} 
                      alt={profile.name} 
                    />
                    <AvatarFallback>{profile.name?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{profile.name}</h3>
                    <p className="text-sm text-muted-foreground">{profile.email}</p>
                  </div>
                </div>
                
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="space-y-6">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-sm font-medium mb-2">Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="w-full p-3 border border-border focus:border-luxury outline-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div>
                      <FormLabel className="block text-sm font-medium mb-2">Email</FormLabel>
                      <Input
                        type="email"
                        value={profile.email}
                        readOnly
                        className="w-full p-3 border border-border bg-muted outline-none"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                    </div>
                    
                    <Button 
                      type="submit"
                      className="bg-luxury hover:bg-luxury-dark text-white"
                    >
                      Save Changes
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="orders" className="space-y-8 mt-0">
                <h2 className="text-xl font-medium">Order History</h2>
                
                {activeOrders.length === 0 && cancelledOrders.length === 0 ? (
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
                  <div className="space-y-8">
                    {/* Active Orders */}
                    {activeOrders.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Active Orders</CardTitle>
                          <CardDescription>Orders that are being processed or shipped</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {activeOrders.map((order) => (
                                <TableRow key={order.id}>
                                  <TableCell className="font-medium">#{order.id.substring(0, 8)}</TableCell>
                                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                                  <TableCell>{formatPrice(order.total)}</TableCell>
                                  <TableCell>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className="text-destructive border-destructive hover:bg-destructive/10"
                                      onClick={() => handleCancelOrder(order.id)}
                                    >
                                      Cancel Order
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    )}
                    
                    {/* Cancelled Orders */}
                    {cancelledOrders.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Cancelled Orders</CardTitle>
                          <CardDescription>Orders that have been cancelled</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {cancelledOrders.map((order) => (
                                <TableRow key={order.id}>
                                  <TableCell className="font-medium">#{order.id.substring(0, 8)}</TableCell>
                                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                                  <TableCell>{formatPrice(order.total)}</TableCell>
                                  <TableCell>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                      Cancelled
                                    </span>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    )}
                    
                    {/* Order Details Modal (future implementation) */}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="addresses" className="space-y-8 mt-0">
                <h2 className="text-xl font-medium">Addresses</h2>
                
                {userData?.addresses.length === 0 ? (
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
                    {userData?.addresses.map((address, index) => (
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
                
                {userData?.wishlist.length === 0 ? (
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
