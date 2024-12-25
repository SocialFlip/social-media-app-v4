import React from 'react';
import { Link } from 'react-router-dom';

export const ThankYouPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col items-center justify-center p-4">
      <div className="mb-12">
        <h1 className="text-4xl font-semibold bg-gradient-to-r from-[#00C2CB] to-[#2940D3] text-transparent bg-clip-text">
          SocialFlip.io
        </h1>
      </div>

      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-semibold text-gray-900">
          Thank you for creating a SocialFlip.io account
        </h2>

        <div className="space-y-4">
          <p className="text-gray-600">
            We just sent you a confirmation email. Please click the link in that email to verify your account. 
            This will validate your email address and walk you through the process of creating a password.
          </p>

          <p className="text-gray-600">
            Once you login, you will see your personal dashboard and manage your account easily. 
            If you don't receive your email immediately, please check your spam folder.
          </p>
        </div>

        <div className="mt-8">
          <Link 
            to="/" 
            className="text-[#2940D3] hover:opacity-80 transition-opacity"
          >
            Go back to the home page
          </Link>
        </div>
      </div>
    </div>
  );
};