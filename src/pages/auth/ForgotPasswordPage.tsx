import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      
      if (error) throw error;
      setSuccess(true);
    } catch (err) {
      setError('Error sending reset email. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col items-center justify-center p-4">
      <div className="mb-12">
        <h1 className="text-4xl font-semibold bg-gradient-to-r from-[#00C2CB] to-[#2940D3] text-transparent bg-clip-text">
          SocialFlip.io
        </h1>
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900">Reset Password</h2>
          <p className="mt-2 text-gray-600">
            Enter your email to receive reset instructions
          </p>
        </div>

        {success ? (
          <div className="bg-green-50 text-green-600 p-4 rounded-lg">
            <p>Check your email for password reset instructions.</p>
            <Link to="/auth/login" className="text-[#2940D3] hover:opacity-80 mt-4 inline-block">
              Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2940D3] focus:border-[#2940D3]"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#00C2CB] to-[#2940D3] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2940D3]"
            >
              Send Reset Instructions
            </button>

            <div className="text-center text-sm">
              Remember your password?{' '}
              <Link to="/auth/login" className="text-[#2940D3] hover:opacity-80">
                Sign in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};