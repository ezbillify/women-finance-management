
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PieChart, TrendingUp, Target } from 'lucide-react';
import { formatCurrency } from '@/utils/currency';

interface SavingsGoal {
  id: string;
  goal_name: string;
  target_amount: number;
  saved_amount: number;
}

interface SummaryCardsProps {
  totalIncome: number;
  totalExpenses: number;
  activeGoal: SavingsGoal | null;
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
            <p className="text-2xl font-semibold text-rose-700">{formatCurrency(totalIncome)}</p>
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
            <p className="text-2xl font-semibold text-rose-700">{formatCurrency(totalExpenses)}</p>
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
              <p className="font-semibold text-rose-700">
                {activeGoal ? activeGoal.goal_name : 'No goals yet'}
              </p>
            </div>
          </div>
          {activeGoal && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-rose-600">{formatCurrency(activeGoal.saved_amount)}</span>
                <span className="text-rose-500">Target: {formatCurrency(activeGoal.target_amount)}</span>
              </div>
              <div className="w-full bg-rose-100 rounded-full h-2">
                <div 
                  className="bg-rose-500 h-2 rounded-full" 
                  style={{ width: `${getProgressPercent(activeGoal.saved_amount, activeGoal.target_amount)}%` }}
                ></div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
