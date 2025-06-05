
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import InsightCard from '@/components/AIInsights/InsightCard';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';
import { mockInsights, AiInsight } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const AIInsights = () => {
  const [insights, setInsights] = useState<AiInsight[]>(mockInsights);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const handleRegenerateInsights = () => {
    setIsRefreshing(true);
    
    // Simulate API call to regenerate insights
    setTimeout(() => {
      // Just rearrange the insights to simulate new ones
      const shuffled = [...insights]
        .sort(() => Math.random() - 0.5)
        .map((insight, index) => ({
          ...insight,
          id: `insight-${Date.now()}-${index}`,
          // Randomly adjust some properties to simulate differences
          potentialSavings: insight.potentialSavings ? 
            Math.round(insight.potentialSavings * (0.8 + Math.random() * 0.4)) : undefined
        }));
      
      setInsights(shuffled);
      setIsRefreshing(false);
      toast({
        title: "Insights refreshed",
        description: "Your AI financial insights have been updated with the latest data.",
      });
    }, 1500);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-comfortaa font-bold text-rose-600">AI Financial Insights</h1>
        <Button 
          onClick={handleRegenerateInsights}
          disabled={isRefreshing}
          className="rose-button"
        >
          <RefreshCcw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Generating...' : 'Regenerate Insights'}
        </Button>
      </div>
      
      <div className="mb-6">
        <p className="text-lg text-rose-600">
          BudgetBuddy uses AI to analyze your financial patterns and provide personalized suggestions to help you save more and spend wisely.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </Layout>
  );
};

export default AIInsights;
