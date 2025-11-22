import { Leaf } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters.js';

const GridIndependenceScore = ({ dashboardSummary, energyHistory }) => {
  // Calculate grid independence score (0-100)
  // Based on ratio of solar+battery usage vs total consumption
  let gridIndependenceScore = 75; // Default fallback
  
  if (energyHistory && energyHistory.length > 0) {
    const totalSolar = energyHistory.reduce((sum, item) => sum + (parseFloat(item.solar_generation || 0)), 0);
    const totalConsumption = energyHistory.reduce((sum, item) => sum + (parseFloat(item.total_consumption || 0)), 0);
    const totalGridImport = energyHistory.reduce((sum, item) => sum + (parseFloat(item.grid_import || 0)), 0);
    
    if (totalConsumption > 0) {
      const renewableRatio = (totalSolar / totalConsumption) * 100;
      const gridDependencyRatio = (totalGridImport / totalConsumption) * 100;
      gridIndependenceScore = Math.max(0, Math.min(100, Math.round(100 - gridDependencyRatio + renewableRatio * 0.5)));
    }
  }

  // Calculate weekly savings (from stored energy usage)
  // Use today's savings as a proxy for weekly savings, or fallback to month savings
  const weeklySavings = dashboardSummary?.today?.savings || dashboardSummary?.month?.savings || 0;
  const savingsAmount = typeof weeklySavings === 'number' ? weeklySavings : parseFloat(weeklySavings) || 0;

  // Calculate rotation for the donut chart (92% = 92% of 360 degrees)
  const rotation = -90; // Start from top
  const circumference = 2 * Math.PI * 60; // radius of 60
  const offset = circumference - (gridIndependenceScore / 100) * circumference;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">Grid Independence Score</h2>
        <p className="text-gray-500 text-sm mb-6">Your system efficiency compared to neighborhood average.</p>
        
        <div className="flex items-center justify-center py-8">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="transform -rotate-90 w-40 h-40" viewBox="0 0 160 160">
              {/* Background circle */}
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="12"
              />
              {/* Progress circle */}
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="none"
                stroke="#10b981"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div>
                <span className="text-4xl font-bold text-gray-900">{gridIndependenceScore}</span>
                <span className="block text-xs text-gray-500 uppercase font-bold">Score</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-brand-50 rounded-lg p-4">
        <p className="text-sm text-brand-800 font-medium flex items-center">
          <Leaf className="w-4 h-4 mr-2" />
          You saved {formatCurrency(savingsAmount)} this week by using stored energy.
        </p>
      </div>
    </div>
  );
};

export default GridIndependenceScore;

