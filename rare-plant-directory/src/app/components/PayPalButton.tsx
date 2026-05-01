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
}

export default function PayPalButton({ amount, vendorId, planId, description, onSuccess }: PayPalButtonProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
    currency: "USD",
    intent: "capture",
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
          createOrder={(data, actions) => {
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
          onApprove={async (data, actions) => {
            if (actions.order) {
              const details = await actions.order.capture();
              console.log("Transaction completed by " + details.payer?.name?.given_name);
              
              // Call our internal API to upgrade the vendor (if applicable)
              if (vendorId !== 'pilot-contractor') {
                try {
                  const res = await fetch('/api/vendor/upgrade', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      vendorId,
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
                    setError("Payment received, but failed to update your account. Please contact support.");
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
          onError={(err) => {
            console.error("PayPal Error:", err);
            setError("PayPal checkout failed to load. Please try again or use another browser.");
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
