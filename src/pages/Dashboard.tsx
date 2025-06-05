
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SummaryCards from '@/components/Dashboard/SummaryCards';
import RecentTransactions from '@/components/Dashboard/RecentTransactions';
import ExpenseChart from '@/components/Dashboard/ExpenseChart';
import QuickEntry from '@/components/Dashboard/QuickEntry';
import AiInsightsPreview from '@/components/Dashboard/AiInsightsPreview';
import { useToast } from '@/hooks/use-toast';
import { 
  getRecentTransactions, 
  getTotals, 
  mockGoals, 
  mockInsights, 
  getCategoryExpenses,
  getMonthlyData,
  Transaction
} from '@/data/mockData';

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(getRecentTransactions());
  const { toast } = useToast();
  const { totalIncome, totalExpenses } = getTotals();
  const activeGoal = mockGoals[0]; // Using the first goal as the top goal
  const categoryData = getCategoryExpenses();
  const monthlyData = getMonthlyData();

  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions(prev => [newTransaction, ...prev.slice(0, 4)]);
    toast({
      title: "Expense added",
      description: `$${newTransaction.amount} for ${newTransaction.category} has been recorded.`,
    });
  };

  return (
    <Layout>
      <h1 className="text-3xl font-comfortaa font-bold text-rose-600 mb-6">Dashboard</h1>
      
      {/* Summary Cards */}
      <SummaryCards 
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        activeGoal={activeGoal}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Charts */}
          <ExpenseChart categoryData={categoryData} monthlyData={monthlyData} />
          
          {/* Recent Transactions */}
          <RecentTransactions transactions={transactions} />
        </div>
        
        <div className="space-y-6">
          {/* AI Insights */}
          <AiInsightsPreview insights={mockInsights} />
          
          {/* Quick Entry */}
          <QuickEntry onAddTransaction={handleAddTransaction} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
