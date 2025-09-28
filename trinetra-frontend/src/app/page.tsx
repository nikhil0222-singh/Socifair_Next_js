'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CosmicLayout } from '@/components/CosmicLayout';
import { CosmicCard } from '@/components/CosmicCard';
import { CosmicButton } from '@/components/CosmicButton';
import { 
  Activity, 
  Clock, 
  Code, 
  Calendar, 
  TrendingUp, 
  Eye,
  Zap,
  Star,
  Globe
} from 'lucide-react';

export default function Home() {
  const [timeData, setTimeData] = useState({
    todayTime: '2h 34m',
    weekTime: '18h 42m',
    avgDaily: '2h 15m',
    totalTime: '248h 16m'
  });

  const [statsData, setStatsData] = useState({
    languages: [
      { name: 'TypeScript', time: '6h 12m', percentage: 45, color: '#3178c6' },
      { name: 'JavaScript', time: '4h 8m', percentage: 30, color: '#f7df1e' },
      { name: 'Python', time: '2h 18m', percentage: 17, color: '#3776ab' },
      { name: 'CSS', time: '1h 4m', percentage: 8, color: '#1572b6' },
    ],
    projects: [
      { name: 'Trinetra Dashboard', time: '8h 32m', color: '#8b5cf6' },
      { name: 'API Development', time: '5h 14m', color: '#06b6d4' },
      { name: 'UI Components', time: '3h 28m', color: '#ec4899' },
    ]
  });

  return (
    <CosmicLayout>
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-pink-900/20 blur-3xl"></div>
        <div className="relative container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-purple-400 mr-3" />
              <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Trinetra
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Your mystical coding companion. Track your development journey through the cosmic realms of code.
            </p>
            <div className="mt-8 flex gap-4 justify-center">
              <CosmicButton size="lg" onClick={() => window.location.href = '/dashboard'}>
                <Activity className="w-5 h-5 mr-2" />
                View Dashboard
              </CosmicButton>
              <CosmicButton variant="outline" size="lg" onClick={() => window.location.href = '/login'}>
                <Star className="w-5 h-5 mr-2" />
                Get Started
              </CosmicButton>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <CosmicCard glowColor="purple">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Today</p>
                <p className="text-2xl font-bold text-white">{timeData.todayTime}</p>
              </div>
              <Clock className="w-8 h-8 text-purple-400" />
            </div>
          </CosmicCard>

          <CosmicCard glowColor="blue">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">This Week</p>
                <p className="text-2xl font-bold text-white">{timeData.weekTime}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-400" />
            </div>
          </CosmicCard>

          <CosmicCard glowColor="pink">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Daily Average</p>
                <p className="text-2xl font-bold text-white">{timeData.avgDaily}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-pink-400" />
            </div>
          </CosmicCard>

          <CosmicCard glowColor="cyan">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Time</p>
                <p className="text-2xl font-bold text-white">{timeData.totalTime}</p>
              </div>
              <Zap className="w-8 h-8 text-cyan-400" />
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
              {statsData.languages.map((lang, index) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: lang.color }}
                    ></div>
                    <span className="text-gray-300">{lang.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-white font-semibold">{lang.time}</span>
                    <div className="text-sm text-gray-400">{lang.percentage}%</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CosmicCard>

          <CosmicCard>
            <div className="flex items-center mb-6">
              <Globe className="w-6 h-6 text-cyan-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Projects</h3>
            </div>
            <div className="space-y-4">
              {statsData.projects.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-black/20"
                >
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: project.color }}
                    ></div>
                    <span className="text-gray-300">{project.name}</span>
                  </div>
                  <span className="text-white font-semibold">{project.time}</span>
                </motion.div>
              ))}
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
