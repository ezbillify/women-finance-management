
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/utils/currency';

interface SavingsGoal {
  id: string;
  goal_name: string;
  target_amount: number;
  saved_amount: number;
}

interface SavingsGoalChartProps {
  goals: SavingsGoal[];
}

const SavingsGoalChart: React.FC<SavingsGoalChartProps> = ({ goals }) => {
  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };
  
  return (
    <Card className="rose-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-comfortaa text-rose-600">Savings Goal Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.length === 0 ? (
            <p className="text-rose-500 text-center py-6">No savings goals to display.</p>
          ) : (
            goals.map((goal) => {
              const progress = calculateProgress(goal.saved_amount, goal.target_amount);
              return (
                <div key={goal.id} className="space-y-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-rose-700">{goal.goal_name}</h4>
                    <span className="text-rose-600">{progress}%</span>
                  </div>
                  <Progress className="h-2" value={progress} />
                  <div className="flex justify-between text-sm text-rose-500">
                    <span>{formatCurrency(goal.saved_amount)} saved</span>
                    <span>Goal: {formatCurrency(goal.target_amount)}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SavingsGoalChart;
