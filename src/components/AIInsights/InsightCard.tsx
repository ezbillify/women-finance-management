
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AiInsight } from '@/data/mockData';
import { TrendingUp, DollarSign, ShoppingBag } from 'lucide-react';

interface InsightCardProps {
  insight: AiInsight;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  const getBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-rose-500 text-white';
      case 'medium':
        return 'bg-amber-400 text-amber-800';
      case 'low':
        return 'bg-green-400 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'saving':
        return <DollarSign className="h-5 w-5" />;
      case 'spending':
        return <ShoppingBag className="h-5 w-5" />;
      case 'investment':
        return <TrendingUp className="h-5 w-5" />;
      default:
        return <TrendingUp className="h-5 w-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'saving':
        return 'SAVING OPPORTUNITY';
      case 'spending':
        return 'SPENDING PATTERN';
      case 'investment':
        return 'INVESTMENT TIP';
      default:
        return 'FINANCIAL INSIGHT';
    }
  };
  
  return (
    <Card className="rose-card hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className={`p-2 rounded-full ${
              insight.type === 'saving' ? 'bg-green-100 text-green-600' :
              insight.type === 'spending' ? 'bg-rose-100 text-rose-600' :
              'bg-blue-100 text-blue-600'
            } mr-3`}>
              {getTypeIcon(insight.type)}
            </div>
            <div>
              <p className={`text-xs font-semibold ${
                insight.type === 'saving' ? 'text-green-600' :
                insight.type === 'spending' ? 'text-rose-600' :
                'text-blue-600'
              }`}>
                {getTypeLabel(insight.type)}
              </p>
              <h3 className="font-semibold text-lg text-rose-700">{insight.title}</h3>
            </div>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${getBadgeColor(insight.priority)}`}>
            {insight.priority}
          </span>
        </div>
        
        <p className="text-rose-600 mb-4">{insight.description}</p>
        
        {insight.potentialSavings && (
          <div className="bg-green-50 border border-green-100 rounded-lg p-3">
            <p className="font-semibold text-green-700">
              Potential monthly savings: ${insight.potentialSavings}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InsightCard;
