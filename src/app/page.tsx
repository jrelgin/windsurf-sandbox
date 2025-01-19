'use client';

import BarChart from '@/components/BarChart';
import CircularProgress from '@/components/CircularProgress';

// Generate random value between min and max
const getRandomValue = (min: number, max: number) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

const monthlyData = [
  { month: 'Jan', value: getRandomValue(40, 90) },
  { month: 'Feb', value: getRandomValue(45, 95) },
  { month: 'Mar', value: getRandomValue(35, 85) },
  { month: 'Apr', value: getRandomValue(50, 95) },
  { month: 'May', value: getRandomValue(30, 80) },
  { month: 'Jun', value: getRandomValue(40, 90) },
  { month: 'Jul', value: getRandomValue(35, 85) },
  { month: 'Aug', value: getRandomValue(30, 80) },
  { month: 'Sep', value: getRandomValue(40, 90) },
  { month: 'Oct', value: getRandomValue(45, 95) },
  { month: 'Nov', value: getRandomValue(50, 95) },
  { month: 'Dec', value: getRandomValue(40, 90) },
];

export default function Dashboard() {
  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Welcome back, Olivia</h1>
        <div className="flex gap-4">
          <button className="flex items-center px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">
            <span className="mr-2">Customize</span>
          </button>
          <button className="flex items-center px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">
            <span className="mr-2">Export</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vendor Breakdown Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-semibold mb-1">Vendor breakdown</h2>
              <p className="text-sm text-gray-600">Keep track of vendors and their security ratings.</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>
          </div>
          
          <div className="h-[300px]">
            <BarChart data={monthlyData} />
          </div>
          
          <div className="flex justify-end mt-4">
            <button className="text-sm text-gray-600 hover:text-gray-800">
              View full report
            </button>
          </div>
        </div>

        {/* Vendors Monitored Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-lg font-semibold">Vendors monitored</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 mb-4">
              <CircularProgress percentage={80} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-semibold">240</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 text-center mb-2">You&apos;re using 80% of available spots.</p>
            <p className="text-sm text-gray-600 text-center mb-6">Upgrade plan to monitor more vendors.</p>
            <button className="w-full py-2 px-4 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
              Upgrade plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
