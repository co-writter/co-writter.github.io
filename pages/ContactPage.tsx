
import React, { useState } from 'react';
import { BORDER_CLASS, APP_NAME } from '../constants';

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 pt-24 pb-12 md:pb-20">
      <div className={`max-w-3xl mx-auto bg-brand-card-dark p-8 rounded-md border ${BORDER_CLASS} shadow-xl`}>
        <h1 className="text-3xl font-bold text-white mb-6">Contact Us</h1>
        <p className="text-neutral-400 mb-8 leading-relaxed">
            We are here to help you with any questions or concerns regarding your eBook purchases, seller account, or technical issues with {APP_NAME}.
        </p>

        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-white mb-2">Merchant Legal Entity Name</h3>
                <p className="text-neutral-300">{APP_NAME} (Registered Entity Name)</p>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-white mb-2">Registered Address</h3>
                <p className="text-neutral-300">
                    [YOUR REGISTERED BUILDING NUMBER/NAME]<br/>
                    [STREET ADDRESS]<br/>
                    [CITY, STATE, ZIP CODE]<br/>
                    India
                </p>
            </div>
            
            <div>
                <h3 className="text-lg font-semibold text-white mb-2">Operational Address</h3>
                <p className="text-neutral-300">
                     [YOUR OPERATIONAL ADDRESS IF DIFFERENT, OR SAME AS ABOVE]
                </p>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-white mb-2">Telephone No</h3>
                <p className="text-neutral-300">[YOUR PHONE NUMBER, e.g., +91 98765 43210]</p>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-white mb-2">E-Mail ID</h3>
                <p className="text-neutral-300">[YOUR SUPPORT EMAIL, e.g., support@my-ebook-store.com]</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
