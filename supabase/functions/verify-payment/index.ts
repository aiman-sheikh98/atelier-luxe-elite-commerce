
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Track notifications to prevent duplicates
const processedSessions = new Set<string>();

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Extract session ID from request body instead of URL parameters
    const { session_id: sessionId, status: requestedStatus } = await req.json();
    
    if (!sessionId) {
      throw new Error("No session ID provided");
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Retrieve the session to check payment status
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (!session) {
      throw new Error("Invalid session ID");
    }

    // Create a service client to update the order status
    const serviceClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          persistSession: false,
        },
      }
    );

    // Find the order with the session results
    const { data: orders, error: findError } = await serviceClient
      .from("orders")
      .select("*")
      .eq("stripe_session_id", sessionId)
      .limit(1);

    if (findError) {
      console.error("Error finding order:", findError);
    }

    // Set status based on request or default to "paid" for completed orders
    let status = requestedStatus || "paid";
    let notificationType = status === "cancelled" ? "cancelled" : "order";
    let notificationTitle = status === "cancelled" ? "Order Cancelled" : "Order Confirmed";
    let notificationDesc = status === "cancelled" 
      ? `Your order #${orders?.[0]?.id?.substring(0, 8)} has been cancelled.`
      : `Your order #${orders?.[0]?.id?.substring(0, 8)} has been confirmed and is being processed.`;
    
    // If order exists, update status
    if (orders && orders.length > 0) {
      const { error: updateError } = await serviceClient
        .from("orders")
        .update({ status })
        .eq("stripe_session_id", sessionId);

      if (updateError) {
        console.error("Error updating order status:", updateError);
      }
      
      // Generate a unique notification key to track in the processed set
      const notificationKey = `${sessionId}-${status}`;
      
      // Send a notification via the database - only if not processed before
      if (orders[0].user_id && !processedSessions.has(notificationKey)) {
        try {
          // Add notification to the notifications table
          await serviceClient.from("notifications").insert({
            user_id: orders[0].user_id,
            title: notificationTitle,
            description: notificationDesc,
            type: notificationType,
            read: false
          });
          
          // Mark this notification as processed
          processedSessions.add(notificationKey);
          
          console.log(`${notificationTitle} notification created for order ${orders[0].id}`);
        } catch (notificationError) {
          console.error("Error creating notification:", notificationError);
        }
      }
    }

    return new Response(JSON.stringify({ 
      success: true,
      payment_status: status,
      session 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Payment verification error:", errorMessage);
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
