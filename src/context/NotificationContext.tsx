
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

export type NotificationType = {
  id: string;
  title: string;
  description: string;
  read: boolean;
  date: Date;
  type: 'order' | 'system' | 'promotion' | 'cancelled';
};

type NotificationContextType = {
  notifications: NotificationType[];
  unreadCount: number;
  addNotification: (notification: Omit<NotificationType, 'id' | 'date' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  // Calculate unread count
  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Setup real-time notification listener
  useEffect(() => {
    // Listen for database notifications if user is authenticated
    const setupRealtimeNotifications = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;
      
      // Subscribe to notification changes for the authenticated user
      const channel = supabase
        .channel('db-notifications')
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        }, (payload) => {
          console.log('New notification received:', payload);
          
          if (payload.new) {
            const newNotification: NotificationType = {
              id: payload.new.id,
              title: payload.new.title,
              description: payload.new.description,
              read: payload.new.read || false,
              date: new Date(payload.new.created_at),
              type: payload.new.type || 'system',
            };
            
            // Add the new notification to state
            setNotifications(prev => [newNotification, ...prev]);
            
            // Show toast for the new notification
            const toastType = newNotification.type === 'cancelled' ? {
              title: newNotification.title,
              description: newNotification.description,
              variant: 'destructive' as const
            } : {
              title: newNotification.title,
              description: newNotification.description,
            };
            
            toast(toastType);
          }
        })
        .subscribe();
      
      // Cleanup function
      return () => {
        supabase.removeChannel(channel);
      };
    };
    
    setupRealtimeNotifications();
  }, []);

  // Add a notification
  const addNotification = (notification: Omit<NotificationType, 'id' | 'date' | 'read'>) => {
    // Generate a unique ID for the notification
    const notificationId = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const newNotification: NotificationType = {
      id: notificationId,
      date: new Date(),
      read: false,
      ...notification
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast for the new notification based on type
    const toastType = notification.type === 'cancelled' ? {
      title: notification.title,
      description: notification.description,
      variant: 'destructive' as const
    } : {
      title: notification.title,
      description: notification.description,
    };
    
    toast(toastType);
  };

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  // Initialize with sample notifications
  useEffect(() => {
    const initialNotifications: NotificationType[] = [
      {
        id: 'notification-1',
        title: 'Welcome to LUXE',
        description: 'Thank you for joining our luxury shopping experience.',
        read: false,
        date: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        type: 'system'
      },
      {
        id: 'notification-2',
        title: 'New Collection Available',
        description: 'Discover our latest Spring/Summer collection, now available online.',
        read: false,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        type: 'promotion'
      }
    ];
    
    setNotifications(initialNotifications);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
