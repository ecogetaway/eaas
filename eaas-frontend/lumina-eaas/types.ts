export interface User {
  id: string;
  name: string;
  email: string;
  currentPlanId?: string;
  savingsTotal: number;
  co2Offset: number; // in kg
}

export interface Plan {
  id: string;
  name: string;
  price: number; // Monthly cost
  capacity: string; // e.g. "5kW Solar + 10kWh Battery"
  features: string[];
  recommended?: boolean;
}

export interface EnergyData {
  time: string;
  gridUsage: number; // kWh
  solarGeneration: number; // kWh
  batteryLevel: number; // %
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}
