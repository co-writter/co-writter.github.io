
import React from 'react';
import { BORDER_CLASS, APP_NAME } from '../constants';

const ShippingPolicyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 pt-24 pb-12 md:pb-20">
      <div className={`max-w-3xl mx-auto bg-brand-card-dark p-8 rounded-md border ${BORDER_CLASS} shadow-xl`}>
        <h1 className="text-3xl font-bold text-white mb-6">Shipping & Delivery Policy</h1>
        
        <div className="text-neutral-300 space-y-6 leading-relaxed">
            <p className="font-semibold text-white">Last updated on: {new Date().toLocaleDateString()}</p>
            
            <p>
                {APP_NAME} is a digital marketplace for eBooks. As such, we do not sell or ship any physical products.
            </p>

            <h3 className="text-xl font-semibold text-white mt-4">1. Digital Delivery</h3>
            <p>
                Upon successful payment, delivery of your purchased eBook is <strong>instant</strong>. You will receive immediate access to download or read your eBook via:
            </p>
            <ul className="list-disc list-inside ml-4 text-neutral-400">
                <li>Your User Dashboard under "Purchase History".</li>
                <li>A confirmation email sent to your registered email address containing the download link.</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-4">2. Shipping Costs</h3>
            <p>
                Since there are no physical products, there are <strong>no shipping charges</strong> applicable to any purchase on {APP_NAME}.
            </p>

            <h3 className="text-xl font-semibold text-white mt-4">3. Delivery Timeline</h3>
            <p>
                 Orders are processed immediately. If you do not receive access to your eBook within 5 minutes of payment, please contact our support team at [YOUR SUPPORT EMAIL].
            </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;
