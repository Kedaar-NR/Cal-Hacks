import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { Trophy, Target, Clock } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function ProfilePage() {
  const { user } = useAuth();
  const [stats, setStats] = React.useState({
    totalTests: 0,
    averageWPM: 0,
    averageAccuracy: 0,
    bestWPM: 0
  });
  const [recentTests, setRecentTests] = React.useState([]);
  const [chartData, setChartData] = React.useState({
    labels: [],
    datasets: []
  });

  React.useEffect(() => {
    if (user) {
      loadUserStats();
      loadRecentTests();
      loadChartData();
    }
  }, [user]);

  const loadUserStats = async () => {
    const { data: tests } = await supabase
      .from('typing_tests')
      .select('wpm, accuracy')
      .eq('user_id', user.id);

    if (tests) {
      const totalTests = tests.length;
      const averageWPM = tests.reduce((acc, test) => acc + test.wpm, 0) / totalTests;
      const averageAccuracy = tests.reduce((acc, test) => acc + test.accuracy, 0) / totalTests;
      const bestWPM = Math.max(...tests.map(test => test.wpm));

      setStats({
        totalTests,
        averageWPM: Math.round(averageWPM),
        averageAccuracy: Math.round(averageAccuracy),
        bestWPM
      });
    }
  };

  const loadRecentTests = async () => {
    const { data } = await supabase
      .from('typing_tests')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (data) {
      setRecentTests(data);
    }
  };

  const loadChartData = async () => {
    const { data: tests } = await supabase
      .from('typing_tests')
      .select('wpm, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });

    if (tests) {
      const labels = tests.map(test => 
        new Date(test.created_at).toLocaleDateString()
      );
      const wpmData = tests.map(test => test.wpm);

      setChartData({
        labels,
        datasets: [
          {
            label: 'WPM',
            data: wpmData,
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            tension: 0.3
          }
        ]
      });
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p>Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={user.user_metadata.avatar_url}
            alt={user.user_metadata.full_name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.user_metadata.full_name}</h1>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold">Total Tests</h3>
            </div>
            <p className="text-2xl font-bold">{stats.totalTests}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-green-500" />
              <h3 className="font-semibold">Average WPM</h3>
            </div>
            <p className="text-2xl font-bold">{stats.averageWPM}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <h3 className="font-semibold">Best WPM</h3>
            </div>
            <p className="text-2xl font-bold">{stats.bestWPM}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-purple-500" />
              <h3 className="font-semibold">Accuracy</h3>
            </div>
            <p className="text-2xl font-bold">{stats.averageAccuracy}%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Progress Over Time</h2>
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: false,
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                }
              }
            }}
          />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Recent Tests</h2>
          <div className="space-y-4">
            {recentTests.map((test: any) => (
              <div
                key={test.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <p className="font-semibold">{test.mode} - {test.duration}s</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(test.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{test.wpm} WPM</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {test.accuracy}% accuracy
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}