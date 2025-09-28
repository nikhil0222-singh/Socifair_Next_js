'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CosmicLayout } from '@/components/CosmicLayout';
import { CosmicCard } from '@/components/CosmicCard';
import { CosmicButton } from '@/components/CosmicButton';
import { wakapiAuth } from '@/lib/wakapi';
import { Eye, EyeOff, Lock, User, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  
  const router = useRouter();

  // Check if user is already authenticated on component mount
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authResult = await wakapiAuth.checkAuth();
        if (authResult.authenticated) {
          // User is already authenticated, redirect to dashboard
          router.push('/dashboard');
          return;
        }
      } catch (error) {
        // User is not authenticated, continue with login page
        console.log('User not authenticated, showing login page');
      } finally {
        setChecking(false);
      }
    };

    checkAuthentication();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const result = await wakapiAuth.login(formData.username, formData.password);
        if (result.success || result.redirect) {
          // Success! Redirect to dashboard
          router.push('/dashboard');
          return;
        }
      } else {
        const result = await wakapiAuth.register(formData.username, formData.email, formData.password);
        if (result.success || result.redirect) {
          if (result.redirect) {
            // Successful registration, redirect to dashboard
            router.push('/dashboard');
          } else {
            setIsLogin(true);
            setError('Account created successfully! Please login.');
          }
          return;
        }
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      
      // Handle different error types
      if (err.response) {
        const status = err.response.status;
        if (status === 302) {
          // 302 redirect means successful authentication
          router.push('/dashboard');
          return;
        } else if (status === 400) {
          setError('Invalid username or password');
        } else if (status === 401) {
          setError('Authentication failed. Please check your credentials.');
        } else if (status === 404) {
          setError('Service unavailable. Please try again.');
        } else {
          setError(err.response?.data?.message || 'Authentication failed');
        }
      } else if (err.code === 'ECONNREFUSED') {
        setError('Cannot connect to server. Please check if the service is running.');
      } else {
        setError(err.message || 'Authentication failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Show loading while checking authentication
  if (checking) {
    return (
      <CosmicLayout>
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-2 border-purple-500 border-t-transparent rounded-full"
          />
        </div>
      </CosmicLayout>
    );
  }

  return (
    <CosmicLayout>
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center mb-4"
            >
              <Zap className="w-10 h-10 text-purple-400 mr-3" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Trinetra
              </h1>
            </motion.div>
            <p className="text-gray-400">
              {isLogin ? 'Welcome back to your cosmic journey' : 'Begin your mystical coding adventure'}
            </p>
          </div>

          {/* Login/Register Form */}
          <CosmicCard>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-white">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </h2>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-3 rounded-lg border text-sm ${
                    error.includes('successfully') 
                      ? 'bg-green-500/10 border-green-500/20 text-green-400'
                      : 'bg-red-500/10 border-red-500/20 text-red-400'
                  }`}
                >
                  {error}
                </motion.div>
              )}

              {/* Username Field */}
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              {/* Email Field (Register only) */}
              {!isLogin && (
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              )}

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-12 py-3 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <CosmicButton
                type="submit"
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
              </CosmicButton>

              {/* Toggle Login/Register */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                    setFormData({ username: '', email: '', password: '' });
                  }}
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                </button>
              </div>
            </form>
          </CosmicCard>
        </motion.div>
      </div>
    </CosmicLayout>
  );
}