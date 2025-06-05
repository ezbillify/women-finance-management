
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartData
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ExpenseChartProps {
  categoryData: { category: string; amount: number }[];
  monthlyData: {
    labels: string[];
    incomeData: number[];
    expenseData: number[];
  };
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ categoryData, monthlyData }) => {
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

  const barChartData = {
    labels: monthlyData.labels.map(date => {
      const d = new Date(date);
      return d.getDate().toString();
    }),
    datasets: [
      {
        label: 'Income',
        data: monthlyData.incomeData,
        backgroundColor: '#4CAF50',
      },
      {
        label: 'Expenses',
        data: monthlyData.expenseData,
        backgroundColor: '#DD4A48',
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    maintainAspectRatio: false,
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="rose-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-comfortaa text-rose-600">Expense by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Pie data={pieChartData} options={pieOptions} />
          </div>
        </CardContent>
      </Card>

      <Card className="rose-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-comfortaa text-rose-600">Monthly Income vs Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Bar data={barChartData} options={barOptions} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseChart;
