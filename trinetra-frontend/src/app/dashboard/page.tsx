'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CosmicLayout } from '@/components/CosmicLayout';
import { CosmicCard } from '@/components/CosmicCard';
import { CosmicButton } from '@/components/CosmicButton';
import { wakapiStats, wakapiAuth, formatDuration, WakapiStats } from '@/lib/wakapi';
import { 
  Activity, 
  Clock, 
  Code, 
  Calendar, 
  TrendingUp, 
  Eye,
  Zap,
  Star,
  Globe,
  LogOut,
  Settings,
  User
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<WakapiStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeRange, setTimeRange] = useState('7_days');
  
  const router = useRouter();

  useEffect(() => {
    loadDashboardData();
  }, [timeRange]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Check authentication first
      const authResult = await wakapiAuth.checkAuth();
      if (!authResult.authenticated) {
        router.push('/login');
        return;
      }
      
      // Set user info (basic for now since we're using cookie auth)
      setUser({ username: 'User', id: '1', email: '', created_at: '' });
      
      // Load stats with corrected range format
      const range = timeRange === '7_days' ? 'last_7_days' : 
                   timeRange === '30_days' ? 'last_30_days' :
                   timeRange === '6_months' ? 'last_6_months' :
                   timeRange === '12_months' ? 'last_12_months' : timeRange;
      
      const statsData = await wakapiStats.getStats(range);
      setStats(statsData);
    } catch (err: any) {
      console.error('Dashboard load error:', err);
      setError(err.response?.data?.message || 'Failed to load dashboard data');
      if (err.response?.status === 401 || err.response?.status === 404) {
        // Redirect to login if unauthorized
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('wakapi_token');
    router.push('/login');
  };

  const timeRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: '7_days', label: 'Last 7 Days' },
    { value: '30_days', label: 'Last 30 Days' },
    { value: '6_months', label: 'Last 6 Months' },
    { value: '12_months', label: 'Last Year' },
  ];

  if (loading) {
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

  if (error) {
    return (
      <CosmicLayout>
        <div className="min-h-screen flex items-center justify-center">
          <CosmicCard className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <CosmicButton onClick={loadDashboardData}>
              Try Again
            </CosmicButton>
          </CosmicCard>
        </div>
      </CosmicLayout>
    );
  }

  return (
    <CosmicLayout>
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Eye className="w-8 h-8 text-purple-400 mr-3" />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Trinetra Dashboard
              </h1>
              <p className="text-gray-400">Welcome back, {user?.username}</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-4">
            {/* Time Range Selector */}
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-black/20 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
            >
              {timeRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <CosmicButton variant="ghost" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </CosmicButton>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <CosmicCard glowColor="purple">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Time</p>
                <p className="text-2xl font-bold text-white">
                  {stats ? formatDuration(stats.total_seconds) : '0m'}
                </p>
              </div>
              <Clock className="w-8 h-8 text-purple-400" />
            </div>
          </CosmicCard>

          <CosmicCard glowColor="blue">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Languages</p>
                <p className="text-2xl font-bold text-white">
                  {stats?.languages?.length || 0}
                </p>
              </div>
              <Code className="w-8 h-8 text-blue-400" />
            </div>
          </CosmicCard>

          <CosmicCard glowColor="pink">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Projects</p>
                <p className="text-2xl font-bold text-white">
                  {stats?.projects?.length || 0}
                </p>
              </div>
              <Globe className="w-8 h-8 text-pink-400" />
            </div>
          </CosmicCard>

          <CosmicCard glowColor="cyan">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Daily Avg</p>
                <p className="text-2xl font-bold text-white">
                  {stats ? formatDuration(Math.floor(stats.total_seconds / 7)) : '0m'}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-cyan-400" />
            </div>
          </CosmicCard>
        </div>

        {/* Languages & Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CosmicCard>
            <div className="flex items-center mb-6">
              <Code className="w-6 h-6 text-purple-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Languages</h3>
            </div>
            <div className="space-y-4">
              {stats?.languages?.slice(0, 5).map((lang, index) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-3 bg-purple-500"></div>
                    <span className="text-gray-300">{lang.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-white font-semibold">
                      {formatDuration(lang.total_seconds)}
                    </span>
                    <div className="text-sm text-gray-400">{lang.percent.toFixed(1)}%</div>
                  </div>
                </motion.div>
              )) || (
                <p className="text-gray-400 text-center py-8">No language data available</p>
              )}
            </div>
          </CosmicCard>

          <CosmicCard>
            <div className="flex items-center mb-6">
              <Globe className="w-6 h-6 text-cyan-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Projects</h3>
            </div>
            <div className="space-y-4">
              {stats?.projects?.slice(0, 5).map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-black/20"
                >
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-3 bg-cyan-500"></div>
                    <span className="text-gray-300">{project.name}</span>
                  </div>
                  <span className="text-white font-semibold">
                    {formatDuration(project.total_seconds)}
                  </span>
                </motion.div>
              )) || (
                <p className="text-gray-400 text-center py-8">No project data available</p>
              )}
            </div>
          </CosmicCard>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-20 pb-12"
        >
          <p className="text-gray-400">
            Powered by{' '}
            <span className="text-purple-400 font-semibold">Trinetra</span>
            {' '}• Connected to{' '}
            <span className="text-cyan-400 font-semibold">Wakapi</span>
          </p>
        </motion.div>
      </div>
    </CosmicLayout>
  );
}