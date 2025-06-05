
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface ExpenseCategoryBreakdownProps {
  categoryData: { category: string; amount: number }[];
}

const ExpenseCategoryBreakdown: React.FC<ExpenseCategoryBreakdownProps> = ({ categoryData }) => {
  const pieChartData: ChartData<'pie'> = {
    labels: categoryData.map((item) => item.category),
    datasets: [
      {
        data: categoryData.map((item) => item.amount),
        backgroundColor: [
          '#DD4A48',
          '#F57C7C',
          '#F8A8A8',
          '#FBC4C4',
          '#F9E4E4',
          '#FF9999',
          '#FFB6B6',
          '#FFD2D2',
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: $${value} (${percentage}%)`;
          }
        }
      }
    },
    maintainAspectRatio: false,
  };

  const calculateTotal = () => {
    return categoryData.reduce((sum, category) => sum + category.amount, 0);
  };

  return (
    <Card className="rose-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-comfortaa text-rose-600">Expense Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <Pie data={pieChartData} options={pieOptions} />
        </div>
        <div className="mt-4">
          <p className="text-center text-rose-600">Total Expenses: ${calculateTotal()}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseCategoryBreakdown;
