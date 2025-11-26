import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { TrendingUp, Battery, Leaf, Sun } from 'lucide-react';

const data = [
  { time: '06:00', grid: 40, solar: 0, battery: 40 },
  { time: '08:00', grid: 60, solar: 20, battery: 35 },
  { time: '10:00', grid: 30, solar: 80, battery: 60 },
  { time: '12:00', grid: 10, solar: 100, battery: 85 },
  { time: '14:00', grid: 15, solar: 90, battery: 100 },
  { time: '16:00', grid: 40, solar: 60, battery: 90 },
  { time: '18:00', grid: 80, solar: 10, battery: 70 },
  { time: '20:00', grid: 90, solar: 0, battery: 50 },
];

const StatCard: React.FC<{ label: string; value: string; icon: React.ElementType; subtext: string; color: string }> = ({ label, value, icon: Icon, subtext, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
    </div>
    <p className="text-xs text-gray-500 mt-4">{subtext}</p>
  </div>
);

export const DashboardView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold text-gray-900">Energy Overview</h1>
        <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border mt-2 sm:mt-0">
          <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
          System Status: <span className="font-medium text-green-600">Optimal</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Real-time Usage" 
          value="4.2 kW" 
          icon={TrendingUp} 
          subtext="12% lower than yesterday"
          color="bg-blue-500"
        />
        <StatCard 
          label="Solar Generation" 
          value="6.8 kW" 
          icon={Sun} 
          subtext="Peak production active"
          color="bg-amber-500"
        />
        <StatCard 
          label="Battery Level" 
          value="82%" 
          icon={Battery} 
          subtext="Est. 6h backup duration"
          color="bg-brand-500"
        />
        <StatCard 
          label="CO₂ Offset" 
          value="142 kg" 
          icon={Leaf} 
          subtext="This month total"
          color="bg-teal-600"
        />
      </div>

      {/* Main Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Energy Mix Analysis</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorGrid" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="top" height={36} />
              <Area type="monotone" dataKey="solar" name="Solar Gen (kW)" stroke="#fbbf24" fillOpacity={1} fill="url(#colorSolar)" />
              <Area type="monotone" dataKey="grid" name="Grid Usage (kW)" stroke="#3b82f6" fillOpacity={1} fill="url(#colorGrid)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Charts/Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Battery Performance</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="battery" name="Charge Level %" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
             <h2 className="text-lg font-bold text-gray-900 mb-2">Grid Independence Score</h2>
             <p className="text-gray-500 text-sm mb-6">Your system efficiency compared to neighborhood average.</p>
             
             <div className="flex items-center justify-center py-8">
                <div className="relative w-40 h-40 flex items-center justify-center rounded-full border-8 border-gray-100">
                   <div className="absolute inset-0 rounded-full border-8 border-brand-500 border-t-transparent transform -rotate-45" style={{ clipPath: 'inset(0 0 0 0)'}}></div>
                   <div className="text-center">
                      <span className="text-4xl font-bold text-gray-900">92</span>
                      <span className="block text-xs text-gray-500 uppercase font-bold">Score</span>
                   </div>
                </div>
             </div>
          </div>
          <div className="bg-brand-50 rounded-lg p-4">
             <p className="text-sm text-brand-800 font-medium flex items-center">
                <Leaf className="w-4 h-4 mr-2" />
                You saved $42.50 this week by using stored energy.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};