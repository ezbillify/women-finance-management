
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SavingsGoalChart from '@/components/Reports/SavingsGoalChart';
import MonthlySpendingChart from '@/components/Reports/MonthlySpendingChart';
import ExpenseCategoryBreakdown from '@/components/Reports/ExpenseCategoryBreakdown';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useUserData } from '@/hooks/useUserData';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { format, subMonths } from 'date-fns';
import { formatCurrency } from '@/utils/currency';

const Reports = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { 
    transactions, 
    savingsGoals, 
    loading, 
    getTotals, 
    getCategoryExpenses 
  } = useUserData();
  const [timeframe, setTimeframe] = useState('6months');

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
          <p className="text-rose-600 font-comfortaa">Loading your reports...</p>
        </div>
      </div>
    );
  }

  // Prepare data for the expense category breakdown chart
  const categoryExpenses = getCategoryExpenses();
  const { totalIncome, totalExpenses } = getTotals();
  
  // Generate monthly data for spending chart
  const generateMonthlyData = (months: number) => {
    const data = [];
    const today = new Date();
    
    for (let i = months - 1; i >= 0; i--) {
      const date = subMonths(today, i);
      const monthYear = format(date, 'MMM yyyy');
      const monthStart = format(date, 'yyyy-MM');
      
      // Filter transactions for this month
      const monthlyTransactions = transactions.filter(
        t => t.date.startsWith(monthStart) && t.type === 'expense'
      );
      
      // Sum expenses
      const spending = monthlyTransactions.reduce((sum, t) => sum + t.amount, 0);
      
      data.push({ month: monthYear, spending });
    }
    
    return data;
  };

  const timeframeMap: Record<string, number> = {
    '3months': 3,
    '6months': 6,
    '12months': 12
  };

  const monthlyData = generateMonthlyData(timeframeMap[timeframe]);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-comfortaa font-bold text-rose-600">Financial Reports</h1>
        <div className="w-48">
          <Select 
            value={timeframe} 
            onValueChange={(value) => setTimeframe(value)}
          >
            <SelectTrigger className="rose-input">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="12months">Last 12 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenseCategoryBreakdown categoryData={categoryExpenses} />
        <MonthlySpendingChart data={monthlyData} />
        
        <div className="lg:col-span-2">
          <SavingsGoalChart goals={savingsGoals} />
        </div>
        
        <Card className="rose-card lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="text-xl font-comfortaa font-bold text-rose-600 mb-4">Financial Health Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/50 p-4 rounded-lg border border-rose-100">
                <p className="text-lg font-medium text-rose-700">Avg. Monthly Spending</p>
                <p className="text-2xl font-bold text-rose-600">
                  {formatCurrency(monthlyData.reduce((sum, item) => sum + item.spending, 0) / (monthlyData.length || 1))}
                </p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg border border-rose-100">
                <p className="text-lg font-medium text-rose-700">Total Savings Progress</p>
                <p className="text-2xl font-bold text-rose-600">
                  {formatCurrency(savingsGoals.reduce((sum, goal) => sum + goal.saved_amount, 0))}
                </p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg border border-rose-100">
                <p className="text-lg font-medium text-rose-700">Top Expense Category</p>
                <p className="text-2xl font-bold text-rose-600">
                  {categoryExpenses.length > 0 
                    ? categoryExpenses.sort((a, b) => b.amount - a.amount)[0]?.category
                    : 'No expenses yet'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;
