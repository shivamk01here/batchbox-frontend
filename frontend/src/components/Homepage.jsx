import React from 'react';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Shield, 
  Clock, 
  Brain, 
  CheckCircle, 
  BarChart3,
  Calendar,
  MessageSquare,
  Award,
  Settings,
  ArrowRight,
  Menu,
  X,
  Star,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Twitter,
  Facebook
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-700 via-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-md">
                    <div className="w-6 h-6 border-2 border-white rounded-sm relative">
                      <div className="absolute inset-1 bg-white rounded-xs opacity-80"></div>
                      <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-slate-700 rounded-full"></div>
                      <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-slate-700 rounded-full"></div>
                      <div className="absolute bottom-0.5 left-0.5 right-0.5 h-0.5 bg-slate-700 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="text-2xl font-bold text-slate-800">BatchBox</span>
                  <div className="text-xs text-slate-500 -mt-1">Everything. Simplified.</div>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-slate-600 hover:text-slate-800 transition-colors font-medium">Features</a>
                <a href="#solutions" className="text-slate-600 hover:text-slate-800 transition-colors font-medium">Solutions</a>
                <a href="#pricing" className="text-slate-600 hover:text-slate-800 transition-colors font-medium">Pricing</a>
                <a href="#contact" className="text-slate-600 hover:text-slate-800 transition-colors font-medium">Contact</a>
                <button 
                  onClick={() => navigate('/login')}
                  className="text-slate-600 hover:text-slate-800 transition-colors font-medium">
                  Sign In
                </button>
                <button 
                  onClick={() => navigate('/register')}
                  className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-sm hover:shadow-md">
                  Get Started
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-slate-600 hover:text-slate-800 transition-colors"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <a href="#features" className="block px-3 py-2 text-slate-600 hover:text-slate-800 transition-colors font-medium">Features</a>
                  <a href="#solutions" className="block px-3 py-2 text-slate-600 hover:text-slate-800 transition-colors font-medium">Solutions</a>
                  <a href="#pricing" className="block px-3 py-2 text-slate-600 hover:text-slate-800 transition-colors font-medium">Pricing</a>
                  <a href="#contact" className="block px-3 py-2 text-slate-600 hover:text-slate-800 transition-colors font-medium">Contact</a>
                  <hr className="my-2" />
                  <button className="block w-full text-left px-3 py-2 text-slate-600 hover:text-slate-800 transition-colors font-medium">
                    Sign In
                  </button>
                  <button className="block w-full mt-2 bg-slate-800 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300">
                    Get Started
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
                  <Award className="mr-2 h-4 w-4 text-slate-600" />
                  Trusted by 10,000+ Institutes Worldwide
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Everything Your
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-blue-600 to-indigo-700">
                    Institute Needs
                  </span>
                  <br />
                  In One Place
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                  From student management to AI-powered assessments, streamline every aspect of your coaching institute with our comprehensive platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/register')}
                  className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  Start Free Trial
                  <ArrowRight size={20} />
                </button>
                <button className="border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                  Schedule Demo
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-8 pt-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-slate-400 to-slate-600 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={16} className="text-yellow-400 fill-current" />
                    ))}
                    <span className="text-sm text-slate-600 ml-2">4.9/5</span>
                  </div>
                  <div className="text-sm text-slate-600">10,000+ Happy Institutes</div>
                </div>
              </div>
            </div>

            {/* Right - Dashboard Preview */}
            <div className="relative">
              <div className="relative mx-auto w-full max-w-2xl">
                {/* Main Dashboard */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                  <div className="bg-slate-800 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                          <div className="w-4 h-4 border border-white rounded-sm"></div>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">BatchBox Dashboard</h3>
                          <p className="text-slate-300 text-sm">Institute Management</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-slate-800">2,847</div>
                        <div className="text-sm text-slate-600">Active Students</div>
                        <div className="text-xs text-green-600 mt-1">↗ +12%</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-blue-600">86</div>
                        <div className="text-sm text-slate-600">Classes Today</div>
                        <div className="text-xs text-green-600 mt-1">↗ +8%</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-indigo-600">94.2%</div>
                        <div className="text-sm text-slate-600">Attendance</div>
                        <div className="text-xs text-green-600 mt-1">↗ +2%</div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <h4 className="font-semibold text-slate-800 mb-3">Recent Activity</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <Brain className="text-blue-500 flex-shrink-0" size={16} />
                          <span className="text-slate-700">AI Test generated for Physics - Motion</span>
                          <span className="ml-auto text-slate-500">2m ago</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Users className="text-green-500 flex-shrink-0" size={16} />
                          <span className="text-slate-700">25 students attended Chemistry class</span>
                          <span className="ml-auto text-slate-500">5m ago</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <MessageSquare className="text-purple-500 flex-shrink-0" size={16} />
                          <span className="text-slate-700">Parent meeting scheduled</span>
                          <span className="ml-auto text-slate-500">12m ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -left-6 top-20 bg-white rounded-xl shadow-lg p-4 border border-gray-200 hidden sm:block">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={20} />
                    <span className="text-sm font-medium text-slate-700">Payment Received</span>
                  </div>
                </div>
                <div className="absolute -right-6 bottom-20 bg-white rounded-xl shadow-lg p-4 border border-gray-200 hidden lg:block">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="text-blue-500" size={20} />
                    <span className="text-sm font-medium text-slate-700">Performance Up</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-800 mb-2">10,000+</div>
              <div className="text-slate-600 font-medium">Active Institutes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-800 mb-2">2M+</div>
              <div className="text-slate-600 font-medium">Students Managed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-800 mb-2">99.9%</div>
              <div className="text-slate-600 font-medium">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-800 mb-2">150+</div>
              <div className="text-slate-600 font-medium">Countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-br from-slate-50 to-blue-50" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Complete Institute Management Platform
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to run your coaching institute efficiently, from student enrollment to performance analytics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Student Management</h3>
              <p className="text-slate-600 leading-relaxed">
                Complete student profiles, enrollment tracking, batch management, and parent communication in one place.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <Brain className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">AI-Powered Assessments</h3>
              <p className="text-slate-600 leading-relaxed">
                Generate unlimited tests, quizzes, and assignments automatically with our advanced AI technology.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Performance Analytics</h3>
              <p className="text-slate-600 leading-relaxed">
                Track student progress, identify learning gaps, and get actionable insights to improve outcomes.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Calendar className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Smart Scheduling</h3>
              <p className="text-slate-600 leading-relaxed">
                Automated timetables, class scheduling, and resource allocation with conflict resolution.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare className="text-orange-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Communication Hub</h3>
              <p className="text-slate-600 leading-relaxed">
                SMS, WhatsApp, email notifications, and parent-teacher communication portal for seamless interaction.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="text-teal-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Secure & Reliable</h3>
              <p className="text-slate-600 leading-relaxed">
                Bank-grade security, automated backups, and 99.9% uptime guarantee for your peace of mind.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Solutions Section */}
      <div className="py-20 bg-white" id="solutions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Perfect for Every Type of Institute
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Whether you run a coaching center, sports academy, or skill development institute, we've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Academic Coaching</h3>
              <p className="text-slate-600">JEE, NEET, CA, Banking, and other competitive exam preparation centers.</p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Sports Academies</h3>
              <p className="text-slate-600">Cricket, football, tennis, and other sports training academies and clubs.</p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Settings className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Skill Development</h3>
              <p className="text-slate-600">Music, dance, art, coding, and other skill-based learning centers.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-slate-800 py-20" id="pricing">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Institute?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of institutes that have streamlined their operations and improved student outcomes with BatchBox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-slate-800 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg">
              Start 14-Day Free Trial
            </button>
            <button className="border-2 border-slate-300 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-700 transition-all duration-300">
              Schedule Demo
            </button>
          </div>
          <p className="text-slate-400 text-sm mt-4">No credit card required • Full feature access • Cancel anytime</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-16" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-slate-700 via-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 border border-white rounded-sm"></div>
                </div>
                <div>
                  <span className="text-xl font-bold text-slate-800">BatchBox</span>
                  <div className="text-xs text-slate-500 -mt-1">Everything. Simplified.</div>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Empowering institutes worldwide with comprehensive management solutions that drive student success.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-600 hover:text-slate-800 transition-colors">Features</a></li>
                <li><a href="#" className="text-slate-600 hover:text-slate-800 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-slate-600 hover:text-slate-800 transition-colors">Integrations</a></li>
                <li><a href="#" className="text-slate-600 hover:text-slate-800 transition-colors">Mobile App</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-600 hover:text-slate-800 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-slate-600 hover:text-slate-800 transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-slate-600 hover:text-slate-800 transition-colors">Training</a></li>
                <li><a href="#" className="text-slate-600 hover:text-slate-800 transition-colors">System Status</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-slate-500" />
                  <span className="text-slate-600">hello@BatchBox.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-slate-500" />
                  <span className="text-slate-600">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-slate-500" />
                  <span className="text-slate-600">San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-slate-500 text-sm">
                © 2025 BatchBox. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 sm:mt-0">
                <a href="#" className="text-slate-500 hover:text-slate-700 text-sm transition-colors">Privacy</a>
                <a href="#" className="text-slate-500 hover:text-slate-700 text-sm transition-colors">Terms</a>
                <a href="#" className="text-slate-500 hover:text-slate-700 text-sm transition-colors">Terms</a>
                <a href="#" className="text-slate-500 hover:text-slate-700 text-sm transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;