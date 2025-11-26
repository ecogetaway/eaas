import React from 'react';
import { Download, AlertCircle } from 'lucide-react';

export const BillingView: React.FC = () => {
  const invoices = [
    { id: 'INV-2024-001', date: 'Oct 01, 2024', amount: 89.00, status: 'Paid' },
    { id: 'INV-2024-002', date: 'Sep 01, 2024', amount: 89.00, status: 'Paid' },
    { id: 'INV-2024-003', date: 'Aug 01, 2024', amount: 89.00, status: 'Paid' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Billing & Payments</h1>
        
        <div className="bg-brand-50 border border-brand-200 rounded-xl p-6 mb-8 flex items-start space-x-4">
            <div className="bg-brand-100 p-2 rounded-full">
                <AlertCircle className="w-6 h-6 text-brand-600" />
            </div>
            <div>
                <h3 className="font-bold text-brand-900">Upcoming Payment</h3>
                <p className="text-brand-700 text-sm mt-1">
                    Your next bill of <span className="font-bold">$89.00</span> for the "Hybrid Freedom" plan is due on <span className="font-bold">Nov 01, 2024</span>. Auto-pay is enabled.
                </p>
            </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="font-bold text-gray-700">Invoice History</h2>
                <button className="text-sm text-brand-600 font-medium hover:text-brand-700">Download All</button>
            </div>
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-gray-100">
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Invoice ID</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {invoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{inv.id}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{inv.date}</td>
                            <td className="px-6 py-4 text-sm font-bold text-gray-900">${inv.amount.toFixed(2)}</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    {inv.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-gray-400 hover:text-brand-600 transition-colors">
                                    <Download className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};