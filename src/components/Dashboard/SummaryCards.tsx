
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PieChart, TrendingUp, Target } from 'lucide-react';
import { Goal } from '@/data/mockData';

interface SummaryCardsProps {
  totalIncome: number;
  totalExpenses: number;
  activeGoal: Goal;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ totalIncome, totalExpenses, activeGoal }) => {
  const getProgressPercent = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="rose-card">
        <CardContent className="p-6 flex items-center">
          <div className="bg-rose-100 p-3 rounded-full mr-4">
            <TrendingUp className="h-6 w-6 text-rose-600" />
          </div>
          <div>
            <p className="text-sm text-rose-500">Total Income</p>
            <p className="text-2xl font-semibold text-rose-700">${totalIncome}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="rose-card">
        <CardContent className="p-6 flex items-center">
          <div className="bg-rose-100 p-3 rounded-full mr-4">
            <PieChart className="h-6 w-6 text-rose-600" />
          </div>
          <div>
            <p className="text-sm text-rose-500">Total Expenses</p>
            <p className="text-2xl font-semibold text-rose-700">${totalExpenses}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="rose-card">
        <CardContent className="p-6">
          <div className="flex items-center mb-2">
            <div className="bg-rose-100 p-3 rounded-full mr-4">
              <Target className="h-6 w-6 text-rose-600" />
            </div>
            <div>
              <p className="text-sm text-rose-500">Top Saving Goal</p>
              <p className="font-semibold text-rose-700">{activeGoal.name}</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-rose-600">${activeGoal.currentAmount}</span>
              <span className="text-rose-500">Target: ${activeGoal.targetAmount}</span>
            </div>
            <div className="w-full bg-rose-100 rounded-full h-2">
              <div 
                className="bg-rose-500 h-2 rounded-full" 
                style={{ width: `${getProgressPercent(activeGoal.currentAmount, activeGoal.targetAmount)}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
