import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { CartItem } from '@/context/CartContext';

export const createCheckoutSession = async (
  items: CartItem[], 
  amountTotal: number
) => {
  try {
    const { data, error } = await supabase.functions.invoke('create-payment', {
      body: {
        cartItems: items,
        amountTotal
      }
    });

    if (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Failed to create checkout session');
      return null;
    }

    if (!data || !data.url) {
      toast.error('Invalid response from payment service');
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in createCheckoutSession:', error);
    toast.error('Payment service unavailable');
    return null;
  }
};

export const verifyPaymentSession = async (sessionId: string, status?: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('verify-payment', {
      body: { session_id: sessionId, status },
    });

    if (error) {
      console.error('Error verifying payment:', error);
      return { success: false, error };
    }

    return data;
  } catch (error) {
    console.error('Exception verifying payment:', error);
    return { success: false, error };
  }
};
