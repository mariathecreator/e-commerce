import { FaTwitter, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Left Section */}
        <div className="col-span-2">
          <h2 className="text-2xl font-bold mb-4">SHOP.CO</h2>
          <p className="text-gray-600 mb-4">
            We have clothes that suits your style and which you’re proud to
            wear. From women to men.
          </p>
          <div className="flex gap-4 text-gray-700">
            <a href="#"><FaTwitter className="hover:text-black" /></a>
            <a href="#"><FaFacebook className="hover:text-black" /></a>
            <a href="#"><FaInstagram className="hover:text-black" /></a>
            <a href="#"><FaGithub className="hover:text-black" /></a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-3">COMPANY</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#">About</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Works</a></li>
            <li><a href="#">Career</a></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="font-semibold mb-3">HELP</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#">Customer Support</a></li>
            <li><a href="#">Delivery Details</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        {/* FAQ */}
        <div>
          <h3 className="font-semibold mb-3">FAQ</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#">Account</a></li>
            <li><a href="#">Manage Deliveries</a></li>
            <li><a href="#">Orders</a></li>
            <li><a href="#">Payments</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-3">RESOURCES</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#">Free eBooks</a></li>
            <li><a href="#">Development Tutorial</a></li>
            <li><a href="#">How to - Blog</a></li>
            <li><a href="#">Youtube Playlist</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 mt-8 py-4 px-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        <p className="text-gray-500 text-sm">
          Shop.co © 2000-2023, All Rights Reserved
        </p>
        <div className="flex gap-3 mt-4 md:mt-0">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Mastercard-logo.png" alt="Mastercard" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="ApplePay" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Google_Pay_Logo.svg" alt="GooglePay" className="h-6" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
