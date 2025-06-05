
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AiInsight } from '@/data/mockData';

interface AiInsightsPreviewProps {
  insights: AiInsight[];
}

const AiInsightsPreview: React.FC<AiInsightsPreviewProps> = ({ insights }) => {
  const navigate = useNavigate();
  
  // Get the first two insights
  const previewInsights = insights.slice(0, 2);
  
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
        return '💰';
      case 'spending':
        return '🛍️';
      case 'investment':
        return '📈';
      default:
        return '📊';
    }
  };
  
  return (
    <Card className="rose-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-comfortaa text-rose-600">AI Insights</CardTitle>
          <TrendingUp className="h-5 w-5 text-rose-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {previewInsights.map((insight) => (
            <div key={insight.id} className="bg-white/50 p-3 rounded-lg border border-rose-100">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <span className="mr-2 text-xl">{getTypeIcon(insight.type)}</span>
                  <h4 className="font-semibold text-rose-700">{insight.title}</h4>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getBadgeColor(insight.priority)}`}>
                  {insight.priority}
                </span>
              </div>
              <p className="text-sm text-rose-600">{insight.description}</p>
              {insight.potentialSavings && (
                <p className="text-sm font-semibold text-rose-500 mt-2">
                  Potential savings: ${insight.potentialSavings}/month
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => navigate('/insights')}
          variant="outline"
          className="w-full border-rose-300 text-rose-600 hover:bg-rose-100"
        >
          View All Insights
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AiInsightsPreview;
