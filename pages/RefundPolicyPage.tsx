
import React from 'react';
import { BORDER_CLASS, APP_NAME } from '../constants';

const RefundPolicyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 pt-24 pb-12 md:pb-20">
       <div className={`max-w-3xl mx-auto bg-brand-card-dark p-8 rounded-md border ${BORDER_CLASS} shadow-xl`}>
        <h1 className="text-3xl font-bold text-white mb-6">Cancellation & Refund Policy</h1>
        
        <div className="text-neutral-300 space-y-6 leading-relaxed">
             <p className="font-semibold text-white">Last updated on: {new Date().toLocaleDateString()}</p>

             <p>
                At {APP_NAME}, we strive to ensure our customers are satisfied with their digital purchases. However, due to the nature of digital goods (eBooks), which can be downloaded instantly, our refund policy differs from physical goods.
            </p>

            <h3 className="text-xl font-semibold text-white mt-4">1. Cancellations</h3>
            <p>
                As our products are instant digital downloads, orders cannot be cancelled once the payment is processed and the download link has been generated.
            </p>

            <h3 className="text-xl font-semibold text-white mt-4">2. Refunds</h3>
            <p>
                We generally do not offer refunds on eBook purchases. However, we may consider a refund request under the following exceptional circumstances:
            </p>
             <ul className="list-disc list-inside ml-4 text-neutral-400">
                <li>The eBook file is corrupt or technically defective and cannot be opened.</li>
                <li>You purchased the same eBook twice by mistake.</li>
            </ul>
            <p>
                Refund requests must be made within 7 days of purchase.
            </p>

            <h3 className="text-xl font-semibold text-white mt-4">3. Processing Timeline</h3>
            <p>
                If your refund is approved, it will be processed within 5-7 working days. The amount will be credited back to your original method of payment (Credit Card, Debit Card, UPI, etc.).
            </p>

             <h3 className="text-xl font-semibold text-white mt-4">4. Contact Us</h3>
            <p>
                To request a refund, please contact us at [YOUR SUPPORT EMAIL] with your Order ID and a description of the issue.
            </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
