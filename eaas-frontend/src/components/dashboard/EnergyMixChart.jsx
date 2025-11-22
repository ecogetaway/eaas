import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const EnergyMixChart = ({ energyHistory }) => {
  if (!energyHistory || energyHistory.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Energy Mix Analysis</h2>
        <p className="text-gray-500 text-center py-8">No data available</p>
      </div>
    );
  }

  // Format data for energy mix chart
  const chartData = energyHistory.map((item) => {
    let timestamp;
    try {
      if (item.timestamp instanceof Date) {
        timestamp = item.timestamp;
      } else if (typeof item.timestamp === 'string') {
        timestamp = new Date(item.timestamp);
      } else {
        timestamp = new Date();
      }
    } catch (error) {
      timestamp = new Date();
    }

    const timeLabel = timestamp.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return {
      time: timeLabel,
      grid: parseFloat(item.grid_import || 0),
      solar: parseFloat(item.solar_generation || 0),
    };
  }).filter(item => item.grid >= 0 && item.solar >= 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Energy Mix Analysis</h2>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
  );
};

export default EnergyMixChart;

