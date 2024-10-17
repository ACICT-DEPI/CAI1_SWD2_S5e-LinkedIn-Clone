import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdKeyboardArrowLeft } from "react-icons/md";
import toast from "react-hot-toast";
import Button from '../components/common/Button';
import { useAuthStore } from '../store/authStore'; 

function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { resetPassword, error, isLoading, message } = useAuthStore(); 

  const { token } = useParams(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await resetPassword(token, password); // Call resetPassword with token and new password
      toast.success("Password reset successfully, redirecting to login page...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error resetting password");
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center bg-linkedinLightGray min-h-screen">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-center text-linkedinPrimary">
          Reset Password
        </h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {message && <p className="text-linkedinGreen text-sm mb-2">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label htmlFor="password" className="sr-only">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter new password"
              className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-linkedinPrimary focus:border-transparent text-linkedinDark"
            />
          </div>

          <div className="relative">
            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm new password"
              className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-linkedinPrimary focus:border-transparent text-linkedinDark"
            />
          </div>

          <Button
            label={isLoading ? "Resetting..." : "Set New Password"}
            styleType="primary"
            className="w-full"
            type="submit"
            disabled={isLoading}
          />
        </form>

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

export default ResetPasswordPage;
