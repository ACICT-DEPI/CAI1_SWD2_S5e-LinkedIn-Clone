import './App.css';
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes.jsx";
import { useAuthStore } from './store/authStore.js';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

  if (isCheckingAuth) return <div>Loading...</div>
  
  return (
    <RouterProvider router={routes} />
  );
}

export default App;
