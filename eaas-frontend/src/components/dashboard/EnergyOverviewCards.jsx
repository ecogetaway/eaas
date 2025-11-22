import { TrendingUp, Sun, Battery, Leaf } from 'lucide-react';
import { formatKW, formatKWh } from '../../utils/formatters.js';

const StatCard = ({ label, value, icon: Icon, subtext, color }) => (
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

const EnergyOverviewCards = ({ currentEnergy, dashboardSummary, subscription }) => {
  if (!currentEnergy || !dashboardSummary) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse">
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  // Calculate real-time usage (total consumption)
  const realTimeUsage = currentEnergy.total_consumption || 0;
  const yesterdayUsage = dashboardSummary.yesterday?.total_consumption || 0;
  const usageChange = yesterdayUsage > 0 
    ? ((realTimeUsage - yesterdayUsage) / yesterdayUsage * 100).toFixed(0)
    : 0;
  const usageChangeText = usageChange < 0 
    ? `${Math.abs(usageChange)}% lower than yesterday`
    : usageChange > 0 
    ? `${usageChange}% higher than yesterday`
    : 'Same as yesterday';

  // Solar generation
  const solarGeneration = currentEnergy.solar_generation || 0;
  const solarPeak = dashboardSummary.today?.solar_units || 0;
  const solarText = solarPeak > 0 ? 'Peak production active' : 'No generation';

  // Battery level
  const batteryCapacity = subscription?.battery_capacity || 0;
  const batteryCharge = currentEnergy.battery_charge || 0;
  const batteryPercent = batteryCapacity > 0 
    ? Math.round((batteryCharge / batteryCapacity) * 100)
    : 0;
  const estimatedHours = batteryCapacity > 0 && batteryCharge > 0
    ? Math.round((batteryCharge / (realTimeUsage || 1)) * 10) / 10
    : 0;
  const batteryText = estimatedHours > 0 
    ? `Est. ${estimatedHours}h backup duration`
    : 'No backup available';

  // CO₂ Offset (calculate from solar generation - approximate 0.5 kg CO₂ per kWh)
  const co2Offset = (dashboardSummary.month?.solar_units || 0) * 0.5;
  const co2Text = 'This month total';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        label="Real-time Usage" 
        value={formatKW(realTimeUsage)} 
        icon={TrendingUp} 
        subtext={usageChangeText}
        color="bg-blue-500"
      />
      <StatCard 
        label="Solar Generation" 
        value={formatKW(solarGeneration)} 
        icon={Sun} 
        subtext={solarText}
        color="bg-amber-500"
      />
      <StatCard 
        label="Battery Level" 
        value={`${batteryPercent}%`} 
        icon={Battery} 
        subtext={batteryText}
        color="bg-brand-500"
      />
      <StatCard 
        label="CO₂ Offset" 
        value={`${co2Offset.toFixed(0)} kg`} 
        icon={Leaf} 
        subtext={co2Text}
        color="bg-teal-600"
      />
    </div>
  );
};

export default EnergyOverviewCards;

