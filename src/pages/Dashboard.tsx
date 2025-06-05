
import React from 'react';
import Layout from '@/components/Layout';
import SummaryCards from '@/components/Dashboard/SummaryCards';
import RecentTransactions from '@/components/Dashboard/RecentTransactions';
import ExpenseChart from '@/components/Dashboard/ExpenseChart';
import QuickEntry from '@/components/Dashboard/QuickEntry';
import AiInsightsPreview from '@/components/Dashboard/AiInsightsPreview';
import { useToast } from '@/hooks/use-toast';
import { useUserData } from '@/hooks/useUserData';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Dashboard = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { 
    transactions, 
    savingsGoals, 
    aiSuggestions, 
    loading, 
    addTransaction, 
    getTotals, 
    getCategoryExpenses 
  } = useUserData();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  if (authLoading || loading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-rose-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-rose-600 font-comfortaa">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const { totalIncome, totalExpenses } = getTotals();
  const activeGoal = savingsGoals[0] || null;
  const categoryData = getCategoryExpenses();
  const recentTransactions = transactions.slice(0, 5);

  const handleAddTransaction = async (transactionData: any) => {
    try {
      await addTransaction(transactionData);
      toast({
        title: "Transaction added",
        description: `₹${transactionData.amount} for ${transactionData.category} has been recorded.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add transaction. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Generate mock monthly data for chart
  const getMonthlyData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    return {
      labels: last7Days,
      incomeData: last7Days.map(date => {
        const dayIncome = transactions
          .filter(t => t.type === 'income' && t.date === date)
          .reduce((sum, t) => sum + t.amount, 0);
        return dayIncome;
      }),
      expenseData: last7Days.map(date => {
        const dayExpenses = transactions
          .filter(t => t.type === 'expense' && t.date === date)
          .reduce((sum, t) => sum + t.amount, 0);
        return dayExpenses;
      })
    };
  };

  const monthlyData = getMonthlyData();

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
          <RecentTransactions transactions={recentTransactions} />
        </div>
        
        <div className="space-y-6">
          {/* AI Insights */}
          <AiInsightsPreview insights={aiSuggestions.slice(0, 3)} />
          
          {/* Quick Entry */}
          <QuickEntry onAddTransaction={handleAddTransaction} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
