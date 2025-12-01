
import React from 'react';
import { BORDER_CLASS, APP_NAME } from '../constants';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 pt-24 pb-12 md:pb-20">
      <div className={`max-w-3xl mx-auto bg-brand-card-dark p-8 rounded-md border ${BORDER_CLASS} shadow-xl`}>
        <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
        
        <div className="text-neutral-300 space-y-6 leading-relaxed text-sm">
             <p className="font-semibold text-white">Last updated on: {new Date().toLocaleDateString()}</p>

            <p>
                At {APP_NAME}, accessible from {window.location.origin}, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by {APP_NAME} and how we use it.
            </p>

            <h3 className="text-lg font-semibold text-white mt-4">1. Information We Collect</h3>
            <p>
                The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
            </p>
            <p>
                If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
            </p>
            <p>
                When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
            </p>

            <h3 className="text-lg font-semibold text-white mt-4">2. How We Use Your Information</h3>
            <p>
                We use the information we collect in various ways, including to:
            </p>
             <ul className="list-disc list-inside ml-4 text-neutral-400">
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Process your transactions (eBook purchases)</li>
                <li>Send you emails</li>
                <li>Find and prevent fraud</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-4">3. Log Files</h3>
            <p>
                {APP_NAME} follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics.
            </p>

             <h3 className="text-lg font-semibold text-white mt-4">4. Third Party Privacy Policies</h3>
             <p>
                {APP_NAME}'s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.
             </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
