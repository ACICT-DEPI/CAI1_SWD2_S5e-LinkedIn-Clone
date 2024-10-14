import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdEmail } from "react-icons/md";
import Button from '../components/common/Button';
import { useAuthStore } from '../store/authStore';

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <main className="flex-grow flex items-center justify-center bg-linkedinLightGray min-h-screen">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-center text-linkedinPrimary">
          Forgot Password
        </h2>

        {!isSubmitted ? (
          <>
            <p className="text-sm text-linkedinSecondGray text-center">
              Enter your email address and we’ll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <label htmlFor="email" className="sr-only">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-linkedinPrimary focus:border-transparent text-linkedinDark"
                />
              </div>

              <Button 
                label={isLoading ? <div className="loading loading-spinner"></div> : "Send Reset Link"} 
                styleType="primary" 
                className="w-full" 
              />
            </form>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <MdEmail className="text-6xl text-linkedinSecondBlue" />
            </div>
            <p className="text-sm text-linkedinSecondGray">
              If an account exists for <span className="font-bold">{email}</span>, 
              you will receive a password reset link shortly.
            </p>
          </div>
        )}

        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-linkedinPrimary hover:underline text-sm flex items-center justify-center"
          >
            <MdKeyboardArrowLeft className="text-lg mt-1" />
            Back to Login
          </button>
        </div>
      </div>
    </main>
  );
}

export default ForgotPasswordPage;
