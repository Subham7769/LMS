import { EnvelopeIcon, PhoneIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import Button from '../components/Common/Button/Button';
import { useNavigate } from 'react-router-dom';

const SupportPage = () => {
  const navigate = useNavigate();

  // Function to navigate back to the previous page
  const goBack = () => {
    navigate(-1); // This will navigate back to the last visited page
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="w-[90%] bg-white shadow-lg rounded-lg p-8 relative">
        {/* Action Button */}
        <Button
          buttonIcon={ArrowLeftIcon}
          onClick={goBack}
          circle={true}
          className={"absolute top-1 left-1"}
        />
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">How can we help you?</h1>

        <p className="text-lg text-gray-600 text-center mb-10">
          We're here to assist you. Choose one of the support options below or browse through our help articles.
        </p>

        {/* Support Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {/* Email Support */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition">
            <EnvelopeIcon className="h-12 w-12 text-indigo-600 mx-auto" />
            <h2 className="text-xl font-semibold text-gray-900 mt-4">Email Us</h2>
            <p className="text-gray-600 mt-2">We'll get back to you within 24 hours.</p>
            <a href="mailto:support@example.com" className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block">support@example.com</a>
          </div>

          {/* Call Support */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition">
            <PhoneIcon className="h-12 w-12 text-green-600 mx-auto" />
            <h2 className="text-xl font-semibold text-gray-900 mt-4">Call Us</h2>
            <p className="text-gray-600 mt-2">Speak directly with our support team.</p>
            <a href="tel:+1234567890" className="text-green-600 hover:text-green-800 mt-4 inline-block">+1 (234) 567-890</a>
          </div>

          {/* Live Chat */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition">
            <ChatBubbleLeftRightIcon className="h-12 w-12 text-blue-600 mx-auto" />
            <h2 className="text-xl font-semibold text-gray-900 mt-4">Live Chat</h2>
            <p className="text-gray-600 mt-2">Chat with us for instant assistance.</p>
            <button className="text-blue-600 hover:text-blue-800 mt-4 inline-block">Start a Chat</button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Frequently Asked Questions</h3>
          <ul className="space-y-4">
            <li className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-900">How do I reset my password?</h4>
              <p className="text-gray-600 mt-2">To reset your password, click on the "Forgot Password" link on the login page, and follow the instructions sent to your email.</p>
            </li>
            <li className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-900">How do I contact support?</h4>
              <p className="text-gray-600 mt-2">You can contact us via email, phone, or live chat using the options above.</p>
            </li>
            <li className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-900">Where can I find billing information?</h4>
              <p className="text-gray-600 mt-2">You can find your billing information in your account settings under the "Billing" tab.</p>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500">Still have questions? <a href="/contact" className="text-indigo-600 hover:text-indigo-800">Contact us</a> for more help.</p>
        </div>
      </div>
    </div>
  );
}

export default SupportPage;
