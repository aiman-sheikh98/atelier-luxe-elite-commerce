
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export type Order = {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
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

type UserProfile = {
  user: User | null;
  addresses: AddressType[];
  orders: Order[];
  wishlist: string[];
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  profile: UserProfile | null;
  updateProfile: (data: Partial<UserProfile>) => void;
  addAddress: (address: AddressType) => void;
  removeAddress: (index: number) => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  checkInWishlist: (productId: string) => boolean;
};

// Mock users for demo
const MOCK_USERS = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password',
    avatar: '/placeholder.svg',
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  
  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('luxe-user');
    const savedProfile = localStorage.getItem('luxe-profile');
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('luxe-user');
      }
    }
    
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (error) {
        console.error("Failed to parse profile from localStorage", error);
        localStorage.removeItem('luxe-profile');
      }
    }
  }, []);
  
  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('luxe-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('luxe-user');
    }
  }, [user]);
  
  // Save profile to localStorage whenever it changes
  useEffect(() => {
    if (profile) {
      localStorage.setItem('luxe-profile', JSON.stringify(profile));
    } else {
      localStorage.removeItem('luxe-profile');
    }
  }, [profile]);

  const login = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );
    
    if (!foundUser) {
      toast.error('Invalid credentials');
      throw new Error('Invalid credentials');
    }
    
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    
    // Initialize profile if not exists
    if (!profile || profile.user?.id !== foundUser.id) {
      setProfile({
        user: userWithoutPassword,
        addresses: [],
        orders: [],
        wishlist: [],
      });
    }
    
    toast.success('Successfully logged in');
  };

  const logout = () => {
    setUser(null);
    toast.info('Logged out successfully');
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    if (MOCK_USERS.some(u => u.email === email)) {
      toast.error('Email already in use');
      throw new Error('Email already in use');
    }
    
    // Generate a random user ID (would normally be done by the backend)
    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      password,
      avatar: '/placeholder.svg',
    };
    
    // Add to mock users (in a real app, this would be a backend API call)
    MOCK_USERS.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    
    // Initialize empty profile
    setProfile({
      user: userWithoutPassword,
      addresses: [],
      orders: [],
      wishlist: [],
    });
    
    toast.success('Account created successfully');
  };
  
  const updateProfile = (data: Partial<UserProfile>) => {
    if (!profile) return;
    
    setProfile(prev => {
      if (!prev) return null;
      return { ...prev, ...data };
    });
    
    toast.success('Profile updated');
  };
  
  const addAddress = (address: AddressType) => {
    if (!profile) return;
    
    setProfile(prev => {
      if (!prev) return null;
      return { 
        ...prev, 
        addresses: [...prev.addresses, address] 
      };
    });
    
    toast.success('Address added');
  };
  
  const removeAddress = (index: number) => {
    if (!profile) return;
    
    setProfile(prev => {
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
    if (!profile) return;
    
    setProfile(prev => {
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
    if (!profile) return;
    
    setProfile(prev => {
      if (!prev) return null;
      
      return { 
        ...prev, 
        wishlist: prev.wishlist.filter(id => id !== productId)
      };
    });
    
    toast.info('Removed from wishlist');
  };
  
  const checkInWishlist = (productId: string): boolean => {
    if (!profile) return false;
    return profile.wishlist.includes(productId);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user,
      login, 
      logout, 
      register,
      profile,
      updateProfile,
      addAddress,
      removeAddress,
      addToWishlist,
      removeFromWishlist,
      checkInWishlist,
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
