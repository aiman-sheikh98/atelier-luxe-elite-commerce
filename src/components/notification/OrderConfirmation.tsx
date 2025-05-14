
import React, { useEffect } from 'react';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { useNotifications } from '@/context/NotificationContext';

interface OrderConfirmationNotificationProps {
  orderNumber: string;
  onClose?: () => void;
}

export const showOrderConfirmation = (orderNumber: string) => {
  // Show the toast notification
  toast.custom((id) => (
    <OrderConfirmationNotification orderNumber={orderNumber} onClose={() => toast.dismiss(id)} />
  ), {
    duration: 8000,
    id: 'order-confirmation'
  });
  
  // Add to notification center
  const { addNotification } = require('@/context/NotificationContext').useNotifications();
  
  addNotification({
    title: 'Order Confirmed',
    description: `Your order #${orderNumber} has been confirmed and is being processed.`,
    type: 'order'
  });
};

const OrderConfirmationNotification: React.FC<OrderConfirmationNotificationProps> = ({ 
  orderNumber, 
  onClose 
}) => {
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
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="ml-2 w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">
              Order Confirmed!
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Thank you for your purchase. Your order #{orderNumber} has been confirmed.
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
