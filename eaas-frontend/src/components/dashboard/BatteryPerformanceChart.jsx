import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BatteryPerformanceChart = ({ energyHistory, batteryCapacity }) => {
  if (!energyHistory || energyHistory.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Battery Performance</h2>
        <p className="text-gray-500 text-center py-8">No data available</p>
      </div>
    );
  }

  // Format data for battery chart
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

    // Calculate battery percentage if we have capacity
    const batteryCharge = parseFloat(item.battery_charge || 0);
    const capacity = batteryCapacity || parseFloat(item.battery_capacity || 0);
    const batteryPercent = capacity > 0 
      ? Math.round((batteryCharge / capacity) * 100)
      : 0;

    return {
      time: timeLabel,
      battery: batteryPercent,
    };
  }).filter(item => item.battery >= 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Battery Performance</h2>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="time" axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} />
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Charge Level']}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="battery" name="Charge Level %" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BatteryPerformanceChart;

