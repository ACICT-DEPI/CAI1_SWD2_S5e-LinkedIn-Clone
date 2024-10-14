import React, { useState } from 'react';
import Microsoft_logo from '../assets/images/Microsoft_logo.svg';
import google_logo from '../assets/images/google.svg';
import Button from '../components/common/Button';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import logo from '../assets/images/login-logo.svg';
import { useAuthStore } from '../store/authStore';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, isLoading, error } = useAuthStore();

	const handleLogin = async (e) => {
		e.preventDefault();
		await login(email, password);
	};

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Perform form validation and login logic here (optional)
  //   navigate('/home'); // Navigate to home after login
  // };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="flex items-center justify-between px-16 md:px-48 py-4">
        <img src={logo} alt="LinkedIn Logo" className="h-8" />
      </nav>
      <main className="flex-grow flex flex-col justify-center items-center space-y-6">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-gray-800">
            Sign In
          </h1>
          <p className='text-linkedinsecondGray my-2'>
            Stay updated on your professional world.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-linkedinsecondGray">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-linkedinsecondGray">
                Password (6+ characters)
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {/* Forgot Password */}
            <Link to={'/forgot-password'} className="font-medium text-linkedinBlue hover:underline cursor-pointer">
              Forgot Password?
            </Link>

            {error && <p className="text-red-500 text-xs">{error}</p>}
            <Button label="Sign In" styleType="primary" className="w-full"  disabled={isLoading}/>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-600">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="text-xs">
              <p>
                By clicking Continue to join or sign in, you agree to LinkedIn's{' '}
                <a href="#" className="text-linkedinBlue hover:underline">
                  User Agreement
                </a>,{' '}
                <a href="#" className="text-linkedinBlue hover:underline">
                  Privacy Policy
                </a>, and{' '}
                <a href="#" className="text-linkedinBlue hover:underline">
                  Cookie Policy
                </a>.
              </p>
            </div>

            <Button
              label="Continue with Google"
              icon={<img src={google_logo} alt="Google" className="w-5 h-5" />}
              styleType="default"
              className="w-full flex items-center justify-center space-x-2"
            />
            <Button
              label="Continue with Microsoft"
              icon={<img src={Microsoft_logo} alt="Microsoft" className="w-5 h-5" />}
              styleType="default"
              className="w-full flex items-center justify-center space-x-2"
            />
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              New to LinkedIn?{' '}
              <Link to="/signup" className="text-linkedinBlue hover:underline">
                Join now
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
