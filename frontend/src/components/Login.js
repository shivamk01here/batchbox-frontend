import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, ArrowRight, CheckCircle, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, currentUser } = useAuth();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  const handleExistingUser = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-700 via-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
              <div className="w-8 h-8 border-2 border-white rounded-lg relative">
                <div className="absolute inset-1 bg-white rounded-sm opacity-80"></div>
                <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
                <div className="absolute bottom-1 left-1 right-1 h-1 bg-slate-700 rounded-full"></div>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-slate-600">Sign in to your BatchBox account</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          {token ? (
            /* Existing User Flow */
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-r from-slate-100 to-blue-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-2">Welcome back!</h2>
                <p className="text-slate-600">Continue as <span className="font-medium text-slate-800">{currentUser?.name}</span></p>
              </div>
              <button
                onClick={handleExistingUser}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                Continue to Dashboard
                <ArrowRight size={20} />
              </button>
              <div className="text-center">
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.reload();
                  }}
                  className="text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors"
                >
                  Sign in with different account
                </button>
              </div>
            </div>
          ) : (
            /* Login Form */
            <>
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white text-slate-900 placeholder-slate-400"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white text-slate-900 placeholder-slate-400"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <Link 
                    to="/forgot-password" 
                    className="text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    Forgot your password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-slate-800 hover:bg-slate-700 disabled:bg-slate-400 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-8 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500 font-medium">New to BatchBox?</span>
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-slate-600 mb-4">Don't have an institution account?</p>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center w-full border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 py-3 px-6 rounded-xl font-semibold transition-all duration-300"
                >
                  Register Your Institution
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="font-medium text-slate-600 hover:text-slate-800 transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="font-medium text-slate-600 hover:text-slate-800 transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;