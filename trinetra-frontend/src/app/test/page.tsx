'use client';

import { useState } from 'react';
import { wakapiAuth, wakapiStats } from '@/lib/wakapi';

export default function TestPage() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testLogin = async () => {
    setLoading(true);
    try {
      const result = await wakapiAuth.login('testuser', 'testpass'); // Replace with actual credentials
      setResult(`Login result: ${JSON.stringify(result, null, 2)}`);
    } catch (error: any) {
      setResult(`Login error: ${error.message}\nStatus: ${error.response?.status}\nData: ${JSON.stringify(error.response?.data, null, 2)}`);
    }
    setLoading(false);
  };

  const testAuth = async () => {
    setLoading(true);
    try {
      const result = await wakapiAuth.checkAuth();
      setResult(`Auth check: ${JSON.stringify(result, null, 2)}`);
    } catch (error: any) {
      setResult(`Auth check error: ${error.message}`);
    }
    setLoading(false);
  };

  const testStats = async () => {
    setLoading(true);
    try {
      const result = await wakapiStats.getTodayStats();
      setResult(`Stats: ${JSON.stringify(result, null, 2)}`);
    } catch (error: any) {
      setResult(`Stats error: ${error.message}\nStatus: ${error.response?.status}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Wakapi API Test</h1>
      
      <div className="space-y-4 mb-8">
        <button
          onClick={testAuth}
          disabled={loading}
          className="bg-purple-600 px-4 py-2 rounded mr-4"
        >
          Test Auth Check
        </button>
        
        <button
          onClick={testLogin}
          disabled={loading}
          className="bg-blue-600 px-4 py-2 rounded mr-4"
        >
          Test Login
        </button>
        
        <button
          onClick={testStats}
          disabled={loading}
          className="bg-green-600 px-4 py-2 rounded"
        >
          Test Stats
        </button>
      </div>

      <div className="bg-gray-900 p-4 rounded">
        <h2 className="font-bold mb-2">Result:</h2>
        <pre className="text-sm overflow-auto max-h-96">
          {loading ? 'Loading...' : result || 'Click a button to test'}
        </pre>
      </div>

      <div className="mt-8">
        <h2 className="font-bold mb-2">Instructions:</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>First, create an account at <a href="http://localhost:8080/signup" className="text-blue-400">http://localhost:8080/signup</a></li>
          <li>Then update the credentials in this test page</li>
          <li>Test the authentication and API calls</li>
          <li>Go to <a href="/login" className="text-purple-400">/login</a> to test the Trinetra frontend</li>
        </ol>
      </div>
    </div>
  );
}