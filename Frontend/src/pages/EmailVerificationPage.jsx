import { useRef, useState, useEffect } from "react";
import Button from '../components/common/Button';
import { useNavigate } from "react-router-dom";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handleSubmit = async (e) => {
		e.preventDefault();
    const verificationCode = code.join("");
	};

  // Auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      // Logic to handle auto-submit or any UI changes when code is fully entered
    }
  }, [code]);

  return (
    <div className="flex items-center justify-center h-screen bg-linkedinLightGray">
      <div className="max-w-md w-full bg-linkedinWhite rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-linkedinBlue to-linkedinSecondBlue text-transparent bg-clip-text">
            Verify Your Email
          </h2>
          <p className="text-center text-linkedinGray mb-6">
            Enter the 6-digit code sent to your email address.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-2xl font-bold bg-linkedinLightGray text-linkedinDarkGray border-2 border-linkedinDarkGray rounded-lg focus:border-linkedinBlue focus:outline-none"
                />
              ))}
            </div>

            <Button label="Sumbit" styleType="primary" className="w-full"/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
