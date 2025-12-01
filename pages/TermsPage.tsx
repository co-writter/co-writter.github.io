
import React from 'react';
import { BORDER_CLASS, APP_NAME } from '../constants';

const TermsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 pt-24 pb-12 md:pb-20">
      <div className={`max-w-3xl mx-auto bg-brand-card-dark p-8 rounded-md border ${BORDER_CLASS} shadow-xl`}>
        <h1 className="text-3xl font-bold text-white mb-6">Terms and Conditions</h1>
        
        <div className="text-neutral-300 space-y-6 leading-relaxed text-sm">
             <p className="font-semibold text-white">Last updated on: {new Date().toLocaleDateString()}</p>

            <p>
                Welcome to {APP_NAME}. These terms and conditions outline the rules and regulations for the use of our Website.
            </p>
            <p>
                By accessing this website we assume you accept these terms and conditions. Do not continue to use {APP_NAME} if you do not agree to take all of the terms and conditions stated on this page.
            </p>

            <h3 className="text-lg font-semibold text-white mt-4">1. License</h3>
            <p>
                Unless otherwise stated, {APP_NAME} and/or its licensors/sellers own the intellectual property rights for all material on {APP_NAME}. All intellectual property rights are reserved. You may access this from {APP_NAME} for your own personal use subjected to restrictions set in these terms and conditions.
            </p>
            <p>You must not:</p>
             <ul className="list-disc list-inside ml-4 text-neutral-400">
                <li>Republish material from {APP_NAME}</li>
                <li>Sell, rent or sub-license material from {APP_NAME}</li>
                <li>Reproduce, duplicate or copy material from {APP_NAME}</li>
                <li>Redistribute content from {APP_NAME}</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-4">2. User Content</h3>
            <p>
                In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant {APP_NAME} a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
            </p>

             <h3 className="text-lg font-semibold text-white mt-4">3. Limitation of Liability</h3>
             <p>
                In no event shall {APP_NAME}, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.
             </p>

             <h3 className="text-lg font-semibold text-white mt-4">4. Governing Law</h3>
             <p>
                These Terms will be governed by and interpreted in accordance with the laws of the State of [YOUR STATE], and you submit to the non-exclusive jurisdiction of the state and federal courts located in [YOUR STATE] for the resolution of any disputes.
             </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
