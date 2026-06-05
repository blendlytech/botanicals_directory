'use client';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PayPalButtonProps {
  amount: string;
  vendorId: string;
  planId?: string;
  description?: string;
  onSuccess?: (details: any) => void;
  /** API route to credit the payment to. Defaults to the vendor upgrade endpoint. */
  endpoint?: string;
  /** Key under which the paid entity id is sent to the endpoint. Defaults to 'vendorId'. */
  idKey?: string;
}

export default function PayPalButton({ amount, vendorId, planId, description, onSuccess, endpoint = '/api/vendor/upgrade', idKey = 'vendorId' }: PayPalButtonProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
    currency: "USD",
    intent: "capture",
    components: "buttons",
  };

  return (
    <div style={{ width: '100%' }}>
      {error && (
        <div style={{ 
          padding: '1rem', 
          marginBottom: '1rem', 
          background: '#FEF2F2', 
          border: '1px solid #FCA5A5', 
          color: '#B91C1C', 
          borderRadius: '12px', 
          fontSize: '0.875rem', 
          fontWeight: 500 
        }}>
          {error}
        </div>
      )}
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{ 
            layout: "vertical",
            shape: "rect",
            label: "pay",
            color: "gold"
          }}
          createOrder={(data: any, actions: any) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: amount,
                  },
                  custom_id: vendorId, // Pass vendor ID to identify who paid
                  description: description || `RPV Elite Founder Lifetime Status - Vendor ID: ${vendorId}`,
                },
              ],
            });
          }}
          onApprove={async (data: any, actions: any) => {
            if (actions.order) {
              const details = await actions.order.capture();
              console.log("Transaction completed by " + details.payer?.name?.given_name);
              
              // Call our internal API to upgrade the vendor (if applicable)
              if (vendorId !== 'pilot-contractor') {
                try {
                  const res = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      [idKey]: vendorId,
                      orderId: data.orderID,
                      planId,
                      details
                    })
                  });
                  
                  if (res.ok) {
                    if (onSuccess) {
                      onSuccess(details);
                    } else {
                      router.push(`/claim/success?vendorId=${vendorId}`);
                    }
                  } else {
                    // Surface the server's specific message (e.g. "deposit has been refunded").
                    let msg = "Payment received, but we couldn't finalize it. Please contact support.";
                    try {
                      const body = await res.json();
                      if (body?.error) msg = body.error;
                    } catch { /* keep fallback */ }
                    setError(msg);
                  }
                } catch (err) {
                  setError("Connection error. Please contact support with your PayPal Order ID.");
                }
              } else {
                // If it's a pilot contractor, skip the API and go straight to success
                if (onSuccess) {
                  onSuccess(details);
                }
              }
            }
          }}
          onError={(err: any) => {
            console.error("PayPal Error:", err);
            setError("PayPal checkout failed to load. Please try again or use another browser.");
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
