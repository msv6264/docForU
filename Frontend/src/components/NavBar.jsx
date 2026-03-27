import React, { useState } from 'react';
import {Presentation, Menu, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-center h-16">

            <div className="flex items-center space-x-2">
              <img className="w-54 h-36 text-white" src={logo} alt="" />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition">How It Works</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition">Pricing</a>
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition transform hover:scale-105">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              <a href="#features" className="block text-gray-700 hover:text-blue-600">Features</a>
              <a href="#how-it-works" className="block text-gray-700 hover:text-blue-600">How It Works</a>
              <a href="#pricing" className="block text-gray-700 hover:text-blue-600">Pricing</a>
              <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg">
                Get Started
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}
