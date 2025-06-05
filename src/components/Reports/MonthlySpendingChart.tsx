
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { formatCurrency } from '@/utils/currency';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MonthlyData {
  month: string;
  spending: number;
}

interface MonthlySpendingChartProps {
  data: MonthlyData[];
}

const MonthlySpendingChart: React.FC<MonthlySpendingChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Monthly Spending',
        data: data.map(item => item.spending),
        borderColor: '#DD4A48',
        backgroundColor: 'rgba(221, 74, 72, 0.1)',
        pointBackgroundColor: '#DD4A48',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#DD4A48',
        fill: true,
        tension: 0.4,
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Spending: ${formatCurrency(context.parsed.y)}`,
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: (value: any) => formatCurrency(value)
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    },
    maintainAspectRatio: false,
  };

  return (
    <Card className="rose-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-comfortaa text-rose-600">Monthly Spending Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <Line data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlySpendingChart;
