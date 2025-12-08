import React, { useState } from 'react';

interface ApiKeyModalProps {
  onSave: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSave }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      onSave();
    } else {
      alert('Please enter a valid API key.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md">
      <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-6 w-full max-w-md m-4 text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Enter Your Gemini API Key</h2>
        <p className="text-gray-400 mb-6 text-center text-sm">
          Your API key is required to use the AI features. It will be stored securely in your browser's local storage and will not be shared.
        </p>
        <div className="flex flex-col gap-4">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Google AI API Key"
            className="bg-gray-800 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-brand-accent focus:outline-none"
          />
          <button
            onClick={handleSave}
            className="bg-brand-accent text-black font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-brand-accent focus:outline-none"
          >
            Save and Continue
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-4 text-center">
          You can generate a key from your <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-accent">Google AI Studio</a>.
        </p>
      </div>
    </div>
  );
};

export default ApiKeyModal;
