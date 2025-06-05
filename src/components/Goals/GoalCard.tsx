
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Goal } from '@/data/mockData';

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onEdit, onDelete }) => {
  const progress = Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100);
  
  const getProgressColor = (percent: number) => {
    if (percent < 25) return 'bg-red-500';
    if (percent < 50) return 'bg-amber-500';
    if (percent < 75) return 'bg-blue-500';
    return 'bg-green-500';
  };
  
  return (
    <Card className="rose-card hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-rose-700">{goal.name}</h3>
          <div className="flex space-x-2">
            <Button
              onClick={() => onEdit(goal)}
              variant="outline"
              size="icon"
              className="h-8 w-8 border-rose-200 text-rose-600 hover:bg-rose-100"
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              onClick={() => onDelete(goal.id)}
              variant="outline"
              size="icon"
              className="h-8 w-8 border-rose-200 text-rose-600 hover:bg-rose-100 hover:text-rose-700"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
        
        <div className="mb-3 text-rose-600">
          <span className="font-medium">Category:</span> {goal.category}
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-rose-700 font-medium">${goal.currentAmount}</span>
            <span className="text-rose-500">Target: ${goal.targetAmount}</span>
          </div>
          <div className="w-full bg-rose-100 rounded-full h-3">
            <div
              className={`h-3 rounded-full ${getProgressColor(progress)}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-right text-sm mt-1 text-rose-600">
            {progress}% complete
          </div>
        </div>
        
        <div className="text-sm text-rose-500">
          Goal deadline: {format(new Date(goal.deadline), 'MMMM dd, yyyy')}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalCard;
