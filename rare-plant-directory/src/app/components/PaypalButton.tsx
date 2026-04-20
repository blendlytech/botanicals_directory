'use client';
import { useEffect, useRef, useState } from 'react';

interface PaypalButtonProps {
  amount: string;
  onSuccess: (details: any) => void;
  onError: (err: any) => void;
}

export default function PaypalButton({ amount, onSuccess, onError }: PaypalButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // 1. Check if script already exists
    if (window.hasOwnProperty('paypal')) {
      setLoaded(true);
      return;
    }

    // 2. Load PayPal Script
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD&intent=capture`;
    script.async = true;
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);

    return () => {
      // Clean up if necessary, but usually PayPal script stays
    };
  }, []);

  useEffect(() => {
    if (!loaded || !buttonRef.current || !window.hasOwnProperty('paypal')) return;

    // @ts-ignore
    window.paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            description: "Rare Plant Vendors - Elite Grower Founding Member (Lifetime)",
            amount: {
              currency_code: "USD",
              value: amount
            }
          }]
        });
      },
      onApprove: async (data: any, actions: any) => {
        const details = await actions.order.capture();
        onSuccess(details);
      },
      onError: (err: any) => {
        console.error("PayPal Error:", err);
        onError(err);
      },
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'pay'
      }
    }).render(buttonRef.current);
  }, [loaded, amount, onSuccess, onError]);

  return (
    <div style={{ marginTop: '2rem', width: '100%', minHeight: '150px' }}>
      {!loaded && <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Loading Secure Checkout...</div>}
      <div ref={buttonRef}></div>
    </div>
  );
}
