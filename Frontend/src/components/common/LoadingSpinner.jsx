import { motion } from "framer-motion";

const LoadingSpinner = () => {
	return (
		<div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
			{/* Blue Loading Spinner */}
			<motion.div
				className="w-16 h-16 border-4 border-t-4 border-t-linkedinSecondBlue border-linkedin-lighthover-blue rounded-full"
				animate={{ rotate: 360 }}
				transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
			/>
		</div>
	);
};

export default LoadingSpinner;
