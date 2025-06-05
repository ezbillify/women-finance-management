
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Goal } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';

interface SavingsGoalChartProps {
  goals: Goal[];
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
              const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
              return (
                <div key={goal.id} className="space-y-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-rose-700">{goal.name}</h4>
                    <span className="text-rose-600">{progress}%</span>
                  </div>
                  <Progress className="h-2" value={progress} />
                  <div className="flex justify-between text-sm text-rose-500">
                    <span>${goal.currentAmount} saved</span>
                    <span>Goal: ${goal.targetAmount}</span>
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
