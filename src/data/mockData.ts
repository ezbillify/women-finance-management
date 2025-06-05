
import { subDays, format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  type: 'expense' | 'income';
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
}

export interface AiInsight {
  id: string;
  title: string;
  description: string;
  type: 'saving' | 'spending' | 'investment';
  priority: 'low' | 'medium' | 'high';
  potentialSavings?: number;
}

// Generate mock transactions
const generateMockTransactions = (count: number): Transaction[] => {
  const categories = [
    'Groceries', 'Dining', 'Shopping', 'Transportation', 
    'Utilities', 'Healthcare', 'Entertainment', 'Education'
  ];
  const incomeCategories = ['Salary', 'Freelance', 'Investments', 'Gifts'];
  
  return Array.from({ length: count }, (_, i) => {
    const isExpense = Math.random() > 0.3;
    const category = isExpense 
      ? categories[Math.floor(Math.random() * categories.length)]
      : incomeCategories[Math.floor(Math.random() * incomeCategories.length)];
    
    return {
      id: `trans-${i}`,
      date: format(subDays(new Date(), Math.floor(Math.random() * 30)), 'yyyy-MM-dd'),
      amount: isExpense 
        ? Math.floor(Math.random() * 200) + 20
        : Math.floor(Math.random() * 1500) + 1000,
      category,
      description: isExpense
        ? `${category} - ${Math.random().toString(36).substring(2, 7)}`
        : `${category} payment`,
      type: isExpense ? 'expense' : 'income',
    };
  });
};

// Generate mock goals
export const mockGoals: Goal[] = [
  {
    id: 'goal-1',
    name: 'Emergency Fund',
    targetAmount: 10000,
    currentAmount: 6500,
    deadline: format(subDays(new Date(), -180), 'yyyy-MM-dd'),
    category: 'Savings',
  },
  {
    id: 'goal-2',
    name: 'Vacation',
    targetAmount: 3000,
    currentAmount: 1200,
    deadline: format(subDays(new Date(), -90), 'yyyy-MM-dd'),
    category: 'Travel',
  },
  {
    id: 'goal-3',
    name: 'New Laptop',
    targetAmount: 1500,
    currentAmount: 800,
    deadline: format(subDays(new Date(), -60), 'yyyy-MM-dd'),
    category: 'Electronics',
  },
  {
    id: 'goal-4',
    name: 'Professional Course',
    targetAmount: 5000,
    currentAmount: 2000,
    deadline: format(subDays(new Date(), -120), 'yyyy-MM-dd'),
    category: 'Education',
  },
];

// Generate mock AI insights
export const mockInsights: AiInsight[] = [
  {
    id: 'insight-1',
    title: 'Reduce Restaurant Spending',
    description: 'Your dining expenses are 20% higher than last month. Consider cooking at home more often to save around $150 monthly.',
    type: 'saving',
    priority: 'high',
    potentialSavings: 150,
  },
  {
    id: 'insight-2',
    title: 'Utility Bill Optimization',
    description: 'Your electricity bill has increased by 15%. Check for energy-efficient options or unused devices consuming power.',
    type: 'saving',
    priority: 'medium',
    potentialSavings: 45,
  },
  {
    id: 'insight-3',
    title: 'Investment Opportunity',
    description: 'Based on your current savings rate, you could invest $300 monthly in index funds for long-term growth.',
    type: 'investment',
    priority: 'medium',
  },
  {
    id: 'insight-4',
    title: 'Subscription Review',
    description: 'You have 5 active subscriptions totaling $65 monthly. Consider evaluating which ones you use regularly.',
    type: 'spending',
    priority: 'low',
    potentialSavings: 65,
  },
  {
    id: 'insight-5',
    title: 'Shopping Pattern',
    description: 'Your impulse shopping typically happens on weekends. Setting a weekend budget could help manage these expenses.',
    type: 'spending',
    priority: 'medium',
    potentialSavings: 120,
  },
];

// Generate all transactions
export const mockTransactions = generateMockTransactions(50);

// Get recent transactions (last 5)
export const getRecentTransactions = (): Transaction[] => {
  return [...mockTransactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
};

// Calculate totals
export const getTotals = () => {
  const totalIncome = mockTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = mockTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  return { totalIncome, totalExpenses };
};

// Category expense breakdown
export const getCategoryExpenses = () => {
  const expenses = mockTransactions.filter(t => t.type === 'expense');
  const categories: Record<string, number> = {};
  
  expenses.forEach(expense => {
    if (categories[expense.category]) {
      categories[expense.category] += expense.amount;
    } else {
      categories[expense.category] = expense.amount;
    }
  });
  
  return Object.entries(categories).map(([category, amount]) => ({ category, amount }));
};

// Monthly expense data (for charts)
export const getMonthlyData = () => {
  const currentDate = new Date();
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const dates = eachDayOfInterval({ start, end });
  
  const dailyExpense: Record<string, number> = {};
  const dailyIncome: Record<string, number> = {};
  
  dates.forEach(date => {
    const dateStr = format(date, 'yyyy-MM-dd');
    dailyExpense[dateStr] = 0;
    dailyIncome[dateStr] = 0;
  });
  
  mockTransactions.forEach(transaction => {
    const date = transaction.date;
    if (new Date(date) >= start && new Date(date) <= end) {
      if (transaction.type === 'expense') {
        dailyExpense[date] = (dailyExpense[date] || 0) + transaction.amount;
      } else {
        dailyIncome[date] = (dailyIncome[date] || 0) + transaction.amount;
      }
    }
  });
  
  const labels = Object.keys(dailyExpense).sort();
  const expenseData = labels.map(date => dailyExpense[date] || 0);
  const incomeData = labels.map(date => dailyIncome[date] || 0);
  
  return { labels, expenseData, incomeData };
};

// Filter transactions by month and category
export const filterTransactions = (
  month?: string,
  category?: string
): Transaction[] => {
  let filtered = [...mockTransactions];
  
  if (month) {
    filtered = filtered.filter(t => t.date.startsWith(month));
  }
  
  if (category) {
    filtered = filtered.filter(t => t.category === category);
  }
  
  return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
