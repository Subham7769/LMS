import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ThankYou from "./images/thank-you-hero.jpg";
import heroIllustration from './images/hero-illustration.svg';


const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-tr from-blue-600 to-blue-500 text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="grid grid-cols-2"
      >
        <div className="pt-50 md:pt-50 pb-20 text-center h-full">
          <h1 className="h1 mb-4 text-white">🎉 Thank You for Applying!</h1>
          <p className="text-lg text-blue-200 mb-8">
            We’ve received your loan application. Our team will review it shortly and get back to you soon.
          </p>

          <div className="flex justify-center space-x-4">
            <button
              // onClick={() => navigate("/customer/home")}
              className="btn-sm bg-slate-800 hover:bg-slate-900 text-white shadow-xs px-4 py-2 rounded "
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => navigate("/customer/loan-application")}
              className="btn hover:cursor-pointer bg-white hover:bg-gray-900 hover:text-white text-blue-500 font-bold px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:hover:bg-gray-500"
            >
              Apply Another Loan
            </button>
          </div>
        </div>

        {/* Thank You Image */}
        <div className="hidden md:block absolute top-0 right-0 md:w-1/2 h-full overflow-hidden" aria-hidden="true">
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            src={ThankYou}
            alt="Thank You"
            className="w-full max-h-[calc(100vh-4rem)] object-fill"
          />
        </div>

      </motion.div>
    </section>
  );
};

export default ThankYouPage;
