import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
};

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type Order = {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
};

type AddressType = {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

type UserData = {
  profile: UserProfile | null;
  addresses: AddressType[];
  orders: Order[];
  wishlist: string[];
};

type AuthContextType = {
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  userData: UserData | null;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  addAddress: (address: AddressType) => void;
  removeAddress: (index: number) => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  checkInWishlist: (productId: string) => boolean;
  cancelOrder: (orderId: string) => Promise<void>;
  fetchOrders: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize auth state from Supabase
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // If session changes, we'll fetch the profile data
        if (currentSession?.user) {
          // Defer Supabase calls with setTimeout
          setTimeout(() => {
            fetchUserProfile(currentSession.user.id);
          }, 0);
        } else {
          setProfile(null);
          setUserData(null);
        }
      }
    );
    
    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchUserProfile(currentSession.user.id);
      } else {
        setIsLoading(false);
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const fetchUserProfile = async (userId: string) => {
    try {
      // Get user profile from Supabase
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (profileError) throw profileError;
      
      setProfile(profileData);
      
      // Fetch orders for the user
      const orders = await fetchUserOrders(userId);
      
      // For now, we'll use empty arrays for these until we implement those tables
      setUserData({
        profile: profileData,
        addresses: [],
        orders: orders,
        wishlist: []
      });
      
    } catch (error: any) {
      console.error('Error fetching user profile:', error);
      toast.error('Failed to load user profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to validate and convert order status to the expected type
  const validateOrderStatus = (status: string): OrderStatus => {
    const validStatuses: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    
    if (validStatuses.includes(status as OrderStatus)) {
      return status as OrderStatus;
    }
    
    // Default to pending if the status is not recognized
    return 'pending';
  };

  // Function to safely process and validate order items
  const processOrderItems = (rawItems: any): Order['items'] => {
    // If rawItems is already an array of objects with the required fields, use it
    if (Array.isArray(rawItems) && 
        rawItems.length > 0 && 
        typeof rawItems[0] === 'object' &&
        'id' in rawItems[0] && 
        'name' in rawItems[0] && 
        'quantity' in rawItems[0] && 
        'price' in rawItems[0] &&
        'image' in rawItems[0]) {
      return rawItems;
    }
    
    // If no valid items data, return empty array
    return [];
  };

  const fetchUserOrders = async (userId: string): Promise<Order[]> => {
    try {
      const { data: ordersData, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching orders:', error);
        return [];
      }
      
      if (!ordersData || ordersData.length === 0) {
        return [];
      }
      
      // Transform orders data to match our Order type
      return ordersData.map(order => ({
        id: order.id,
        date: order.created_at,
        total: order.amount / 100, // Convert from cents to dollars
        status: validateOrderStatus(order.status), // Ensure status is a valid OrderStatus
        items: processOrderItems(order.items) // Process and validate items
      }));
    } catch (error) {
      console.error('Error in fetchUserOrders:', error);
      return [];
    }
  };

  const fetchOrders = async () => {
    if (!user) return;
    
    try {
      const orders = await fetchUserOrders(user.id);
      
      setUserData(prev => {
        if (!prev) return null;
        return {
          ...prev,
          orders
        };
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    }
  };
  
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      toast.success('Successfully logged in');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Invalid credentials');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      });
      
      if (error) throw error;
      
      toast.success('Account created successfully');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Failed to create account');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      toast.info('Logged out successfully');
    } catch (error: any) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      if (!user) return;
      
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Update local state
      setProfile(prev => {
        if (!prev) return null;
        return { ...prev, ...data };
      });
      
      setUserData(prev => {
        if (!prev) return null;
        return { 
          ...prev, 
          profile: prev.profile ? { ...prev.profile, ...data } : null
        };
      });
      
      toast.success('Profile updated');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };
  
  const cancelOrder = async (orderId: string) => {
    try {
      if (!user) return;
      
      const { error } = await supabase
        .from('orders')
        .update({ status: 'cancelled' })
        .eq('id', orderId)
        .eq('user_id', user.id);
      
      if (error) {
        console.error('Error cancelling order:', error);
        toast.error('Failed to cancel order');
        return;
      }
      
      // Update local state
      setUserData(prev => {
        if (!prev) return null;
        
        const updatedOrders = prev.orders.map(order => 
          order.id === orderId ? { ...order, status: 'cancelled' as OrderStatus } : order
        );
        
        return {
          ...prev,
          orders: updatedOrders
        };
      });
      
      toast.success('Order cancelled successfully');
    } catch (error) {
      console.error('Error in cancelOrder:', error);
      toast.error('Failed to cancel order');
    }
  };
  
  // For now, these functions will work with local state only
  // In a future update, we would store this data in Supabase tables
  const addAddress = (address: AddressType) => {
    if (!userData) return;
    
    setUserData(prev => {
      if (!prev) return null;
      return { 
        ...prev, 
        addresses: [...prev.addresses, address] 
      };
    });
    
    toast.success('Address added');
  };
  
  const removeAddress = (index: number) => {
    if (!userData) return;
    
    setUserData(prev => {
      if (!prev) return null;
      
      const newAddresses = [...prev.addresses];
      newAddresses.splice(index, 1);
      
      return { 
        ...prev, 
        addresses: newAddresses 
      };
    });
    
    toast.info('Address removed');
  };
  
  const addToWishlist = (productId: string) => {
    if (!userData) return;
    
    setUserData(prev => {
      if (!prev) return null;
      if (prev.wishlist.includes(productId)) return prev;
      
      return { 
        ...prev, 
        wishlist: [...prev.wishlist, productId] 
      };
    });
    
    toast.success('Added to wishlist');
  };
  
  const removeFromWishlist = (productId: string) => {
    if (!userData) return;
    
    setUserData(prev => {
      if (!prev) return null;
      
      return { 
        ...prev, 
        wishlist: prev.wishlist.filter(id => id !== productId)
      };
    });
    
    toast.info('Removed from wishlist');
  };
  
  const checkInWishlist = (productId: string): boolean => {
    if (!userData) return false;
    return userData.wishlist.includes(productId);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile,
      isAuthenticated: !!user,
      isLoading,
      login, 
      logout, 
      register,
      userData,
      updateProfile,
      addAddress,
      removeAddress,
      addToWishlist,
      removeFromWishlist,
      checkInWishlist,
      cancelOrder,
      fetchOrders,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
