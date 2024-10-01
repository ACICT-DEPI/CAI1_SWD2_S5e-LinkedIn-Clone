import React from 'react'
import logo from '../assets/images/login-logo.svg'
import welcomePhoto from '../assets/images/sign-in-up.svg'
import Microsoft_logo from '../assets/images/Microsoft_logo.svg'
import google_logo from '../assets/images/google.svg'
import Button from '../components/common/Button';
import { useNavigate, Link } from 'react-router-dom'; 

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="flex items-center justify-between px-16 md:px-48 py-4">
        <img src={logo} alt="LinkedIn Logo" className="h-8 pe-5 max-w-sm" />
        <div className="flex items-center space-x-4">
          <Button label="Sign in" styleType="outline"  onClick={() => navigate('/login')} />
          <Button label="Join now" styleType="primary"  onClick={() => navigate('/signup')} />
        </div>
        </nav>
        
        <main>
          <div className='container flex flex-col mx-auto mt-10 space-y-5 md:flex-row md:space-y-0 items-center ps-16 md:ps-48'>
          {/* left section */}
            <div className='flex flex-col space-y-6 md:w-1/2'>
            <h1 className='max-w-md text-4xl text-linkedinsecondGray text-center lg:text-5xl md:text-left mb-2'>
            Welcome to your professional community
            </h1>
            <Button
              label="Continue with Google"
              icon={<img src={google_logo} alt="Google" className="w-5 h-5" />}
              styleType="default"
              className="w-3/4 "
            />

            <Button
              label="Continue with Microsoft"
              icon={<img src={Microsoft_logo} alt="Microsoft" className="w-5 h-5" />}
              styleType="default"
              className="w-3/4"
            />
            
            <Button
              label="Sign in with email"
              styleType="default"
              className="w-3/4"
              onClick={() => navigate('/sign-up')}
            />
            <div className="text-center w-3/4">
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
            <div className="mt-6 text-center w-3/4">
              <p className="text-sm text-gray-600">
                New to LinkedIn?{' '}
                <Link to="/signup" className="text-linkedinBlue hover:underline">
                  Join now
                </Link>
              </p>
            </div>
          </div>
          {/* right section */}
          <div className="md:w-1/2 pe-10">
            <img src={welcomePhoto} alt="Main Illustration" className="w-full" />
          </div>
          </div>
        </main>
    </>
  )
}

export default WelcomePage
