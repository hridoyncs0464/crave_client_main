import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaTripadvisor,
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaClock,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaLock
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);

  // Hidden admin access - triple click on copyright text
  const handleCopyrightClick = () => {
    setClickCount(prev => prev + 1);
    
    if (clickCount + 1 === 3) {
      // Triple click detected - navigate to admin login
      navigate("/admin/login");
      setClickCount(0);
    }

    // Reset counter after 2 seconds
    setTimeout(() => setClickCount(0), 2000);
  };

  return (
    <footer className="bg-base-200 border-t border-base-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1 - Brand & Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🔥</span>
              <span className="text-2xl font-bold text-primary">Crave</span>
            </div>
            <p className="text-base-content/70 mb-4 leading-relaxed">
              Experience exceptional dining with carefully crafted dishes made 
              from the finest ingredients. Where every meal becomes a memory.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-circle btn-sm bg-base-300 hover:bg-primary hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-circle btn-sm bg-base-300 hover:bg-primary hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-circle btn-sm bg-base-300 hover:bg-primary hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://tripadvisor.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-circle btn-sm bg-base-300 hover:bg-primary hover:text-white transition-colors"
                aria-label="Tripadvisor"
              >
                <FaTripadvisor />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-base-content/70 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-base-content/70 hover:text-primary transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/reservations" className="text-base-content/70 hover:text-primary transition-colors">
                  Reservations
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-base-content/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base-content/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-base-content/70 hover:text-primary transition-colors">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary mt-1" />
                <span className="text-base-content/70">
                  123 Gourmet Street,<br />
                  Foodie District,<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-primary" />
                <a href="tel:+1234567890" className="text-base-content/70 hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary" />
                <a href="mailto:info@crave.com" className="text-base-content/70 hover:text-primary transition-colors">
                  info@crave.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Opening Hours */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">Opening Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-base-content/70">Monday - Thursday:</span>
                <span className="font-semibold">11:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-base-content/70">Friday - Saturday:</span>
                <span className="font-semibold">11:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-base-content/70">Sunday:</span>
                <span className="font-semibold">12:00 PM - 9:00 PM</span>
              </li>
              <li className="mt-4 pt-4 border-t border-base-300">
                <div className="flex items-center gap-2 text-sm">
                  <FaClock className="text-primary" />
                  <span className="text-success font-semibold">Happy Hour: 4-7 PM Daily</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8 pt-6 border-t border-base-300">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-3">
              <FaCcVisa className="text-3xl text-base-content/60" />
              <FaCcMastercard className="text-3xl text-base-content/60" />
              <FaCcAmex className="text-3xl text-base-content/60" />
              <FaCcPaypal className="text-3xl text-base-content/60" />
            </div>
            
            {/* Hidden Admin Access - Triple Click */}
            <p 
              className="text-sm text-base-content/60 cursor-pointer select-none hover:text-base-content/80 transition-colors relative group"
              onClick={handleCopyrightClick}
              title="Triple click for admin access"
            >
              © {currentYear} Crave Restaurant. All rights reserved.
              {clickCount > 0 && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs bg-primary text-white px-2 py-1 rounded whitespace-nowrap">
                  {clickCount === 1 && "Click 2 more times..."}
                  {clickCount === 2 && "One more click!"}
                </span>
              )}
            </p>
            
            <div className="flex gap-4 text-sm">
              <Link to="/privacy" className="text-base-content/60 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-base-content/60 hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-base-content/60 hover:text-primary transition-colors">
                Sitemap
              </Link>
              
              {/* Alternative: Visible but subtle admin button */}
              <button
                onClick={() => navigate("/admin/login")}
                className="text-base-content/30 hover:text-primary transition-colors opacity-50 hover:opacity-100 flex items-center gap-1"
                title="Admin Access"
              >
                <FaLock className="text-xs" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;