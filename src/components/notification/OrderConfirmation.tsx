
import React, { useEffect } from 'react';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { useNotifications } from '@/context/NotificationContext';

interface OrderConfirmationNotificationProps {
  orderNumber: string;
  onClose?: () => void;
}

// Track already shown notifications to prevent duplicates
const shownNotifications = new Set<string>();

export const showOrderConfirmation = (orderNumber: string, type: 'order' | 'cancelled' = 'order') => {
  // Create a unique notification key
  const notificationKey = `${orderNumber}-${type}`;
  
  // Check if this notification has already been shown
  if (shownNotifications.has(notificationKey)) {
    return; // Skip showing the notification if already shown
  }
  
  // Mark this notification as shown
  shownNotifications.add(notificationKey);
  
  // Prepare notification content based on type
  const isConfirmation = type === 'order';
  const title = isConfirmation ? 'Order Confirmed' : 'Order Cancelled';
  const description = isConfirmation 
    ? `Your order #${orderNumber} has been confirmed and is being processed.`
    : `Your order #${orderNumber} has been cancelled.`;
  
  // Show the toast notification
  toast.custom((id) => (
    <OrderConfirmationNotification 
      orderNumber={orderNumber} 
      onClose={() => toast.dismiss(id)} 
      type={type}
    />
  ), {
    duration: 8000,
    id: `order-${type}-${orderNumber}` // Use unique ID based on order number and type
  });
  
  // Add to notification center - using setTimeout to avoid circular dependency issues
  setTimeout(() => {
    try {
      const { addNotification } = require('@/context/NotificationContext').useNotifications();
      
      addNotification({
        title,
        description,
        type
      });
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  }, 0);
};

interface ExtendedOrderConfirmationProps extends OrderConfirmationNotificationProps {
  type?: 'order' | 'cancelled';
}

const OrderConfirmationNotification: React.FC<ExtendedOrderConfirmationProps> = ({ 
  orderNumber, 
  onClose,
  type = 'order'
}) => {
  const isConfirmation = type === 'order';
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, 8000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="w-full max-w-sm bg-white shadow-lg rounded-lg pointer-events-auto overflow-hidden animate-fade-in">
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3">
            <div className={`w-10 h-10 ${isConfirmation ? 'bg-green-100' : 'bg-red-100'} rounded-full flex items-center justify-center`}>
              <Check className={`h-6 w-6 ${isConfirmation ? 'text-green-600' : 'text-red-600'}`} />
            </div>
          </div>
          <div className="ml-2 w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {isConfirmation ? 'Order Confirmed!' : 'Order Cancelled'}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {isConfirmation
                ? `Thank you for your purchase. Your order #${orderNumber} has been confirmed.`
                : `Your order #${orderNumber} has been cancelled.`}
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => {
                  window.location.href = `/orders/${orderNumber}`;
                  onClose?.();
                }}
                className="text-xs text-luxury font-medium hover:underline"
              >
                View Order
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={onClose}
                className="text-xs text-gray-500 font-medium hover:underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationNotification;
