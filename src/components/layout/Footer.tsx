import React from 'react';
import { Twitter, Linkedin, Instagram, Calendar } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-[#00C2CB] to-[#2940D3] text-transparent bg-clip-text mb-6">
              SocialFlip.io
            </h3>
            <p className="text-gray-400">
              Transform your content into engaging social media posts that drive results.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="https://contentvalue.socialflip.io/" className="text-gray-400 hover:text-white transition-colors">Content ROI</a></li>
              <li><a href="https://socialflip.io/use-cases/" className="text-gray-400 hover:text-white transition-colors">Use Cases</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="https://socialflip.io/services/" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="https://socialflip.io/about/" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="https://socialflip.io/blog/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="https://socialflip.io/mission-statement/" className="text-gray-400 hover:text-white transition-colors">Mission</a></li>
              <li><a href="https://socialflip.io/contact/" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4 mb-6">
              <a href="https://www.linkedin.com/in/rockey-simmons-content-repurposing-strategist/" className="text-gray-400 hover:text-[#0077B5] transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://x.com/rockey_simmons" className="text-gray-400 hover:text-gray-100 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/_flipmysocial/" className="text-gray-400 hover:text-[#E4405F] transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
            <a 
              href="https://calendly.com/rockey-repurposly/social-flip-discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#00C2CB] to-[#2940D3] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book a Demo
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} SocialFlip.io. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://socialflip.io/privacy-policy/" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="https://socialflip.io/terms-and-conditions/" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};