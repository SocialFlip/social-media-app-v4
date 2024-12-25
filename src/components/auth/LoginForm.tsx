import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { OUTSETA_CONFIG } from '@/config/outseta';

export const LoginForm: React.FC = () => {
  const [loading] = useState(false);

  return (
    <form className="mt-8 space-y-6">
      <div className="space-y-4">
        <a
          href={OUTSETA_CONFIG.loginUrl}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#00C2CB] to-[#2940D3] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2940D3]"
        >
          {loading ? 'Signing in...' : 'Sign In to Dashboard'}
        </a>
      </div>

      <div className="text-center">
        <Link to="/auth/forgot-password" className="text-[#2940D3] hover:opacity-80 text-sm transition duration-200">
          Reset Password
        </Link>
      </div>

      <div className="text-center text-sm text-gray-600">
        New to SocialFlip?{' '}
        <Link to="/register" className="text-[#2940D3] hover:opacity-80 font-medium transition duration-200">
          Create an account
        </Link>
      </div>
    </form>
  );
};